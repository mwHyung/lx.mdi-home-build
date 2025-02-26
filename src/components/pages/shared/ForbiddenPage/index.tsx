"use client";

import { Button } from "@/components/ui";
import { useTabStore } from "@/store";

const ForbiddenPage = () => {
  const homeTab = useTabStore(state => state.homeTab);
  const openTab = useTabStore(state => state.openTab);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <h2 className="font-medium text-6xl mb-4">403</h2>
      <div className="flex flex-col items-center">
        <span>접근 권한이 없습니다.</span>
        <span>관리자에게 문의하세요.</span>
      </div>
      {/* <div className="flex gap-2">
        <Button onClick={() => openTab(homeTab)} size={"sm"}>
          메인 페이지
        </Button>
      </div> */}
    </div>
  );
};

export default ForbiddenPage;
