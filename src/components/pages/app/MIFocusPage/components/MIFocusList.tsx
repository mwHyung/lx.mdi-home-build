"use client";

import { CardContent, Pagination, SelectBox, Table } from "@/components/ui";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PageParams } from "@/types/shared";
import PaginationControls from "@/components/ui/Pagination/PaginationControls";
import PDFViewer from "@/components/ui/PDFViewer";

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

const MIBriefList = () => {
  const updatePageParams = (pageParams: Partial<PageParams>) => {};

  const pdfList = [
    "24_03.pdf",
    "24_04.pdf",
    "24_06.pdf",
    "24_07.pdf",
    "24_09.pdf",
    "24_10.pdf",
    "24_11.pdf",
    "24_12.pdf",
    "25_02.pdf",
  ];

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
            {dummyData.map((item, idx) => (
              <CardContent
                key={idx}
                list={item}
                className="list_type"
                type="list"
                pdf={true}
                onClick={() => setPdfActive(idx)}
                aiSelected={isAISelect}
                selectedTitle={selectedTitle}
                setSelectedTitle={setSelectedTitle}
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
          pdfUrl={`/pdf/Focus/${pdfList[pdfActive]}`}
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
    src: ImageCard08,
    date: "24년 3월",
    tag: { type: "market", label: "MI Focus" },
    tit: "가뭄에 시달리는 파나마 운하",
    category: "Industry",
    hash: ["클라우드", "IBM"],
    hits: "857",
    publicDate: "2024.03.26",
  },
  {
    src: ImageCard09,
    date: "24년 4월",
    tag: { type: "market", label: "MI Focus" },
    tit: "구리의 특성 및 중장기 수급전망",
    category: "Benchmarking",
    hash: ["클라우드", "IBM"],
    hits: "857",
    publicDate: "2024.04.15",
  },
  {
    src: ImageCard01,
    date: "24년 6월",
    tag: { type: "market", label: "MI Focus" },
    tit: "SMR 산업동향",
    category: "Industry",
    hash: ["청정에너지", "원자력", "SMR"],
    hits: "2,875",
    publicDate: "2024.06.04",
  },
  {
    src: ImageCard02,
    date: "24년 7월",
    tag: { type: "market", label: "MI Focus" },
    tit: "우라늄 공급망 동향",
    category: "Benchmarking",
    hash: ["시니어", "레지던스"],
    hits: "547",
    publicDate: "2024.07.22",
  },
  {
    src: ImageCard03,
    date: "24년 9월",
    tag: { type: "market", label: "MI Focus" },
    tit: "초고령화 시대의 거주변화 및 관련\n사업 소개 (Part 1)",
    category: "Industry",
    hash: ["주택매매", "부동산시장"],
    hits: "32",
    publicDate: "2024.09.09",
  },
  {
    src: ImageCard04,
    date: "24년 10월",
    tag: { type: "market", label: "MI Focus" },
    tit: "초고령화 시대의 거주변화 및 관련\n사업 소개 (Part 2)",
    category: "Benchmarking",
    hash: ["클라우드", "IBM"],
    hits: "857",
    publicDate: "2024.10.07",
  },
  {
    src: ImageCard05,
    date: "24년 11월",
    tag: { type: "market", label: "MI Focus" },
    tit: "국내 데이터센터 산업 및 내·외장재\n소개",
    category: "Industry",
    hash: ["세계경제", "IMF"],
    hits: "2,875",
    publicDate: "2024.11.25",
  },
  {
    src: ImageCard06,
    date: "24년 12월",
    tag: { type: "market", label: "MI Focus" },
    tit: "미래 에너지 자원의 게임체인저로\n주목받는 천연수소",
    category: "Benchmarking",
    hash: ["시니어", "레지던스"],
    hits: "547",
    publicDate: "2024.12.16",
  },
  {
    src: ImageCard07,
    date: "25년 2월",
    tag: { type: "market", label: "MI Focus" },
    tit: "자원의 보고(寶庫) 달",
    category: "Industry",
    hash: ["주택매매", "부동산시장"],
    hits: "32",
    publicDate: "2025.02.04",
  },
];

export default MIBriefList;
