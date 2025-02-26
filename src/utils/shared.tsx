import { ReactNode } from "react";
import { cn } from "./styles";
import { format } from "date-fns";
import { Item, Row, Sort } from "@/types/ui";
import { Id } from "@/types/shared";

export const getRandomString = () => {
  return Math.random().toString(36).slice(2, 10);
};

export const getOriginValueByType = (
  value: string,
  originType:
    | "string"
    | "number"
    | "bigint"
    | "boolean"
    | "symbol"
    | "undefined"
    | "object"
    | "function",
) => {
  if (originType === "number") return Number(value);
  if (originType === "boolean") return Boolean(value);
  return value;
};

interface NumberOptions {
  /**
   * 빈 문자열을 허용할지 여부
   * @default true
   */
  enableEmpty?: boolean;
  /**
   * 최소값. 값 설정시 해당 값보다 작은 값은 유효하지 않음.
   * 만약 음수일 경우 enableNegative를 true로 설정해야만 적용됨
   * @default undefined
   */
  min?: number;
  /**
   * 최대값. 값 설정시 해당 값보다 큰 값은 유효하지 않음
   * 만약 음수일 경우 enableNegative를 true로 설정해야만 적용됨
   * @default undefined
   */
  max?: number;
}

export const getIsValidNumber = (_value: string, options?: NumberOptions) => {
  const { enableEmpty = true, min, max } = options || {};

  if (min !== undefined && max !== undefined && min > max) return false;
  if (_value === "" && enableEmpty) return true;
  if (min !== undefined && min > -1 && _value === "-") return false;
  if (_value === "-") return true;

  const value = Number(_value);
  if (isNaN(value)) return false;

  if (min !== undefined && value < min) return false;
  if (max !== undefined && value > max) return false;

  return true;
};

export const getIsValidHour = (
  _value: string,
  options: NumberOptions = {
    enableEmpty: true,
  },
) => {
  if (_value === "" && options.enableEmpty) return true;

  const value = Number(_value);
  if (isNaN(value)) return false;
  if (value < 0 || value > 23) return false;
  return true;
};

export const getIsValidMinute = (
  _value: string,
  options: NumberOptions = {
    enableEmpty: true,
  },
) => {
  if (_value === "" && options.enableEmpty) return true;

  const value = Number(_value);
  if (isNaN(value)) return false;
  if (value < 0 || value > 59) return false;
  return true;
};

export const getIsValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const convertObjToFormData = (data: Record<string, any>) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return formData;
};

export const convertObjToUrlencoded = (obj: Record<string, any>) => {
  const data = new URLSearchParams();
  for (const key in obj) {
    data.append(key, obj[key]);
  }
  return data.toString();
};

export const setCookie = (
  name: string,
  value: string,
  second: number = 0,
  options: { path?: string; secure?: boolean; sameSite?: "Strict" | "Lax" | "None" } = {},
) => {
  const localOptions = {
    // domain: process.env.NEXT_PUBLIC_DOMAIN || "",
    path: "/",
    secure: false,
    sameSite: "Lax",
  };

  const buildOptions = {
    // domain: process.env.NEXT_PUBLIC_DOMAIN || "",
    path: "/",
    secure: true,
    sameSite: "Lax", // 'None' => 'Lax'로 변경
  };

  const isLocal = process.env.NEXT_PUBLIC_NODE_ENV === "local";
  const defaultOptions = isLocal ? localOptions : buildOptions;

  // 쿠키 값 설정
  const cookieParts: string[] = [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
    ...Object.entries({ ...defaultOptions, ...options }) // 기본 옵션과 사용자 옵션 병합
      .filter(([_, v]) => v !== false && v !== "") // 유효한 값만 필터링
      .map(([k, v]) => {
        if (k === "secure" && v === true) {
          return "Secure"; // 문자열로 변환
        }
        return `${k}=${v}`; // 각 키-값 쌍을 문자열로 변환
      }), // 각 키-값 쌍을 문자열로 변환
  ];

  if (second) {
    cookieParts.splice(1, 0, `max-age=${second}`);
  }

  // 최종 쿠키 문자열
  const cookieString = cookieParts.join(";");

  document.cookie = cookieString;
};

export const getCookie = (name: string) => {
  let matches =
    typeof window !== "undefined"
      ? document.cookie.match(
          new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)",
          ),
        )
      : null;
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const deleteCookie = (name: string) => {
  setCookie(name, "", -1);
};

export const deleteAllCookies = () => {
  const cookies = typeof window !== "undefined" ? document.cookie.split(";") : [];

  cookies.forEach(cookie => {
    const cookieName = cookie.split("=")[0].trim();
    // const domain = process.env.NEXT_PUBLIC_DOMAIN || "";
    const domain = "";
    document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;${domain ? `domain=${domain};` : ""}`;
  });
};

export const setSessionStorage = (key: string, value: any) => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionStorage = (key: string) => {
  if (typeof window === "undefined") return;
  const serializedValue = sessionStorage.getItem(key) || "";
  return serializedValue ? JSON.parse(serializedValue) : null;
};

export const removeSessionStorage = (key: string) => {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(key);
};

export const clearSessionStorage = () => {
  if (typeof window === "undefined") return;
  sessionStorage.clear();
};

export const renderChildren = (children: ReactNode, className?: string) => {
  if (
    typeof children === "string" ||
    typeof children === "number" ||
    typeof children === "boolean"
  ) {
    return <span className={cn(className)}>{children}</span>;
  }

  return children;
};

export const getLocaleDate = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + 9);
  return newDate;
};

/**
 * date string을 KST Date 객체로 변환
 *
 * 서버에서 받아온 날짜 (ex.2024-10-06T15:00:00)
 * 뒤에 Z가 없기 때문에 일반 Date 객체 사용시 UTC 시간으로 변환됨.
 * 따라서 한국 시간으로 변환해야 함
 * @param date - UTC Date 객체
 * @param options - 날짜 형식 옵션 (선택 사항)
 * @param options.format - 반환할 날짜 문자열의 형식 (기본값: "yyyy-MM-dd HH:mm")
 * @returns KST Date 객체
 */
export const getFormattedString = (date: Date, options?: { format?: string }) => {
  const { format: defaultFormat = "yyyy-MM-dd HH:mm" } = options || {};
  return format(date, defaultFormat);
};

export const getKSTISOString = (date: Date) => {
  const localOffset = date.getTimezoneOffset(); // 현재 로컬의 분 단위 오프셋
  const kstDate = new Date(date.getTime() - localOffset * 60 * 1000);
  return kstDate.toISOString();
};

export const getValidParams = (params?: Record<string, any>) => {
  if (!params) return null;

  // total, 빈 문자열, null, 99, undefined 제거
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([key, value]) =>
        key !== "total" && value !== "" && value !== null && value !== 99 && value !== undefined,
    ),
  );

  return Object.keys(filteredParams).length ? filteredParams : null;
};

export const camelToSnake = (str: string) => {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
};

export const getSortingValue = ({ sortId, sortBy }: Sort) => {
  if (!sortId) return null;
  const camelValue = camelToSnake(sortId);
  if (sortBy === "none") return null;
  if (sortBy === "desc") return `-${camelValue}`;
  return camelValue;
};

export const getDateDiff = (startDate: Date, endDate: Date) => {
  let value = "";
  var seconds = Math.floor((+endDate - +startDate) / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);

  hours = hours - days * 24;
  minutes = minutes - days * 24 * 60 - hours * 60;
  seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

  if (days > 0) value += days + "일 ";
  if (hours > 0) value += hours + "시간 ";
  if (minutes > 0) value += minutes + "분 ";
  if (seconds > 0) value += seconds + "초 ";

  return value.trim();
};

export const renameParams = <T extends Record<string, any>>(
  obj: T,
  keyMap: Record<string, string>,
) => {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey: keyof T = keyMap[key] || key;
    acc[newKey] = obj[key];
    return acc;
  }, {} as T);
};

export const renameSortParams = (sortParams: Sort, keyMap: Record<string, string> = {}) => {
  if (!sortParams.sortId) return sortParams;
  const newSortId = keyMap[sortParams.sortId] || sortParams.sortId;
  return { ...sortParams, sortId: newSortId };
};

export const getFlattenTreeData = <T extends { children?: T[] }>(rows: T[]): T[] => {
  const flatArray = [] as T[];

  const traverse = (row: T) => {
    flatArray.push({ ...row });

    if (row.children && Array.isArray(row.children)) {
      row.children.forEach(child => traverse(child));
    }
  };

  rows.forEach(row => traverse(row));

  return flatArray;
};

export const getParentItemsByTreeData = <T extends { children?: T[] }>(rows: T[]): T[] => {
  return getFlattenTreeData(rows).filter(data => data.children && data.children.length);
};

export const getParentIdsByTreeData = <T extends { id?: Id; children?: T[] }>(
  rows: T[],
  targetId?: keyof T,
): any[] => {
  if (!targetId || rows.some(data => !data.id && !data[targetId])) {
    return [];
  }

  return getParentItemsByTreeData(rows).map(data => data[targetId] ?? data.id);
};

export const getAllItemOption = (items: Item[]) => {
  const allItem = { label: "전체", value: 99 };
  return [allItem, ...items];
};

export const renderComponent = (component: string | string[] | Record<string, any>) => {
  if (typeof component === "string") {
    return <div>{component}</div>;
  }

  if (Array.isArray(component)) {
    return component.map((str, key) => <div key={key}>{str}</div>);
  }

  return Object.entries(component).map(([key, value]) => (
    <div key={key} className="flex items-baseline">
      {key}: {renderComponent(value)}
      {/* {key}: {Array.isArray(value) ? value.join(", ") : value} */}
    </div>
  ));
};
