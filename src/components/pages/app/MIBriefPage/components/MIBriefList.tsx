"use client";

import { CardContent, Pagination, SelectBox, Table } from "@/components/ui";
import React, { useEffect, useState } from "react";
import { Row } from "@/types/ui";
import { PageParams } from "@/types/shared";
import PaginationControls from "@/components/ui/Pagination/PaginationControls";
import Image from "next/image";

import CardIconAct from "public/images/icon_card_active.svg";
import CardIconDis from "public/images/icon_card_disable.svg";
import ListIconAct from "public/images/icon_list_active.svg";
import ListIconDis from "public/images/icon_list_disable.svg";

import ImageCard01 from "public/images/image_cardCon01.png";
import ImageCard02 from "public/images/image_cardCon02.png";
import ImageCard03 from "public/images/image_cardCon03.png";

const MIBriefList = () => {
  const updatePageParams = (pageParams: Partial<PageParams>) => {};

  // 보기 방식
  const [isActive, setIsActive] = useState(false);
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

  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-pub-gray9 text-[2.5rem] font-light leading-[-0.025rem]">Total</span>
          <span className="text-pub-red text-[2.4rem] font-medium leading-[-0.024rem]">3,762</span>
        </div>
        <div className="flex items-center gap-8">
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
          <div className="flex items-center gap-[0.8rem]">
            {iconList.map((icon, idx) => (
              <button
                key={idx}
                className="flex items-center justify-center gap-[0.8rem] first:after:block first:after:content-[''] first:after:w-[0.1rem] first:after:h-[2.2rem] first:after:bg-pub-grayD"
                onClick={() => handleActive(idx)}
              >
                {icon.active ? (
                  <Image
                    src={icon.src}
                    width={36}
                    height={36}
                    style={{ width: "3.6rem", height: "3.6rem" }}
                    alt="card icon"
                  />
                ) : (
                  <Image
                    src={icon.src}
                    width={36}
                    height={36}
                    style={{ width: "3.6rem", height: "3.6rem" }}
                    alt="card icon"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {!isActive ? (
        <div className="grid grid-cols-3 gap-24 [@media(min-width:2560px)]:gap-12">
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
      ) : (
        <div className="flex flex-col">
          {dummyData.map((item, idx) => (
            <CardContent
              key={idx}
              list={item}
              className="list_type"
              type="list"
              link="market-trends-detail"
            />
          ))}
        </div>
      )}

      <div className="flex items-center justify-center p-4 mt-[4rem]">
        <PaginationControls onChange={updatePageParams} total={100} page={1} perPage={10} />
      </div>
    </div>
  );
};

const dummyData = [
  {
    src: ImageCard01,
    date: "24년 8월 2주차",
    tag: { type: "external", label: "기관/연구소" },
    tit: "IMF, ‘24년 하반기 세계 경제 전망",
    hash: ["세계경제", "IMF"],
    hits: "2,875",
    dateS: "2024.12.09",
  },
  {
    src: ImageCard02,
    date: "24년 8월 1주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "기획재정부, 시니어 레지던스 활성화 방안 발표 ( 24.7.23 )",
    hash: ["시니어", "레지던스"],
    hits: "547",
    dateS: "2024.12.09",
  },
  {
    src: ImageCard03,
    date: "24년 7월 4주차",
    tag: { type: "market", label: "Special Report" },
    tit: "국내 부동산 시장 동향 ( 주택 매매 거래량은 증가, 공급물량은 아직 공급전에 있으므로 추후 시장상황을 확인해보아야 함)",
    hash: ["주택매매", "부동산시장"],
    hits: "32",
    dateS: "2024.12.09",
  },
  {
    src: ImageCard01,
    date: "24년 8월 1주차",
    tag: { type: "market", label: "IT Trend" },
    tit: "미국 보안업체 크라우드 스트라이크 IT 대란 요약",
    hash: ["클라우드", "IBM"],
    hits: "10,857",
    dateS: "2024.12.09",
  },
  {
    src: ImageCard01,
    date: "24년 8월 2주차",
    tag: { type: "external", label: "기관/연구소" },
    tit: "IMF, ‘24년 하반기 세계 경제 전망",
    hash: ["세계경제", "IMF"],
    hits: "2,875",
    dateS: "2024.12.09",
  },
  {
    src: ImageCard02,
    date: "24년 8월 1주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "기획재정부, 시니어 레지던스 활성화 방안 발표 ( 24.7.23 )",
    hash: ["시니어", "레지던스"],
    hits: "547",
    dateS: "2024.12.09",
  },
  {
    src: ImageCard03,
    date: "24년 7월 4주차",
    tag: { type: "market", label: "Special Report" },
    tit: "국내 부동산 시장 동향 ( 주택 매매 거래량은 증가, 공급물량은 아직 공급전에 있으므로 추후 시장상황을 확인해보아야 함)",
    hash: ["주택매매", "부동산시장"],
    hits: "32",
    dateS: "2024.12.09",
  },
  {
    src: ImageCard01,
    date: "24년 8월 1주차",
    tag: { type: "market", label: "IT Trend" },
    tit: "미국 보안업체 크라우드 스트라이크 IT 대란 요약",
    hash: ["클라우드", "IBM"],
    hits: "10,857",
    dateS: "2024.12.09",
  },
  {
    src: ImageCard02,
    date: "24년 8월 1주차",
    tag: { type: "market", label: "IT Trend" },
    tit: "미국 보안업체 크라우드 스트라이크 IT 대란 요약",
    hash: ["클라우드", "IBM"],
    hits: "10,857",
    dateS: "2024.12.09",
  },
];

export default MIBriefList;
