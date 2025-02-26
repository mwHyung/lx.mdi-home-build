"use client";

import { useAlertStore } from "@/store";

const useAlert = () => {
  const addAlert = useAlertStore(state => state.addAlert);
  const dismissAlert = useAlertStore(state => state.dismissAlert);

  return {
    addAlert,
    dismissAlert,
  };
};

export default useAlert;
