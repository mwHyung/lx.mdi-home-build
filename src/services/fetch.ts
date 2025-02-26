import { getCookie, getValidParams } from "@/utils/shared";
import { interceptor } from "@/hooks/useInterceptor";
import { HTTP_ERROR_TYPE } from "@/utils/constants";

declare global {
  interface Window {
    sessionStorage: Storage;
  }
}

export interface CustomResponse {
  status: string; // "failure" | "success"
  statusCode: number;
  message: string;
  details?: string;
  errors?: string | string[] | Record<string, any>; // api error
  error?: string; // keycloak error
}

export interface HttpError extends Error {
  type: keyof typeof HTTP_ERROR_TYPE;
  status: number;
  url?: string;
  data?: CustomResponse;
}

const mergeUrl = (url: string, params?: Record<string, any>) => {
  const validParams = getValidParams(params);

  if (!validParams) {
    return url;
  }

  const urlParams = new URLSearchParams(validParams);

  return `${url}?${urlParams.toString()}`;
};

const mergeHeaders = (headers?: Record<string, any>, baseUrl?: string) => {
  const baseHeader = {
    "Content-Type": "application/json",
  };

  let credentials = {};

  const accessToken = getCookie("accessToken");
  if (accessToken) {
    credentials = {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  return {
    ...baseHeader,
    ...credentials,
    ...headers,
  };
};

interface Props extends RequestInit {
  url?: string;
  baseUrl?: string;
  method?: string;
  headers?: Record<string, any>;
  params?: Record<string, any>;
  enableInterceptorRequest?: boolean;
}

export const fetcher = async ({
  url = "",
  baseUrl = process.env.NEXT_PUBLIC_API_URL,
  method = "GET",
  headers,
  params,
  enableInterceptorRequest = true,
  ...props
}: Props) => {
  if (enableInterceptorRequest && interceptor.onRequest) {
    const result = await interceptor.onRequest();

    // 인터셉터가 실패하면 에러를 발생시킴
    if (!result) {
      return Promise.reject({
        error: true,
        type: HTTP_ERROR_TYPE.INTERCEPTOR_ERROR,
        data: "Interceptor failed: Access token refresh failed or token is missing.",
        status: 401,
        requestUrl: url,
      });
    }
  }

  const mergedUrl = mergeUrl(baseUrl + url, params);
  const mergedHeaders = mergeHeaders(headers, baseUrl);

  try {
    const response = await fetch(mergedUrl, {
      method,
      headers: mergedHeaders,
      ...props,
    });

    if (!response.ok) {
      const result = await response.json().catch(() => {});

      return Promise.reject({ data: result, status: response.status, url: response.url });
    }

    // 204 No Content는 아무것도 리턴하지 않음
    return await response.json().catch(() => ({
      data: "success",
    }));
  } catch (e) {
    console.error(e);
    throw e;
  }
};
