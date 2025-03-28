"use client";

import { CardContent, Pagination, SelectBox, Table } from "@/components/ui";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Row } from "@/types/ui";
import Image from "next/image";
import { PageParams } from "@/types/shared";
import PaginationControls from "@/components/ui/Pagination/PaginationControls";
import Columns from "./Columns";

import CardIconAct from "public/images/icon_card_active.svg";
import CardIconDis from "public/images/icon_card_disable.svg";
import ListIconAct from "public/images/icon_list_active.svg";
import ListIconDis from "public/images/icon_list_disable.svg";

import ImageCard01 from "public/images/KIEP_m.png";
import ImageCard02 from "public/images/kotra.jpg";
import ImageCard03 from "public/images/KPMG.png";

const ExternalDataList = () => {
  const router = useRouter();
  const updatePageParams = (pageParams: Partial<PageParams>) => {};

  // 보기 방식
  const [isActive, setIsActive] = useState(true);
  const iconList = [
    {
      name: "card",
      active: true,
      src: !isActive ? CardIconAct : CardIconDis,
    },
    {
      name: "list",
      active: false,
      src: isActive ? ListIconAct : ListIconDis,
    },
  ];
  const handleActive = (idx: number) => {
    if (idx === 0) setIsActive(false);
    else if (idx === 1) setIsActive(true);
  };

  // 테이블
  const { contentsColumns } = Columns();
  const selectedUser = dummyList;
  const handleSelectRow = (id: Row["id"]) => {
    router.push("/external-data-detail");
  };

  return (
    <>
      <div className="flex flex-col gap-[1.875rem]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[0.625rem] text-[1.125rem]">
            <span className="text-pub-gray9 font-light tracking-[-0.016rem]">Total</span>
            <span className="text-pub-gray9 font-medium tracking-[-0.016rem]">3,762</span>
          </div>
          <div className="flex items-center gap-5">
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
            <div className="flex items-center gap-2">
              {iconList.map((icon, idx) => (
                <button
                  key={idx}
                  className="flex items-center justify-center gap-2 first:after:block first:after:content-[''] first:after:w-[1px] first:after:h-[1.375rem] first:after:bg-pub-grayD"
                  onClick={() => handleActive(idx)}
                >
                  {icon.active ? (
                    <Image
                      src={icon.src}
                      width={36}
                      height={36}
                      style={{ width: "2.25rem", height: "2.25rem" }}
                      alt="card icon"
                    />
                  ) : (
                    <Image
                      src={icon.src}
                      width={36}
                      height={36}
                      style={{ width: "2.25rem", height: "2.25rem" }}
                      alt="card icon"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {!isActive ? (
          <div className="grid grid-cols-3 gap-[3.75rem] [@media(min-width:2560px)]:gap-[1.875rem]">
            {dummyData.map((item, idx) => (
              <CardContent
                key={idx}
                list={item}
                className="card_type"
                type="card"
                link="/external-data-detail"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col">
            <Table
              id="user-list-table"
              columns={contentsColumns}
              rows={selectedUser}
              containerClassName="sub_table hashtag"
              onRowSelect={handleSelectRow}
              colgroup={["8%", "10%", "58%", "10%", "15%"]}
            />
          </div>
        )}

        <div className="flex items-center justify-center p-4 mt-10">
          <PaginationControls onChange={updatePageParams} total={100} page={1} perPage={10} />
        </div>
      </div>
    </>
  );
};

const dummyData = [
  {
    src: ImageCard01,
    category: "Market",
    date: "25년 2월",
    tit: "아시아정책연구소(NBR), 중국의 핵심광물 수출통제로 향후 공급망이 교란될 것으로 예측",
    hash: ["미중갈등", "수출규제", "수출통제", "핵심광물"],
    hits: "857",
    publicDate: "2025.02.20",
  },
  {
    src: ImageCard02,
    category: "Market",
    date: "25년 2월",
    tit: "다시 불어올 폐기물 열풍, 페플라스틱 재활용을 중심으로",
    hash: ["재활용", "폐플라스틱", "플라스틱 폐기물", "KPMG"],
    hits: "57",
    publicDate: "2025.02.13",
  },
  {
    src: ImageCard03,
    category: "Market",
    date: "25년 1월",
    tit: "2025년 국내외 경제전망",
    hash: ["2025경제", "경제전망", "한국경제", "pwc"],
    hits: "25",
    publicDate: "2025.01.09",
  },
  {
    src: ImageCard01,
    category: "Market",
    date: "24년 12월",
    tit: "2025년 수출전망 및 지역별 시장여건",
    hash: ["세계교역", "수출전망"],
    hits: "47",
    publicDate: "2025.01.02",
  },
  {
    src: ImageCard02,
    category: "Market",
    date: "24년 9월",
    tit: "웰에이징으로 주목받는 케어푸드와 비즈니스 기획",
    hash: ["고령화", "노인", "식량", "초고령화", "케이푸드"],
    hits: "32",
    publicDate: "2024.12.12",
  },
  {
    src: ImageCard03,
    category: "Market",
    date: "24년 11월",
    tit: "반도체 산업 6대 이슈 및 대응 방안",
    hash: ["반도체", "반도체산업", "생성형 AI", "전력반도체", "팹리스"],
    hits: "82",
    publicDate: "2024.11.21",
  },
  {
    src: ImageCard01,
    category: "Market",
    date: "24년 12월",
    tit: "2025년 수출전망 및 지역별 시장여건",
    hash: ["세계교역", "수출전망"],
    hits: "47",
    publicDate: "2025.01.02",
  },
  {
    src: ImageCard02,
    category: "Market",
    date: "24년 9월",
    tit: "웰에이징으로 주목받는 케어푸드와 비즈니스 기획",
    hash: ["고령화", "노인", "식량", "초고령화", "케이푸드"],
    hits: "32",
    publicDate: "2024.12.12",
  },
  {
    src: ImageCard03,
    category: "Market",
    date: "24년 11월",
    tit: "반도체 산업 6대 이슈 및 대응 방안",
    hash: ["반도체", "반도체산업", "생성형 AI", "전력반도체", "팹리스"],
    hits: "82",
    publicDate: "2024.11.21",
  },
];

const dummyList = [
  {
    category: "Market",
    name: "KOSTI",
    tit: {
      week: "25년 2월",
      name: "아시아정책연구소(NBR), 중국의 핵심광물 수출통제로 향후 공급망이 교란될 것으로 예측",
      hash: ["미중갈등", "수출규제", "수출통제", "핵심광물"],
    },
    hits: "857",
    date: "2025.02.20",
  },
  {
    category: "Market",
    name: "KPMG",
    tit: {
      week: "25년 2월",
      name: "다시 불어올 폐기물 열풍, 페플라스틱 재활용을 중심으로",
      hash: ["재활용", "폐플라스틱", "플라스틱 폐기물", "KPMG"],
    },
    hits: "857",
    date: "2025.02.13",
  },
  {
    category: "Market",
    name: "PWC",
    tit: {
      week: "25년 1월",
      name: "2025년 국내외 경제전망",
      hash: ["2025경제", "경제전망", "한국경제", "pwc"],
    },
    hits: "275",
    date: "2025.01.09",
  },
  {
    category: "Market",
    name: "KOTRA",
    tit: {
      week: "24년 12월",
      name: "2025년 수출전망 및 지역별 시장여건",
      hash: ["세계교역", "수출전망"],
    },
    hits: "80",
    date: "2025.01.02",
  },
  {
    category: "Market",
    name: "KPMG",
    tit: {
      week: "24년 12월",
      name: "웰에이징으로 주목받는 케어푸드와 비즈니스 기획",
      hash: ["고령화", "노인", "식량", "초고령화", "케이푸드"],
    },
    hits: "66",
    date: "2024.12.12",
  },
  {
    category: "Market",
    name: "KPMG",
    tit: {
      week: "24년 11월",
      name: "반도체 산업 6대 이슈 및 대응 방안",
      hash: ["반도체", "반도체산업", "생성형 AI", "전력반도체", "팹리스"],
    },
    hits: "82",
    date: "2024.11.21",
  },
  {
    category: "Market",
    name: "kotra",
    tit: {
      week: "24년 12월",
      name: "2025년 수출전망 및 지역별 시장여건",
      hash: ["세계교역", "수출전망"],
    },
    hits: "80",
    date: "2025.01.02",
  },
  {
    category: "Market",
    name: "KPMG",
    tit: {
      week: "24년 12월",
      name: "웰에이징으로 주목받는 케어푸드와 비즈니스 기획",
      hash: ["고령화", "노인", "식량", "초고령화", "케이푸드"],
    },
    hits: "66",
    date: "2024.12.12",
  },
  {
    category: "Market",
    name: "KPMG",
    tit: {
      week: "24년 11월",
      name: "반도체 산업 6대 이슈 및 대응 방안",
      hash: ["반도체", "반도체산업", "생성형 AI", "전력반도체", "팹리스"],
    },
    hits: "82",
    date: "2024.11.21",
  },
  {
    category: "Market",
    name: "KPMG",
    tit: {
      week: "24년 11월",
      name: "반도체 산업 6대 이슈 및 대응 방안",
      hash: ["반도체", "반도체산업", "생성형 AI", "전력반도체", "팹리스"],
    },
    hits: "82",
    date: "2024.11.21",
  },
];

export default ExternalDataList;
