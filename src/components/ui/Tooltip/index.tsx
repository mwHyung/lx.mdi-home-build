"use client";

import { ComponentPropsWithoutRef, ElementRef, FC, forwardRef, ReactNode } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/utils/styles";
import { cva, VariantProps } from "class-variance-authority";

const tooltipVariants = cva("text-xs z-50 overflow-hidden rounded-md px-3 py-2 shadow-md", {
  variants: {
    variant: {
      default: "border-tooltip bg-tooltip text-main-white",
      muted: "bg-muted border-muted text-main-black",
      error: "border-error bg-error-background text-error",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const arrowVariants = cva("", {
  variants: {
    variant: {
      default: "fill-tooltip",
      muted: "fill-muted",
      error: "fill-error-background",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContainer = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipArrow = TooltipPrimitive.Arrow;

interface TooltipContentProps
  extends ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipVariants> {}

const TooltipContent = forwardRef<ElementRef<typeof TooltipPrimitive.Content>, TooltipContentProps>(
  ({ className, sideOffset = 4, variant, ...props }, ref) => (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(tooltipVariants({ variant }), className)}
      {...props}
    />
  ),
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export interface TooltipProps extends Omit<TooltipContentProps, "content"> {
  content?: string | JSX.Element;
  children?: ReactNode;
  hasArrow?: boolean;
}

const Tooltip: FC<TooltipProps> = ({ content, variant, children, hasArrow = true, ...props }) => {
  return (
    <TooltipProvider delayDuration={200}>
      <TooltipContainer>
        <TooltipTrigger asChild>{children && children}</TooltipTrigger>
        {content && (
          <TooltipContent variant={variant} {...props}>
            {hasArrow && <TooltipArrow className={cn(arrowVariants({ variant }))} />}
            {typeof content === "string" ? <p>{content}</p> : content}
          </TooltipContent>
        )}
      </TooltipContainer>
    </TooltipProvider>
  );
};

export default Tooltip;
