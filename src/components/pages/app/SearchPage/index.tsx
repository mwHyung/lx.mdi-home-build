"use client";

import { useLayoutContext } from "@/layout/MainLayoutProvider";
import React, { useEffect, useRef, useState } from "react";
import { Button, CardContent, Input, Table } from "@/components/ui";
import Columns from "./components/Columns";
import { Row } from "@/types/ui";

import SearchContainer from "./components/SearchContainer";
import SearchArea from "./components/SearchArea";
import SearchTab from "./components/SearchTab";
import SearchMain from "./components/SearchMain";

import ImageCard06 from "public/images/image_cardCon06.jpeg";
import ImageCard07 from "public/images/image_cardCon07.jpeg";
import ImageCard08 from "public/images/image_cardCon08.jpg";
import PDFViewer from "@/components/ui/PDFViewer";
import { useRouter } from "next/navigation";

const SearchPage = () => {
  const router = useRouter();
  const { isDetail, setIsDetail } = useLayoutContext();

  // 테이블
  const { contentsColumns, externalColumns } = Columns();
  const selectedUser = data;
  const externalUser = externalData;
  const handleSelectRow = (id: Row["id"]) => {
    router.push("/external-data-detail");
  };

  // pdf
  const [pdfActive, setPdfActive] = useState<number | null>(null);
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

  useEffect(() => {
    setIsDetail(true);
    return () => setIsDetail(false);
  }, []);

  return (
    <>
      <SearchContainer>
        <SearchArea />
        <SearchTab
          tabsList={[
            { name: "전체", hits: "9,872" },
            { name: "News Feed", hits: "1,547" },
            { name: "MI Brief", hits: "326" },
            { name: "MI Focus", hits: "0" },
            { name: "Special Report", hits: "64" },
            { name: "IT Trend", hits: "1,758" },
            { name: "기관 · 연구소 (Market)", hits: "2,875" },
            { name: "기관 · 연구소 (IT)", hits: "30" },
            { name: "강연 · 세미나 (Market)", hits: "7" },
            { name: "강연 · 세미나 (IT)", hits: "2" },
          ]}
        />

        <SearchMain tit="News Feed" hits="1,547">
          <Table
            id="search-list-table"
            columns={contentsColumns}
            rows={selectedUser}
            containerClassName="sub_table"
            onRowSelect={handleSelectRow}
            colgroup={["15%", "60%", "10%", "15%"]}
          />
        </SearchMain>

        <SearchMain tit="MI Brief" hits="325" className="pt-0">
          <div className="grid grid-cols-3 gap-[3.75rem]">
            {dummyData.map((item, idx) => (
              <CardContent
                key={idx}
                list={item}
                className="card_type"
                type="card"
                link="market-trends-detail"
                pdf={true}
                onClick={() => setPdfActive(idx)}
              />
            ))}
          </div>
        </SearchMain>

        {/* 컨텐츠가 없을 때 */}
        <SearchMain tit="MI Focus" hits="0" className="pt-0">
          <div className="flex items-center justify-center flex-1 w-full h-[12.5rem] border-t border-b border-pub-grayD bg-pub-bgA">
            <p className="text-black text-[1.75rem] font-light tracking-[-0.018rem]">
              <strong className="font-bold text-pub-red">정유</strong>로 검색된 컨텐츠가 없습니다.
            </p>
          </div>
        </SearchMain>

        <SearchMain tit="강연 · 세미나 (Market)" hits="2" className="pt-0">
          <Table
            id="search-list-it-table"
            columns={externalColumns}
            rows={externalUser}
            containerClassName="sub_table hashtag"
            onRowSelect={handleSelectRow}
            colgroup={["8%", "10%", "58%", "10%", "15%"]}
          />
        </SearchMain>
      </SearchContainer>

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
      name: "재활용 소재로 만든 첫 번째 석고보드 출시",
      link: "/news-feed-detail/02",
    },
    hits: "1,587",
    date: "2025.01.16",
  },
  {
    group: "ITOCHU",
    title: {
      name: "홋카이도 치토세시 물류 시설 개발 발표",
      link: "/news-feed-detail/03",
    },
    hits: "587",
    date: "2025.01.22",
  },
  {
    group: "ITOCHU",
    title: {
      name: "Kawasaki Motors와 전략적 사업 제휴 체결",
      link: "/news-feed-detail/04",
    },
    hits: "4,521",
    date: "2024.11.08",
  },
];
const externalData = [
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
];

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
    tit: "최근 스미토모상사가 투자*한 미국 철도 침목(枕木) 제조기업 Evertrak** 소개",
    hash: ["세계경제", "스미토모상사"],
    hits: "32",
    dateS: "2025.02.14",
  },
  {
    src: ImageCard08,
    date: "25년 2월 3주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "AI 로봇 개발에 속도를 내고 있는 애플과 메타",
    hash: ["세계경제", "AI 로봇"],
    hits: "10,857",
    dateS: "2025.02.21",
  },
];

export default SearchPage;
