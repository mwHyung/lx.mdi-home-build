import React from "react";
import styles from "./styles/NewsFeed.module.scss";
import { MainSection, PageContainer, TopBar } from "@/components/shared/dashboard";
import SearchList from "./components/SearchList";
import ContentTab from "./components/ContentTab";

import Banner from "public/images/image_banner02.png";
import MIBriefList from "./components/MIBriefList";

const MIBriefPage = () => {
  return (
    <PageContainer>
      <TopBar src={Banner.src} title="MDI 리포트">
        <ContentTab list={["MI Brief", "MI Focus", "IT Trend", "Special Report"]} />
      </TopBar>
      <MainSection>
        <SearchList />
        <MIBriefList />
      </MainSection>
    </PageContainer>
  );
};

export default MIBriefPage;
