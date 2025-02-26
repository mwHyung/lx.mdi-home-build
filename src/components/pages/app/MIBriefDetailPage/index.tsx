import React from "react";
import styles from "./styles/Detail.module.scss";
import { DetailContainer, DetailTitle } from "@/components/shared/dashboard";
import Image from "next/image";
import Image01 from "public/images/image_detail01.png";
import Image02 from "public/images/image_detail02.png";
import Image03 from "public/images/image_detail03.png";
import Image04 from "public/images/image_detail04.png";
import Image05 from "public/images/image_detail05.png";

const imageList = [
  {
    src: Image02,
    text: "핸들과 기어 위치에 Micro LED, 전면 유리 하단에\n홀로그램 탑재",
  },
  {
    src: Image03,
    text: "붙이고(Spliced) 감기(Rollable)가 가능하여 화면 크기를\n유연하게 조절",
  },
  {
    src: Image04,
    text: "13인치 Sliding 및 Multi-curvature OLED(곡선형)\n디스플레이 탑재",
  },
];

const MIBriefDetailPage = () => {
  return (
    <DetailContainer
      tagList={[
        "Micro LED",
        "홀로그램",
        "소프트웨어",
        "디스플레이",
        "자율주행",
        "플렉시블",
        "폴더블",
        "롤러블",
        "신기술",
        "CES2025",
        "SDV",
      ]}
      link="www.lxholdings.com"
      files={[
        "Attached File Name Max 1 Line Attached File Name Max 1 Line.pdf",
        "Attached File Name Max 1 Line Attached File Name Max 1 Line.extension",
      ]}
      listLink="market-trends"
    >
      <DetailTitle
        list={{
          breadcrumb: ["시장동향", "MI Focus"],
          group: "LX그룹",
          tit: "CES* 2025에서 소개된 그룹 사업 관련 신기술 동향",
          date: "2024.12.09",
        }}
      />
      <div>
        <Image
          src={Image01}
          width={0}
          height={0}
          style={{ width: "99.8rem", height: "59.1rem" }}
          alt="image content"
        />
      </div>
      <div className="flex flex-col gap-4">
        <h4 className={styles.h4}>CES* 2025에서 소개된 그룹 사업 관련 신기술 동향</h4>
        <p className={styles.ex_s}>
          * Consumer Electronics Show : 미국 소비자기술협회 (CTA)가 주최하는 세계 최대 규모의 소비자
          가전 박람회
        </p>
      </div>

      <p className={styles.text}>
        4,500개 이상의 기업이 참가하여 “Connect. Solve. Discover. DIVE IN”을 주제로 1월 7일 부터 4일
        동안 새로운 기술과 제품 ( AI, 디지털 헬스, 첨단 모빌리티 분야에 집중 )을 소개하였음.
        <br />
        디스플레이/완성차 제조업체들은 지능형운전석( Smart Cockpit ) 과 소프트웨어 정의 차량( SDV :
        Software Defined Vehicle ) 관련 신기술을 집중적으로 선보였음.
      </p>

      <div className="flex flex-col gap-4">
        <p className={styles.text}>
          지능형 운전석 디스플레이에는 Micro LED, 홀로그램, 플레시블(폴더블/롤러블) 등의 기술이 적용
        </p>
        <ul className="flex gap-16">
          {imageList.map((list, idx) => (
            <li key={idx} className="flex flex-col gap-4">
              <Image
                src={list.src}
                width={0}
                height={0}
                style={{ width: "47.9rem", height: "29.7rem" }}
                alt="image detail"
              />
              <p className={styles.ex}>{list.text}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Image
          src={Image05}
          width={0}
          height={0}
          // style={{ width: "99.8rem", height: "55.6rem" }}
          alt="image detail"
        />
      </div>

      <p className={styles.text}>
        소프트웨어 정의 차량 분야에서는 차량 내부( 측면 창문, 차량 천장 )의 다양한 공간을
        디스플레이로 대체하는 기술을 공개 : <br /> 자율주행 기술이 고도화되면서, 주행 중에서도 운전
        외 할 수 있는 일이 늘어남에 따라 게임, 영상 시청 등의 수요가 증가하게 될 전망
      </p>
    </DetailContainer>
  );
};

export default MIBriefDetailPage;
