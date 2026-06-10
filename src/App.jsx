import { useEffect, useMemo, useRef, useState } from "react";
import { Background } from "./components/Background";
import { EndFocusConfirmDialog, LoginModal, RestDialog, Toast } from "./components/Dialogs";
import { Hero } from "./components/Hero";
import { ReviewDialog } from "./components/ReviewDialog";
import { createShareText, ShareCard } from "./components/ShareCard";
import { TopNav } from "./components/TopNav";
import { scenes, STORAGE_KEYS } from "./data/focusRoomData";
import { useFocusAudio } from "./hooks/useFocusAudio";
import { useFocusSession } from "./hooks/useFocusSession";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { usePomodoroTimer } from "./hooks/usePomodoroTimer";
import { useStudyHistory } from "./hooks/useStudyHistory";
import { useStudyStats } from "./hooks/useStudyStats";
import { ControlRoom } from "./views/ControlRoom";
import { FocusMode } from "./views/FocusMode";

const defaultPomodoro = { duration: 50 };
const defaultSound = { musicVolume: 72, ambienceVolume: 35, musicType: "morning-piano", ambienceType: "window-breeze" };
const defaultPreferences = { lowPerformance: false };

export default function App() {
  const [storedSceneId, setStoredSceneId] = useLocalStorage(STORAGE_KEYS.scene, scenes[0].id);
  const [goal, setGoal] = useLocalStorage(STORAGE_KEYS.goal, "");
  const [pomodoro, setPomodoro] = useLocalStorage(STORAGE_KEYS.pomodoro, defaultPomodoro);
  const [sound, setSound] = useLocalStorage(STORAGE_KEYS.sound, defaultSound);
  const [preferences, setPreferences] = useLocalStorage(STORAGE_KEYS.preferences, defaultPreferences);
  const [activePanel, setActivePanel] = useState("scene");
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [isResting, setIsResting] = useState(false);
  const [isEndConfirmOpen, setIsEndConfirmOpen] = useState(false);
  const [restSecondsLeft, setRestSecondsLeft] = useState(5 * 60);
  const [pendingReviewRecord, setPendingReviewRecord] = useState(null);
  const [selectedShareRecord, setSelectedShareRecord] = useState(null);
  const recordedCompletionRef = useRef(false);
  const didRestoreSessionRef = useRef(false);

  const currentScene = useMemo(() => scenes.find((scene) => scene.id === storedSceneId) || scenes[0], [storedSceneId]);
  const timer = usePomodoroTimer(pomodoro.duration);
  const { stats, recordSession } = useStudyStats();
  const studyHistory = useStudyHistory();
  const focusSession = useFocusSession();
  const { isAudioOn, startAudio, stopAudio } = useFocusAudio(currentScene, sound);

  useEffect(() => {
    document.documentElement.dataset.lowPerformance = preferences.lowPerformance ? "true" : "false";
  }, [preferences.lowPerformance]);

  useEffect(() => {
    if (isAudioOn) startAudio(currentScene);
  }, [sound.musicType, sound.ambienceType]);

  useEffect(() => {
    if (didRestoreSessionRef.current) return;
    didRestoreSessionRef.current = true;

    const restored = focusSession.getRestoreState();
    if (!restored) return;

    const restoredScene = scenes.find((scene) => scene.id === restored.session.sceneId);
    if (restoredScene) setStoredSceneId(restoredScene.id);
    if (typeof restored.session.goal === "string") setGoal(restored.session.goal);
    if (restored.session.durationMinutes) setPomodoro((prev) => ({ ...prev, duration: restored.session.durationMinutes }));

    if (restored.status === "running" || restored.status === "paused") {
      setIsFocusMode(true);
      timer.restore({ restoredSecondsLeft: restored.secondsLeft, restoredIsRunning: restored.status === "running" });
      showToast(restored.status === "running" ? "已恢复正在进行的专注轮" : "已恢复暂停中的专注轮");
      return;
    }

    if (restored.status === "expired") {
      setIsFocusMode(false);
      timer.restore({ restoredSecondsLeft: 0, restoredCompleted: true, restoredCompletionReason: "natural" });
      showToast("上一轮专注已自然完成");
      return;
    }

    if (restored.status === "completed") {
      setIsFocusMode(false);
      timer.restore({ restoredSecondsLeft: 0, restoredCompleted: true, restoredCompletionReason: "natural" });
    }
  }, []);

  useEffect(() => {
    if (!focusSession.session.isActive) return;
    focusSession.updateSession({ goal, sceneId: storedSceneId });
  }, [goal, storedSceneId]);

  useEffect(() => {
    if (timer.timerCompleted && timer.completionReason === "natural" && !recordedCompletionRef.current) {
      const hasActiveSession = focusSession.session.isActive && !focusSession.session.completionSettled;
      if (hasActiveSession) {
        const actualSeconds = focusSession.session.plannedSeconds || (pomodoro.duration || 50) * 60;
        recordSession(actualSeconds, { completedRound: true });
        const record = studyHistory.addRecord({
          goal: focusSession.session.goal || goal,
          sceneName: currentScene.title,
          durationSeconds: actualSeconds,
          isCompletedRound: true
        });
        focusSession.completeSession(actualSeconds);
        stopAudio();
        setIsFocusMode(false);
        setIsEndConfirmOpen(false);
        setPendingReviewRecord(record);
      }
      recordedCompletionRef.current = true;
    }
    if (!timer.timerCompleted) recordedCompletionRef.current = false;
  }, [timer.timerCompleted, timer.completionReason, pomodoro.duration, focusSession.session.isActive, focusSession.session.completionSettled, focusSession.session.plannedSeconds]);

  useEffect(() => {
    if (!isResting) return undefined;
    const restTimer = window.setInterval(() => {
      setRestSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(restTimer);
          setIsResting(false);
          return 5 * 60;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(restTimer);
  }, [isResting]);

  const pauseFocus = () => {
    timer.pause();
    focusSession.pauseSession(timer.secondsLeft);
  };

  const resumeFocus = () => {
    focusSession.resumeSession(timer.secondsLeft);
    timer.start(timer.secondsLeft);
  };

  const toggleFocusTimer = () => {
    if (timer.isRunning) pauseFocus();
    else resumeFocus();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target;
      const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement;
      if (isTyping) return;

      if (event.code === "Space") {
        event.preventDefault();
        if (isFocusMode) toggleFocusTimer();
      }
      if (event.key === "Escape") {
        if (isEndConfirmOpen) setIsEndConfirmOpen(false);
        else if (isLoginOpen) setIsLoginOpen(false);
        else if (isResting) setIsResting(false);
        else if (isFocusMode) requestEndStudy();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocusMode, isEndConfirmOpen, isLoginOpen, isResting, timer.isRunning, timer.secondsLeft]);

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 1800);
  };

  const setScene = (scene) => {
    setStoredSceneId(scene.id);
    if (isAudioOn) startAudio(scene);
  };

  const enterFocus = async () => {
    const plannedSeconds = (pomodoro.duration || 50) * 60;
    timer.clearCompleted();
    focusSession.startSession({ durationMinutes: pomodoro.duration || 50, goal, sceneId: currentScene.id });
    setPendingReviewRecord(null);
    setIsResting(false);
    await startAudio(currentScene);
    setIsFocusMode(true);
    timer.start(plannedSeconds);
  };

  const endStudy = () => {
    setIsEndConfirmOpen(false);
    if (focusSession.session.isActive && timer.completionReason !== "skipped") {
      const actualSeconds = focusSession.getActualSeconds(timer.secondsLeft, pomodoro.duration);
      if (actualSeconds >= 60) {
        recordSession(actualSeconds, { completedRound: false });
        const record = studyHistory.addRecord({
          goal: focusSession.session.goal || goal,
          sceneName: currentScene.title,
          durationSeconds: actualSeconds,
          isCompletedRound: false
        });
        setPendingReviewRecord(record);
      }
    }
    timer.reset();
    focusSession.clearSession();
    stopAudio();
    setIsResting(false);
    setIsFocusMode(false);
  };

  const requestEndStudy = () => {
    if (focusSession.session.isActive && !timer.timerCompleted) {
      setIsEndConfirmOpen(true);
      return;
    }
    endStudy();
  };

  const closeReviewFlow = () => {
    setIsEndConfirmOpen(false);
    setPendingReviewRecord(null);
    timer.reset();
    focusSession.clearSession();
    stopAudio();
    setIsFocusMode(false);
  };

  const saveReview = (review) => {
    if (!pendingReviewRecord) return null;
    const updatedRecord = studyHistory.updateReview(pendingReviewRecord.id, review);
    if (updatedRecord) setPendingReviewRecord(updatedRecord);
    return updatedRecord;
  };

  const skipReview = () => {
    if (!pendingReviewRecord) return null;
    const skippedRecord = studyHistory.skipReview(pendingReviewRecord.id);
    return skippedRecord || pendingReviewRecord;
  };

  const copyShareText = async (record) => {
    try {
      await navigator.clipboard.writeText(createShareText(record));
      showToast("分享文案已复制");
    } catch {
      showToast("复制失败，请手动复制卡片内容");
    }
  };

  return (
    <>
      <Background scene={currentScene} lowPerformance={preferences.lowPerformance} />
      <a href="#main-content" className="skip-link">跳到主要内容</a>
      <Toast message={toast} />
      {pendingReviewRecord && <ReviewDialog record={pendingReviewRecord} onSave={saveReview} onSkip={skipReview} onClose={closeReviewFlow} onCopyShare={copyShareText} />}
      {isEndConfirmOpen && <EndFocusConfirmDialog onCancel={() => setIsEndConfirmOpen(false)} onConfirm={endStudy} />}
      {selectedShareRecord && (
        <div className="fixed inset-0 z-50 grid items-start justify-items-center overflow-y-auto bg-black/58 px-3 py-4 backdrop-blur-sm sm:items-center sm:py-6">
          <div className="w-full max-w-2xl">
            <ShareCard record={selectedShareRecord} onCopy={copyShareText} onClose={() => setSelectedShareRecord(null)} />
          </div>
        </div>
      )}
      {isResting && <RestDialog secondsLeft={restSecondsLeft} onSkip={() => setIsResting(false)} />}
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
      {isFocusMode ? (
        <FocusMode scene={currentScene} sound={sound} setSound={setSound} isAudioOn={isAudioOn} goal={goal} pomodoro={pomodoro} secondsLeft={timer.secondsLeft} isRunning={timer.isRunning} onToggleTimer={toggleFocusTimer} onEndStudy={requestEndStudy} stats={stats} onPreviewAudio={() => startAudio(currentScene)} onStopAudio={stopAudio} />
      ) : (
        <>
          <TopNav activePanel={activePanel} setActivePanel={setActivePanel} onHome={() => window.scrollTo({ top: 0, behavior: "smooth" })} onOpenLogin={() => setIsLoginOpen(true)} />
          <main id="main-content" className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            <Hero currentScene={currentScene} onStart={enterFocus} />
            <ControlRoom activePanel={activePanel} setActivePanel={setActivePanel} currentScene={currentScene} setScene={setScene} sound={sound} setSound={setSound} pomodoro={pomodoro} setPomodoro={setPomodoro} timer={timer} goal={goal} setGoal={setGoal} onStart={enterFocus} onEndStudy={requestEndStudy} isAudioOn={isAudioOn} onPreviewAudio={() => startAudio(currentScene)} onStopAudio={stopAudio} stats={stats} historyRecords={studyHistory.recentRecords} onOpenShareCard={setSelectedShareRecord} preferences={preferences} setPreferences={setPreferences} />
          </main>
        </>
      )}
    </>
  );
}
