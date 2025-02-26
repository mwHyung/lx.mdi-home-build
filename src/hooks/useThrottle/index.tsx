import { useEffect, useRef } from "react";

function useThrottle<T>(value: T, limit: number): T {
  const lastRan = useRef(Date.now());

  const throttledValue = useRef(value);

  useEffect(() => {
    const handler = setTimeout(
      function () {
        if (Date.now() - lastRan.current >= limit) {
          throttledValue.current = value;
          lastRan.current = Date.now();
        }
      },
      limit - (Date.now() - lastRan.current),
    );

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue.current;
}

export default useThrottle;
