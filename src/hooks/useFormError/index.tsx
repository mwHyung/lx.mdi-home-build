"use client";

import { useReducer } from "react";

const useFormError = <T extends object>(props?: T) => {
  const [formError, setFormError] = useReducer(
    (state: T, props: Partial<T>) => ({ ...state, ...props }),
    {
      ...(props as T),
    },
  );

  return [formError, setFormError] as const;
};

export default useFormError;
