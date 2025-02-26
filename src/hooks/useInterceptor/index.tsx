"use client";

import { useEffect } from "react";

interface Interceptor {
  configs: null | {};
  onRequest: (() => Promise<boolean>) | null;
  onError: ((response: Response) => void) | null;
  onSuccess: ((response: Response) => void) | null;
  set: (props: Partial<Interceptor>) => void;
}

export const interceptor: Interceptor = {
  configs: null,
  onRequest: null,
  onSuccess: null,
  onError: null,
  set({ configs, onRequest, onSuccess, onError }) {
    if (configs) this.configs = configs;
    if (onRequest) this.onRequest = onRequest;
    if (onSuccess) this.onSuccess = onSuccess;
    if (onError) this.onError = onError;
  },
};

const useInterceptor = ({ configs, onRequest, onSuccess, onError }: Partial<Interceptor>) => {
  useEffect(() => {
    interceptor.set({ configs, onRequest, onSuccess, onError });
  }, [configs, onRequest, onSuccess, onError]);
};

export default useInterceptor;
