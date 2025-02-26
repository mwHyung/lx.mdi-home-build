"use client";

import {
  ChangeEvent,
  FC,
  forwardRef,
  Fragment,
  HTMLAttributes,
  memo,
  MouseEvent,
  TdHTMLAttributes,
  ThHTMLAttributes,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { ChevronRight, Loader2 } from "lucide-react";
import { VariantProps } from "class-variance-authority";
import { alignVariants, cn } from "@/utils/styles";
import { Column, Sort, Row, ContextMenuItem } from "@/types/ui";
import { Skeleton, SortIcon, Input, ContextMenu } from "@/components/ui";
import useTable from "./useTable";
import { renderChildren } from "@/utils/shared";

import "./Table.scss";

const TableContainer = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <table
      ref={ref}
      className={cn("grid w-full caption-bottom text-sm grid-rows-[auto_1fr]", className)}
      {...props}
    />
  ),
);
TableContainer.displayName = "TableContainer";

const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("border-y text-[#474747] bg-[#ebeef1]", className)} {...props} />
  ),
);
TableHeader.displayName = "TableHeader";

const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tbody ref={ref} className={cn("", className)} {...props} />,
);
TableBody.displayName = "TableBody";

const TableFooter = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}
      {...props}
    />
  ),
);
TableFooter.displayName = "TableFooter";

const TableRow = memo(
  forwardRef<
    HTMLTableRowElement,
    HTMLAttributes<HTMLTableRowElement> & {
      selected?: boolean;
      disabled?: boolean;
      rowId?: Row["id"];
      onRowSelect?: (e: MouseEvent, id?: Row["id"]) => void;
    }
  >(({ className, selected, disabled, rowId, onRowSelect, ...props }, ref) => {
    const handleClick = (e: MouseEvent) => {
      if (disabled) return;
      onRowSelect?.(e, rowId);
    };

    return (
      <tr
        ref={ref}
        className={cn(
          "flex",
          {
            "bg-muted hover:!bg-muted": selected,
            "text-main-gray/70 hover:!bg-transparent": disabled,
          },
          className,
        )}
        onClick={handleClick}
        {...props}
      />
    );
  }),
);
TableRow.displayName = "TableRow";

const TableHead = forwardRef<
  HTMLTableCellElement,
  VariantProps<typeof alignVariants> &
    ThHTMLAttributes<HTMLTableCellElement> & {
      sorted?: boolean;
      currentKey?: string;
      sortParams?: Sort;
      dense?: boolean;
      showVerticalLine?: boolean;
      onSortChange?: (sortId: Sort["sortId"], sortBy: Sort["sortBy"]) => void;
    }
>(
  (
    {
      currentKey = "",
      className,
      style,
      children,
      sorted,
      align,
      sortParams: { sortBy, sortId } = {},
      dense,
      showVerticalLine,
      onSortChange,
      ...props
    },
    ref,
  ) => {
    const handleClickHead = () => {
      if (!sorted) return;

      if (sortId !== currentKey) {
        onSortChange?.(currentKey, "asc");
        return;
      }

      switch (sortBy) {
        case "asc":
          onSortChange?.(currentKey, "desc");
          return;
        case "desc":
          onSortChange?.(currentKey, "none");
          return;
        default:
          onSortChange?.(currentKey, "asc");
      }
    };

    return (
      <th
        ref={ref}
        className={cn(
          "group truncate relative h-8 px-4 flex items-center gap-2 text-xs text-left align-middle content-center font-medium [&:has([role=checkbox])]:pr-0",
          {
            "cursor-pointer": sorted,
            "first:border-l border-r": showVerticalLine,
          },
          alignVariants({ align }),
          className,
        )}
        align={align}
        style={style}
        onClick={handleClickHead}
        {...props}
      >
        {typeof children === "string" || typeof children === "number" ? (
          <span className="truncate">{children}</span>
        ) : (
          children
        )}
        {sorted && <SortIcon sortBy={sortBy} selected={sortId === currentKey} />}
      </th>
    );
  },
);
TableHead.displayName = "TableHead";

const TableResizeHandler = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "absolute right-0 top-1/2 w-1 h-full pl-1 flex justify-center -translate-y-1/2 select-none cursor-ew-resize z-50",
        className,
      )}
      {...props}
    >
      <div className="w-full h-full bg-transparent group-hover:bg-[#D8DDE2] transition-all duration-500 z-50" />
    </div>
  ),
);

interface TableCellProps
  extends Omit<TdHTMLAttributes<HTMLTableCellElement>, "align">,
    VariantProps<typeof alignVariants> {
  dense?: boolean;
  showVerticalLine?: boolean;
}

const TableCell = memo(
  forwardRef<
    HTMLTableCellElement,
    TdHTMLAttributes<HTMLTableCellElement> &
      VariantProps<typeof alignVariants> & {
        rowId?: Row["id"];
        cellOverflow?: "truncate" | "wrap";
        showVerticalLine?: boolean;
        displayType?: Column["displayType"];
        dense?: boolean;
        expanded?: boolean;
        expandable?: boolean;
        depth?: number;
        isEmpty?: boolean;
        showExpandableIcon?: boolean;
        onExpand?: (rowId?: Row["id"]) => void;
      }
  >(
    (
      {
        className,
        style,
        align,
        cellOverflow = "wrap",
        showVerticalLine,
        displayType,
        rowId,
        dense,
        expanded,
        expandable,
        depth,
        isEmpty,
        showExpandableIcon,
        onExpand,
        children,
        ...props
      },
      ref,
    ) => {
      const [isExpanded, setIsExpanded] = useState(expanded);

      const handleClickIcon = (e: MouseEvent) => {
        setIsExpanded(prev => !prev);
        onExpand?.(rowId);
        e.stopPropagation();
      };

      return (
        <td
          ref={ref}
          className={cn(
            "p-3",
            alignVariants({ align }),
            "items-start",
            {
              "py-2": dense,
              "first:border-l border-r": showVerticalLine,
              "p-0 items-center": displayType === "icon",
            },
            className,
          )}
          style={style}
          {...props}
        >
          {expandable && !isEmpty && (
            <div className={cn("h-full flex items-start shrink-0")}>
              {Array.from({ length: depth || 0 }).map((_, i) => (
                <div key={`empty-area-${i}`} className="w-4" />
              ))}
              <div
                className="w-6 h-[18px] shrink-0 cursor-pointer"
                onMouseDown={e => e.preventDefault()}
                onClick={handleClickIcon}
              >
                {showExpandableIcon && (
                  <ChevronRight
                    className={cn("w-full h-full", {
                      "rotate-90": isExpanded,
                      "w-3 mx-auto": dense,
                    })}
                  />
                )}
              </div>
            </div>
          )}
          {renderChildren(children, cellOverflow)}
        </td>
      );
    },
  ),
);
TableCell.displayName = "TableCell";

interface TableEditableCellProps extends TableCellProps {
  rowId: Row["id"];
  colId: Column["id"];
  value?: any;
  showVerticalLine?: boolean;
  render?: () => void;
  editor?: () => void;
  onEdit?: (rowId: Row["id"], colId: Column["id"], value: any) => void;
}

const TableEditableCell = memo(
  forwardRef<HTMLTableCellElement, TableEditableCellProps>(
    (
      {
        className,
        style,
        align,
        showVerticalLine,
        rowId,
        colId,
        dense,
        value,
        render,
        editor,
        onEdit,
        ...props
      },
      ref,
    ) => {
      const [editState, setEditState] = useState({
        isEditing: false,
        rowId,
        colId,
        value,
      });
      const inputRef = useRef<HTMLInputElement | null>(null);

      const handleDoubleClick = () => {
        setEditState(prev => ({ ...prev, isEditing: true }));
      };

      const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEditState(prev => ({ ...prev, value }));
      };

      const resetEditState = () => {
        onEdit?.(rowId, colId, editState.value);
        setEditState({
          isEditing: false,
          rowId,
          colId,
          value,
        });
      };

      useEffect(() => {
        if (editState.isEditing && inputRef.current) {
          inputRef.current.focus();
        }

        if (editState.isEditing) {
          setEditState(prev => ({ ...prev, value }));
        }
      }, [editState.isEditing, value]);

      const renderChildren = () => {
        if (editState.isEditing) {
          return editor ? (
            editor()
          ) : (
            <Input
              className="w-full h-full px-2 py-1 border border-gray-300 rounded"
              ref={inputRef}
              value={editState.value}
              onChange={handleChangeValue}
              onEnter={resetEditState}
            />
          );
        }

        return render ? render() : value;
      };

      return (
        <td
          ref={ref}
          className={cn(
            "p-4 align-middle truncate",
            alignVariants({ align }),
            {
              "py-3": dense,
              "py-0": editState.isEditing,
              "first:border-l border-r": showVerticalLine,
            },
            className,
          )}
          style={style}
          onBlur={editState.isEditing ? resetEditState : undefined}
          onDoubleClick={() => {
            handleDoubleClick();
          }}
          {...props}
        >
          {renderChildren()}
        </td>
      );
    },
  ),
);

const TableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn("mt-4 text-sm text-main-gray", className)} {...props} />
  ),
);
TableCaption.displayName = "TableCaption";

export interface TableProps<T> {
  id?: string;
  columns: Column[];
  rows: T[];
  caption?: string;
  colgroup?: string[];
  /**
   * 테이블을 감싸고 있는 컨테이너의 클래스
   */
  containerClassName?: string;
  /**
   * 데이터가 없을 때 표시할 메시지
   * @default: "데이터가 없습니다."
   */
  emptyMessage?: string;
  /**
   * 로딩 상태. 로딩 중엔 테이블을 Skeleton으로 대체
   * @default false
   */
  isLoading?: boolean;
  /**
   * 테이블의 높이를 고정할지 여부
   * @default true
   */
  fixedHeight?: boolean;
  /**
   * 테이블의 첫 번째 컬럼에 체크박스를 표시할지 여부
   * @default false
   */
  showCheckbox?: boolean;
  /**
   * 테이블의 세로 라인을 표시할지 여부
   * @default false
   */
  showVerticalLine?: boolean;
  /**
   * 데이터 정렬 파라미터
   */
  sortParams?: Sort;
  /**
   * 선택된 row의 id 목록
   */
  selectedRows?: Row["id"][];
  /**
   * 펼쳐진 row의 id 목록
   */
  expandedRows?: Row["id"][];
  /**
   * 비활성화된 row의 id 목록
   */
  disabledRows?: Row["id"][];
  /**
   * 커스텀 컨텍스트 사용할 경우에 넘겨줄 컨텍스트 메뉴 목록
   */
  contextMenuItems?: ContextMenuItem[];
  /**
   * 로딩 중일 때 표시할 row의 개수
   * @default 5
   */
  loadingRowLength?: number;
  /**
   * 테이블의 밀도가 높은지 여부 -> true 설정시 테이블의 height 줄어듦
   * @default true
   */
  dense?: boolean;
  /**
   * 테이블의 error 상태
   * @default false
   */
  error?: boolean;
  /**
   * 테이블의 error 발생시 보여줄 메시지
   */
  errorMessage?: string;
  /**
   * 테이블의 최대 선택 가능한 row 개수
   */
  maxSelections?: number;
  /**
   * 컬럼의 정렬 상태가 변경됐을 때 호출되는 함수
   * @param sortId
   * @param sortBy
   */
  onSortChange?: (sortId: Sort["sortId"], sortBy: Sort["sortBy"]) => void;
  /**
   * row를 클릭했을 때 호출되는 함수
   * @param id 선택된 row의 id
   */
  onRowSelect?: (id: Row["id"]) => void;
  /**
   * 헤더의 전체 체크박스를 선택했을 때 호출되는 함수
   * @param ids 선택된 row id 목록
   */
  onAllSelect?: (ids: Row["id"][]) => void;
  /**
   * data cell을 수정할 때 호출되는 함수
   */
  onEdit?: (rowId: Row["id"], colId: Column["id"], value: any) => void;
  /**
   * expander icon 클릭했을 때 호출되는 함수로, 선택한 row id를 넘겨줌
   */
  onRowExpand?: (rowId: Row["id"]) => void;
  /**
   * row data에 id가 없을 경우 대신 id를 설정할 수 있는 함수
   * @param data
   * @returns string | number
   */
  getRowId?: (data: T) => Row["id"];
  /**
   * 테이블의 기본 컬럼 설정으로 기본값이 없을 때 적용됨
   * - width: 컬럼의 고정 너비(column의 개별 width 다음으로 적용)
   * - minWidth: 컬럼의 최소 너비(column의 개별 minWidth 다음으로 적용)
   * - maxWidth: 컬럼의 최대 너비(column의 개별 maxWidth 다음으로 적용)
   * - align: 컬럼의 정렬(column의 개별 dataAlign 다음으로 적용)
   * - editable: 컬럼의 수정(column의 개별 editable 다음으로 적용)
   */
  defaultColumn?: {
    width?: Column["width"];
    minWidth?: Column["minWidth"];
    maxWidth?: Column["maxWidth"];
    align?: Column["dataAlign"];
    editable?: boolean;
  };
}

const Table = <T extends Row>(props: TableProps<T>) => {
  const {
    id = `table-${useId()}`,
    rows,
    containerClassName,
    emptyMessage = "데이터가 없습니다.",
    caption = "",
    colgroup,
    isLoading = false,
    fixedHeight = true,
    showVerticalLine = true,
    expandedRows,
    disabledRows,
    sortParams,
    contextMenuItems,
    dense = true,
    error,
    errorMessage,
    onSortChange,
    onEdit,
    getRowId,
    defaultColumn = { editable: false },
  } = props;
  const table = useTable({ ...props, id });

  const renderTableCells = (
    row: T,
    rowIdx: number,
    options?: { isLoading?: boolean; isChildRow?: boolean; rowDepth?: number },
  ) => {
    const { isLoading, isChildRow, rowDepth } = options || {};

    return table.visibleColumns.map((column, columnIdx) => {
      const {
        id,
        dataAlign,
        dataClassName,
        editable,
        expandable,
        displayType,
        cellOverflow,
        render,
        editor,
      } = column;

      const isEditable = editable === false ? false : editable || defaultColumn.editable;
      const rowId = row.id ?? getRowId?.(row) ?? rowIdx;
      const cellKey = isChildRow
        ? `${id}-${rowIdx}-child-${columnIdx}`
        : `${id}-${rowIdx}-${columnIdx}`;
      const cellValue = row[id];
      const cellAlign = dataAlign || defaultColumn.align || "left";
      const cellStyle = table.getWidthStyles(table.colWidths[columnIdx]);

      if (isLoading) {
        return (
          <TableCell
            key={`loader-td-${cellKey}`}
            className={cn("px-3", dataClassName)}
            rowId={rowId}
            showVerticalLine={showVerticalLine}
            align={cellAlign}
            style={cellStyle}
            dense={dense}
          >
            <Skeleton className="w-full max-w-16 h-5" />
          </TableCell>
        );
      }

      if (isEditable) {
        return (
          <TableEditableCell
            key={cellKey}
            align={cellAlign}
            style={cellStyle}
            className={dataClassName}
            showVerticalLine={showVerticalLine}
            rowId={rowId}
            colId={id}
            dense={dense}
            value={cellValue}
            onEdit={onEdit}
            editor={editor ? () => editor(cellValue, row, rowId, id, rowIdx, rows) : undefined}
            render={render ? () => render(cellValue, row, rowId, id, rowIdx, rows) : undefined}
          />
        );
      }

      return (
        <TableCell
          key={cellKey}
          rowId={rowId}
          align={cellAlign}
          style={cellStyle}
          className={dataClassName}
          cellOverflow={cellOverflow}
          showVerticalLine={showVerticalLine}
          displayType={displayType}
          dense={dense}
          expandable={expandable}
          depth={rowDepth}
          expanded={expandedRows?.includes(rowId)}
          showExpandableIcon={row.children && row.children.length > 0}
          isEmpty={cellValue == null ? true : false}
          onExpand={table.onRowExpand}
        >
          {render ? render(cellValue, row, rowId, id, rowIdx, rows) : cellValue}
        </TableCell>
      );
    });
  };

  const renderTableRow = (row: T, rowIdx: number, rowDepth: number = 0) => {
    const rowId = row.id ?? getRowId?.(row) ?? rowIdx;
    const isExpaned = expandedRows?.includes(rowId);

    return (
      <>
        <ContextMenu list={contextMenuItems} className="min-w-32">
          <TableRow
            key={`${rowId}-${rowIdx}`}
            id={(rowId || "").toString()}
            className="transition-colors border-b hover:bg-[#F4ECE9]"
            rowId={rowId}
            selected={table.selectedRows.includes(rowId)}
            disabled={disabledRows?.includes(rowId)}
            onRowSelect={table.onRowSelect}
          >
            {renderTableCells(row, rowIdx, { rowDepth })}
          </TableRow>
        </ContextMenu>
        {isExpaned &&
          row.children &&
          row.children.length > 0 &&
          row.children.map((child, childIdx) => (
            <Fragment key={`${rowId}-${rowIdx}-${child.id}-${childIdx}`}>
              {renderTableRow(child as T, childIdx, rowDepth + 1)}
            </Fragment>
          ))}
      </>
    );
  };

  /* table */
  return (
    <>
      <div
        className={cn(
          "w-full grow min-h-0 flex flex-col relative",
          {
            "after:contents-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:border after:border-error after:z-10 after:pointer-events-none":
              error,
          },
          containerClassName,
        )}
      >
        <div className={cn("grow w-full overflow-auto")} ref={table.containerRef}>
          <TableContainer ref={table.tableRef}>
            {caption && <TableCaption>{caption}</TableCaption>}
            {colgroup && (
              <colgroup>
                {colgroup.map((item, idx) => (
                  <col key={idx} width={item} />
                ))}
              </colgroup>
            )}
            <TableHeader
              className={cn({
                "sticky top-0 z-10": fixedHeight,
              })}
            >
              <TableRow className="">
                {table.visibleColumns.map(
                  (
                    { id, label, headerAlign = "center", sorted, headerClassName, resizable },
                    colIdx,
                  ) => (
                    <TableHead
                      key={`${id}-${colIdx}`}
                      currentKey={`${id}`}
                      sorted={sorted}
                      sortParams={sortParams}
                      onSortChange={onSortChange}
                      align={headerAlign || "center"}
                      style={table.getWidthStyles(table.colWidths[colIdx])}
                      showVerticalLine={showVerticalLine}
                      className={cn("group", headerClassName)}
                      dense={dense}
                    >
                      {label}
                      {resizable !== false && (
                        <TableResizeHandler
                          onMouseDown={e => table.onColumnResize(e, colIdx)}
                          onClick={e => e.stopPropagation()}
                        />
                      )}
                    </TableHead>
                  ),
                )}
              </TableRow>
            </TableHeader>

            {/* Body */}
            <TableBody>
              {/* empty rows */}
              {!rows.length && !isLoading && (
                <tr className="h-full flex items-center justify-center py-4">
                  <td colSpan={table.visibleColumns.length}>{emptyMessage}</td>
                </tr>
              )}

              {/* render rows */}
              {table.rows.map((row: T, rowIdx: number) => (
                <Fragment key={`${row.id ?? getRowId?.(row)}-${rowIdx}`}>
                  {renderTableRow(row, rowIdx)}
                </Fragment>
              ))}
            </TableBody>
          </TableContainer>
          {/* loading */}
          {isLoading && (
            <div className="absolute top-0 left-0 w-full h-full bg-main-gray/5 flex flex-col items-center justify-center z-10">
              <span className="w-8 h-8">
                <Loader2 width={"100%"} height={"100%"} className="animate-spin text-main-gray" />
              </span>
            </div>
          )}
        </div>
        {error && errorMessage && (
          <div className="absolute top-full left-0 text-error text-2xs leading-none mt-1">
            {errorMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default Table;
