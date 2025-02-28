"use client";

import React, { FC, useEffect, useRef } from "react";
import styles from "./DetailTitle.module.scss";
import Image from "next/image";
import Viewer from "public/images/icon_viewers.svg";
import { useLayoutContext } from "@/layout/MainLayoutProvider";

interface Props {
  list: {
    breadcrumb: string[];
    group: string;
    tit: string;
    date: string;
  };
  emergency?: boolean;
}

const DetailTitle: FC<Props> = ({ list, emergency = false }) => {
  const { setIsDetail, setIsScrolled } = useLayoutContext();
  // 스크롤
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsDetail(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting); // 보이지 않으면 true
      },
      { threshold: 0.999 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      setIsDetail(false);
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [setIsScrolled]);

  return (
    <div className={styles.title_area} ref={observerRef}>
      <ul className={styles.breadcrumb}>
        {list.breadcrumb.map((item, idx) => (
          <li key={idx}>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between">
        <div className={styles.tit}>
          <p className={emergency ? styles.emergency : ""}>{list.group}</p>
          <span className={styles.line}></span>
          <p>{list.tit}</p>
        </div>

        <div className={styles.hits}>
          <Image src={Viewer} width={20} height={20} alt="icon viewer" />
          <span>547</span>

          <div className={styles.date}>
            <span>{list.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTitle;
