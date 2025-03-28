"use client";

import { useMemo, useState, useEffect, MouseEvent, useRef, useCallback } from "react";
import { Column, DropdownItem, Row } from "@/types/ui";
import { Checkbox } from "@/components/ui";
import { useSessionStorage } from "@/hooks";
import { TableProps } from ".";

interface Props<T> extends TableProps<T> {
  id: string;
}

export interface SyntheticColumn extends Column, Omit<DropdownItem, "id"> {
  visible?: boolean;
}

const ROW_CHECKBOX_ID = "rowCheckbox";
const DEFAULT_COLUMN = {
  WIDTH: 120,
  MIN_WIDTH: 100,
  MAX_WIDTH: 500,
  WIDTH_SPACE: 50,
  MINMAX_SPACE: 400,
};

const useTable = <T extends Row>({
  id,
  columns: inputColumns,
  rows: inputRows,
  showCheckbox,
  selectedRows: inputSelectedRows,
  expandedRows: inputExpandedRows,
  disabledRows: inputDisabledRows,
  defaultColumn,
  maxSelections,
  onRowSelect,
  onAllSelect,
  onRowExpand,
  getRowId,
}: Props<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const totalRowIds = useMemo(() => getAllRowIds(inputRows), [inputRows, getRowId]);
  const rows = useMemo(
    () => (showCheckbox ? updateAllRowCheckboxes(inputRows) : inputRows),
    [inputRows],
  );

  const [savedColWidths, setSavedColWidths] = useSessionStorage<number[]>(id, []);

  const [selectedRows, setSelectedRows] = useState<Row["id"][]>(inputSelectedRows || []);
  const [expandedRows, setExpandedRows] = useState<Row["id"][]>(inputExpandedRows || []);
  const [disalbedRows, setDisabledRows] = useState<Row["id"][]>(inputDisabledRows || []);
  const [visibleColumns, setVisibleColumns] = useState<Column[]>(getInitColumns(inputColumns));
  const [colWidths, setColWidths] = useState<number[]>(
    savedColWidths.length ? savedColWidths : visibleColumns.map(col => getPropertyWidth(col)),
  );

  const minWidths = useMemo(() => {
    return visibleColumns.map(column => {
      if (column.minWidth) {
        return column.minWidth;
      }

      if (column.width && column.width < DEFAULT_COLUMN.MIN_WIDTH) {
        return column.width;
      }

      if (column.maxWidth && column.maxWidth < DEFAULT_COLUMN.MIN_WIDTH) {
        return column.maxWidth;
      }

      return defaultColumn?.minWidth ?? DEFAULT_COLUMN.MIN_WIDTH;
    });
  }, [visibleColumns]);

  const maxWidths = useMemo(() => {
    return visibleColumns.map(column => {
      if (column.maxWidth) {
        return column.maxWidth;
      }

      if (column.width && column.width > DEFAULT_COLUMN.MAX_WIDTH) {
        return column.width + DEFAULT_COLUMN.MINMAX_SPACE;
      }

      if (column.minWidth) {
        return column.minWidth + DEFAULT_COLUMN.MINMAX_SPACE;
      }

      return defaultColumn?.maxWidth ?? DEFAULT_COLUMN.MAX_WIDTH;
    });
  }, [visibleColumns]);

  const onColumnResize = useCallback(
    (e: MouseEvent, idx: number) => {
      const x = e.clientX;
      const thElem = (e.target as HTMLElement).closest("th");
      const currentWidth = thElem?.getBoundingClientRect().width || 0;
      const minWidth = minWidths[idx];
      const maxWidth = maxWidths[idx];

      const mouseMoveHandler = (e: globalThis.MouseEvent) => {
        const dx = e.clientX - x;
        const updatedWidth = Math.min(Math.max(currentWidth + dx, minWidth), maxWidth);

        if (updatedWidth <= minWidth || updatedWidth >= maxWidth) return;

        const newColWidths = colWidths.map((width, index) =>
          index === idx ? updatedWidth : width,
        );
        setColWidths(newColWidths);
        setSavedColWidths(newColWidths);
      };

      const mouseUpHandler = () => {
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
      };

      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    },
    [minWidths, maxWidths, colWidths],
  );

  const getWidthStyles = useCallback((width?: Column["width"]) => {
    return width ? { width: `${width}px` } : { flex: "1" };
  }, []);

  function getInitColumns(initColumns: Column[]) {
    const allColumns = [getCheckboxColumn(), ...initColumns];
    return allColumns.filter(column => column.hidden !== true);
  }

  function getCheckboxColumn() {
    return {
      id: ROW_CHECKBOX_ID,
      label: (
        <Checkbox
          id="table-checkbox"
          variant="defaultP"
          checked={getCheckedState()}
          onCheckedChange={handleChangeAllCheckbox}
        />
      ),
      hidden: !showCheckbox,
      resizable: false,
      width: 50,
      headerClassName: "px-0",
      displayType: "icon",
      dataAlign: "center",
      render: (rowId: any) => {
        return (
          <Checkbox
            id={rowId}
            checked={selectedRows?.includes(rowId)}
            disabled={disalbedRows?.includes(rowId)}
            variant="defaultP"
          />
        );
      },
    } as Column;
  }

  const calculateWidths = (containerWidth: number) => {
    if (savedColWidths.length) return;
    const columns = [] as any[];
    let leftCount = 0;
    let usedWidth = 0;
    visibleColumns.forEach(col => {
      const width = getPropertyWidth(col);
      if (!width) leftCount += 1;
      usedWidth += width;
      columns.push(width);
    });
    if (!leftCount) return;
    const leftWidth = (containerWidth! - usedWidth) / leftCount;
    const spaceWidth = leftWidth < 0 ? DEFAULT_COLUMN.WIDTH : leftWidth;
    const calculatedColumns = columns.map(col => col || spaceWidth);
    setColWidths(calculatedColumns);
  };

  function getPropertyWidth(props?: {
    width?: Column["width"];
    minWidth?: Column["minWidth"];
    maxWidth?: Column["maxWidth"];
  }) {
    const { width, minWidth } = props || {};
    if (width) {
      return width;
    }

    if (defaultColumn?.width) {
      return defaultColumn.width;
    }

    if (minWidth) {
      return minWidth + DEFAULT_COLUMN.WIDTH_SPACE;
    }

    if (defaultColumn?.minWidth) {
      return defaultColumn.minWidth;
    }

    return 0;
  }

  function handleRowSelect(e: MouseEvent, rowId?: Row["id"]) {
    if (rowId !== undefined) {
      onRowSelect?.(rowId);
      if (showCheckbox) {
        // 만약 maxSelection이 있고, 선택된 row가 maxSelection보다 크면 선택 불가. 그 외 선택 가능
        // 단, rowId가 이미 선택된 row에 포함되어 있으면 선택 해제
        if (!maxSelections || selectedRows.length < maxSelections || selectedRows.includes(rowId)) {
          const updatedRows = selectedRows.includes(rowId)
            ? selectedRows.filter(row => row !== rowId)
            : [...selectedRows, rowId];
          setSelectedRows(updatedRows);
        }
      }
    }
  }

  function handleRowExpand(rowId?: Row["id"]) {
    if (rowId !== undefined) {
      onRowExpand?.(rowId);
      setExpandedRows(prev =>
        prev.includes(rowId) ? prev.filter(row => row !== rowId) : [...prev, rowId],
      );
    }
  }

  function handleChangeAllCheckbox(checked: boolean) {
    const rowIds = totalRowIds.filter(rowId => !disalbedRows.includes(rowId));
    const newSelectedRows = checked
      ? Array.from(new Set([...selectedRows, ...rowIds]))
      : selectedRows.filter(row => !rowIds.includes(row));

    // 만약 maxSelection이 있고, newSelectedRows가 maxSelection보다 크면 최대 선택 가능 갯수까지만 선택
    if (maxSelections && newSelectedRows.length >= maxSelections) {
      const limitedRows = newSelectedRows.slice(0, maxSelections);
      setSelectedRows(limitedRows);
      onAllSelect?.(limitedRows);
      return;
    }
    setSelectedRows(newSelectedRows);
    onAllSelect?.(newSelectedRows);
  }

  function getCheckedState() {
    const currRowIds = totalRowIds.filter(rowId => !disalbedRows.includes(rowId));
    const currSelectedRowLength = selectedRows.filter(row => currRowIds.includes(row)).length;
    const currRowsLength = currRowIds.length;

    if (!currSelectedRowLength) return false;

    if (currSelectedRowLength === currRowsLength) {
      return true;
    }

    return "indeterminate";
  }

  function getRowIds(row: T): Row["id"][] {
    const rowId = row.id ?? getRowId?.(row);
    if (!row.children || !row.children.length) {
      return [rowId];
    }

    return row.children.reduce<Row["id"][]>(
      (prev, child) => {
        return prev.concat(getRowIds(child as T));
      },
      [rowId],
    );
  }

  function getAllRowIds(rows: Row[]): Row["id"][] {
    return rows.reduce<Row["id"][]>((acc, row) => {
      return acc.concat(getRowIds(row as T));
    }, []);
  }

  function updateRowCheckbox<T extends Row>(row: T, getRowId?: (data: T) => Row["id"]): T {
    const rowId = row.id ?? getRowId?.(row);
    if (!row.children || !row.children.length) {
      return { ...row, [ROW_CHECKBOX_ID]: rowId };
    }

    return {
      ...row,
      [ROW_CHECKBOX_ID]: rowId,
      children: row.children.map(child => updateRowCheckbox(child as T, getRowId)),
    };
  }

  function updateAllRowCheckboxes(rows: T[]): T[] {
    return rows.map(child => updateRowCheckbox(child, getRowId));
  }

  useEffect(() => {
    const containerWidth = containerRef.current?.getBoundingClientRect().width;
    if (containerWidth) {
      calculateWidths(containerWidth);
    }
  }, [containerRef.current]);

  useEffect(() => {
    setVisibleColumns(getInitColumns(inputColumns));
  }, [selectedRows.length, inputRows, inputColumns, disalbedRows.length]);

  useEffect(() => {
    if (inputSelectedRows) {
      setSelectedRows(inputSelectedRows);
    }
  }, [inputSelectedRows]);

  useEffect(() => {
    if (inputDisabledRows) {
      setDisabledRows(inputDisabledRows);
    }
  }, [inputDisabledRows]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [inputRows]);

  return {
    tableRef,
    containerRef,
    visibleColumns,
    colWidths,
    rows,
    selectedRows,
    expandedRows,
    onColumnResize,
    getWidthStyles,
    onRowSelect: handleRowSelect,
    onRowExpand: handleRowExpand,
  };
};

export default useTable;
