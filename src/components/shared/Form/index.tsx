import { FC, ReactNode } from "react";
import { cn } from "@/utils/styles";

interface FormWrapperProps {
  children?: ReactNode;
}

const FormWrapper: FC<FormWrapperProps> = ({ children }) => {
  return <div className="text-sm grid gap-3 px-6 py-6 overflow-auto">{children && children}</div>;
};

interface FormLineProps {
  children?: ReactNode;
  className?: string;
}

const FormLine: FC<FormLineProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "shrink-0 basis-10 grid grid-cols-[minmax(100px,160px)_1fr] items-center",
        className,
      )}
    >
      {children && children}
    </div>
  );
};

export { FormWrapper, FormLine };
