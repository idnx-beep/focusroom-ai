import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      const parsed = stored ? JSON.parse(stored) : initialValue;
      const canMerge =
        parsed &&
        initialValue &&
        typeof parsed === "object" &&
        typeof initialValue === "object" &&
        !Array.isArray(parsed) &&
        !Array.isArray(initialValue);
      return canMerge ? { ...initialValue, ...parsed } : parsed;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // localStorage can be unavailable in private or restricted contexts.
    }
  }, [key, value]);

  return [value, setValue];
}
