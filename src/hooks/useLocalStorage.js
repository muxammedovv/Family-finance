import { useEffect, useState } from "react";

// Persists state to localStorage. `initialValue` may be a function (lazy init).
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) return JSON.parse(stored);
    } catch (err) {
      console.warn(`Failed to read localStorage key "${key}"`, err);
    }
    return typeof initialValue === "function" ? initialValue() : initialValue;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`Failed to write localStorage key "${key}"`, err);
    }
  }, [key, value]);

  return [value, setValue];
}
