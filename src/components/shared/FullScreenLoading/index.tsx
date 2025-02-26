import { FC } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/styles";

interface Props {
  showBackground?: boolean;
  message?: string;
}

const FullScreenLoading: FC<Props> = ({ showBackground = true, message }) => {
  return (
    <div
      className={cn("absolute top-0 left-0 w-full h-full z-50 pointer-events-none", {
        "bg-white": !showBackground,
      })}
    >
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-black/30">
        <span className="w-14 h-14">
          <Loader2 width={"100%"} height={"100%"} className="animate-spin text-white" />
        </span>
        {message && <span>{message}</span>}
      </div>
    </div>
  );
};

export default FullScreenLoading;
