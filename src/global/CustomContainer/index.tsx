"use client";

import FullScreenLoading from "@/components/shared/FullScreenLoading";
import SessionExpired from "@/components/shared/SessionExpired";
import { useGlobalSetting } from "@/hooks";

const CustomContainer = () => {
  const { isLoading, isSessionExpired } = useGlobalSetting();

  if (isSessionExpired) {
    return <SessionExpired />;
  }

  if (isLoading) {
    return <FullScreenLoading />;
  }

  return null;
};

export default CustomContainer;
