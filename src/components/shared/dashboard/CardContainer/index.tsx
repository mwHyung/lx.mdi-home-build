import { cn } from "@/utils/styles";
import { FC, ReactNode } from "react";

interface Props {
  title?: string;
  actions?: ReactNode;
  className?: string;
  children?: ReactNode;
}

const DashboardCardContainer: FC<Props> = ({ title, actions, className, children }) => {
  return (
    <div
      className={cn("relative flex flex-col gap-3 h-full bg-main-white rounded-md p-3", className)}
    >
      <div
        className={cn("flex items-center justify-between", {
          "absolute top-3 right-3": !title,
        })}
      >
        {title && <h3 className="text-xl">{title}</h3>}
        {actions && <div className={cn("flex items-center gap-2")}>{actions}</div>}
      </div>

      {children && children}
    </div>
  );
};

export default DashboardCardContainer;
