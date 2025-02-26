"use client";

import { useState, FC, ReactNode, useEffect } from "react";
import { cn, positionVariant } from "@/utils/styles";
import { Position, Toast as ToastProps } from "@/types/ui";

interface WrapperProps {
  position: Position;
  children: ReactNode;
}

const ToastWrapper: FC<WrapperProps> = ({ position, children }) => {
  return <div className={cn("grid gap-2 text-xs", positionVariant({ position }))}>{children}</div>;
};

interface Props extends ToastProps {
  className?: string;
  onClose?: () => void;
}

const Toast: FC<Props> = ({ duration = 3000, className, message, onClose }) => {
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setRemoving(true);
    }, duration - 200);

    return () => {
      clearTimeout(animationTimer);
    };
  }, []);

  return (
    <div
      className={cn(
        "md:min-w-[320px] relative flex items-center justify-between rounded-md bg-primary/90 text-white p-3 shadow-lg",
        {
          "animate-toast-in": !removing,
          "animate-toast-out": removing,
        },
        className,
      )}
    >
      {message}
    </div>
  );
};

export { ToastWrapper, Toast };
