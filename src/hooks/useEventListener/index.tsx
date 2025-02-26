"use client";

import { useEffect } from "react";

declare global {
  interface CustomEventMap {
    resetTab: CustomEvent;
  }

  interface WindowEventMap extends CustomEventMap {}
}

const useEventListener = <T extends keyof WindowEventMap>(
  eventName: T,
  handler: (event: WindowEventMap[T]) => void,
  options?: boolean | AddEventListenerOptions,
): void => {
  useEffect(() => {
    window.addEventListener(eventName, handler, options);

    return () => {
      window.removeEventListener(eventName, handler, options);
    };
  }, [eventName, handler, options]);
};

export default useEventListener;
