"use client";

import { useLayoutContext } from "@/layout/MainLayoutProvider";
import React, { useEffect, useRef } from "react";
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

const SearchPage = () => {
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
          { name: "기관/연구소 (Market)", hits: "2,875" },
          { name: "기관/연구소 (IT)", hits: "30" },
          { name: "강연/세미나 (Market)", hits: "7" },
          { name: "강연/세미나 (IT)", hits: "2" },
        ]}
      />

      <SearchMain tit="News Feed" hits="1,547">
        <Table
          id="search-list-table"
          columns={contentsColumns}
          rows={selectedUser}
          selectedRows={selectedUser ? [selectedUser.id] : []}
          containerClassName="sub_table"
          onRowSelect={handleSelectRow}
          colgroup={["15%", "60%", "10%", "15%"]}
        />
      </SearchMain>

      <SearchMain tit="MI Brief" hits="325" className="pt-0">
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
      </SearchMain>

      {/* 컨텐츠가 없을 때 */}
      <SearchMain tit="MI Focus" hits="0" className="pt-0">
        <div className="flex items-center justify-center h-80 border-t border-b border-pub-grayD bg-pub-bgA">
          <p className="text-black text-[2.8rem] font-light tracking-[-0.028rem]">
            <strong className="font-bold text-pub-red">정유</strong>로 검색된 컨텐츠가 없습니다.
          </p>
        </div>
      </SearchMain>

      <SearchMain tit="강연/세미나 (IT)" hits="2" className="pt-0">
        <Table
          id="search-list-it-table"
          columns={contentsColumns}
          rows={selectedUser}
          selectedRows={selectedUser ? [selectedUser.id] : []}
          containerClassName="sub_table"
          onRowSelect={handleSelectRow}
          colgroup={["15%", "60%", "10%", "15%"]}
        />
      </SearchMain>
    </SearchContainer>
  );
};

const data = [
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
];

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
];

export default SearchPage;
