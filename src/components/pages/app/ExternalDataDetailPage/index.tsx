import React from "react";
import styles from "./styles/Detail.module.scss";
import { DetailContainer, DetailTitle } from "@/components/shared/dashboard";

const ExternalDataDetailPage = () => {
  return (
    <DetailContainer
      link="https://assets.kpmg.com/content/dam/kpmg/kr/pdf/2024/business-focus/kpmg-korea-funeral-service-20240913.pdf"
      listLink="/external-data"
    >
      <DetailTitle
        list={{
          breadcrumb: ["외부 보고서", "기관 · 연구소"],
          group: "KPMG",
          tit: "무덤에서 요람으로. 대전환을 앞둔 상조서비스업",
          date: "2025.01.15",
        }}
      />

      <div className="mt-5">
        <ol className={styles.ordered_list}>
          <li>
            <span>상조서비스업의 부상과 개요</span>
          </li>
          <li>
            <span>상조서비스업 성장 배경 및 시장 현황</span>
          </li>
          <li>
            <span>상조서비스업 트렌드</span>
          </li>
          <li>
            <span>결론 및 시사점</span>
          </li>
        </ol>
      </div>
    </DetailContainer>
  );
};

export default ExternalDataDetailPage;
