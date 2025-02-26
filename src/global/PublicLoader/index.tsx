"use client";

import { useEffect } from "react";
import { useAuth, usePublic } from "@/hooks";

/**
 * 전역 정보(프로그램메뉴, 시스템, 코드 ...)를 불러오는 전역 컴포넌트
 */
const PublicLoader = () => {
  const { userInfo, onLoadUserInfo } = useAuth();
  const { loadCodes, loadSystems, loadProgramMenus } = usePublic();

  useEffect(() => {
    onLoadUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo) {
      loadProgramMenus();
      loadSystems();
      loadCodes();
    }
  }, [userInfo]);

  return null;
};

export default PublicLoader;
