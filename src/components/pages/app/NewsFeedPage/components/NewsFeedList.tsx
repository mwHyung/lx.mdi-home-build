"use client";

import { Pagination, SelectBox, Table } from "@/components/ui";
import React, { useEffect } from "react";
import Columns from "./Columns";
import { Row } from "@/types/ui";
import { PageParams } from "@/types/shared";
import PaginationControls from "@/components/ui/Pagination/PaginationControls";

const NewsFeedList = () => {
  // 테이블
  const { contentsColumns } = Columns();
  const selectedUser = data;
  const handleSelectRow = (id: Row["id"]) => {};

  const updatePageParams = (pageParams: Partial<PageParams>) => {};

  return (
    <div className="flex flex-col gap-[1.875rem]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[0.625rem]">
          <span className="text-pub-gray9 text-[1.563rem] font-light leading-[-0.016rem]">
            Total
          </span>
          <span className="text-pub-red text-[1.5rem] font-medium leading-[-0.015rem]">3,762</span>
        </div>
        <SelectBox
          placeholder="최근 발행순"
          list={[
            { value: 1, label: "최근 발행순" },
            { value: 2, label: "최근 발행순" },
            { value: 3, label: "최근 발행순" },
          ]}
          size="2xl"
          width="fit"
          className="min-w-[12.5rem] px-5 h-[2.813rem]"
        />
      </div>
      <Table
        id="user-list-table"
        columns={contentsColumns}
        rows={selectedUser}
        containerClassName="sub_table"
        onRowSelect={handleSelectRow}
        colgroup={["20%", "55%", "10%", "15%"]}
      />
      <div className="flex items-center justify-center p-[0.625rem] mt-[2.5rem]">
        <PaginationControls onChange={updatePageParams} total={100} page={1} perPage={10} />
      </div>
    </div>
  );
};

const data = [
  {
    group: "어보브반도체",
    title: {
      name: "고성능 모터 제어용 MCU, A34M456 출시",
      link: "/news-feed-detail/01",
    },
    hits: "24",
    date: "2025.01.15",
  },
  {
    group: "Saint-Gobain",
    title: {
      name: "Saint-Gobain, 재활용 소재로 만든 첫 번째 석고보드 출시",
      link: "/news-feed-detail/02",
    },
    hits: "1,587",
    date: "2025.01.16",
  },
  {
    group: "ITOCHU",
    title: {
      name: "ITOCHU, 홋카이도 치토세시 물류 시설 개발 발표",
      link: "/news-feed-detail/03",
    },
    hits: "587",
    date: "2025.01.22",
  },
  {
    group: "ITOCHU",
    title: {
      name: "ITOCHU, Kawasaki Motors와 전략적 사업 제휴 체결",
      link: "/news-feed-detail/04",
    },
    hits: "4,521",
    date: "2024.11.08",
  },
  {
    group: "Mitsubishi Corporation ",
    title: {
      name: "Tangguh LNG 프로젝트, 70억 달러 규모의 신규 투자 결정",
      link: "/news-feed-detail/05",
    },
    hits: "10,950",
    date: "2024.11.22",
  },
  {
    group: "어보브반도체",
    title: {
      name: "고성능 모터 제어용 MCU, A34M456 출시",
      link: "/news-feed-detail/01",
    },
    hits: "24",
    date: "2025.01.15",
  },
  {
    group: "Saint-Gobain",
    title: {
      name: "Saint-Gobain, 재활용 소재로 만든 첫 번째 석고보드 출시",
      link: "/news-feed-detail/02",
    },
    hits: "1,587",
    date: "2025.01.16",
  },
  {
    group: "ITOCHU",
    title: {
      name: "ITOCHU, 홋카이도 치토세시 물류 시설 개발 발표",
      link: "/news-feed-detail/03",
    },
    hits: "587",
    date: "2025.01.22",
  },
  {
    group: "ITOCHU",
    title: {
      name: "ITOCHU, Kawasaki Motors와 전략적 사업 제휴 체결",
      link: "/news-feed-detail/04",
    },
    hits: "4,521",
    date: "2024.11.08",
  },
  {
    group: "Mitsubishi Corporation ",
    title: {
      name: "Tangguh LNG 프로젝트, 70억 달러 규모의 신규 투자 결정",
      link: "/news-feed-detail/05",
    },
    hits: "10,950",
    date: "2024.11.22",
  },
];

export default NewsFeedList;
