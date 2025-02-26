import { FC } from "react";
import { Skeleton } from "@/components/ui";
import { cn } from "@/utils/styles";

interface Props {
  direction?: "flex" | "flex-col";
}

const SkeletonNav: FC<Props> = ({ direction = "flex" }) => {
  const styles = direction === "flex" ? "w-20 h-6" : "w-full h-7";

  return (
    <div
      className={cn("flex", {
        "gap-4": direction === "flex",
        "flex-col gap-4 p-2": direction === "flex-col",
      })}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className={styles} />
      ))}
    </div>
  );
};

export default SkeletonNav;
