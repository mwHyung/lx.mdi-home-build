"use client";

import Image from "next/image";

import { CSSProperties, useMemo, useState } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { Id } from "@/types/shared";
import { TreeViewItem } from "@/types/ui";
import { cn } from "@/utils/styles";
import { ICONS } from "@/utils/constants-icons";

const styleVariants = cva("transition-colors", {
  variants: {
    theme: {
      default:
        "text-main-black hover:text-main-gray data-[selected]:bg-muted data-[selected]:text-main-black",
      navy: "text-snow-white hover:text-[#bcbcbc] data-[selected]:bg-info data-[selected]:hover:text-snow-white",
      gray: "text-main-gray hover:text-main-black data-[selected]:bg-muted data-[selected]:text-main-black",
      pub: "text-main-white border-b border-b-pub-dark !rounded-none hover:bg-gradient-to-r hover:from-red hover:to-black data-[selected]:bg-gradient-to-r data-[selected]:from-red data-[selected]:to-black",
    },
    size: {
      sm: "text-sm",
      md: "text-sm",
      lg: "py-2 text-sm",
    },
    type: {
      default: "border-b",
      link: "rounded-lg",
    },
  },
  defaultVariants: {
    theme: "default",
    size: "sm",
    type: "default",
  },
});

interface CommonProps<T> extends VariantProps<typeof styleVariants> {
  depth?: number;
  /**
   * 펼쳐진 아이템의 id 목록
   */
  expandedIds?: Id[];
  /**
   * 선택된 아이템의 id 목록
   */
  selectedIds?: Id[];
  /**
   * 밑줄 표시 여부
   */
  showUnderline?: boolean;
  /**
   * 펼침/닫힘 아이콘 클릭했을 때 호출되는 함수
   * @param id 선택된 아이템의 id
   */
  onChangeExpand?: (id: Id) => void;
  /**
   * 트리 아이템 클릭했을 때 호출되는 함수
   * @param id 선택된 아이템의 id
   * @param item 선택된 아이템
   */
  onChangeSelect?: (id: Id, item: T) => void;
  /**
   * list item의 id를 설정할 수 있는 함수로 list item의 id보다 우선순위가 높음
   * @param data
   * @returns id (string | number)
   */
  getRowId?: (item: T) => Id;
  /**
   * list item의 label을 설정할 수 있는 함수로 list item의 label보다 우선순위가 높음
   * @param data
   * @returns label (string)
   */
  getLabel?: (item: T) => string;
}

interface TreeViewProps<T> extends CommonProps<T> {
  list: T[];
  className?: string;
  style?: CSSProperties;
}

const TreeView = <T extends TreeViewItem>({
  list,
  className,
  style,
  ...props
}: TreeViewProps<T>) => {
  return (
    <ul className={(cn("flex flex-col"), className)} style={style}>
      {list.map((item, index) => (
        <TreeItem key={index} item={item} {...props} className={className} />
      ))}
    </ul>
  );
};

interface TreeItemProps<T> extends CommonProps<T> {
  item: T;
  className?: string;
}

const TreeItem = <T extends TreeViewItem>({
  item,
  depth = 0,
  className,
  ...props
}: TreeItemProps<T>) => {
  const {
    expandedIds,
    selectedIds,
    size,
    theme,
    type,
    onChangeExpand,
    onChangeSelect,
    getRowId,
    getLabel,
  } = props;

  const currentId = getRowId?.(item) ?? item.id ?? "default-id";
  const [isExpanded, setIsExpanded] = useState(expandedIds?.includes(currentId) ? true : false);
  const hasChildren = useMemo(() => item.children && item.children.length > 0, [item.children]);

  const handleClickItem = () => {
    onChangeSelect?.(currentId, item);
    setIsExpanded(prev => !prev);
    onChangeExpand?.(currentId);
  };

  const handleClickIcon = () => {
    setIsExpanded(prev => !prev);
    onChangeExpand?.(currentId);
  };

  const svgArray = [
    {
      key: "Monitor1",
      src: ICONS.MONITOR1,
    },
    {
      key: "Monitor2",
      src: ICONS.MONITOR2,
    },
    {
      key: "Group1",
      src: ICONS.GROUP1,
    },
    {
      key: "Group2",
      src: ICONS.GROUP2,
    },
    {
      key: "Group3",
      src: ICONS.GROUP3,
    },
  ];

  return (
    <li className="cursor-pointer" aria-expanded={hasChildren ? isExpanded : undefined}>
      <div
        className={cn(styleVariants({ theme, size, type }))}
        data-selected={selectedIds?.includes(currentId) ? "selected" : undefined}
        onClick={handleClickItem}
      >
        <div className={cn("w-full relative flex items-center")}>
          <div
            className={cn("flex h-full shrink-0 cursor-pointer")}
            onMouseDown={e => e.preventDefault()}
            // onClick={handleClickIcon}
          >
            {hasChildren && (
              <>
                {svgArray.map((e, i) =>
                  i === depth ? <Image src={e.src} width={20} height={20} alt={e.key} /> : "",
                )}
              </>
            )}
            {/* {Array.from({ length: depth }).map((_, i) => (
              <div key={`empty-area-${i}`} className="w-3 h-full" />
            ))}
            <div className="w-4 h-full shrink-0 cursor-pointer">
              {hasChildren && (
                <ChevronRight
                  className={cn("w-full h-full mx-auto transition-all", {
                    "rotate-90": isExpanded,
                    "w-3 h-3": size === "sm",
                  })}
                />
              )}
            </div> */}
          </div>
          <div className="grow flex items-center gap-3 py-2 pl-2 pr-4 select-none">
            {getLabel?.(item) || item.label || "Please set Label"}
          </div>
        </div>
      </div>
      {hasChildren && (
        <TreeView<T>
          list={item.children as T[]}
          depth={depth + 1}
          className={cn("transition-all duration-300 overflow-hidden", {
            "min-h-0 max-h-screen": isExpanded,
            "max-h-0": !isExpanded,
          })}
          {...props}
        />
      )}
    </li>
  );
};

export default TreeView;
