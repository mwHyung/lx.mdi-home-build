import { FC, useMemo } from "react";
import { PageParams } from "@/types/shared";
import Skeleton from "../Skeleton";

interface Props extends PageParams {
  isLoading?: boolean;
}

const PageCounter: FC<Props> = ({ isLoading, page, perPage, total }) => {
  const pageRange = useMemo(() => {
    const start = (page - 1) * perPage + 1;
    const end = page * perPage > total ? total : page * perPage;
    return total > 1 ? `${start}-${end}` : total === 1 ? "1" : "0";
  }, [page, perPage, total]);

  return isLoading ? (
    <Skeleton className="w-16 h-6" />
  ) : (
    <span className="text-main-gray text-xs">
      <strong className="text-black">{pageRange}</strong> / {total}
    </span>
  );
};

export default PageCounter;
