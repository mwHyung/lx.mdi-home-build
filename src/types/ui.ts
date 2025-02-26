import { alignVariants } from "@/utils/styles";
import { VariantProps } from "class-variance-authority";
import { ReactNode, MouseEventHandler } from "react";
import { Id } from "./shared";
import { SheetContentProps } from "@/components/shared/Sheet";

export interface Item {
  // id?: Id;
  label: string | JSX.Element;
  value: string | number | boolean;
}

export interface DropdownItem extends Item {
  type: "dropdownItem";
  icon?: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  children?: DropdownItem[];
}

export interface GroupLabel {
  type: "groupLabel";
  label: string;
}

export interface Separator {
  type: "separator";
}

export type DropdownItemType = DropdownItem | GroupLabel | Separator;
export type DropdownItems = DropdownItemType[];

/* Table */
export interface Column {
  id: string;
  label: string | JSX.Element;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  headerAlign?: VariantProps<typeof alignVariants>["align"];
  dataAlign?: VariantProps<typeof alignVariants>["align"];
  sorted?: boolean;
  hidden?: boolean;
  editable?: boolean;
  resizable?: boolean;
  expandable?: boolean;
  headerClassName?: string;
  dataClassName?: string;
  displayType?: "icon";
  cellOverflow?: "truncate" | "wrap";
  /**
   * 테이블 cell에 렌더링할 커스텀 컴포넌트
   * @param value cell value
   * @param rowData row data (object)
   * @param rowId 현재 row id
   * @param colId 현재 column id
   * @param rowIdx row index
   * @param tableDatas table 전체 data (array)
   */
  render?: (
    value: any,
    rowData: Row,
    rowId: Row["id"],
    colId: Column["id"],
    rowIdx: number,
    tableDatas: Row[],
  ) => JSX.Element;
  editor?: (
    value: any,
    rowData: Row,
    rowId: Row["id"],
    colId: Column["id"],
    rowIdx: number,
    tableDatas: Row[],
  ) => JSX.Element;
}

export interface Row {
  id?: Id;
  [key: string]: any;
  children?: Row[];
}

/* Sort */
export interface Sort {
  sortId: Column["id"] | null;
  sortBy: "asc" | "desc" | "none";
}

/* Tabs */
export interface Tab extends Item {
  content: ReactNode;
}

export interface DynamicTab {
  label: string;
  path: string;
  isActive?: boolean;
  disabledClose?: boolean;
}

/* Position: Style */
export type Position = "top-center" | "top-right" | "bottom-right";

/* Width: Style */
export type Width = "default" | "auto" | "fit";

/* TreeView */
export interface TreeViewItem {
  id?: Id;
  label?: string;
  path?: string;
  children?: TreeViewItem[];
}

/* Sheet */
export interface Sheet {
  title?: string | JSX.Element;
  description?: string;
  open?: boolean;
  side?: SheetContentProps["side"];
  className?: string;
  onClose?: () => void;
  children?: ReactNode;
  /**
   * esc, overlay click 으로 모달을 닫을 건지 설정
   */
  interactClose?: boolean;
}

/* Toast */
export interface Toast {
  message: string;
  duration?: number;
}

export interface ContextMenuItem extends Omit<Item, "value"> {
  action: () => void;
}

/* Validate */
export interface ValidationRule {
  value: any;
  message: string;
}

export interface Validator {
  type?: "number" | "email" | "password" | "url";
  required?: ValidationRule["message"];
  minLength?: ValidationRule;
  maxLength?: ValidationRule;
  length?: ValidationRule;
  pattern?: ValidationRule;
  custom?: {
    validator: (value: string) => boolean;
    message: ValidationRule["message"];
  };
}
