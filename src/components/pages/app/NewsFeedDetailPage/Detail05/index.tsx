import React from "react";
import styles from "./styles/Detail.module.scss";
import { DetailContainer, DetailTitle } from "@/components/shared/dashboard";

const NewsFeedDetailPage = () => {
  return (
    <DetailContainer
      tagList={["Tangguh LNG", "CCUS", "UCC 프로젝트", "EGR", "에너지 전환"]}
      link="https://www.mitsubishicorp.com/jp/en/news/release/2024/20241122001.html"
      listLink="news-feed"
    >
      <DetailTitle
        list={{
          breadcrumb: ["News Feed"],
          group: "Mitsubishi Corporation",
          tit: "Tangguh LNG 프로젝트, 70억 달러 규모의 신규 투자 결정",
          date: "2024.11.22",
        }}
        ai={true}
      />

      <div className="mt-8">
        <ul className={styles.unordered_list}>
          <li>
            <span>
              bp가 주도하는 Tangguh LNG 프로젝트의 공동 투자자들은 'Tangguh Ubadari, CCUS,
              Compression(UCC) 프로젝트'에 대해 최종 투자 결정을 내렸습니다. 이 프로젝트는 총 70억
              달러 규모로, 아시아 국가, 특히 일본에 안정적인 에너지를 공급할 것입니다.
            </span>
          </li>
          <li>
            <span>
              UCC 프로젝트는 Ubadari 가스전 개발, 탄소 포집·활용·저장(CCUS)을 통한 가스 회수
              증대(EGR), 그리고 육상 압축기 건설로 구성됩니다. 해당 프로젝트는 2028년부터 단계적으로
              가동 및 생산을 시작할 예정이며, 인도네시아 최초로 대규모 CCUS를 활용한 EGR 기술을
              도입하여 국가 내 CCUS 기술 확산에 기여할 것으로 기대됩니다.
            </span>
          </li>
          <li>
            <span>
              Tangguh LNG 시설은 연간 1,140만 톤의 LNG를 생산할 수 있는 능력을 갖추고 있으며,
              인도네시아 Papua Barat주의 Bintuni Bay에 위치하고 있습니다. bp가 SKK Migas와의 생산
              공유 계약 하에 운영하며, 프로젝트의 운영을 총괄하고 있습니다.
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
