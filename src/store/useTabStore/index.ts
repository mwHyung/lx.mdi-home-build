import { ComponentType } from "react";
import createCombinedStore from "../createStore";
import { DynamicTab } from "@/types/ui";

interface ComponentCache {
  [key: string]: ComponentType;
}

interface Props {
  /**
   * 홈 탭
   */
  homeTab: DynamicTab;
  /**
   * 현재 탭
   */
  currentTab: DynamicTab | null;
  /**
   * 탭 목록
   */
  tabs: DynamicTab[];
  /**
   * 탭 스택::뒤로가기를 눌렀을 때 이전 탭으로 이동하기 위한 스택
   */
  tabStack: DynamicTab[];
  /**
   * 탭 컴포넌트 캐시::재사용을 위한 컴포넌트 캐시
   */
  components: ComponentCache;
  openTab: (newTab: DynamicTab) => void;
  closeTab: (value: DynamicTab["path"]) => void;
  resetTab: (pageType: "user" | "admin") => void;
  goBackLastTab: () => void;
  addComponent: (path: string, component: ComponentType) => void;
  showNotFound: () => void;
  showForbidden: () => void;
}

const userHomeTab = {
  label: "Home",
  path: "shared/HomePage",
};

const adminHomeTab = {
  label: "Home",
  path: "admin/HomePage",
};

const notFoundTab = {
  label: "Not Found",
  path: "shared/NotFoundPage",
  isActive: false,
};

const forbiddenTab = {
  label: "Forbidden",
  path: "shared/ForbiddenPage",
  isActive: false,
};

const defaultTabs = [notFoundTab, forbiddenTab];
const initTabs = [...defaultTabs, userHomeTab];

const getInitTabs = (pageType?: "user" | "admin") => {
  const newInitTab = pageType === "admin" ? adminHomeTab : userHomeTab;
  return [...defaultTabs, newInitTab];
};

const useTabStore = createCombinedStore<Props>((set, get) => ({
  homeTab: initTabs[initTabs.length - 1],
  currentTab: initTabs[initTabs.length - 1],
  tabs: initTabs,
  tabStack: [],
  components: {},
  openTab: (newTab: DynamicTab) => {
    history.pushState({ tab: newTab.label }, "", "");
    set(state => ({
      currentTab: newTab,
      tabStack: [...state.tabStack, newTab],
      tabs: state.tabs.find(tab => tab.path === newTab.path)
        ? [...state.tabs]
        : [...state.tabs, newTab],
    }));
  },
  closeTab: (path: DynamicTab["path"]) => {
    const { tabs, currentTab } = get();

    if (currentTab?.path === path) {
      const currentIndex = tabs.findIndex(tab => tab.path === path);
      let nextTabIndex = currentIndex + 1;

      // 마지막 인덱스일 때는 tabs의 마지막으로
      if (currentIndex === tabs.length - 1) {
        nextTabIndex = currentIndex - 1;
      }

      set(state => ({
        currentTab: tabs.length === initTabs.length ? null : state.tabs[nextTabIndex],
      }));
    }

    set(state => ({
      tabs: state.tabs.filter(tab => tab.path !== path),
    }));
  },
  resetTab: pageType => {
    const tabs = getInitTabs(pageType);
    set({
      homeTab: tabs[initTabs.length - 1],
      currentTab: tabs[initTabs.length - 1],
      tabs,
      tabStack: [],
      components: {},
    });
  },
  goBackLastTab: () => {
    const { tabStack } = get();
    const lastTab = tabStack[tabStack.length - 2];
    set(state => ({
      currentTab: lastTab || initTabs[initTabs.length - 1],
      tabStack: state.tabStack.slice(0, -1),
    }));
  },
  addComponent: (path: string, component: ComponentType) =>
    set(state => ({ components: { ...state.components, [path]: component } })),
  showNotFound: () => {
    // openTab or set({ currentTab: ... })
    const { openTab } = get();
    openTab(notFoundTab);
  },
  showForbidden: () => {
    const { openTab } = get();
    openTab(forbiddenTab);
  },
}));

export default useTabStore;
