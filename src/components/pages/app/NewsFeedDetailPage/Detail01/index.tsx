import React from "react";
import styles from "./styles/Detail.module.scss";
import { DetailContainer, DetailTitle } from "@/components/shared/dashboard";

const NewsFeedDetailPage = () => {
  return (
    <DetailContainer
      tagList={["Cortex-M4F", "모터제어", "고속연산", "가전제품", "H/W호환성"]}
      link="http://www.abov.co.kr/bbs/board.php?tbl=pr2&mode=VIEW&num=107&type=&category=&findType=&findWord=&sort1=&sort2=&it_id=&shop_flag=&mobile_flag=&page=1 &language=kr"
      listLink="news-feed"
    >
      <DetailTitle
        list={{
          breadcrumb: ["News Feed"],
          group: "어보브반도체",
          tit: "고성능 모터 제어용 MCU, A34M456 출시",
          date: "2025.01.15",
        }}
        ai={true}
      />

      <div className="mt-8">
        <ul className={styles.unordered_list}>
          <li>
            <span>
              A34M456은 140MHz Cortex-M4F 코어를 기반으로 256KB Flash, 32KB Data Flash, 32KB SRAM을
              탑재한 고성능 MCU입니다. <br /> 고속 12-bit ADC와 MPWM을 통해 2개의 인버터 모터 또는
              1개의 인버터 모터와 PFC 제어가 가능하며, 다양한 Peripheral을 지원해 유연성을
              제공합니다.
            </span>
          </li>
          <li>
            <span>
              A34M456은 기존 A34M41x 시리즈의 후속 제품으로, Core Clock Speed가 120MHz에서 140MHz로
              향상되어 연산 속도와 성능이 강화되었습니다. 특히 에어컨, 세탁기, 냉장고 등
              가전제품에서 모터 제어 MCU로 최적화된 기능을 제공합니다.
            </span>
          </li>
          <li>
            <span>
              이 제품은 기존 제품과 동일한 H/W 호환성을 제공하여 개발 시간과 비용을 절감할 수
              있습니다. 또한, LQFP 패키지로 두 가지 핀 옵션(LQFP-100, LQFP-64)을 지원하며, 2.7~5.5V
              전압과 -40 ~ 105℃ 온도 범위에서 동작합니다.
            </span>
          </li>
          <li>
            <span>
              어보브반도체는H/W 툴, S/W 라이브러리, 온라인 기술 지원을 포함한 사용자 친화적인
              에코시스템을 제공해 개발자가 새로운 환경에 빠르게 적응할 수 있도록 돕습니다.
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
