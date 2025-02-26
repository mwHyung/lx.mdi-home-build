"use client";

import { useLayoutContext } from "@/layout/MainLayoutProvider";
import React, { useEffect } from "react";
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
          { name: "기관/연구소 (Market)", hits: "2,875" },
          { name: "기관/연구소 (IT)", hits: "30" },
          { name: "강연/세미나 (Market)", hits: "7" },
          { name: "강연/세미나 (IT)", hits: "2" },
        ]}
      />

      <SearchMain tit="MI Brief" hits="325">
        <div className="grid grid-cols-3 gap-24">
          {dummyData.map((item, idx) => (
            <CardContent
              key={idx}
              list={item}
              className="card_type"
              type="card"
              link="market-trends-detail"
            />
          ))}
        </div>

        <div className="flex items-center justify-center p-4 mt-[4rem]">
          <PaginationControls onChange={updatePageParams} total={100} page={1} perPage={10} />
        </div>
      </SearchMain>
    </SearchContainer>
  );
};

const dummyData = [
  {
    src: ImageCard01,
    date: "24년 8월 2주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "기획재정부, 시니어 레지던스 활성화 방안 발표 ( 24.7.23 )",
    hash: ["시니어", "레지던스"],
    hits: "547",
    dateS: "2024.12.09",
  },
  {
    src: ImageCard02,
    date: "24년 8월 1주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "국내 부동산 시장 동향  ( 주택 매매 거래량은 증가, 공급물량은 아직 공급전에 있음국내 부동산 시장 동향  ( 주택 매매 거래량은 증가, 공급물량은 아직 공급전에 있음",
    hash: ["시니어", "레지던스"],
    hits: "547",
    dateS: "2024.12.09",
  },
  {
    src: ImageCard03,
    date: "24년 7월 4주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "Rio Tinto, 기업 인수를 통해 세계 3위 규모의 리튬 매장량 확보Rio Tinto, 기업 인수를 통해 세계 3위 규모의 리튬 매장량 확보",
    hash: ["시니어", "레지던스"],
    hits: "547",
    dateS: "2024.12.09",
  },
  {
    src: ImageCard01,
    date: "24년 8월 2주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "기획재정부, 시니어 레지던스 활성화 방안 발표 ( 24.7.23 )",
    hash: ["시니어", "레지던스"],
    hits: "547",
    dateS: "2024.12.09",
  },
  {
    src: ImageCard02,
    date: "24년 8월 1주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "국내 부동산 시장 동향  ( 주택 매매 거래량은 증가, 공급물량은 아직 공급전에 있음국내 부동산 시장 동향  ( 주택 매매 거래량은 증가, 공급물량은 아직 공급전에 있음",
    hash: ["시니어", "레지던스"],
    hits: "547",
    dateS: "2024.12.09",
  },
  {
    src: ImageCard03,
    date: "24년 7월 4주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "Rio Tinto, 기업 인수를 통해 세계 3위 규모의 리튬 매장량 확보Rio Tinto, 기업 인수를 통해 세계 3위 규모의 리튬 매장량 확보",
    hash: ["시니어", "레지던스"],
    hits: "547",
    dateS: "2024.12.09",
  },
  {
    src: ImageCard01,
    date: "24년 8월 2주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "기획재정부, 시니어 레지던스 활성화 방안 발표 ( 24.7.23 )",
    hash: ["시니어", "레지던스"],
    hits: "547",
    dateS: "2024.12.09",
  },
  {
    src: ImageCard02,
    date: "24년 8월 1주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "국내 부동산 시장 동향  ( 주택 매매 거래량은 증가, 공급물량은 아직 공급전에 있음국내 부동산 시장 동향  ( 주택 매매 거래량은 증가, 공급물량은 아직 공급전에 있음",
    hash: ["시니어", "레지던스"],
    hits: "547",
    dateS: "2024.12.09",
  },
  {
    src: ImageCard03,
    date: "24년 7월 4주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "Rio Tinto, 기업 인수를 통해 세계 3위 규모의 리튬 매장량 확보Rio Tinto, 기업 인수를 통해 세계 3위 규모의 리튬 매장량 확보",
    hash: ["시니어", "레지던스"],
    hits: "547",
    dateS: "2024.12.09",
  },
];

export default SearchPage;
