"use client";

import { useCallback } from "react";
import { useAuthStore } from "@/store";
import { User } from "@/types/user";
import { clearSessionStorage, deleteAllCookies } from "@/utils/shared";

const useAuth = () => {
  const userInfo = useAuthStore(state => state.userInfo);
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const setAuthStore = useAuthStore(state => state.setAuthStore);

  const updateUserInfo = (userInfo: User | null) => {
    setAuthStore({ userInfo, isLoggedIn: true });
  };

  const updateIsLoggedIn = (value: boolean) => {
    setAuthStore({ isLoggedIn: value });
  };

  const clearUserInfo = () => {
    setAuthStore({ userInfo: null, isLoggedIn: false });
  };

  const setTokenData = (data: any) => {};

  const onRefreshToken = useCallback(
    async (options?: {
      onSuccess?: () => void;
      onFail?: () => void;
      isClearSession?: boolean;
      enaleInterceptor?: boolean;
    }) => {},
    [],
  );

  const onRequestInterceptor = useCallback(async () => {}, []);

  const onLoadUserInfo = async () => {};

  const logout = async (options?: { onSuccess?: () => void; onFinally?: () => void }) => {};

  const onResetSession = () => {
    clearUserInfo();
    deleteAllCookies();
    clearSessionStorage();
  };

  return {
    userInfo,
    isLoggedIn,
    updateIsLoggedIn,
    updateUserInfo,
    onLoadUserInfo,
    onRefreshToken,
    onResetSession,
    onRequestInterceptor,
    logout,
    setTokenData,
  };
};

export default useAuth;
