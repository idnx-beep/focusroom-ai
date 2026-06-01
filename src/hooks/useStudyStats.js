import { useMemo } from "react";
import { STORAGE_KEYS } from "../data/focusRoomData";
import { useLocalStorage } from "./useLocalStorage";

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}

const defaultStats = {
  todayKey: getLocalDateKey(),
  focusSeconds: 0,
  rounds: 0,
  partialSessions: 0,
  totalSeconds: 0,
  totalRounds: 0,
  totalPartialSessions: 0,
  lastSessionAt: null
};

export function useStudyStats() {
  const [stats, setStats] = useLocalStorage(STORAGE_KEYS.stats, defaultStats);
  const todayKey = getLocalDateKey();

  const normalizedStats = useMemo(() => {
    const merged = { ...defaultStats, ...stats };
    if (merged.todayKey === todayKey) return merged;
    return { ...merged, todayKey, focusSeconds: 0, rounds: 0, partialSessions: 0 };
  }, [stats, todayKey]);

  const recordSession = (seconds, options = {}) => {
    const safeSeconds = Math.max(0, Math.round(Number(seconds) || 0));
    if (safeSeconds <= 0) return;

    const completedRound = options.completedRound !== false;
    setStats((current) => {
      const merged = { ...defaultStats, ...current };
      const isToday = merged.todayKey === todayKey;
      const base = isToday ? merged : { ...merged, todayKey, focusSeconds: 0, rounds: 0, partialSessions: 0 };

      return {
        ...base,
        focusSeconds: base.focusSeconds + safeSeconds,
        rounds: base.rounds + (completedRound ? 1 : 0),
        partialSessions: base.partialSessions + (completedRound ? 0 : 1),
        totalSeconds: (base.totalSeconds || 0) + safeSeconds,
        totalRounds: (base.totalRounds || 0) + (completedRound ? 1 : 0),
        totalPartialSessions: (base.totalPartialSessions || 0) + (completedRound ? 0 : 1),
        lastSessionAt: new Date().toISOString()
      };
    });
  };

  return { stats: normalizedStats, recordSession };
}
