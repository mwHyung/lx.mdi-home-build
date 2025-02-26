"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import { getCookie } from "@/utils/shared";
import { useGlobalSetting } from "@/hooks";
import FullScreenLoading from "../FullScreenLoading";

interface Props {
  src: string;
  title: string;
}

const Iframe: FC<Props> = ({ src = "http://localhost:3000", title }) => {
  const { isLoggedIn } = useGlobalSetting();
  const [isLoading, setIsLoading] = useState(true);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleIframeLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const handleIframeReady = (e: MessageEvent) => {
      if (e.origin === src && e.data === "onLoadedAlert") {
        console.log("Iframe is ready...");
        iframeRef?.current?.contentWindow?.postMessage("onLoadedPortal", src);
      }
    };

    window.addEventListener("message", handleIframeReady);

    return () => window.removeEventListener("message", handleIframeReady);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      iframeRef?.current?.contentWindow?.postMessage("logout", src);
    }
  }, [isLoggedIn]);

  return (
    <div className="h-full relative">
      {isLoading && <FullScreenLoading showBackground={false} />}
      <iframe
        ref={iframeRef}
        src={src}
        onLoad={handleIframeLoad}
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title={title}
      ></iframe>
    </div>
  );
};

export default Iframe;
