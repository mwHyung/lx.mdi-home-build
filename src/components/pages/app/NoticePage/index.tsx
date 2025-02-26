import React from "react";
import styles from "./styles/NewsFeed.module.scss";
import { MainSection, PageContainer, TopBar } from "@/components/shared/dashboard";
import SearchList from "./components/SearchList";
import ContentTab from "./components/ContentTab";

import Banner from "public/images/image_banner04.png";
import NoticeList from "./components/NoticeList";

const NoticePage = () => {
  return (
    <PageContainer>
      <TopBar src={Banner.src} title="공지사항">
        <ContentTab list={["공지사항"]} />
      </TopBar>
      <MainSection>
        <SearchList />
        <NoticeList />
      </MainSection>
    </PageContainer>
  );
};

export default NoticePage;
