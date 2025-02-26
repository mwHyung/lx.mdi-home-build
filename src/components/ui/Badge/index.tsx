import {} from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/styles";

export const badgeVariants = cva("inline-block text-center rounded-full transition-colors", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      primary: "bg-primary text-primary-foreground",
      outline: "border text-foreground",
      muted: "bg-muted",
      info: "bg-info text-info-foreground",
      success: "bg-success text-success-foreground",
      error: "bg-error text-error-foreground",

      lightSuccess: "bg-success-light text-snow-white",
      lightError: "bg-error-light text-snow-white",

      critical: "bg-severity-critical text-snow-white",
      warning: "bg-severity-warning text-snow-white",
      normal: "bg-severity-normal text-snow-white",
      low: "bg-severity-low",
      notice: "bg-muted",
      notClassified: "border",
    },
    size: {
      sm: "text-xs px-2 py-0.3",
      md: "text-sm px-2.5 py-0.5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export default Badge;
