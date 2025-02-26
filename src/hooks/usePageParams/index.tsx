"use client";

import { PageParams } from "@/types/shared";
import { useReducer } from "react";

interface Props {
  initPageParams?: PageParams;
}

const initPageParams: PageParams = {
  total: 0,
  page: 1,
  perPage: 10,
};

const usePageParams = (props?: Props) => {
  const { initPageParams: inputPageParams } = props || {};

  const [pageParams, setPageParams] = useReducer(
    (state: PageParams, props: Partial<PageParams>) => ({ ...state, ...props }),
    inputPageParams || { ...initPageParams },
  );

  const updatePageParams = (pageParams: Partial<PageParams>) => {
    setPageParams({ ...pageParams });
  };

  return [pageParams, updatePageParams] as const;
};

export default usePageParams;
