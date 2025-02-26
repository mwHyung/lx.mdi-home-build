import React from "react";
import styles from "./styles/NewsFeed.module.scss";
import { MainSection, PageContainer, TopBar } from "@/components/shared/dashboard";
import SearchList from "./components/SearchList";
import ContentTab from "./components/ContentTab";

import Banner from "public/images/image_banner01.png";
import NewsFeedList from "./components/NewsFeedList";

const NewsFeedPage = () => {
  return (
    <PageContainer>
      <TopBar src={Banner.src} title="News Feed">
        <ContentTab list={["News Feed"]} />
      </TopBar>
      <MainSection>
        <SearchList />
        <NewsFeedList />
      </MainSection>
    </PageContainer>
  );
};

export default NewsFeedPage;
