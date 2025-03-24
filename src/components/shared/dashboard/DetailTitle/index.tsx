"use client";

import React, { FC, useEffect, useRef } from "react";
import styles from "./DetailTitle.module.scss";
import Image from "next/image";
import Viewer from "public/images/icon_viewers.svg";
import { useLayoutContext } from "@/layout/MainLayoutProvider";

import IconAIOn from "public/images/icon_AI_on.svg";
import IconAIOff from "public/images/icon_AI_off.svg";

interface Props {
  list: {
    breadcrumb: string[];
    group: string;
    tit: string;
    date: string;
  };
  emergency?: boolean;
  ai?: boolean;
}

const DetailTitle: FC<Props> = ({ list, emergency = false, ai = false }) => {
  const { isDetail, setIsDetail } = useLayoutContext();

  useEffect(() => {
    setIsDetail(true);
    return () => setIsDetail(false);
  }, []);

  return (
    <div className={styles.title_area}>
      <ul className={styles.breadcrumb}>
        {list.breadcrumb.map((item, idx) => (
          <li key={idx}>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-col items-start justify-between gap-7">
        <div className={styles.tit}>
          <p className={`${styles.group} ${emergency ? styles.emergency : ""}`}>{list.group}</p>
          <span className={styles.line}></span>
          <p>{list.tit}</p>
        </div>

        <div className={styles.hits}>
          {/* <Image
            src={Viewer}
            width={20}
            height={20}
            style={{ width: "1.25rem", height: "1.25rem" }}
            alt="icon viewer"
          /> */}
          <div className={styles.date}>
            <span>{list.date}</span>
          </div>

          <span>조회수 547</span>

          {/* <div className={styles.ai}>
            {ai ? (
              // 음성 AI 버튼 ON
              <button>
                <Image
                  src={IconAIOn}
                  style={{ width: "4.375rem", height: "4.375rem" }}
                  alt="icon AI Voice"
                />
              </button>
            ) : (
              // 음성 AI 버튼 OFF
              <button>
                <Image
                  src={IconAIOff}
                  style={{ width: "4.375rem", height: "4.375rem" }}
                  alt="icon AI Voice"
                />
              </button>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DetailTitle;
