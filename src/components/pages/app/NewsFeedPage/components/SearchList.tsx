import { Button, Calendar, DatePicker, Input, SelectBox } from "@/components/ui";
import Image from "next/image";
import React from "react";

import SearchIcon from "public/images/icon_search.svg";

const SearchList = () => {
  return (
    <div className="w-full py-32">
      <div className="flex items-center w-full shadow-pc3">
        <SelectBox
          placeholder="전체"
          list={[
            { value: 1, label: "전체" },
            { value: 2, label: "전체" },
            { value: 3, label: "전체" },
          ]}
          size="3xl"
          width="fit"
          className="min-w-80 h-24"
        />
        <Input placeholder="검색어를 입력해주세요." size="lg" className="w-full h-24" />
        <Button variant="red" className="min-w-48 h-24">
          <Image
            src={SearchIcon}
            width={17}
            height={17}
            style={{ width: "1.7rem", height: "1.7rem" }}
            alt="icon search"
          />
        </Button>
      </div>
    </div>
  );
};

export default SearchList;
