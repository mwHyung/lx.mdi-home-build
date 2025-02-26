"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { SelectBox, Skeleton } from "@/components/ui";
import { Item } from "@/types/ui";
import { PageParams } from "@/types/shared";

interface Props {
  isLoading?: boolean;
  /**
   * @default [10, 30, 50]
   */
  range?: number[];
  perPage?: PageParams["perPage"];
  onChange?: (pageParams: Partial<PageParams>) => void;
}

const PerPageSelector: FC<Props> = ({
  isLoading,
  range = [10, 30, 50],
  perPage,
  onChange,
}) => {
  const [currPerPage, setCurrPerPage] = useState(perPage);
  const selectItems = useMemo(() => {
    const _perPage = perPage || range[0];
    const _range = range.includes(_perPage) ? range : [_perPage, ...range].sort((a, b) => a - b);
    return _range.map(item => ({ label: item.toString(), value: item }) as Item);
  }, [range]);

  const handleChangePerPage = (value: Item["value"]) => {
    setCurrPerPage(value as number);
    onChange?.({ perPage: value as number, page: 1 });
  };

  useEffect(() => {
    if (perPage !== undefined) {
      setCurrPerPage(perPage);
    }
  }, [perPage]);

  return (
    <div className="w-18">
      {isLoading ? (
        <Skeleton className="h-8" />
      ) : (
        <SelectBox
          className="h-8"
          list={selectItems}
          currentValue={currPerPage}
          onValueChange={handleChangePerPage}
        />
      )}
    </div>
  );
};

export default PerPageSelector;
