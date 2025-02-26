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
      <TopBar src={Banner.src} title="시장동향">
        <ContentTab list={["MI Brief", "MI Focus", "Special Report", "IT Trend"]} />
      </TopBar>
      <MainSection>
        <SearchList />
        <MIBriefList />
      </MainSection>
    </PageContainer>
  );
};

export default MIBriefPage;
