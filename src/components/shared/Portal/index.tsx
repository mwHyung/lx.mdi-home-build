"use client";

import { ComponentPropsWithoutRef, ElementRef, FC, forwardRef, ReactNode } from "react";
import * as PortalPrimitives from "@radix-ui/react-toast";
import { cn } from "@/utils/styles";

const PortalProvider = PortalPrimitives.Provider;

const PortalViewport = forwardRef<
  ElementRef<typeof PortalPrimitives.Viewport>,
  ComponentPropsWithoutRef<typeof PortalPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <PortalPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className,
    )}
    {...props}
  />
));
PortalViewport.displayName = PortalPrimitives.Viewport.displayName;

interface Props {
  id: string;
  position?: "top-center" | "top-right" | "bottom-right";
  children?: ReactNode;
}

const Portal: FC<Props> = ({ id, position = "top-center", children }) => {
  return (
    <PortalProvider>
      <div
        role="region"
        id={`Notification-${id}`}
        aria-label={`Notification-${id}`}
        tabIndex={-1}
        className="pointer-events-none"
      >
        <div className={cn("fixed top-0 left-0 w-full h-screen z-[100]")}>
          {children && children}
        </div>
      </div>
    </PortalProvider>
  );
};

export default Portal;
