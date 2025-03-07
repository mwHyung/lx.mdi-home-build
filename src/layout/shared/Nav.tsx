"use client";

import { usePathname, useRouter } from "next/navigation";
import { useGlobalSetting, usePublic } from "@/hooks";
import { MenuTree } from "@/types/model-extension";
import { Id } from "@/types/shared";
import { FC, useState } from "react";

import styles from "./Nav.module.scss";
import Link from "next/link";

interface Props {
  activeMenu: string | null;
  setActiveMenu: (menu: string | null) => void;
  searchOpen: boolean;
  setSearchOpen: (search: boolean) => void;
  isScrolled: boolean | null;
  detail: boolean;
}

type Nav = { id: string };

const mockProgramMenus = [
  {
    menuId: "1001",
    menuCode: "1001",
    menuName: "News Feed",
    systemId: "S000",
    depth: 1,
    path: "/news-feed",
    menuIndex: 1,
    isActive: true,
    isProgram: true,
    children: [],
  },
  {
    menuId: "1001",
    menuCode: "1001",
    menuName: "시장동향",
    systemId: "S000",
    depth: 1,
    // path: "/news-feed",
    menuIndex: 1,
    isActive: true,
    isProgram: true,
    children: [
      {
        menuId: "1001",
        menuCode: "1001",
        menuName: "MI Brief",
        systemId: "S000",
        depth: 2,
        path: "/market-trends",
        menuIndex: 1,
        isActive: true,
        isProgram: true,
        children: [],
      },
      {
        menuId: "1001",
        menuCode: "1001",
        menuName: "MI Focus",
        systemId: "S000",
        depth: 2,
        path: "/market-trends",
        menuIndex: 1,
        isActive: true,
        isProgram: true,
        children: [],
      },
      {
        menuId: "1001",
        menuCode: "1001",
        menuName: "Special Report",
        systemId: "S000",
        depth: 2,
        path: "/market-trends",
        menuIndex: 1,
        isActive: true,
        isProgram: true,
        children: [],
      },
      {
        menuId: "1001",
        menuCode: "1001",
        menuName: "IT Trend",
        systemId: "S000",
        depth: 2,
        path: "/market-trends",
        menuIndex: 1,
        isActive: true,
        isProgram: true,
        children: [],
      },
    ],
  },
  {
    menuId: "1001",
    menuCode: "1001",
    menuName: "외부자료",
    systemId: "S000",
    depth: 1,
    // path: "/news-feed",
    menuIndex: 1,
    isActive: true,
    isProgram: true,
    children: [],
  },
  {
    menuId: "1001",
    menuCode: "1001",
    menuName: "공지사항",
    systemId: "S000",
    depth: 1,
    // path: "/news-feed",
    menuIndex: 1,
    isActive: true,
    isProgram: true,
    children: [],
  },
];

const Nav: FC<Props> = ({
  activeMenu,
  setActiveMenu,
  searchOpen,
  setSearchOpen,
  detail,
  isScrolled,
}) => {
  const router = useRouter();

  const dummyData = [
    {
      label: "News Feed",
      path: "/news-feed",
      submenu: [],
    },
    {
      label: "시장동향",
      submenu: [
        {
          label: "MI Brief",
          path: "/market-trends",
        },
        {
          label: "MI Focus",
          path: "/market-trends",
        },
        {
          label: "Special Report",
          path: "/market-trends",
        },
        {
          label: "IT Trend",
          path: "/market-trends",
        },
      ],
    },
    {
      label: "외부자료",
      submenu: [
        {
          label: "기업 / 연구소",
          path: "/external-data",
        },
        {
          label: "강연 / 세미나",
          path: "/external-data",
        },
      ],
    },
    {
      label: "공지사항",
      submenu: [
        {
          label: "공지사항",
          path: "/notice",
        },
      ],
    },
  ];

  const mouseEnter = (label: string) => {
    setActiveMenu(label);
    setSearchOpen(false);
  };

  return (
    <nav
      className={`${styles.nav} ${isScrolled ? styles.scrolling : ""} ${activeMenu ? styles.active : ""}`}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <ul
        className={`${styles.menu} ${activeMenu ? "!border-b-pub-grayD" : ""} ${searchOpen ? "!border-b-pub-grayD" : ""}`}
      >
        {dummyData.map((item, idx) => (
          <li
            key={idx}
            className={`${styles.menu_item} ${activeMenu === item.label ? styles.active : ""}`}
            onMouseEnter={() => mouseEnter(item.label)}
          >
            <div
              className={`text-main-white ${styles.title} ${activeMenu || searchOpen ? "text-pub-nav" : ""} ${isScrolled || detail ? "text-pub-nav" : ""}`}
            >
              {item.path ? <Link href={item.path}>{item.label}</Link> : item.label}
            </div>

            {item.submenu.length > 0 && (
              <div
                key={item.label}
                className={`${styles.dropdown_content} ${activeMenu === item.label ? styles.show : ""}`}
              >
                <ul>
                  {item.submenu.map((subitem, idx) => (
                    <li key={idx} className={styles.submenu_item}>
                      <Link href={subitem.path}>
                        <div className={styles.sub_tit} title={subitem.label}>
                          {subitem.label}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* {dummyData.find(item => item.label === activeMenu)?.submenu.length > 0 && ( */}
      <div
        className={`${styles.dropdown_background} ${activeMenu && activeMenu !== "News Feed" ? styles.show : ""}`}
      ></div>
      {/* )} */}
    </nav>
  );
};

export default Nav;
