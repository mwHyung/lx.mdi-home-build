import { FC } from "react";
import { ArrowUp } from "lucide-react";
import { Sort } from "@/types/ui";
import { cn } from "@/utils/styles";

interface Props extends Partial<Sort> {
  selected?: boolean;
}

const SortIcon: FC<Props> = ({ selected, sortBy }) => {
  return (
    <div className="cursor-pointer">
      <ArrowUp
        className={cn("w-4 h-4 opacity-0 transition-all group-hover:opacity-100 ", {
          "opacity-100 rotate-0": selected && sortBy === "asc",
          "opacity-100 rotate-180": selected && sortBy === "desc",
        })}
      />
    </div>
  );
};

export default SortIcon;
