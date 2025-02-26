"use client";

import { useToastStore } from "@/store/";
import { Portal, Toast, ToastWrapper } from "@/components/ui/";

const ToastContainer = () => {
  const { toasts, dismissToast } = useToastStore();

  return (
    <Portal id="toast">
      <ToastWrapper position="top-right">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            duration={toast.duration}
            onClose={() => dismissToast(toast.id)}
          />
        ))}
      </ToastWrapper>
    </Portal>
  );
};

export default ToastContainer;
