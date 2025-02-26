import { FC } from "react";
import { AlertCircle, CircleCheck, Info, TriangleAlert } from "lucide-react";
import { Tooltip } from "@/components/ui";
import { TooltipProps } from "@/components/ui/Tooltip";
import { cn } from "@/utils/styles";
import { cva, VariantProps } from "class-variance-authority";

const tooltipVariants = cva("", {
  variants: {
    size: {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    },
    status: {
      info: "border-info text-info [&>svg]:text-info",
      success: "border-success text-success [&>svg]:text-success",
      warning: "border-warning text-warning [&>svg]:text-warning",
      error: "border-error text-error [&>svg]:text-error",
    },
  },
  defaultVariants: {
    size: "md",
    status: "info",
  },
});

interface Props extends TooltipProps, VariantProps<typeof tooltipVariants> {
  className?: string;
}

const TooltipIcon: FC<Props> = ({ className, size, status, ...props }) => {
  const getIcon = () => {
    switch (status) {
      case "success":
        return <CircleCheck width="100%" height="100%" />;
      case "warning":
        return <TriangleAlert width="100%" height="100%" />;
      case "error":
        return <AlertCircle width="100%" height="100%" />;
      case "info":
      default:
        return <Info width="100%" height="100%" />;
    }
  };

  return (
    <div className={cn(tooltipVariants({ size, status }), className)}>
      <Tooltip {...props}>{getIcon()}</Tooltip>
    </div>
  );
};

export default TooltipIcon;
