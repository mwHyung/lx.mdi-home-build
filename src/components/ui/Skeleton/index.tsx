import { FC, HTMLAttributes } from "react";
import { cn } from "@/utils/styles";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

const Skeleton: FC<SkeletonProps> = ({ className, ...props }) => {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
};

export default Skeleton;
