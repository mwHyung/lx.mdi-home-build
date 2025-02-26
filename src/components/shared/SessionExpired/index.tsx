"use client";

import { cn } from "@/utils/styles";
import Button from "../../ui/Button";

const SessionExpired = () => {
  const goLoginPage = () => {
    window.location.href = process.env.NEXT_PUBLIC_LOGIN_URL || "";
  };

  return (
    <div className={cn("fixed top-0 left-0 w-full h-full z-[100] pointer-events-auto")}>
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-black/30">
        <div className="w-4/5 min-h-150px flex flex-col items-center justify-center gap-6 md:w-auto md:min-w-[360px] md:min-h-[180px] bg-main-white rounded-md shadow-md p-4">
          <span className="text-sm">세션이 만료되었습니다.</span>
          <Button size="sm" onClick={goLoginPage}>
            로그인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SessionExpired;
