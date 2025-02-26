"use client";

import { useGlobalSettingStore } from "@/store";

const useGlobalSetting = () => {
  const isLoading = useGlobalSettingStore(state => state.isLoading);
  const expiration = useGlobalSettingStore(state => state.expiration);
  const expandedNavIds = useGlobalSettingStore(state => state.expandedNavIds);
  const isSessionExpired = useGlobalSettingStore(state => state.isSessionExpired);
  const isLoggedIn = useGlobalSettingStore(state => state.isLoggedIn);
  const updateGlobalLoading = useGlobalSettingStore(state => state.setIsLoading);
  const setExpandedNavIds = useGlobalSettingStore(state => state.setExpandedNavIds);
  const setIsSessionExpired = useGlobalSettingStore(state => state.setIsSessionExpired);
  const setExpiration = useGlobalSettingStore(state => state.setExpiration);
  const setIsLoggedIn = useGlobalSettingStore(state => state.setIsLoggedIn);

  return {
    isLoading,
    expandedNavIds,
    isSessionExpired,
    expiration,
    isLoggedIn,
    updateGlobalLoading,
    setExpandedNavIds,
    setIsSessionExpired,
    setExpiration,
    setIsLoggedIn,
  };
};

export default useGlobalSetting;
