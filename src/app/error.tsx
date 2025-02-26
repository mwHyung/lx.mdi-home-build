"use client";

import { Button } from "@/components/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-2">
      <div>예상치 못한 오류가 발생했습니다.</div>
      <div>네트워크 연결을 확인해주세요.</div>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
