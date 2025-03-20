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

import ImageCard01 from "public/images/image_cardCon01.jpg";
import ImageCard02 from "public/images/image_cardCon02.jpg";
import ImageCard03 from "public/images/image_cardCon03.jpg";
import ImageCard04 from "public/images/image_cardCon04.jpg";
import ImageCard05 from "public/images/image_cardCon05.jpeg";
import ImageCard06 from "public/images/image_cardCon06.jpeg";
import ImageCard07 from "public/images/image_cardCon07.jpeg";
import ImageCard08 from "public/images/image_cardCon08.jpg";
import ImageCard09 from "public/images/image_cardCon09.jpg";
import PDFViewer from "@/components/ui/PDFViewer";

const MIBriefList = () => {
  const updatePageParams = (pageParams: Partial<PageParams>) => {};

  // 보기 방식
  const [isActive, setIsActive] = useState(true);
  const [pdfActive, setPdfActive] = useState<number | null>(null);
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

  const pdfList = [
    "25_02_2-1.pdf",
    "25_02_2-2.pdf",
    "25_02_2-3.pdf",
    "25_02_3-1.pdf",
    "25_02_3-2.pdf",
    "25_02_3-3.pdf",
    "25_02_4-1.pdf",
    "25_02_4-2.pdf",
    "25_02_4-3.pdf",
  ];

  return (
    <>
      <div className="flex flex-col gap-[1.875rem]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[0.625rem] text-[1.125rem]">
            <span className="text-pub-gray9 font-light tracking-[-0.016rem]">Total</span>
            <span className="text-pub-gray9 font-medium tracking-[-0.016rem]">3,762</span>
          </div>
          <div className="flex items-center gap-5">
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
                pdf={true}
                onClick={() => setPdfActive(idx)}
                // link="market-trends-detail"
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
                pdf={true}
                onClick={() => setPdfActive(idx)}
                // link="market-trends-detail"
              />
            ))}
          </div>
        )}

        <div className="flex items-center justify-center p-4 mt-10">
          <PaginationControls onChange={updatePageParams} total={100} page={1} perPage={10} />
        </div>
      </div>

      {pdfActive !== null && (
        <PDFViewer
          pdfUrl={`/pdf/Brief/${pdfList[pdfActive]}`}
          usePresigned={false}
          fileName={"fileName"}
          onClose={() => setPdfActive(null)}
        />
      )}
    </>
  );
};

const dummyData = [
  {
    src: ImageCard06,
    date: "25년 2월 2주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "마루베니상사, 3개년 중기(’25~’27년) 전략 발표",
    hash: ["세계경제", "마루베니상사"],
    hits: "547",
    dateS: "2025.02.14",
  },
  {
    src: ImageCard07,
    date: "25년 2월 2주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "최근 스미토모상사가 투자*한 미국\n철도 침목(枕木) 제조기업 Evertrak** 소개",
    hash: ["세계경제", "스미토모상사"],
    hits: "32",
    dateS: "2025.02.14",
  },
  {
    src: ImageCard08,
    date: "25년 2월 3주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "AI 로봇 개발에 속도를 내고 있는\n애플과 메타",
    hash: ["세계경제", "AI 로봇"],
    hits: "10,857",
    dateS: "2025.02.21",
  },
  {
    src: ImageCard09,
    date: "25년 2월 3주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "글로벌 조선업체들이 SMR* 기술\n개발에 투자하는 이유",
    hash: ["세계경제", "조선"],
    hits: "10,857",
    dateS: "2025.02.21",
  },
  {
    src: ImageCard01,
    date: "25년 2월 3주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "나트륨 배터리 개발 동향",
    hash: ["글로벌 전기차", "나트륨 배터리"],
    hits: "2,875",
    dateS: "2025.02.21",
  },
  {
    src: ImageCard02,
    date: "25년 2월 3주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "중국 석탄 발전소 건설, 10년 만에\n최고치 기록",
    hash: ["중국", "석탄"],
    hits: "547",
    dateS: "2025.02.21",
  },
  {
    src: ImageCard03,
    date: "25년 2월 4주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "글로벌 소다회* 수급 전망에 대한 중국 전문가** 의견",
    hash: ["중국", "글로벌 소다회"],
    hits: "32",
    dateS: "2025.02.28",
  },
  {
    src: ImageCard04,
    date: "25년 2월 4주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "미국-우크라이나 광물협정 주요 내용 및 재건 사업 전망",
    hash: ["세계경제", "광물"],
    hits: "10,857",
    dateS: "2025.02.28",
  },
  {
    src: ImageCard05,
    date: "25년 2월 4주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "시진핑 주석, 중국 대표 기업들과\n좌담회 실시",
    hash: ["세계경제", "중국"],
    hits: "2,875",
    dateS: "2025.02.28",
  },
];

export default MIBriefList;
