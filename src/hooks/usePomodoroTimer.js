import { useEffect, useRef, useState } from "react";

const getDefaultSeconds = (duration) => (duration || 50) * 60;

export function usePomodoroTimer(duration) {
  const [secondsLeft, setSecondsLeft] = useState(getDefaultSeconds(duration));
  const [isRunning, setIsRunning] = useState(false);
  const [timerCompleted, setTimerCompleted] = useState(false);
  const [completionReason, setCompletionReason] = useState(null);
  const endsAtRef = useRef(null);
  const previousDurationRef = useRef(duration);

  useEffect(() => {
    if (!isRunning) {
      endsAtRef.current = null;
      return undefined;
    }

    setTimerCompleted(false);
    setCompletionReason(null);
    endsAtRef.current = Date.now() + Math.max(secondsLeft, 0) * 1000;

    const timer = window.setInterval(() => {
      const remaining = Math.max(0, Math.ceil((endsAtRef.current - Date.now()) / 1000));
      setSecondsLeft(remaining);

      if (remaining <= 0) {
        window.clearInterval(timer);
        endsAtRef.current = null;
        setIsRunning(false);
        setTimerCompleted(true);
        setCompletionReason("natural");
      }
    }, 250);

    return () => {
      window.clearInterval(timer);
      endsAtRef.current = null;
    };
  }, [isRunning]);

  useEffect(() => {
    if (previousDurationRef.current === duration) return;
    previousDurationRef.current = duration;
    if (!isRunning && !timerCompleted) setSecondsLeft(getDefaultSeconds(duration));
  }, [duration, isRunning, timerCompleted]);

  const start = (nextSeconds) => {
    setTimerCompleted(false);
    setCompletionReason(null);
    setSecondsLeft((current) => {
      if (Number.isFinite(nextSeconds)) return Math.max(0, nextSeconds);
      return current > 0 ? current : getDefaultSeconds(duration);
    });
    setIsRunning(true);
  };

  const pause = () => setIsRunning(false);

  const reset = (nextDuration = duration) => {
    setIsRunning(false);
    setTimerCompleted(false);
    setCompletionReason(null);
    setSecondsLeft(getDefaultSeconds(nextDuration));
  };

  const skip = () => {
    setIsRunning(false);
    setSecondsLeft(0);
    setTimerCompleted(true);
    setCompletionReason("skipped");
  };

  const restore = ({ restoredSecondsLeft, restoredIsRunning = false, restoredCompleted = false, restoredCompletionReason = null }) => {
    setIsRunning(false);
    setSecondsLeft(Math.max(0, Number(restoredSecondsLeft) || 0));
    setTimerCompleted(restoredCompleted);
    setCompletionReason(restoredCompletionReason);
    if (restoredIsRunning && !restoredCompleted) {
      window.setTimeout(() => setIsRunning(true), 0);
    }
  };

  const clearCompleted = () => {
    setTimerCompleted(false);
    setCompletionReason(null);
  };

  return {
    secondsLeft,
    setSecondsLeft,
    isRunning,
    setIsRunning,
    timerCompleted,
    completionReason,
    start,
    pause,
    reset,
    skip,
    restore,
    clearCompleted
  };
}
