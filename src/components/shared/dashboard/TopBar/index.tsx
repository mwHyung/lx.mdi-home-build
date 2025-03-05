"use client";

import { useLayoutContext } from "@/layout/MainLayoutProvider";
import { FC, ReactNode, useEffect, useRef } from "react";

interface Props {
  children?: ReactNode;
  src?: any;
  title?: string;
}

const Topbar: FC<Props> = ({ children, src, title }) => {
  const { setIsScrolled } = useLayoutContext();

  // 스크롤
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting); // 보이지 않으면 true
      },
      { threshold: 0.105 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [setIsScrolled]);

  return (
    <div
      className="w-full h-[50rem] flex flex-col justify-end relative"
      style={{ background: `url(${src}) no-repeat center / cover` }}
      ref={observerRef}
    >
      <div className="w-full h-full absolute top-0 left-0 flex items-center">
        <h2 className="max-w-[1920px] w-full m-[0_auto] pl-[22rem] pb-32 text-white text-[7rem] font-bold leading-[10rem]">
          {title}
        </h2>
      </div>
      <div className="">{children && children}</div>
    </div>
  );
};

export default Topbar;
