"use client";

import { Pagination, SelectBox, Table } from "@/components/ui";
import React, { useEffect } from "react";
import Columns from "./Columns";
import { Row } from "@/types/ui";
import { PageParams } from "@/types/shared";
import PaginationControls from "@/components/ui/Pagination/PaginationControls";
import { useRouter } from "next/navigation";
import { id } from "date-fns/locale";

const NewsFeedList = () => {
  const router = useRouter();

  // 테이블
  const { contentsColumns } = Columns();
  const selectedUser = data;
  const handleSelectRow = (id: Row["id"]) => {
    selectedUser.map(user => {
      if (user.id === id) {
        router.push(user.title.link);
      }
    });
  };

  const updatePageParams = (pageParams: Partial<PageParams>) => {};

  return (
    <div className="flex flex-col gap-[1.875rem]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[0.625rem] text-[1.125rem]">
          <span className="text-pub-gray9 font-light tracking-[-0.016rem]">Total</span>
          <span className="text-pub-gray9 font-medium tracking-[-0.016rem]">3,762</span>
        </div>
        <div className="flex items-center">
          <SelectBox
            placeholder="10"
            list={[
              { value: 1, label: "10" },
              { value: 2, label: "30" },
              { value: 3, label: "50" },
              { value: 4, label: "100" },
            ]}
            size="2xl"
            width="fit"
            className="min-w-[6.25rem] px-5 h-[2.813rem]"
          />
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
    id: "01",
    group: "어보브반도체",
    title: {
      name: "고성능 모터 제어용 MCU, A34M456 출시",
      link: "/news-feed-detail/01",
    },
    hits: "24",
    date: "2025.01.15",
  },
  {
    id: "02",
    group: "Saint-Gobain",
    title: {
      name: "재활용 소재로 만든 첫 번째 석고보드 출시",
      link: "/news-feed-detail/02",
    },
    hits: "1,587",
    date: "2025.01.16",
  },
  {
    id: "03",
    group: "ITOCHU",
    title: {
      name: "홋카이도 치토세시 물류 시설 개발 발표",
      link: "/news-feed-detail/03",
    },
    hits: "587",
    date: "2025.01.22",
  },
  {
    id: "04",
    group: "ITOCHU",
    title: {
      name: "Kawasaki Motors와 전략적 사업 제휴 체결",
      link: "/news-feed-detail/04",
    },
    hits: "4,521",
    date: "2024.11.08",
  },
  {
    id: "05",
    group: "Mitsubishi Corporation ",
    title: {
      name: "Tangguh LNG 프로젝트, 70억 달러 규모의 신규 투자 결정",
      link: "/news-feed-detail/05",
    },
    hits: "10,950",
    date: "2024.11.22",
  },
  {
    id: "06",
    group: "어보브반도체",
    title: {
      name: "고성능 모터 제어용 MCU, A34M456 출시",
      link: "/news-feed-detail/01",
    },
    hits: "24",
    date: "2025.01.15",
  },
  {
    id: "07",
    group: "Saint-Gobain",
    title: {
      name: "재활용 소재로 만든 첫 번째 석고보드 출시",
      link: "/news-feed-detail/02",
    },
    hits: "1,587",
    date: "2025.01.16",
  },
  {
    id: "08",
    group: "ITOCHU",
    title: {
      name: "홋카이도 치토세시 물류 시설 개발 발표",
      link: "/news-feed-detail/03",
    },
    hits: "587",
    date: "2025.01.22",
  },
  {
    id: "09",
    group: "ITOCHU",
    title: {
      name: "Kawasaki Motors와 전략적 사업 제휴 체결",
      link: "/news-feed-detail/04",
    },
    hits: "4,521",
    date: "2024.11.08",
  },
  {
    id: "10",
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
