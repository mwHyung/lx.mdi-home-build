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

import ImageCard01 from "public/images/image_card01.png";
import ImageCard02 from "public/images/image_card02.png";
import ImageCard03 from "public/images/image_card03.png";
import ImageCard04 from "public/images/image_card04.png";

// import CardContent from "./components/CardContent";
import ContentTitle from "./components/ContentTitle";
import Link from "next/link";
import Columns from "./components/Columns";
import { Row } from "@/types/ui";

const sections = ["Visual", "New Contents", "News Feed"];

const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentSection, setCurrentSection, currentSectionRef, setIsScrolled, resetToTop } =
    useLayoutContext();
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
      { threshold: 0.23 },
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
    <div ref={containerRef} className={styles.container}>
      <div className={styles.section}>
        <div className="swiper_container" ref={observerRef}>
          <div className={`absolute top-0 left-0 w-full h-full flex items-center justify-center`}>
            <div
              className="w-full h-full flex-1 shrink-0 absolute top-0 left-0"
              style={{ background: `url(${Visual01.src}) no-repeat right / cover` }}
            ></div>
            <div
              className={`w-full h-full flex-1 shrink-0 absolute top-0 left-0 ${touchValue ? "duration-0" : "duration-800"}`}
              style={{
                background: `url(${Visual02.src}) no-repeat right / cover`,
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
                <strong>with the power</strong> of
                <br /> knowledge
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
                    <Image src={IconVisual01} width={90} height={90} alt="icon visual 01" />
                  </div>
                </li>
                <li>
                  <div>
                    <h3>MI Brief</h3>
                    <p>
                      경쟁사・선도기업의
                      <br />
                      최신 동향
                    </p>
                    <Image
                      src={IconVisual02}
                      width={90}
                      height={90}
                      style={{ width: "auto", height: "auto" }}
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
                      경쟁사・선도기업의
                      <br />
                      최신 동향
                    </p>
                    <Image
                      src={IconVisual03}
                      width={90}
                      height={90}
                      style={{ width: "auto", height: "auto" }}
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
                      경쟁사・선도기업의
                      <br />
                      최신 동향
                    </p>
                    <Image
                      src={IconVisual04}
                      width={90}
                      height={90}
                      style={{ width: "auto", height: "auto" }}
                      alt="icon visual 01"
                    />
                  </div>
                </li>
              </ul>
            </SwiperSlide>
            <div className={`${styles.bg_line}`}></div>
          </Swiper>
        </div>

        <div className={`${styles.search} ${styles.topbottom} ${searchOpen ? styles.open : ""}`}>
          <div className={styles.search_area}>
            <div className={styles.search_tit} onClick={handleSearchToggle}>
              <span>검색</span>
              <Image
                src={IconPlus}
                width={18}
                height={18}
                style={{ width: "1.8rem", height: "1.8rem" }}
                alt="icon plus"
              />
            </div>
            <div className={styles.search_con}>
              <ul>
                <li>
                  <span>기간</span>
                  <div className={`${styles.input_wrap} gap-8`}>
                    <div className="flex items-center flex-1 max-w-[50%]">
                      <DatePicker
                        placeholder="시작일"
                        className="w-full rounded-none px-[2.8rem] py-[1.35rem] font-bold text-pub-grayA justify-between border-r-0"
                        width="w-full"
                      />
                      <DatePicker
                        placeholder="종료일"
                        className="w-full rounded-none px-[2.8rem] py-[1.35rem] font-bold text-pub-grayA justify-between"
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
                      className="min-w-80"
                    />
                    <Input placeholder="검색어를 입력해주세요." size="lg" className="w-full" />
                    <Button variant="red" className="min-w-48 h-[6.2rem]">
                      <Image
                        src={SearchIcon}
                        width={17}
                        height={17}
                        style={{ width: "1.7rem", height: "1.7rem" }}
                        alt="icon search"
                      />
                    </Button>
                  </div>
                </li>
                <li className={styles.keyword}>
                  <span>추천키워드</span>
                  <div className={`${styles.input_wrap} gap-16`}>
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
                  {/* <CardContent list={item} /> */}
                  <CardContent list={item} type="default" className="" />
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
              // selectedRows={selectedUser ? [selectedUser.id] : []}
              containerClassName="main_table"
              onRowSelect={handleSelectRow}
              colgroup={["15%", "60%", "10%", "15%"]}
            />
            <div className={styles.table_more}>
              <button>
                <Image src={IconPlusSm} width={14} height={14} alt="icon plus" />
                <Link href={"/"}>
                  <p>
                    보지 못한 <strong>3개</strong> 최신 콘텐츠가 있습니다.
                  </p>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`flex items-center justify-center w-16 h-16 border border-black bg-black bg-opacity-80 shadow-pc4 fixed bottom-20 right-16 cursor-pointer transition-all ${currentSection < 1 ? "opacity-0 invisible" : "opacity-100 visible"}`}
        onClick={resetToTop}
      >
        <span className="block w-4 h-4 text-[0] border-t-2 border-r-2 border-t-white border-r-white -rotate-45 mt-[0.4rem]">
          top button
        </span>
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
  },
  {
    src: ImageCard02,
    date: "24년 8월 1주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "기획재정부, 시니어 레지던스 활성화 방안 발표 ( 24.7.23 )",
    hash: ["시니어", "레지던스"],
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
    tag: { type: "market", label: "IT Trend" },
    tit: "미국 보안업체 크라우드 스트라이크 IT 대란 요약",
    hash: ["클라우드", "IBM"],
    hits: "10,857",
  },
  {
    src: ImageCard01,
    date: "24년 8월 2주차",
    tag: { type: "external", label: "기관/연구소" },
    tit: "IMF, ‘24년 하반기 세계 경제 전망",
    hash: ["세계경제", "IMF"],
    hits: "2,875",
  },
  {
    src: ImageCard02,
    date: "24년 8월 1주차",
    tag: { type: "market", label: "MI Brief" },
    tit: "기획재정부, 시니어 레지던스 활성화 방안 발표 ( 24.7.23 )",
    hash: ["시니어", "레지던스"],
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
    tag: { type: "market", label: "IT Trend" },
    tit: "미국 보안업체 크라우드 스트라이크 IT 대란 요약",
    hash: ["클라우드", "IBM"],
    hits: "10,857",
  },
];

const tableList = [
  {
    id: 1,
    group: "LX그룹",
    title: "News Feed 레포트 신설",
    hits: "175",
    date: "2024.12.28",
  },
  {
    id: 2,
    group: "LX홀딩스",
    title: "LX홀딩스, 두 번째 그룹 통합 ‘ESG 보고서’ 펴내",
    hits: "1,521",
    date: "2024.12.28",
  },
  {
    id: 3,
    group: "LX홀딩스",
    title: "LX홀딩스, 2024년 정기 임원 인사 실시",
    hits: "57",
    date: "2024.12.28",
  },
  {
    id: 4,
    group: "LX그룹",
    title: "LX그룹, ‘2023 LX배 한국여자야구대회’ 21일 개막",
    hits: "3,587",
    date: "2024.12.28",
  },
  {
    id: 5,
    group: "LX홀딩스",
    title: "LX홀딩스, 그룹 차원 첫 ‘ESG 보고서’ 발간",
    hits: "470",
    date: "2024.12.28",
  },
];

export default HomePage;
