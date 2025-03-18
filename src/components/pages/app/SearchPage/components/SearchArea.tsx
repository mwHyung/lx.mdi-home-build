"use client";

import { Button, Checkbox, CheckboxGroup, Input, RadioGroup } from "@/components/ui";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import SearchIconS from "public/images/icon_search.svg";
import { useLayoutContext } from "@/layout/MainLayoutProvider";

const SearchArea = () => {
  const { setIsDetail, setIsScrolled } = useLayoutContext();

  // 스크롤
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsDetail(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting); // 보이지 않으면 true
      },
      { threshold: 0.999 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      setIsDetail(false);
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [setIsScrolled]);
  return (
    <div
      className="flex flex-col items-center justify-center gap-10 max-w-[105rem] m-[0_auto] pt-40 pb-[3.75rem]"
      ref={observerRef}
    >
      <div className="flex items-center w-[42.125rem]">
        <Input placeholder="검색어를 입력해주세요." size="lg" className="w-full h-[3.75rem]" />
        <Button variant="red" className="min-w-[7.5rem] h-[3.75rem]">
          <Image
            src={SearchIconS}
            width={17}
            height={17}
            style={{ width: "1.063rem", height: "1.063rem" }}
            alt="icon search"
          />
        </Button>
      </div>
      <div className="flex items-center gap-10">
        <span className="text-pub-gray6 text-[1.25rem] font-bold">검색 필터</span>
        <CheckboxGroup
          list={[
            { value: 1, label: "전체" },
            { value: 2, label: "제목" },
            { value: 3, label: "내용" },
            { value: 4, label: "키워드" },
          ]}
          variant="defaultP"
        />
      </div>
    </div>
  );
};

export default SearchArea;
