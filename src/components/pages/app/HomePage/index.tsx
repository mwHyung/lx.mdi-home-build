"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/Home.module.scss";
import { useLayoutContext } from "@/layout/MainLayoutProvider";
import Image from "next/image";
import {
  Button,
  CardContent,
  DatePicker,
  Input,
  SelectBox,
  Table,
  TabPanel,
} from "@/components/ui";
import { Swiper, SwiperSlide } from "swiper/react";
import { Controller, Pagination, Navigation, Autoplay } from "swiper/modules";
import { Swiper as SwiperCore } from "swiper/types";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles/Swiper.scss";

import VisualBG from "public/images/bg_visual.png";
import Visual01 from "public/images/img_visual01.png";
import Visual02 from "public/images/img_visual02.png";

import IconVisual01 from "public/images/icon_main01.svg";
import IconVisual02 from "public/images/icon_main02.svg";
import IconVisual03 from "public/images/icon_main03.svg";
import IconVisual04 from "public/images/icon_main04.svg";
import IconPlus from "public/images/icon_plus.svg";
import IconPlusSm from "public/images/icon_plus_sm.svg";
import SearchIcon from "public/images/icon_search.svg";

import ImageCard01 from "public/images/image_mainCon01.jpg";
import ImageCard02 from "public/images/image_mainCon02.jpg";
import ImageCard03 from "public/images/image_mainCon03.jpg";
import ImageCard04 from "public/images/image_mainCon04.jpg";
import ImageCard05 from "public/images/image_mainCon05.jpg";
import ImageCard06 from "public/images/image_mainCon06.jpg";
import ImageCard07 from "public/images/image_mainCon07.jpg";
import ImageCard08 from "public/images/image_mainCon08.jpg";

import ImageText01 from "public/images/KIEP.png";

// import CardContent from "./components/CardContent";
import ContentTitle from "./components/ContentTitle";
import Link from "next/link";
import Columns from "./components/Columns";
import { Row } from "@/types/ui";
import PDFViewer from "@/components/ui/PDFViewer";

const sections = ["Visual", "New Contents", "News Feed"];

const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    currentSection,
    setCurrentSection,
    currentSectionRef,
    isScrolled,
    setIsScrolled,
    resetToTop,
  } = useLayoutContext();
  const isScrolling = useRef(false);

  // 스와이퍼 컨트롤러
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 2;
  const swiperRef = useRef<any>(null);
  const navNextVisualRef = useRef(null);
  const navPrevVisualRef = useRef(null);

  const [isSwiper, setIsSwiper] = useState<any>();
  const paginationRef = useRef(null);
  const navNextRef = useRef(null);
  const navPrevRef = useRef(null);

  const [translateValue, setTranslateValue] = useState(0);
  const [touchValue, setTouchValue] = useState(false);

  // New Contents
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

  // 검색
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchDate, setSearchDate] = useState(0);
  const searchDefault = ["1개월", "6개월", "1년"];
  const hashtags = [
    "금리",
    "자산관리/운용",
    "시니어",
    "레지던스",
    "주택매매",
    "부동산시장",
    "공장",
    "기후 인플레이션",
    "경영 흐름화",
    "2차전지",
  ];
  const handleSearchToggle = () => {
    setSearchOpen(prev => !prev);
  };
  const handleSearchDate = (index: number) => {
    setSearchDate(index);
  };

  // 테이블
  const { contentsColumns } = Columns();
  const selectedUser = tableList;
  const handleSelectRow = (id: Row["id"]) => {};

  useEffect(() => {
    setCurrentSection(0);
    currentSectionRef.current = 0;
    setIsScrolled(false);
    setTimeout(() => {
      window.scrollTo({ top: 0 });
    }, 300);
  }, []);

  // 스크롤
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting); // 보이지 않으면 true
      },
      { threshold: 1 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [setIsScrolled]);

  return (
    <>
      <div ref={containerRef} className={styles.container}>
        <div className={styles.section}>
          <div className="swiper_container" ref={observerRef}>
            <div className={`absolute top-0 left-0 w-full h-full flex items-center justify-center`}>
              <div
                className="w-screen h-full flex-1 shrink-0 absolute top-0 left-0"
                style={{ background: `url(${Visual01.src}) no-repeat center / cover` }}
              ></div>
              <div
                className={`w-screen h-full flex-1 shrink-0 absolute top-0 left-0 ${touchValue ? "duration-0" : "duration-800"}`}
                style={{
                  background: `url(${Visual02.src}) no-repeat center / cover`,
                  transform: `translateX(calc(100% + ${translateValue}px))`,
                }}
              ></div>
            </div>
            {/* 첫 번째 Pagination */}
            <div className="custom_pagination">
              <button className="visual_prev_button" ref={navPrevVisualRef}>{`<`}</button>
              <span className="current">{String(currentSlide).padStart(2, "0")}</span>
              <span className="separator"> / </span>
              <span className="total">{String(totalSlides).padStart(2, "0")}</span>
              <button className="visual_next_button" ref={navNextVisualRef}>{`>`}</button>
            </div>

            <Swiper
              ref={swiperRef}
              modules={[Controller, Pagination, Navigation, Autoplay]}
              speed={800}
              spaceBetween={0}
              slidesPerView={1}
              navigation={{
                nextEl: navNextVisualRef.current,
                prevEl: navPrevVisualRef.current,
              }}
              pagination={{ type: "progressbar" }}
              onSlideChange={swiper => {
                setCurrentSlide(swiper.activeIndex + 1);
                setTranslateValue(swiper.translate);
              }}
              onTouchStart={swiper => setTouchValue(true)}
              onTouchEnd={swiper => setTouchValue(false)}
              onSetTranslate={swiper => {
                setTranslateValue(swiper.translate);
              }}
              className="first"
            >
              <SwiperSlide>
                {/* <Image
                src={Visual01}
                width={0}
                height={0}
                style={{ width: "100%", height: "100%" }}
                alt="visual image"
              /> */}
                <h2 className={styles.h2}>
                  <strong>Innovate</strong> the <strong>future</strong>
                  <br />
                  with the{" "}
                  <strong>
                    power of <br /> knowledge
                  </strong>
                </h2>
              </SwiperSlide>
              {/* <SwiperSlide style={{ background: `url(${Visual02.src}) no-repeat right / cover` }}> */}
              <SwiperSlide>
                <ul className={styles.visual_card}>
                  <li>
                    <div>
                      <h3>News Feed</h3>
                      <p>
                        경쟁사・선도기업의
                        <br />
                        최신 동향
                      </p>
                      <Image
                        src={IconVisual01}
                        width={90}
                        height={90}
                        style={{ width: "5.625rem", height: "5.625rem" }}
                        alt="icon visual 01"
                      />
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>MI Brief</h3>
                      <p>
                        최근 주요 경제 이슈
                        <br />및 산업 소식
                      </p>
                      <Image
                        src={IconVisual02}
                        width={90}
                        height={90}
                        style={{ width: "5.625rem", height: "5.625rem" }}
                        alt="icon visual 01"
                      />
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>
                        MI Focus <span>/</span>
                        <br /> IT trend
                      </h3>
                      <p>
                        특정 주제・트렌드에
                        <br />
                        대한 심층 분석
                      </p>
                      <Image
                        src={IconVisual03}
                        width={90}
                        height={90}
                        style={{ width: "5.625rem", height: "5.625rem" }}
                        alt="icon visual 01"
                      />
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>
                        Special
                        <br /> Report
                      </h3>
                      <p>
                        최고경영진에게
                        <br />
                        제공되는 연구자료
                      </p>
                      <Image
                        src={IconVisual04}
                        width={90}
                        height={90}
                        style={{ width: "5.625rem", height: "5.625rem" }}
                        alt="icon visual 01"
                      />
                    </div>
                  </li>
                </ul>
              </SwiperSlide>
              <div className={`${styles.bg_line}`}></div>
            </Swiper>
          </div>

          <div className={`${styles.search} ${searchOpen ? styles.open : ""}`}>
            <div className={`${styles.search_area} ${styles.topbottom}`}>
              <div className={styles.search_tit} onClick={handleSearchToggle}>
                <span>검색</span>
                <Image
                  src={IconPlus}
                  width={18}
                  height={18}
                  style={{ width: "1.125rem", height: "1.125rem" }}
                  alt="icon plus"
                />
              </div>
              <div className={styles.search_con}>
                <ul>
                  <li>
                    <span>기간</span>
                    <div className={`${styles.input_wrap} gap-5`}>
                      <div className="flex items-center flex-1 max-w-[50%]">
                        <DatePicker
                          placeholder="시작일"
                          className="w-full rounded-none px-7 py-[0.844rem] font-bold text-pub-grayA justify-between border-r-0"
                          width="w-full"
                        />
                        <DatePicker
                          placeholder="종료일"
                          className="w-full rounded-none px-7 py-[0.844rem] font-bold text-pub-grayA justify-between"
                          width="w-full"
                        />
                      </div>
                      <div className={styles.tab_button}>
                        {searchDefault.map((item, idx) => (
                          <Button
                            key={idx}
                            variant="brown"
                            size="md"
                            className={`${searchDate === idx ? styles.active : ""} ${idx < searchDefault.length - 1 ? "border-r-0" : ""}`}
                            onClick={() => handleSearchDate(idx)}
                          >
                            {item}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </li>
                  <li>
                    <span>검색어</span>
                    <div className={styles.input_wrap}>
                      <SelectBox
                        placeholder="전체"
                        list={[
                          { value: 1, label: "전체" },
                          { value: 2, label: "전체" },
                          { value: 3, label: "전체" },
                        ]}
                        size="3xl"
                        width="fit"
                        className="min-w-[12.5rem] h-[3.75rem]"
                      />
                      <Input
                        placeholder="검색어를 입력해주세요."
                        size="lg"
                        className="w-full h-[3.75rem]"
                      />
                      <Button variant="red" className="min-w-[7.5rem] h-[3.75rem]">
                        <Image
                          src={SearchIcon}
                          width={17}
                          height={17}
                          style={{ width: "1.063rem", height: "1.063rem" }}
                          alt="icon search"
                        />
                      </Button>
                    </div>
                  </li>
                  <li>
                    <span>추천키워드</span>
                    <div className={`${styles.input_wrap}`}>
                      <ul className={styles.hashtag}>
                        {hashtags.map((item, idx) => (
                          <li key={idx}>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* New Contents */}
        <div className={`${styles.section} ${styles.contents} ${styles.resize}`}>
          <div className={styles.content_area}>
            <ContentTitle title="New Contents" type="tab" />

            <div className={styles.content_main}>
              <button className="custom_prev_button" ref={navPrevRef}>{`<`}</button>
              <button className="custom_next_button" ref={navNextRef}>{`>`}</button>
              <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                speed={800}
                spaceBetween={20}
                slidesPerView={4}
                slidesPerGroup={4}
                navigation={{
                  nextEl: navNextRef.current,
                  prevEl: navPrevRef.current,
                }}
                pagination={{
                  clickable: true,
                  type: "fraction",
                  el: paginationRef.current,
                  renderFraction: function (currentClass, totalClass) {
                    return `<span class="${currentClass}"></span> / <span class="${totalClass}"></span>`;
                  },
                  formatFractionCurrent: function (number) {
                    return number < 10 ? "0" + number : number;
                  },
                  formatFractionTotal: function (number) {
                    return number < 10 ? "0" + number : number;
                  },
                }}
                onBeforeInit={swiper => setIsSwiper(swiper)}
                className="card"
              >
                {dummyData.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <CardContent
                      list={item}
                      type="default"
                      className=""
                      pdf={true}
                      onClick={() => setPdfActive(idx)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="swiper_custom_list" ref={paginationRef}></div>
            </div>
          </div>
        </div>

        {/* News Feed */}
        <div className={`${styles.section} ${styles.contents}`}>
          <div className={styles.content_area}>
            <ContentTitle title="News Feed" type="more" />

            <div className={styles.table}>
              <Table
                id="user-list-table"
                columns={contentsColumns}
                rows={selectedUser}
                containerClassName="main_table"
                onRowSelect={handleSelectRow}
                colgroup={["20%", "55%", "10%", "15%"]}
              />
              <div className={styles.table_more}>
                <button>
                  <Image
                    src={IconPlusSm}
                    width={14}
                    height={14}
                    style={{ width: "0.875rem", height: "0.875rem" }}
                    alt="icon plus"
                  />
                  <Link href={"/news-feed"}>
                    <p>
                      <strong>3개</strong> 최신 콘텐츠가 더 있습니다.
                    </p>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`flex items-center justify-center w-10 h-10 border border-black bg-black bg-opacity-80 shadow-pc4 fixed bottom-[3.125rem] right-10 cursor-pointer transition-all ${isScrolled ? "opacity-100 visible" : "opacity-0 invisible"}`}
          onClick={resetToTop}
        >
          <span className="block w-3 h-3 text-[0] border-t-2 border-r-2 border-t-white border-r-white -rotate-45 mt-2">
            top button
          </span>
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
    src: ImageCard02,
    date: "25년 2월 2주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "최근 스미토모상사가 투자*한 미국 철도 침목(枕木) 제조기업 Evertrak** 소개",
    hash: ["세계경제", "스미토모상사", "철도", "Evertrak"],
    hits: "547",
  },
  {
    src: ImageCard03,
    date: "24년 7월 4주차",
    tag: { type: "market", label: "Special Report" },
    tit: "국내 부동산 시장 동향 ( 주택 매매 거래량은 증가, 공급물량은 아직 공급전에 있으므로 추후 시장상황을 확인해보아야 함)",
    hash: ["주택매매", "부동산시장"],
    hits: "32",
  },
  {
    src: ImageCard04,
    date: "24년 8월 1주차",
    tag: { type: "market", label: "MI Focus" },
    tit: "미국 보안업체 크라우드 스트라이크 IT 대란 요약",
    category: "Benchmarking",
    hash: ["클라우드", "IBM"],
    hits: "10,857",
  },
  {
    src: ImageText01,
    date: "24년 8월 2주차",
    tag: { type: "external", label: "기관 · 연구소" },
    tit: "IMF, ‘24년 하반기 세계 경제 전망",
    category: "Market",
    hash: ["미준 금리인하 결정", "한국은행", "세계경제", "IMF"],
    hits: "2,875",
  },
  {
    src: ImageCard05,
    date: "24년 8월 2주차",
    tag: { type: "external", label: "기관 · 연구소" },
    tit: "IMF, ‘24년 하반기 세계 경제 전망",
    category: "Market",
    hash: ["세계경제", "IMF"],
    hits: "2,875",
  },
  {
    src: ImageCard06,
    date: "24년 8월 1주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "기획재정부, 시니어 레지던스 활성화 방안 발표 ( 24.7.23 )",
    hash: ["시니어", "레지던스"],
    hits: "547",
  },
  {
    src: ImageCard07,
    date: "24년 7월 4주차",
    tag: { type: "market", label: "Special Report" },
    tit: "국내 부동산 시장 동향 ( 주택 매매 거래량은 증가, 공급물량은 아직 공급전에 있으므로 추후 시장상황을 확인해보아야 함)",
    hash: ["주택매매", "부동산시장"],
    hits: "32",
  },
  {
    src: ImageCard08,
    date: "24년 8월 1주차",
    tag: { type: "market", label: "IT Trend" },
    tit: "미국 보안업체 크라우드 스트라이크 IT 대란 요약",
    hash: ["클라우드", "IBM"],
    hits: "10,857",
  },
];

const tableList = [
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
  {
    group: "Mitsubishi Corporation ",
    title: {
      name: "Tangguh LNG 프로젝트, 70억 달러 규모의 신규 투자 결정",
      link: "/news-feed-detail/05",
    },
    hits: "10,950",
    date: "2024.11.22",
  },
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
];

export default HomePage;
