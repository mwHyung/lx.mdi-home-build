import React from "react";
import styles from "./styles/Detail.module.scss";
import { DetailContainer, DetailTitle } from "@/components/shared/dashboard";

const NewsFeedDetailPage = () => {
  return (
    <DetailContainer
      tagList={["ITOCHU", "Kawasaki Motors", "전략적 제휴", "파워스포츠 시장"]}
      link="https://www.itochu.co.jp/en/news/press/2024/241108.html"
      listLink="/news-feed"
    >
      <DetailTitle
        list={{
          breadcrumb: ["News Feed"],
          group: "ITOCHU",
          tit: "Kawasaki Motors와 전략적 사업 제휴 체결",
          date: "2024.11.08",
        }}
        ai={true}
      />

      <div className="mt-8">
        <ul className={styles.unordered_list}>
          <li>
            <span>
              ITOCHU는 Kawasaki Motors의 지분 20%를 인수하며 양사 간 전략적 사업 제휴를 맺었습니다.
              이를 통해 미국에서 사용자 금융(User Financing) 사업을 위한 합작 회사를 설립할
              <br />
              계획입니다. 미국 파워스포츠 시장은 약 150억 달러 규모로 세계 최대이며, COVID-19 이후
              야외 레저 활동에 대한 관심 증가로 성장세가 지속되고 있습니다.
            </span>
          </li>
          <li>
            <span>
              Kawasaki Motors는 미국 내 오토바이 시장에서 높은 점유율을 바탕으로, 향후 다양한 고객
              수요를 충족시킬 새로운 제품을 출시할 예정입니다.
              <br /> 특히 4륜 오프로드 차량 시장에서 판매를 확대할 계획이며, 이에 따른 장기 할부금융
              수요가 증가할 것으로 예상됩니다.
            </span>
          </li>
          <li>
            <span>
              ITOCHU와 Kawasaki Motors는 신속한 신용 심사와 경쟁력 있는 금융 상품 제공을 통해
              파워스포츠 시장에서의 시장에서의 경쟁력을 강화할 것입니다. 글로벌 판매 확대를 위해
              인재 교류와 ITOCHU의 글로벌 네트워크를 활용할 예정입니다. 특히 북미뿐 아니라 CIS,
              중동, 아프리카, 라틴아메리카, 인도 및 동아시아 등 신흥 시장에서 파워스포츠 제품 판매를
              강화할 계획입니다.
              <br />
              양사는 장기적으로 협력 구조를 공고히 하며 지속 가능한 경쟁력을 구축하고자 합니다.
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
