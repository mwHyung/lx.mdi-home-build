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
      className="flex flex-col items-center justify-center gap-16 max-w-[1680px] m-[0_auto] pt-64 pb-24"
      ref={observerRef}
    >
      <div className="flex items-center w-[67.4rem]">
        <Input placeholder="검색어를 입력해주세요." size="lg" className="w-full h-24" />
        <Button variant="red" className="min-w-48 h-24">
          <Image
            src={SearchIconS}
            width={17}
            height={17}
            style={{ width: "1.7rem", height: "1.7rem" }}
            alt="icon search"
          />
        </Button>
      </div>
      <div className="flex items-center gap-16">
        <span className="text-pub-gray6 text-[2rem] font-bold">검색 필터</span>
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
