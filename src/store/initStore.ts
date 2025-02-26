import { PageParams } from "@/types/shared";

export const initPageParams: PageParams = {
  total: 0,
  page: 1,
  perPage: 20,
};

export const initDataProps = {
  rows: [],
  selectedRow: null,
  pageParams: { ...initPageParams },
};
