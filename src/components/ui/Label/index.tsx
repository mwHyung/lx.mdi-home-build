import { FC, LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/styles";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}

const Label: FC<Props> = ({ children, className, size = "md", ...props }) => {
  const labelSize = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <label
      className={cn(
        "leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        `${labelSize[size]}`,
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
