import React from "react";
import styles from "./styles/Detail.module.scss";
import { DetailContainer, DetailTitle } from "@/components/shared/dashboard";
import Image from "next/image";
import Image06 from "public/images/image_detail06.png";

const NoticeDetailPage = () => {
  return (
    <DetailContainer listLink="/notice">
      <DetailTitle
        list={{
          breadcrumb: ["공지사항"],
          group: "긴급",
          tit: "CES* 2025에서 소개된 그룹 사업 관련 신기술 동향",
          date: "2024.12.09",
        }}
        emergency={true}
      />
      <div className="mt-8">
        <Image
          src={Image06}
          width={0}
          height={0}
          style={{ width: "62.375rem", height: "36.938rem" }}
          alt="image content"
        />
      </div>

      <p className={styles.text}>
        - ESG 경영 실천 차원서 기획, 제작... 발달장애 예술가들의 활동 기반 확대 지원.
      </p>

      {/* <p className={styles.text_light}>
        LX그룹이 ESG 경영 실천의 의미를 더한 신년 캘린더를 제작했다.
      </p>
      <p className={styles.text_light}>
        LX홀딩스는 디스에이블드 소속 발달장애 예술가 작품을 수록해 만든 것으로 ‘하티즘(마음주의,
        Heartism)’을 바탕으로 활동하고 있는 이다래 작가, 강선아 작가, 양시영 작가, 정성원 작가의
        <br />
        작품 총 12점을 실었다. 환경을 보호하자는 취지를 더해 재생펄프가 함유된 친환경 용지가 사용된
        것도 특징이다. 하티즘은 발달장애 예술가들이 그리고 싶은 것을 마음대로 솔직하게
        <br /> 표현하는 예술 활동을 뜻한다.
      </p>
      <p className={styles.text_light}>
        이번 캘린더에 ‘자작나무 숲속 친구들’, ‘새들의 집’ 등 그림 4점을 소개한 이다래 작가는
        “생활용품이자 인테리어 소품으로 활용할 수 있는 캘린더를 통해 친숙하게 그림을 선보일수 있어
        기쁘다”며
        <br />
        “색감도 기법도 각양각색인 개성 넘치는 작품들을 일 년 내내 가까이에서 즐겁게 감상해 주시면
        좋겠다.”고 말했다.
      </p>
      <p className={styles.text_light}>
        LX홀딩스 관계자는 “ESG 경영 실천의 의미를 담아보자는 취지에서 기획, 제작한 LX그룹의 신년
        캘린더”라며, “발달장애 예술가들이 예술 활동 기반을 넓혀 나가는데 도움을 주고, 임직원들에게는
        <br />
        발달 장애에 관한 인식 전환 및 사회적 관심을 이끌어낼 수 있는 좋은 기회가 될 것으로
        기대한다”고 설명했다.(끝)
      </p> */}
      <p className={styles.text_light}>
        {`LX그룹이 ESG 경영 실천의 의미를 더한 신년 캘린더를 제작했다.
        
        LX홀딩스는 디스에이블드 소속 발달장애 예술가 작품을 수록해 만든 것으로 ‘하티즘(마음주의, Heartism)’을 바탕으로 활동하고 있는 이다래 작가, 강선아 작가, 양시영 작가, 정성원 작가의
        작품 총 12점을 실었다. 환경을 보호하자는 취지를 더해 재생펄프가 함유된 친환경 용지가 사용된 것도 특징이다. 하티즘은 발달장애 예술가들이 그리고 싶은 것을 마음대로 솔직하게
        표현하는 예술 활동을 뜻한다.
        
        이번 캘린더에 ‘자작나무 숲속 친구들’, ‘새들의 집’ 등 그림 4점을 소개한 이다래 작가는 “생활용품이자 인테리어 소품으로 활용할 수 있는 캘린더를 통해 친숙하게 그림을 선보일수 있어 기쁘다”며
        “색감도 기법도 각양각색인 개성 넘치는 작품들을 일 년 내내 가까이에서 즐겁게 감상해 주시면 좋겠다.”고 말했다.

        LX홀딩스 관계자는 “ESG 경영 실천의 의미를 담아보자는 취지에서 기획, 제작한 LX그룹의 신년 캘린더”라며, “발달장애 예술가들이 예술 활동 기반을 넓혀 나가는데 도움을 주고, 임직원들에게는
        발달 장애에 관한 인식 전환 및 사회적 관심을 이끌어낼 수 있는 좋은 기회가 될 것으로 기대한다”고 설명했다.(끝)`}
      </p>
    </DetailContainer>
  );
};

export default NoticeDetailPage;
