"use client";

import { useAlertStore } from "@/store/";
import { Alert, Portal } from "@/components/ui";

const AlertContainer = () => {
  const alertQueue = useAlertStore(state => state.alertQueue);
  const dismissAlert = useAlertStore(state => state.dismissAlert);

  return (
    <Portal id="alert">
      {alertQueue.map(alert => (
        <Alert key={alert.id} position="top-center" onClose={dismissAlert} {...alert} />
      ))}
    </Portal>
  );
};

export default AlertContainer;
