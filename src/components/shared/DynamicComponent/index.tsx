"use client";

import { FC, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { NotFoundPage } from "@/components/pages/shared";
import { LoadingBounce } from "@/components/ui";
import { useTabStore } from "@/store";

const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <div className="h-16 flex items-center justify-center bg-white rounded-md animate-pulse">
        <LoadingBounce />
      </div>
      <div className="grow flex items-center justify-center bg-white rounded-md animate-pulse">
        <LoadingBounce />
      </div>
      <div className="grow flex items-center justify-center bg-white rounded-md animate-pulse">
        <LoadingBounce />
      </div>
    </div>
  );
};

const loadComponent = (path: string) => {
  return dynamic(
    () =>
      import(`../../pages/${path}`).catch(err => {
        console.error(err);
        return () => <NotFoundPage />;
      }),
    { ssr: false, loading: () => <LoadingSkeleton /> },
  );
};

interface Props {
  path: string;
}

const DynamicComponent: FC<Props> = ({ path }) => {
  const { components, addComponent } = useTabStore();
  const cachedComponent = components[path];

  const Component = useMemo(() => {
    if (cachedComponent) {
      return cachedComponent;
    }
    const NewComponent = loadComponent(path);
    return NewComponent;
  }, [path, cachedComponent, addComponent]);

  useEffect(() => {
    if (Component) {
      addComponent(path, Component);
    }
  }, [Component, path, addComponent]);

  return <Component />;
};

export default DynamicComponent;
