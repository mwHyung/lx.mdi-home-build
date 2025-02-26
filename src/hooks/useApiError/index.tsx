"use client";

import { Button } from "@/components/ui";
import { useAlert, useAuth } from "@/hooks";
import { CustomResponse, HttpError } from "@/services/fetch";
import { CUSTOM_ERROR_STATUS, HTTP_ERROR_TYPE } from "@/utils/constants";
import { renderComponent } from "@/utils/shared";
import { useRouter } from "next/navigation";

interface ErrorOptions {
  message?: string;
  onRetry?: () => void;
}

interface Props {}

const useApiError = () => {
  const router = useRouter();

  const { onRefreshToken } = useAuth();
  const { addAlert } = useAlert();

  const renderErrorMessage = (
    defaultMessage: string,
    errorMessage?: string,
    detailMessage?: CustomResponse["errors"],
  ) => {
    return (
      <>
        <span>{errorMessage ?? defaultMessage}</span>
        {detailMessage && renderComponent(detailMessage)}
      </>
    );
  };

  const handleUnauthroized = (error: HttpError) => {
    // 유효하지 않은 토큰
    if (error.data?.error === "invalid_grant") {
      onRefreshToken({ isClearSession: false });
      return;
    }

    // 권한 없음
    if (error.data?.error === "unauthorized_client") {
      return;
    }
  };

  const handle500Error = (error: HttpError) => {
    // ROLE_NOT_FOUND 권한 없음
    if (error.data?.details === CUSTOM_ERROR_STATUS.ROLE_NOT_FOUND) {
      return;
    }
  };

  const onHandleError = (error: HttpError, options?: ErrorOptions) => {
    // 인터셉터에서 발생한 에러는 처리하지 않음
    if (error.type === HTTP_ERROR_TYPE.INTERCEPTOR_ERROR) return;

    const retryAction = options?.onRetry ? (
      <Button variant={"ghost"} size={"auto"} onClick={options?.onRetry}>
        다시 시도
      </Button>
    ) : null;

    switch (error.status) {
      case 400:
        addAlert({
          status: "error",
          message: renderErrorMessage(
            "400: Bad Request",
            options?.message || error?.data?.message,
            error?.data?.errors,
          ),
          action: retryAction,
          duration: 5000,
        });
        return;
      case 401:
        addAlert({
          status: "error",
          message: renderErrorMessage(
            "401: Unauthorized",
            options?.message || error?.data?.message,
            error?.data?.errors,
          ),
          action: retryAction,
          duration: 5000,
        });
        handleUnauthroized(error);
        return "Unauthorized";
      case 403:
        console.error(error);
        addAlert({
          status: "error",
          message: renderErrorMessage(
            "403: Forbidden",
            options?.message || error?.data?.message,
            error?.data?.errors,
          ),
          action: retryAction,
          duration: 5000,
        });
        return "Forbidden";
      case 404:
        addAlert({
          status: "error",
          message: renderErrorMessage(
            "404: Not Found",
            options?.message || error?.data?.message,
            error?.data?.errors,
          ),
          action: retryAction,
          duration: 5000,
        });
        return "Not Found";
      case 500:
        addAlert({
          status: "error",
          message: renderErrorMessage(
            "Server Error",
            options?.message || error?.data?.message,
            error?.data?.errors,
          ),
          action: retryAction,
          duration: 5000,
        });
        handle500Error(error);
        return "Server Error";
      case 510:
        addAlert({
          status: "error",
          message: renderErrorMessage(
            "Custom Server Error",
            options?.message || error?.data?.message,
            error?.data?.errors,
          ),
          action: retryAction,
          duration: 5000,
        });
        handle500Error(error);
        return "Custom Server Error";
      default:
        addAlert({
          status: "error",
          message: options?.message || error?.data?.message || "Unknown Error",
          action: retryAction,
          duration: 5000,
        });
        return "Unknown Error";
    }
  };

  return { onHandleError, onRefreshToken };
};

export default useApiError;
