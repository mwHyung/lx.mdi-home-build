import React, { FC } from "react";
import styles from "./CardContent.module.scss";
import Image from "next/image";
import Viewer from "public/images/icon_viewers.svg";
import Link from "next/link";

interface Props {
  list: {
    src?: any;
    date?: string;
    tag?: {
      type: string;
      label: string;
    };
    tit?: string;
    hash?: string[];
    hits?: string;
    dateS?: string;
  };
  className: string;
  type?: "default" | "card" | "list";
  link?: string;
}

const CardContent: FC<Props> = ({ list, className, type = "default", link = "/" }) => {
  return (
    <div className={`${styles.card} ${styles[className]}`}>
      <Link href={`${link}`}>
        <div className={styles.image}>
          <Image
            src={list.src}
            width={0}
            height={0}
            style={{ width: "100%", height: "100%" }}
            alt="card background image"
          />
          {type === "list" && (
            <div className={styles.date}>
              <h4>{list.date}</h4>
            </div>
          )}
        </div>
        <div className={styles.date}>
          <h4>{list.date}</h4>
        </div>
        <div className={styles.explain}>
          <div className={styles.back}>
            <div className={styles.tag}>
              {list.tag?.type === "market" && (
                <>
                  <span className={styles.market}>시장동향</span>
                  <span>{list.tag?.label}</span>
                </>
              )}
              {list.tag?.type === "external" && (
                <>
                  <span className={styles.external}>외부자료</span>
                  <span>{list.tag?.label}</span>
                </>
              )}
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
              <Image src={Viewer} width={20} height={20} alt="icon viewer" />
              <span>{list.hits}</span>

              {type === "card" ||
                (type === "list" && (
                  <div className={styles.date}>
                    <h4>{list.dateS}</h4>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardContent;
