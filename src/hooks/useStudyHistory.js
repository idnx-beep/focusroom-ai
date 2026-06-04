import { STORAGE_KEYS } from "../data/focusRoomData";
import { useLocalStorage } from "./useLocalStorage";

const MAX_HISTORY = 50;

function getLocalDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}

function makeId() {
  return String(Date.now()) + "-" + Math.random().toString(16).slice(2, 8);
}

function normalizeRecord(record) {
  return {
    id: record.id || makeId(),
    date: record.date || getLocalDate(),
    goal: record.goal || "未设置目标",
    sceneName: record.sceneName || record.sceneTitle || "未知场景",
    durationSeconds: Math.max(0, Math.round(Number(record.durationSeconds ?? record.actualSeconds) || 0)),
    isCompletedRound: Boolean(record.isCompletedRound ?? record.completed),
    reviewDone: Boolean(record.reviewDone),
    completedWork: record.completedWork || record.reflection?.completed || "",
    problems: record.problems || record.reflection?.blocker || "",
    nextPlan: record.nextPlan || record.reflection?.next || "",
    createdAt: record.createdAt || new Date().toISOString()
  };
}

export function useStudyHistory() {
  const [history, setHistory] = useLocalStorage(STORAGE_KEYS.history, []);
  const records = Array.isArray(history) ? history.map(normalizeRecord) : [];

  const addRecord = ({ goal, sceneName, durationSeconds, isCompletedRound }) => {
    const now = new Date();
    const record = {
      id: makeId(),
      date: getLocalDate(now),
      goal: goal || "未设置目标",
      sceneName: sceneName || "未知场景",
      durationSeconds: Math.max(0, Math.round(Number(durationSeconds) || 0)),
      isCompletedRound: Boolean(isCompletedRound),
      reviewDone: false,
      completedWork: "",
      problems: "",
      nextPlan: "",
      createdAt: now.toISOString()
    };

    setHistory((current) => [record, ...(Array.isArray(current) ? current.map(normalizeRecord) : [])].slice(0, MAX_HISTORY));
    return record;
  };

  const updateReview = (recordId, review) => {
    const currentRecord = records.find((record) => record.id === recordId);
    if (!currentRecord) return null;

    const updatedRecord = {
      ...currentRecord,
      completedWork: (review.completedWork || "").trim(),
      problems: (review.problems || "").trim(),
      nextPlan: (review.nextPlan || "").trim(),
      reviewDone: true
    };

    setHistory((current) => {
      const list = Array.isArray(current) ? current.map(normalizeRecord) : [];
      return list.map((record) => (record.id === recordId ? updatedRecord : record));
    });

    return updatedRecord;
  };

  const skipReview = (recordId) => {
    const currentRecord = records.find((record) => record.id === recordId);
    if (!currentRecord) return null;
    setHistory((current) => {
      const list = Array.isArray(current) ? current.map(normalizeRecord) : [];
      return list.map((record) => (record.id === recordId ? { ...record, reviewDone: false } : record));
    });
    return currentRecord;
  };

  return {
    records,
    recentRecords: records.slice(0, 5),
    latestRecord: records[0] || null,
    addRecord,
    updateReview,
    skipReview
  };
}
