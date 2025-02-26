import React, { FC } from "react";
import styles from "./DetailTitle.module.scss";
import Image from "next/image";
import Viewer from "public/images/icon_viewers.svg";

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
  return (
    <div className={styles.title_area}>
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
