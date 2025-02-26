"use client";

import { Pagination, SelectBox, Table } from "@/components/ui";
import React, { useEffect, useState } from "react";
import Columns from "./Columns";
import { Row } from "@/types/ui";
import { PageParams } from "@/types/shared";
import PaginationControls from "@/components/ui/Pagination/PaginationControls";

const ExternalDataList = () => {
  // 테이블
  const { contentsColumns } = Columns();
  const selectedUser = data;
  const handleSelectRow = (id: Row["id"]) => {};

  const updatePageParams = (pageParams: Partial<PageParams>) => {};

  const [isActive, setIsActive] = useState<number>(0);
  const tabList = ["Market", "IT"];

  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center mb-20">
        {tabList.map((list, idx) => (
          <button
            key={idx}
            className={`flex-1 text-[2.2rem] font-medium p-8 ${isActive === idx ? "bg-white border-l border-t border-r border-pub-red font-bold text-pub-red" : "bg-[#f5f5f5] border-b border-b-pub-grayD text-pub-gray9"}`}
            onClick={() => setIsActive(idx)}
          >
            {list}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-pub-gray9 text-[2.5rem] font-light leading-[-0.025rem]">Total</span>
          <span className="text-pub-red text-[2.4rem] font-medium leading-[-0.024rem]">3,762</span>
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
          className="min-w-80 px-8 h-[4.5rem]"
        />
      </div>

      <Table
        id="user-list-table"
        columns={contentsColumns}
        rows={selectedUser}
        selectedRows={selectedUser ? [selectedUser[0].id] : []}
        containerClassName="sub_table"
        onRowSelect={handleSelectRow}
        colgroup={["15%", "60%", "10%", "15%"]}
      />
      <div className="flex items-center justify-center p-4 mt-[4rem]">
        <PaginationControls onChange={updatePageParams} total={100} page={1} perPage={10} />
      </div>
    </div>
  );
};

const data = [
  {
    id: 0,
    group: "LX그룹",
    title: "News Feed 레포트 신설",
    hits: "2,750",
    date: "2024.12.28",
  },
  {
    id: 1,
    group: "LX홀딩스",
    title: "LX홀딩스, 두 번째 그룹 통합 ‘ESG 보고서’ 펴내",
    hits: "57",
    date: "2024.12.28",
  },
  {
    id: 2,
    group: "LX홀딩스",
    title: "LX홀딩스, 2024년 정기 임원 인사 실시",
    hits: "8",
    date: "2024.12.28",
  },
  {
    id: 3,
    group: "LX그룹",
    title: "LX그룹, ‘2023 LX배 한국여자야구대회’ 21일 개막",
    hits: "24",
    date: "2024.12.28",
  },
  {
    id: 4,
    group: "LX그룹",
    title: "LX그룹, ‘2023 LX배 한국여자야구대회’ 21일 개막",
    hits: "24",
    date: "2024.12.28",
  },
  {
    id: 5,
    group: "LX그룹",
    title: "LX그룹, ‘2023 LX배 한국여자야구대회’ 21일 개막",
    hits: "24",
    date: "2024.12.28",
  },
  {
    id: 6,
    group: "LX그룹",
    title: "LX그룹, ‘2023 LX배 한국여자야구대회’ 21일 개막",
    hits: "24",
    date: "2024.12.28",
  },
  {
    id: 7,
    group: "LX그룹",
    title: "LX그룹, ‘2023 LX배 한국여자야구대회’ 21일 개막",
    hits: "24",
    date: "2024.12.28",
  },
  {
    id: 8,
    group: "LX그룹",
    title: "LX그룹, ‘2023 LX배 한국여자야구대회’ 21일 개막",
    hits: "24",
    date: "2024.12.28",
  },
  {
    id: 9,
    group: "LX그룹",
    title: "LX그룹, ‘2023 LX배 한국여자야구대회’ 21일 개막",
    hits: "24",
    date: "2024.12.28",
  },
];

export default ExternalDataList;
