import { Button, Checkbox, CheckboxGroup, Input, RadioGroup } from "@/components/ui";
import Image from "next/image";
import React from "react";
import SearchIconS from "public/images/icon_search.svg";

const SearchArea = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-16 pt-64 pb-24">
      <div className="flex items-center w-[67.4rem]">
        <Input placeholder="검색어를 입력해주세요." size="lg" className="w-full" />
        <Button variant="red" className="min-w-48 h-[6.2rem]">
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
