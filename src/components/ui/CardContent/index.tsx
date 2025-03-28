"use client";

import React, { FC, useState } from "react";
import styles from "./CardContent.module.scss";
import Image from "next/image";
import Viewer from "public/images/icon_viewers.svg";
import Link from "next/link";

import IconPlay from "public/images/icon_play.png";
import IconPause from "public/images/icon_pause.png";
import { useRouter } from "next/navigation";

interface Props {
  list: {
    src?: any;
    date?: string;
    tag?: {
      type: string;
      label: string;
    };
    category?: string;
    tit?: string;
    hash?: string[];
    hits?: string;
    publicDate?: string;
  };
  className: string;
  type?: "default" | "card" | "list" | "external";
  main?: boolean;
  link?: string;
  pdf?: boolean;
  aiSelected?: boolean;
  onClick?: () => void;
  selectedTitle?: string;
  setSelectedTitle?: (tit: string) => void;
}

const CardContent: FC<Props> = ({
  list,
  className,
  type = "default",
  main,
  link = "/",
  pdf = false,
  aiSelected = false,
  onClick,
  selectedTitle,
  setSelectedTitle,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (aiSelected) {
      event.preventDefault();
      const currentTitle = list.tit ?? "";
      setSelectedTitle?.(currentTitle === selectedTitle ? "" : currentTitle);
      return;
    }

    if (pdf) {
      event.preventDefault();
      onClick?.();
      console.log("링크 클릭, 화면 이동X");
      return;
    }
  };

  return (
    <div className={`${styles.card} ${styles[className]}`}>
      <Link href={`${link}`} onClick={handleClick}>
        <div className={styles.image}>
          <div className={styles.box}>
            <Image
              src={list.src}
              style={{ width: "100%", height: "100%" }}
              alt="card background image"
            />
          </div>
          {aiSelected && (
            <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center bg-white bg-opacity-40">
              {selectedTitle === list.tit ? (
                <button type="button">
                  <Image src={IconPause} alt="pause icon" />
                </button>
              ) : (
                <button type="button">
                  <Image src={IconPlay} alt="play icon" />
                </button>
              )}
            </div>
          )}
        </div>
        <div className={styles.date}>
          <h4>{list.date}</h4>
        </div>
        <div className={styles.explain}>
          <div className={styles.back}>
            {type === "default" ? (
              <>
                <div className={styles.top}>
                  <div className={styles.tag}>
                    {list.tag?.type === "market" && (
                      <>
                        <span className={styles.market}>MDI 보고서</span>
                        <span>{list.tag?.label}</span>
                      </>
                    )}
                    {list.tag?.type === "external" && (
                      <>
                        <span className={styles.external}>외부 보고서</span>
                        <span>{list.tag?.label}</span>
                      </>
                    )}
                  </div>

                  <div className={styles.tit_wrap}>
                    {list.category && (
                      <strong className="block text-[1.125rem] leading-none mb-2">{`${list.category ? list.category + " | " : ""}`}</strong>
                    )}
                    <p className={styles.tit}>{list.tit}</p>
                  </div>
                </div>
                <div className={styles.bottom}>
                  <ul className={styles.hash}>
                    {list.hash?.map((item, idx) => (
                      <li key={idx}>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={styles.hits}>
                    <span>조회수 {list.hits}</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.date}>
                  {list.category && (
                    <strong>{`${list.category ? list.category + " |" : ""}`}</strong>
                  )}
                  <h4>{list.date}</h4>
                </div>

                <p className={styles.tit}>{list.tit}</p>

                <ul className={styles.hash}>
                  {list.hash?.map((item, idx) => (
                    <li key={idx}>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className={styles.hits}>
                  {(type === "card" || type === "list") && (
                    <div className={styles.date}>
                      <h4>{list.publicDate}</h4>
                    </div>
                  )}

                  <span
                    className={`${type === "card" ? styles.hits_card : ""} ${type === "list" ? styles.hits_list : ""}`}
                  >
                    조회수 <span>{list.hits}</span>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardContent;
