import React from "react";
import styles from "./styles/NewsFeed.module.scss";
import { MainSection, PageContainer, TopBar } from "@/components/shared/dashboard";
import SearchList from "./components/SearchList";
import ContentTab from "./components/ContentTab";

import Banner from "public/images/image_banner02.png";
import MIFocusList from "./components/MIFocusList";

const MIBriefPage = () => {
  return (
    <PageContainer>
      <TopBar src={Banner.src} title="MDI 보고서">
        <ContentTab list={["MI Brief", "MI Focus", "IT Trend", "Special Report"]} />
      </TopBar>
      <MainSection>
        <SearchList />
        <MIFocusList />
      </MainSection>
    </PageContainer>
  );
};

export default MIBriefPage;
