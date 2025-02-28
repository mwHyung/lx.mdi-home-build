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
      className="w-full h-[65rem] flex flex-col justify-end relative"
      style={{ background: `url(${src}) no-repeat center / cover` }}
      ref={observerRef}
    >
      <h2 className="text-white text-[7rem] font-bold leading-[10rem] absolute top-1/2 left-[20%] translate-x-[-44%] translate-y-[-77%]">
        {title}
      </h2>
      <div className="">{children && children}</div>
    </div>
  );
};

export default Topbar;
