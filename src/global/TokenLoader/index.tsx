"use client";

import { useAuth, useGlobalSetting } from "@/hooks";
import { useEffect, useState } from "react";

/**
 * 토큰 만료시 자동으로 토큰 재발행
 */
const TokenLoader = () => {
  const {
    expiration: { accessToken: atkExpiration, refreshToken: rtkExpiration },
    setIsSessionExpired,
  } = useGlobalSetting();
  const { onRefreshToken, logout } = useAuth();
  const [atkTimerId, setAtkTimerId] = useState<NodeJS.Timeout | null>(null);
  const [rtkTimerId, setRtkTimerId] = useState<NodeJS.Timeout | null>(null);

  const setTimer = (callback: () => void, expiration: number) => {
    const left = expiration - Date.now();
    const timer = setTimeout(() => {
      callback();
    }, left);
    return timer;
  };

  const showSessionExpired = () => {
    setIsSessionExpired(true);
  };

  useEffect(() => {
    if (atkExpiration && !isNaN(Number(atkExpiration))) {
      if (atkTimerId) {
        clearTimeout(atkTimerId);
      }
      const timer = setTimer(() => {
        onRefreshToken();
      }, Number(atkExpiration));
      setAtkTimerId(timer);
    }
  }, [atkExpiration]);

  useEffect(() => {
    if (rtkExpiration && !isNaN(Number(rtkExpiration))) {
      if (rtkTimerId) {
        clearTimeout(rtkTimerId);
      }
      const timer = setTimer(() => {
        logout({ onSuccess: showSessionExpired });
      }, Number(rtkExpiration));
      setRtkTimerId(timer);
    }
  }, [rtkExpiration]);

  useEffect(() => {
    return () => {
      atkTimerId && clearTimeout(atkTimerId);
      rtkTimerId && clearTimeout(rtkTimerId);
    };
  }, []);

  return null;
};

export default TokenLoader;
