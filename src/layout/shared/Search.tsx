import React, { FC, useState } from "react";
import Image from "next/image";
import styles from "./Search.module.scss";
import SearchIcon from "public/images/icon_Utility.svg";
import SearchIconB from "public/images/icon_Utility_b.svg";
import { Button, Input } from "@/components/ui";
import SearchIconS from "public/images/icon_search.svg";
import SearchIconOpen from "public/images/icon_search_open.svg";

interface Props {
  activeMenu: string | null;
  searchOpen: boolean;
  setSearchOpen: (search: boolean) => void;
  isScrolled: boolean | null;
  detail: boolean | null;
}

const Search: FC<Props> = ({ activeMenu, searchOpen, setSearchOpen, isScrolled, detail }) => {
  const handleClick = () => {
    if (searchOpen) {
      setSearchOpen(false);
    } else {
      setSearchOpen(true);
    }
  };
  return (
    <>
      <button type="button" className="h-full" onClick={handleClick}>
        {(activeMenu || isScrolled || detail) && !searchOpen ? (
          <Image
            src={SearchIconB}
            width={52}
            height={60}
            style={{ width: "100%", height: "3.75rem" }}
            alt="search icon"
          />
        ) : (
          ""
        )}
        {!activeMenu && !isScrolled && !detail && !searchOpen ? (
          <Image
            src={SearchIcon}
            width={52}
            height={60}
            style={{ width: "100%", height: "3.75rem" }}
            alt="search icon"
          />
        ) : (
          ""
        )}
        {searchOpen && (
          <Image
            src={SearchIconOpen}
            width={52}
            height={60}
            style={{ width: "100%", height: "3.75rem" }}
            alt="search icon"
          />
        )}
      </button>

      <div
        className={`${styles.search_content} ${isScrolled ? styles.scrolled : ""} ${searchOpen ? styles.active : ""}`}
      >
        <div className={styles.search_area}>
          <div className={styles.input_wrap}>
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
          <p>제목, 내용, 키워드 중에서 입력한 텍스트가 포함된 콘텐츠를 모두 검색합니다.</p>
        </div>
      </div>
    </>
  );
};

export default Search;
