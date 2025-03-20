import React from "react";
import styles from "./styles/Detail.module.scss";
import { DetailContainer, DetailTitle } from "@/components/shared/dashboard";

const NewsFeedDetailPage = () => {
  return (
    <DetailContainer
      tagList={["ITOCHU", "물류 시설", "치토세시", "반도체", "산업 부동산"]}
      link="https://www.itochu.co.jp/en/news/press/2025/250122.html"
      listLink="/news-feed"
    >
      <DetailTitle
        list={{
          breadcrumb: ["News Feed"],
          group: "ITOCHU",
          tit: "홋카이도 치토세시 물류 시설 개발 발표",
          date: "2025.01.22",
        }}
        ai={true}
      />

      <div className="mt-8">
        <ul className={styles.unordered_list}>
          <li>
            <span>
              ITOCHU은 홋카이도 치토세시에 물류 시설 "i Missions Park Chitose"(가칭)을 개발 할
              계획이라고 발표했습니다.
              <br />이 시설은 ITOCHU가 홋카이도에서 처음으로 개발하는 임대형 물류 센터로, 반도체
              공장 설립 등으로 물류 수요가 증가할 것으로 예상되는 지역적 특성을 반 영한 결정입니다.
            </span>
          </li>
          <li>
            <span>
              부지는 산업단지와 치토세 인터체인지에서 각각 약 4~5km 떨어진 위치로, 광역 물류 운영에
              유리한 교통망을 갖추고 있습니다.
              <br />
              부지는 약 3,000m²에서 7,000m² 크기로 나누어 다양한 산업의 요 구를 충족할 수 있도록
              설계되었습니다.
              <br />
              또한, 재난 발생 시에도 운영을 지속할 수 있도록 보안 시 스템과 비상 발전기가 설치될
              예정입니다.
            </span>
          </li>
          <li>
            <span>
              건설은 2026년 봄에 시작되어 2027년 봄 완공을 목표로 진행됩니다. ITOCHU는 입주 기업 모
              집과 함께 개발 프로젝트를 추진하며, 기존 38개의 일본 내 물류 시설 개발 경험을 활용해
              <br />
              최적의 물류 솔루션을 제공할 계획입니다.
            </span>
          </li>
          <li>
            <span>
              ITOCHU는 "The Brand-new Deal" 경영 방침에 따라 물류 부동산, 공장, 데이터 센터를 포함한
              산업 부동산 부문을 확장하고 있습니다. 이를 통해 소비자와 기업의 다양한 요구를
              충족시키며 일본 전역에서 사업을 확대하고자 합니다.
            </span>
          </li>
        </ul>
      </div>

      <p className={styles.text}>
        &#91;위의 기사는 AI(Chat GPT 4.o)를 기반으로 작성되었습니다.&#93;
      </p>
    </DetailContainer>
  );
};

export default NewsFeedDetailPage;
