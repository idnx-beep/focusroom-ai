import { STORAGE_KEYS } from "../data/focusRoomData";
import { useLocalStorage } from "./useLocalStorage";

const MAX_REVIEWS = 30;

export function useSessionReviews() {
  const [reviews, setReviews] = useLocalStorage(STORAGE_KEYS.reviews, []);

  const addReview = ({ goal, sceneTitle, durationMinutes, actualSeconds, completed, reflection }) => {
    const cleaned = {
      completed: (reflection.completed || "").trim(),
      blocker: (reflection.blocker || "").trim(),
      next: (reflection.next || "").trim()
    };

    if (!cleaned.completed && !cleaned.blocker && !cleaned.next) return;

    setReviews((current) => [
      {
        id: String(Date.now()),
        createdAt: new Date().toISOString(),
        goal: goal || "未设置目标",
        sceneTitle,
        durationMinutes,
        actualSeconds,
        completed,
        reflection: cleaned
      },
      ...(Array.isArray(current) ? current : [])
    ].slice(0, MAX_REVIEWS));
  };

  return { reviews: Array.isArray(reviews) ? reviews : [], addReview };
}
