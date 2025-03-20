"use client";

import { CardContent, Pagination, SelectBox, Table } from "@/components/ui";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PageParams } from "@/types/shared";
import PaginationControls from "@/components/ui/Pagination/PaginationControls";
// import PDFViewer from "@/components/ui/PDFViewer";

import CardIconAct from "public/images/icon_card_active.svg";
import CardIconDis from "public/images/icon_card_disable.svg";
import ListIconAct from "public/images/icon_list_active.svg";
import ListIconDis from "public/images/icon_list_disable.svg";

import ImageCard01 from "public/images/KIEP_m.png";
import ImageCard02 from "public/images/kotra.jpg";
import ImageCard03 from "public/images/KPMG.png";
// import ImageCard04 from "public/images/image_cardCon04.jpg";
// import ImageCard05 from "public/images/image_cardCon05.jpeg";
// import ImageCard06 from "public/images/image_cardCon06.jpeg";
// import ImageCard07 from "public/images/image_cardCon07.jpeg";
// import ImageCard08 from "public/images/image_cardCon08.jpg";
// import ImageCard09 from "public/images/image_cardCon09.jpg";

const ExternalDataList = () => {
  const updatePageParams = (pageParams: Partial<PageParams>) => {};

  // const [pdfActive, setPdfActive] = useState<number | null>(null);
  // const pdfList = [
  //   "24_03.pdf",
  //   "24_04.pdf",
  //   "24_06.pdf",
  //   "24_07.pdf",
  //   "24_09.pdf",
  //   "24_10.pdf",
  //   "24_11.pdf",
  //   "24_12.pdf",
  //   "25_02.pdf",
  // ];

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
                link="/external-data-detail"
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
                link="/external-data-detail"
              />
            ))}
          </div>
        )}

        <div className="flex items-center justify-center p-4 mt-10">
          <PaginationControls onChange={updatePageParams} total={100} page={1} perPage={10} />
        </div>
      </div>

      {/* {pdfActive !== null && (
        <PDFViewer
          pdfUrl={`/pdf/Focus/${pdfList[pdfActive]}`}
          usePresigned={false}
          fileName={"fileName"}
          onClose={() => setPdfActive(null)}
        />
      )} */}
    </>
  );
};

const dummyData = [
  {
    src: ImageCard01,
    date: "24년 3월",
    tag: { type: "external", label: "기업 / 연구소" },
    tit: "가뭄에 시달리는 파나마 운하",
    category: "Market",
    hash: ["클라우드", "IBM"],
    hits: "10,857",
    dateS: "2024.03.26",
  },
  {
    src: ImageCard02,
    date: "24년 4월",
    tag: { type: "external", label: "기업 / 연구소" },
    tit: "구리의 특성 및 중장기 수급전망",
    category: "IT",
    hash: ["클라우드", "IBM"],
    hits: "10,857",
    dateS: "2024.04.15",
  },
  {
    src: ImageCard03,
    date: "24년 6월",
    tag: { type: "external", label: "기업 / 연구소" },
    tit: "SMR 산업동향",
    category: "Market",
    hash: ["청정에너지", "원자력", "SMR"],
    hits: "2,875",
    dateS: "2024.06.04",
  },
  {
    src: ImageCard01,
    date: "24년 7월",
    tag: { type: "external", label: "기업 / 연구소" },
    tit: "우라늄 공급망 동향",
    category: "Market",
    hash: ["시니어", "레지던스"],
    hits: "547",
    dateS: "2024.07.22",
  },
  {
    src: ImageCard02,
    date: "24년 9월",
    tag: { type: "external", label: "기업 / 연구소" },
    tit: "초고령화 시대의 거주변화 및 관련 사업 소개 (Part 1)",
    category: "IT",
    hash: ["주택매매", "부동산시장"],
    hits: "32",
    dateS: "2024.09.09",
  },
  {
    src: ImageCard03,
    date: "24년 10월",
    tag: { type: "external", label: "기업 / 연구소" },
    tit: "초고령화 시대의 거주변화 및 관련 사업 소개 (Part 2)",
    category: "IT",
    hash: ["클라우드", "IBM"],
    hits: "10,857",
    dateS: "2024.10.07",
  },
  {
    src: ImageCard02,
    date: "24년 11월",
    tag: { type: "external", label: "기업 / 연구소" },
    tit: "국내 데이터센터 산업 및 내·외장재 소개",
    category: "Market",
    hash: ["세계경제", "IMF"],
    hits: "2,875",
    dateS: "2024.11.25",
  },
  {
    src: ImageCard03,
    date: "24년 12월",
    tag: { type: "external", label: "기업 / 연구소" },
    tit: "미래 에너지 자원의 게임체인저로 주목받는 천연수소",
    category: "IT",
    hash: ["시니어", "레지던스"],
    hits: "547",
    dateS: "2024.12.16",
  },
  {
    src: ImageCard01,
    date: "25년 2월",
    tag: { type: "external", label: "기업 / 연구소" },
    tit: "자원의 보고(寶庫) 달",
    category: "Market",
    hash: ["주택매매", "부동산시장"],
    hits: "32",
    dateS: "2025.02.04",
  },
];

export default ExternalDataList;
