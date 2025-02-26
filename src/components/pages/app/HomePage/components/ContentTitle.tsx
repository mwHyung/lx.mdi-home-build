import React, { FC, useState } from "react";
import styles from "../styles/Home.module.scss";
import Link from "next/link";

interface Props {
  title: string;
  type: "tab" | "more";
}

const ContentTitle: FC<Props> = ({ title, type }) => {
  const [selected, setSelected] = useState(0);
  const handleSelected = (idx: number) => {
    setSelected(idx);
  };

  const tabList = ["전체", "시장동향", "외부자료"];

  return (
    <div className={styles.content_title}>
      <h2>{title}</h2>
      {type === "tab" && (
        <ul>
          {tabList.map((item, idx) => (
            <li key={idx} onClick={() => handleSelected(idx)}>
              <button className={selected === idx ? styles.active : ""}>{item}</button>
            </li>
          ))}
        </ul>
      )}
      {type === "more" && (
        <div className={styles.more}>
          <Link href={"/"}>
            <span>더보기</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ContentTitle;
