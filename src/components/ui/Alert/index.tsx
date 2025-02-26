"use client";

import { FC, forwardRef, HTMLAttributes, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, positionVariant } from "@/utils/styles";
import { AlertCircle, CircleCheck, Info, TriangleAlert } from "lucide-react";
import { AlertProps } from "@/store/useAlertStore";
import { Position } from "@/types/ui";

const alertVariants = cva(
  "min-h-14 md:max-w-[600px] md:min-w-[420px] flex items-center gap-4 bg-background rounded-lg p-3 md:p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground pointer-events-auto animate-alert-in text-sm",
  {
    variants: {
      variant: {
        default: "text-foreground",
        info: "border-info bg-info-background text-info dark:border-info [&>svg]:text-info",
        success:
          "border-success bg-success-background text-success dark:border-success [&>svg]:text-success",
        warning:
          "border-warning bg-warning-background text-warning dark:border-warning [&>svg]:text-warning",
        error: "border-error bg-error-background text-error dark:border-error [&>svg]:text-error",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
);

const AlertContainer = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof alertVariants> &
    VariantProps<typeof positionVariant>
>(({ variant, position, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(positionVariant({ position }))}
    // {...props}
  >
    <div className={cn(alertVariants({ variant }))} {...props} />
  </div>
));
AlertContainer.displayName = "AlertContainer";

const AlertTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  ),
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("[&_p]:leading-relaxed", className)} {...props} />
  ),
);
AlertDescription.displayName = "AlertDescription";

interface Props extends AlertProps {
  position: Position;
  onClose?: () => void;
}

const Alert: FC<Props> = ({
  position,
  status = "info",
  duration = 3000,
  message,
  action,
  onClose,
}) => {
  const getIcon = () => {
    switch (status) {
      case "success":
        return <CircleCheck className="h-4 w-4" />;
      case "warning":
        return <TriangleAlert className="h-4 w-4" />;
      case "error":
        return <AlertCircle className="h-4 w-4" />;
      case "info":
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AlertContainer position={position} variant={status}>
      <div className="flex items-center gap-2 flex-1">
        <span>{getIcon()}</span>
        <AlertDescription>{message}</AlertDescription>
      </div>
      {action && <div onClick={onClose}>{action}</div>}
    </AlertContainer>
  );
};

export default Alert;
