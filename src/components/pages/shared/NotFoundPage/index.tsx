"use client";

import { Button } from "@/components/ui";
import { useTabStore } from "@/store";

const NotFoundPage = () => {
  const homeTab = useTabStore(state => state.homeTab);
  const openTab = useTabStore(state => state.openTab);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <h2 className="font-medium text-6xl mb-4">404</h2>
      <div>페이지를 찾을 수 없습니다.</div>
      <div className="text-main-gray">입력하신 주소가 정확한지 다시 한 번 확인해주세요.</div>
      <div className="flex gap-2">
        <Button onClick={() => openTab(homeTab)} size={"sm"}>
          메인 페이지
        </Button>
        {/* <Button onClick={goBack} size={"sm"}>
          이전 페이지
        </Button> */}
      </div>
    </div>
  );
};

export default NotFoundPage;
