"use client";

import { useState } from "react";

type SetValue<T> = (value: T) => void;
type ReturnType<T> = [T, SetValue<T>];

const useSessionStorage = <T>(key: string, initialValue: T): ReturnType<T> => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window !== "undefined") {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    }
    return initialValue;
  });

  const setValue: SetValue<T> = (value: T) => {
    setStoredValue(value);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    }
  };

  return [storedValue, setValue];
};

export default useSessionStorage;
