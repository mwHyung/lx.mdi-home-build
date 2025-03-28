import React from "react";
import styles from "./styles/External.module.scss";
import { MainSection, PageContainer, TopBar } from "@/components/shared/dashboard";
import SearchList from "./components/SearchList";
import ContentTab from "./components/ContentTab";

import Banner from "public/images/image_banner03.png";
import ExternalDataList from "./components/ExternalDataList";

const ExternalDataPage = () => {
  return (
    <PageContainer>
      <TopBar src={Banner.src} title="외부 보고서">
        <ContentTab list={["기관 · 연구소", "강연 · 세미나"]} />
      </TopBar>
      <MainSection>
        <SearchList />
        <ExternalDataList />
      </MainSection>
    </PageContainer>
  );
};

export default ExternalDataPage;
