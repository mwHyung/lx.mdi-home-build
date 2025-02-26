import { Row } from "./ui";

export type Id = string | number;

export interface BaseId {
  id: Id;
}

export interface PageParams {
  total: number;
  perPage: number;
  page: number;
}

export interface PageParamsProps {
  pageParams: PageParams;
  setPageParams: (pageParams: Partial<PageParams>) => void;
}

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

export interface TreeRowProps {
  allRows: Row[];
  expandedRows: Row[];
}

export interface FetchOptions {
  isSearched?: boolean;
  isPaginated?: boolean;
  hasSelected?: boolean;
  isInitData?: boolean;
  pageParams?: Partial<PageParams>;
}
