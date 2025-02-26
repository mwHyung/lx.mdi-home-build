"use client";

import { useToastStore } from "@/store";

const useToast = () => {
  const toasts = useToastStore(state => state.toasts);
  const addToast = useToastStore(state => state.addToast);
  const dismissToast = useToastStore(state => state.dismissToast);

  return {
    toasts,
    addToast,
    dismissToast,
  };
};

export default useToast;
