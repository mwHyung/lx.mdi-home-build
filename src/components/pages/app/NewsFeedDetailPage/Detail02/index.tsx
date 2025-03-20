import React from "react";
import styles from "./styles/Detail.module.scss";
import { DetailContainer, DetailTitle } from "@/components/shared/dashboard";

const NewsFeedDetailPage = () => {
  return (
    <DetailContainer
      tagList={[
        "Saint-Gobain",
        "Gyproc SoundBloc Infinaé 100",
        "재활용 석고",
        "순환 경제",
        "지속 가능성",
      ]}
      link="https://www.saint-gobain.com/sites/saint-gobain.com/files/media/document/20250116_plasterboard_VA.pdf"
      listLink="/news-feed"
    >
      <DetailTitle
        list={{
          breadcrumb: ["News Feed"],
          group: "Saint-Gobain",
          tit: "재활용 소재로 만든 첫 번째 석고보드 출시",
          date: "2025.01.15",
        }}
        ai={true}
      />

      <div className="mt-8">
        <ul className={styles.unordered_list}>
          <li>
            <span>
              Saint-Gobain은 2022년 프랑스에서 50% 이상의 재활용 석고를 포함한 석고보드를 출시한 이
              후,
              <br />
              이번에는 영국에서 100% 재활용 재료로 제조된 석고보드를 선보였습니다. 이 석고보드,
              Gyproc SoundBloc Infinaé 100은 순환 경제를 지원하는 중요한 이정표로,
              <br /> 전 세계 최초로 재활용 석고로만 만든 석고보드입니다.
            </span>
          </li>
          <li>
            <span>
              이 제품은 Saint-Gobain의 영국 자회사인 British Gypsum에서 개발했으며, 건설 현장에서
              발생 하는
              <br />
              석고 폐기물을 활용해 제조됩니다. 이를 통해 고품질의 석고보드를 생산하며, 건설 회사들이
              <br />
              지속 가능성 목표를 달성하는 데 도움을 줍니다.
            </span>
          </li>
          <li>
            <span>
              Saint-Gobain UK 및 Ireland의 CEO인 Mike Chaldecott는 “Gyproc SoundBloc Infinaé 100은
              건설 산업의 혁신을 위한 우리의 의지를 상징하며,
              <br /> 재활용을 촉진하고 자연 자원을 보호하는 역할을 다하고 있습니다”라고 말했습니다.
            </span>
          </li>
          <li>
            <span>
              British Gypsum은 재활용 전문성을 바탕으로 건설 현장에서 발생하는 석고보드 및 관련
              제품을
              <br />
              수거하는 서비스를 제공하며, 순환 경제를 지원하는 다양한 활동에 참여하고 있습니다.
              <br />
              또한, 공급망에서 발생하는 폐기물 감소를 위한 협력도 이어가고 있습니다.
            </span>
          </li>
          <li>
            <span>
              이 프로젝트는 Saint-Gobain이 2050년까지 탄소 배출 제로 달성을 목표로 하고 있음을
              보여주는 중요한 사례입니다.
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
