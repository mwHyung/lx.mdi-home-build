import { PageParams } from "@/types/shared";

export interface PageParamsProps {
  pageParams: PageParams;
  setPageParams: (pageParams: Partial<PageParams>) => void;
}

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

export interface SearchParamsProps {
  isSearching: boolean;
  searchParams: object | null;
  setSearchParams: (filter: object | null) => void;
  setIsSearching: (isSearching: boolean) => void;
}

export interface RatioProps {
  ratio: number[];
  setRatio: (ratio: number[]) => void;
}
