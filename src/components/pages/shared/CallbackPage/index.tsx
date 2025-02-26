"use client";

import FullScreenLoading from "@/components/shared/FullScreenLoading";
import { Suspense } from "react";

const Callback = () => {
  return <FullScreenLoading showBackground={false} />;
};

const CallbackPage = () => {
  return (
    <Suspense fallback={<FullScreenLoading showBackground={false} />}>
      <Callback />
    </Suspense>
  );
};

export default CallbackPage;
