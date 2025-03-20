"use client";

import { useLayoutContext } from "@/layout/MainLayoutProvider";
import React, { useEffect } from "react";
import styles from "./styles/SearchList.module.scss";
import { Button, CardContent, Input, Table } from "@/components/ui";
import Columns from "./components/Columns";
import { Row } from "@/types/ui";

import SearchContainer from "./components/SearchContainer";
import SearchArea from "./components/SearchArea";
import SearchTab from "./components/SearchTab";
import SearchMain from "./components/SearchMain";
import { PageParams } from "@/types/shared";

import ImageCard01 from "public/images/image_cardCon01.png";
import ImageCard02 from "public/images/image_cardCon02.png";
import ImageCard03 from "public/images/image_cardCon03.png";
import PaginationControls from "@/components/ui/Pagination/PaginationControls";

const SearchPage = () => {
  const { currentSection, currentSectionRef, setCurrentSection, setIsDetail } = useLayoutContext();

  useEffect(() => {
    setIsDetail(true);
    return () => {
      setIsDetail(false);
    };
  }, []);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      let newSection = currentSectionRef.current;

      if (event.deltaY > 0 && currentSection < 1) {
        // wheel down
        newSection++;
      } else if (event.deltaY < 0 && currentSection > 0 && window.scrollY < 500) {
        // wheel up
        newSection--;
      }

      setCurrentSection(newSection);
    };

    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [currentSection, setCurrentSection]);

  // 테이블
  const { contentsColumns } = Columns();
  const selectedUser = data;
  const handleSelectRow = (id: Row["id"]) => {};

  const updatePageParams = (pageParams: Partial<PageParams>) => {};

  return (
    <SearchContainer>
      <SearchArea />
      <SearchTab
        tabsList={[
          { name: "전체", hits: "9,872" },
          { name: "News Feed", hits: "1,547" },
          { name: "MI Brief", hits: "326" },
          { name: "MI Focus", hits: "0" },
          { name: "Special Report", hits: "64" },
          { name: "IT Trend", hits: "1,758" },
          { name: "기관 · 연구소 (Market)", hits: "2,875" },
          { name: "기관 · 연구소 (IT)", hits: "30" },
          { name: "강연 · 세미나 (Market)", hits: "7" },
          { name: "강연 · 세미나 (IT)", hits: "2" },
        ]}
      />

      <SearchMain tit="News Feed" hits="1,547" type="full">
        <Table
          id="search-list-table"
          columns={contentsColumns}
          rows={selectedUser}
          containerClassName="sub_table"
          onRowSelect={handleSelectRow}
          colgroup={["15%", "60%", "10%", "15%"]}
        />

        <div className="flex items-center justify-center p-4 mt-[4rem]">
          <PaginationControls onChange={updatePageParams} total={100} page={1} perPage={10} />
        </div>
      </SearchMain>
    </SearchContainer>
  );
};

const data = [
  {
    id: 1,
    group: "LX그룹",
    title: "News Feed 레포트 신설",
    hits: "2,750",
    date: "2024.12.28",
  },
  {
    group: "LX홀딩스",
    title: "LX홀딩스, 두 번째 그룹 통합 ‘ESG 보고서’ 펴내",
    hits: "57",
    date: "2024.12.28",
  },
  {
    group: "LX홀딩스",
    title: "LX홀딩스, 2024년 정기 임원 인사 실시",
    hits: "8",
    date: "2024.12.28",
  },
  {
    group: "LX그룹",
    title: "LX그룹, ‘2023 LX배 한국여자야구대회’ 21일 개막",
    hits: "24",
    date: "2024.12.28",
  },
  {
    group: "LX그룹",
    title: "News Feed 레포트 신설",
    hits: "2,750",
    date: "2024.12.28",
  },
  {
    group: "LX홀딩스",
    title: "LX홀딩스, 두 번째 그룹 통합 ‘ESG 보고서’ 펴내",
    hits: "57",
    date: "2024.12.28",
  },
  {
    group: "LX홀딩스",
    title: "LX홀딩스, 2024년 정기 임원 인사 실시",
    hits: "8",
    date: "2024.12.28",
  },
  {
    group: "LX그룹",
    title: "LX그룹, ‘2023 LX배 한국여자야구대회’ 21일 개막",
    hits: "24",
    date: "2024.12.28",
  },
  {
    group: "LX홀딩스",
    title: "LX홀딩스, 2024년 정기 임원 인사 실시",
    hits: "8",
    date: "2024.12.28",
  },
  {
    group: "LX그룹",
    title: "LX그룹, ‘2023 LX배 한국여자야구대회’ 21일 개막",
    hits: "24",
    date: "2024.12.28",
  },
];

export default SearchPage;
