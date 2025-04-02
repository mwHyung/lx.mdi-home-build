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
import Columns from "./Columns";

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

  // 테이블
  const { contentsColumns } = Columns();
  const handleSelectRow = (id: Row["id"]) => {
    selectedUser.map(user => {
      if (user.id === id) {
        setPdfActive(Number(id));
      }
    });
  };

  // AI 음성 듣기
  const [isAISelect, setIsAISelect] = useState(false);
  const [isLanguage, isSetLanguage] = useState<string[]>(["KR"]);

  const handleClick = (lang: string) => {
    if (isLanguage.includes(lang)) {
      isSetLanguage([]);
      setIsAISelect(false);
    } else {
      setIsAISelect(true);
      isSetLanguage([lang]);
    }
  };

  const [selectedTitle, setSelectedTitle] = useState<string>("");

  const dummyList = [
    {
      id: 0,
      tit: {
        week: "25년 2월 2주차",
        play: isAISelect,
        name: "마루베니상사, 3개년 중기(’25~’27년) 전략 발표",
        hash: ["세계경제", "마루베니상사"],
      },
      date: "2025.02.14",
      hits: "547",
    },
    {
      id: 1,
      tit: {
        week: "25년 2월 2주차",
        play: isAISelect,
        name: "최근 스미토모상사가 투자*한 미국\n철도 침목(枕木) 제조기업 Evertrak** 소개",
        hash: ["세계경제", "스미토모상사"],
      },
      date: "2025.02.14",
      hits: "32",
    },
    {
      id: 2,
      tit: {
        week: "25년 2월 3주차",
        play: isAISelect,
        name: "AI 로봇 개발에 속도를 내고 있는\n애플과 메타",
        hash: ["세계경제", "AI 로봇"],
      },
      date: "2025.02.21",
      hits: "857",
    },
    {
      id: 3,
      tit: {
        week: "25년 2월 3주차",
        play: isAISelect,
        name: "글로벌 조선업체들이 SMR* 기술\n개발에 투자하는 이유",
        hash: ["세계경제", "조선"],
      },
      date: "2025.02.21",
      hits: "857",
    },
    {
      id: 4,
      tit: {
        week: "25년 2월 3주차",
        play: isAISelect,
        name: "나트륨 배터리 개발 동향",
        hash: ["글로벌 전기차", "나트륨 배터리"],
      },
      date: "2025.02.21",
      hits: "2,875",
    },
    {
      id: 5,
      tit: {
        week: "25년 2월 3주차",
        play: isAISelect,
        name: "중국 석탄 발전소 건설, 10년 만에\n최고치 기록",
        hash: ["중국", "석탄"],
      },
      date: "2025.02.21",
      hits: "547",
    },
    {
      id: 6,
      tit: {
        week: "25년 2월 4주차",
        play: isAISelect,
        name: "글로벌 소다회* 수급 전망에 대한 중국 전문가** 의견",
        hash: ["중국", "글로벌 소다회"],
      },
      date: "2025.02.28",
      hits: "32",
    },
    {
      id: 7,
      tit: {
        week: "25년 2월 4주차",
        play: isAISelect,
        name: "미국-우크라이나 광물협정 주요 내용 및 재건 사업 전망",
        hash: ["세계경제", "광물"],
      },
      date: "2025.02.28",
      hits: "857",
    },
    {
      id: 8,
      tit: {
        week: "25년 2월 4주차",
        play: isAISelect,
        name: "시진핑 주석, 중국 대표 기업들과\n좌담회 실시",
        hash: ["세계경제", "중국"],
      },
      date: "2025.02.28",
      hits: "2,875",
    },
    {
      id: 9,
      tit: {
        week: "25년 2월 2주차",
        play: isAISelect,
        name: "마루베니상사, 3개년 중기(’25~’27년) 전략 발표",
        hash: ["세계경제", "마루베니상사"],
      },
      date: "2025.02.14",
      hits: "547",
    },
  ];
  const selectedUser = dummyList;

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

        {/* 임시 AI 음성 듣기 - 버튼 타입 */}
        <div className="w-[25.5rem] ml-auto flex flex-col items-center justify-end gap-[0.125rem] rounded-lg overflow-hidden">
          <button
            className={`w-full h-[2.813rem] bg-pub-red text-[1.125rem] font-bold text-white`}
            onClick={() => setIsAISelect(!isAISelect)}
          >
            AI 음성 듣기
          </button>
          {isAISelect && (
            <ul className="w-full flex items-center gap-[0.125rem] text-pub-gray9 font-bold text-[1.125rem] leading-[1.05rem] tracking-[-0.009rem]">
              {["KR", "EN"].map((lang, idx) => (
                <li
                  key={idx}
                  className={`h-8 flex-1 flex items-center justify-center bg-pub-lightG cursor-pointer ${isLanguage.includes(lang) ? "text-white bg-pub-red" : ""}`}
                  onClick={handleClick.bind(null, lang)}
                >
                  {lang}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 임시 AI 음성 듣기 - 텍스트 타입1 */}
        <div className="w-[25.5rem] ml-auto flex items-center justify-between gap-[1.125rem]">
          <div className="flex-1 flex items-center gap-[1.75rem] text-[1.125rem] text-pub-gray9 after:content-[''] after:flex-1 after:w-auto after:h-[0.063rem] after:bg-pub-lightG">
            AI 음성듣기
          </div>
          <ul className="flex items-center gap-4 text-pub-gray9 font-semibold text-[1.125rem] leading-[1.05rem] tracking-[-0.009rem]">
            {["KR", "EN"].map((lang, idx) => (
              <li
                key={idx}
                className={`w-9 h-9 rounded-sm flex items-center justify-center gap-2 cursor-pointer relative first:after:block first:after:content-[''] first:after:w-[1px] first:after:h-4 first:after:bg-pub-grayD first:after:absolute first:after:top-1/2 first:after:right-0 first:after:translate-x-2 first:after:-translate-y-1/2 ${isLanguage.includes(lang) && isAISelect ? "text-white bg-pub-red" : "bg-pub-lightG"}`}
                onClick={handleClick.bind(null, lang)}
              >
                {lang}
              </li>
            ))}
          </ul>
        </div>

        {/* 임시 AI 음성 듣기 - 텍스트 타입2 */}
        <div className="w-[25.5rem] ml-auto flex items-center justify-between gap-[1.125rem]">
          <div
            className="flex-1 flex items-center gap-[1.75rem] after:content-[''] after:flex-1 after:w-auto after:h-[0.063rem] after:bg-pub-lightG"
            onClick={handleClick.bind(null, "KR")}
          >
            <button className="flex items-center gap-[1.75rem] text-[1.125rem] text-pub-gray9 px-3 py-1 rounded-sm bg-pub-red text-white font-bold">
              AI 음성듣기
            </button>
          </div>
          <ul className="flex items-center gap-4 text-pub-gray9 font-semibold text-[1.125rem] leading-[1.05rem] tracking-[-0.009rem]">
            {["KR", "EN"].map((lang, idx) => (
              <li
                key={idx}
                className={`flex items-center justify-center gap-2 cursor-pointer relative first:after:block first:after:content-[''] first:after:w-[1px] first:after:h-[0.75rem] first:after:bg-pub-grayD first:after:absolute first:after:top-1/2 first:after:right-0 first:after:translate-x-2 first:after:-translate-y-1/2 ${isLanguage.includes(lang) && isAISelect ? "text-pub-red" : ""}`}
                onClick={handleClick.bind(null, lang)}
              >
                {lang}
              </li>
            ))}
          </ul>
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
                aiSelected={isAISelect}
                selectedTitle={selectedTitle}
                setSelectedTitle={setSelectedTitle}
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
              colgroup={["75%", "10%", "15%"]}
              // showCheckbox={true}
            />
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
    publicDate: "2025.02.14",
  },
  {
    src: ImageCard07,
    date: "25년 2월 2주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "최근 스미토모상사가 투자*한 미국\n철도 침목(枕木) 제조기업 Evertrak** 소개",
    hash: ["세계경제", "스미토모상사"],
    hits: "32",
    publicDate: "2025.02.14",
  },
  {
    src: ImageCard08,
    date: "25년 2월 3주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "AI 로봇 개발에 속도를 내고 있는\n애플과 메타",
    hash: ["세계경제", "AI 로봇"],
    hits: "857",
    publicDate: "2025.02.21",
  },
  {
    src: ImageCard09,
    date: "25년 2월 3주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "글로벌 조선업체들이 SMR* 기술\n개발에 투자하는 이유",
    hash: ["세계경제", "조선"],
    hits: "857",
    publicDate: "2025.02.21",
  },
  {
    src: ImageCard01,
    date: "25년 2월 3주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "나트륨 배터리 개발 동향",
    hash: ["글로벌 전기차", "나트륨 배터리"],
    hits: "2,875",
    publicDate: "2025.02.21",
  },
  {
    src: ImageCard02,
    date: "25년 2월 3주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "중국 석탄 발전소 건설, 10년 만에\n최고치 기록",
    hash: ["중국", "석탄"],
    hits: "547",
    publicDate: "2025.02.21",
  },
  {
    src: ImageCard03,
    date: "25년 2월 4주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "글로벌 소다회* 수급 전망에 대한 중국 전문가** 의견",
    hash: ["중국", "글로벌 소다회"],
    hits: "32",
    publicDate: "2025.02.28",
  },
  {
    src: ImageCard04,
    date: "25년 2월 4주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "미국-우크라이나 광물협정 주요 내용 및 재건 사업 전망",
    hash: ["세계경제", "광물"],
    hits: "857",
    publicDate: "2025.02.28",
  },
  {
    src: ImageCard05,
    date: "25년 2월 4주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "시진핑 주석, 중국 대표 기업들과\n좌담회 실시",
    hash: ["세계경제", "중국"],
    hits: "2,875",
    publicDate: "2025.02.28",
  },
];

export default MIBriefList;
