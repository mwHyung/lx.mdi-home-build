import { FC, useLayoutEffect, useState } from "react";
import { Button, Skeleton } from "@/components/ui";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageParams } from "@/types/shared";

interface Props extends PageParams {
  isLoading?: boolean;
  onChange?: (pageParams: Partial<PageParams>) => void;
}

const PAGE_RANGES = 5;

const PaginationControls: FC<Props> = ({ isLoading, page, total, perPage, onChange }) => {
  const lastPage = Math.ceil(total / perPage);
  const [pageRanges, setPageRanges] = useState<number[]>([]);

  const handleChangePage = (page: number) => {
    if (page < 1 || page > lastPage) return;
    onChange?.({ page });
  };

  useLayoutEffect(() => {
    if (lastPage <= PAGE_RANGES) {
      setPageRanges(Array.from({ length: lastPage }, (_, i) => i + 1));
      return;
    }

    if (1 + page <= 3) {
      setPageRanges(Array.from({ length: PAGE_RANGES }, (_, i) => i + 1));
      return;
    }

    if (lastPage - page <= 2) {
      setPageRanges(Array.from({ length: PAGE_RANGES }, (_, i) => lastPage - 4 + i));
      return;
    }

    setPageRanges([page - 2, page - 1, page, page + 1, page + 2]);
  }, [page, lastPage]);

  return isLoading ? (
    <div className="flex items-center gap-2">
      {Array.from({ length: 7 }, (_, i) => (
        <Skeleton key={i} className="w-8 h-8" />
      ))}
    </div>
  ) : (
    <div className="flex items-center gap-4">
      {/* <Button
        variant={"text"}
        disabled={page === 1}
        size="icon"
        onClick={() => handleChangePage(1)}
      >
        <ChevronsLeft className="w-4 h-4" />
      </Button> */}
      <Button
        variant={"text"}
        disabled={page === 1}
        size="icon-xs"
        onClick={() => handleChangePage(page - 1)}
        className="hover:bg-none mr-12"
      >
        <ChevronLeft className="w-8 h-8" />
      </Button>
      {pageRanges.map((range, idx) => (
        <Button
          key={range}
          variant={range === page ? "boldP" : "textP"}
          size="icon-xs"
          onClick={() => handleChangePage(range)}
          className={`gap-4 justify-between page_button text-[1.8rem] ${idx === pageRanges.length - 1 ? "after:content-none min-w-2" : "after:content-['/'] after:pointer-events-none"}`}
        >
          {range < 10 ? `0${range}` : range}
        </Button>
      ))}
      <Button
        variant={"text"}
        disabled={page === lastPage || total === 0}
        size="icon-xs"
        onClick={() => handleChangePage(page + 1)}
        className="hover:bg-none ml-12"
      >
        <ChevronRight className="w-8 h-8" />
      </Button>
      {/* <Button
        variant={"text"}
        disabled={page === lastPage || total === 0}
        size="icon"
        onClick={() => handleChangePage(lastPage)}
      >
        <ChevronsRight className="w-4 h-4" />
      </Button> */}
    </div>
  );
};

export default PaginationControls;
