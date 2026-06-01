import { useMemo } from "react";
import { STORAGE_KEYS } from "../data/focusRoomData";
import { useLocalStorage } from "./useLocalStorage";

const defaultSession = {
  isActive: false,
  isRunning: false,
  isCompleted: false,
  completionSettled: false,
  startedAt: null,
  expectedEndAt: null,
  durationMinutes: null,
  plannedSeconds: 0,
  secondsLeft: null,
  goal: "",
  sceneId: null,
  completedAt: null,
  actualSeconds: 0
};

function clampSeconds(value, fallback = 0) {
  return Math.max(0, Math.round(Number.isFinite(value) ? value : fallback));
}

function getRemainingFromEnd(expectedEndAt) {
  if (!expectedEndAt) return null;
  return Math.max(0, Math.ceil((new Date(expectedEndAt).getTime() - Date.now()) / 1000));
}

export function useFocusSession() {
  const [session, setSession] = useLocalStorage(STORAGE_KEYS.session, defaultSession);
  const normalizedSession = useMemo(() => ({ ...defaultSession, ...session }), [session]);

  const getActualSeconds = (secondsLeft, fallbackDurationMinutes) => {
    const plannedSeconds = normalizedSession.plannedSeconds || (fallbackDurationMinutes || 50) * 60;
    const remaining = clampSeconds(secondsLeft, normalizedSession.secondsLeft ?? plannedSeconds);
    return Math.min(plannedSeconds, Math.max(0, plannedSeconds - remaining));
  };

  const getRestoreState = () => {
    const current = { ...defaultSession, ...session };
    if (!current.isActive && !current.isCompleted) return null;

    if (current.isCompleted) {
      return { status: "completed", session: current, secondsLeft: 0 };
    }

    if (!current.isRunning) {
      const secondsLeft = clampSeconds(current.secondsLeft, current.plannedSeconds);
      return { status: "paused", session: current, secondsLeft };
    }

    const secondsLeft = getRemainingFromEnd(current.expectedEndAt);
    if (secondsLeft && secondsLeft > 0) {
      return { status: "running", session: current, secondsLeft };
    }

    return { status: "expired", session: current, secondsLeft: 0 };
  };

  const startSession = ({ durationMinutes, goal, sceneId }) => {
    const plannedSeconds = (durationMinutes || 50) * 60;
    const now = new Date();
    setSession({
      ...defaultSession,
      isActive: true,
      isRunning: true,
      startedAt: now.toISOString(),
      expectedEndAt: new Date(now.getTime() + plannedSeconds * 1000).toISOString(),
      durationMinutes,
      plannedSeconds,
      secondsLeft: plannedSeconds,
      goal,
      sceneId
    });
  };

  const pauseSession = (secondsLeft) => {
    setSession((current) => {
      const next = { ...defaultSession, ...current };
      if (!next.isActive) return next;
      return { ...next, isRunning: false, expectedEndAt: null, secondsLeft: clampSeconds(secondsLeft, next.secondsLeft ?? next.plannedSeconds) };
    });
  };

  const resumeSession = (secondsLeft) => {
    setSession((current) => {
      const next = { ...defaultSession, ...current };
      if (!next.isActive) return next;
      const remaining = clampSeconds(secondsLeft, next.secondsLeft ?? next.plannedSeconds);
      return { ...next, isRunning: true, secondsLeft: remaining, expectedEndAt: new Date(Date.now() + remaining * 1000).toISOString() };
    });
  };

  const updateSession = (updates) => {
    setSession((current) => {
      const next = { ...defaultSession, ...current };
      if (!next.isActive && !next.isCompleted) return next;
      return { ...next, ...updates };
    });
  };

  const completeSession = (actualSeconds) => {
    setSession((current) => {
      const next = { ...defaultSession, ...current };
      const safeActual = clampSeconds(actualSeconds, next.plannedSeconds);
      return {
        ...next,
        isActive: false,
        isRunning: false,
        isCompleted: true,
        completionSettled: true,
        expectedEndAt: null,
        secondsLeft: 0,
        actualSeconds: safeActual,
        completedAt: new Date().toISOString()
      };
    });
  };

  const clearSession = () => setSession(defaultSession);

  return {
    session: normalizedSession,
    getActualSeconds,
    getRestoreState,
    startSession,
    pauseSession,
    resumeSession,
    updateSession,
    completeSession,
    clearSession
  };
}
