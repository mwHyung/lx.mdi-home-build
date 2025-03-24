"use client";

import { Pagination, SelectBox, Table } from "@/components/ui";
import React, { useEffect } from "react";
import Columns from "./Columns";
import { Row } from "@/types/ui";
import { PageParams } from "@/types/shared";
import PaginationControls from "@/components/ui/Pagination/PaginationControls";
import { useRouter } from "next/navigation";

const NoticeList = () => {
  const router = useRouter();

  // 테이블
  const { contentsColumns } = Columns();
  const selectedUser = data;
  const handleSelectRow = (id: Row["id"]) => {
    router.push("/notice-detail");
  };

  const updatePageParams = (pageParams: Partial<PageParams>) => {};

  return (
    <div className="flex flex-col gap-[1.875rem]">
      <Table
        id="user-list-table"
        columns={contentsColumns}
        rows={selectedUser}
        containerClassName="sub_table"
        onRowSelect={handleSelectRow}
        colgroup={["10%", "66%", "12%", "12%"]}
      />
      <div className="flex items-center justify-center p-4 mt-[4rem]">
        <PaginationControls onChange={updatePageParams} total={100} page={1} perPage={10} />
      </div>
    </div>
  );
};

const data = [
  {
    title: "News Feed 레포트 신설",
    emergency: true,
    hits: "2,750",
    date: "2024.12.28",
  },
  {
    title: "신규 LX Intelligence 포탈 개설",
    hits: "57",
    date: "2024.12.28",
  },
];

export default NoticeList;
