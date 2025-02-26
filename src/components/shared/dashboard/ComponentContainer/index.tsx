import { cn } from "@/utils/styles";
import { FC, ReactNode } from "react";

interface Props {
  title: string;
  children?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

const ComponentContainer: FC<Props> = ({ title, actions, className, children }) => {
  return (
    <div className={cn("flex flex-col gap-2 h-full", className)}>
      <div className={cn("flex items-center justify-between")}>
        <h3 className="text-2xl font-bold">{title}</h3>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {children && children}
    </div>
  );
};

export default ComponentContainer;
