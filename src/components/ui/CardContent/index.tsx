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
    category?: string;
    tit?: string;
    hash?: string[];
    hits?: string;
    dateS?: string;
  };
  className: string;
  type?: "default" | "card" | "list" | "external";
  main?: boolean;
  link?: string;
  pdf?: boolean;
  onClick?: () => void;
}

const CardContent: FC<Props> = ({
  list,
  className,
  type = "default",
  main,
  link = "/",
  pdf = false,
  onClick,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!pdf) return;
    event.preventDefault();
    console.log("링크 클릭, 화면 이동X");
  };

  return (
    <div className={`${styles.card} ${styles[className]}`} onClick={onClick}>
      <Link href={`${link}`} onClick={handleClick}>
        <div className={styles.image}>
          <div className={styles.box}>
            <Image
              src={list.src}
              style={{ width: "100%", height: "100%" }}
              alt="card background image"
            />
          </div>
          {/* {type === "list" && (
            <div className={styles.date}>
              <h4>{list.date}</h4>
            </div>
          )} */}
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

                  <div className={styles.tit_wrap}>
                    <strong className="block text-[1.125rem] leading-none mb-2">{`${list.category ? list.category + " | " : ""}`}</strong>
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
                    {/* <Image src={Viewer} width={20} height={20} alt="icon viewer" /> */}
                    <span>조회수 {list.hits}</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* <div className={styles.tag}>
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
                </div> */}

                <div className={styles.date}>
                  <h4>{list.date}</h4>
                </div>

                <div className={styles.tit_wrap}>
                  {type === "list" ? (
                    list.category && <strong>{`${list.category ? list.category : ""}`}</strong>
                  ) : (
                    <strong className="block text-[1.375rem] leading-none mb-2">{`${list.category ? list.category : ""}`}</strong>
                  )}
                  <p className={styles.tit}>{list.tit}</p>
                </div>

                <ul className={styles.hash}>
                  {list.hash?.map((item, idx) => (
                    <li key={idx}>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className={styles.hits}>
                  {/* <Image src={Viewer} width={20} height={20} alt="icon viewer" /> */}
                  <span
                    className={`${type === "card" ? styles.hits_card : ""} ${type === "list" ? styles.hits_list : ""}`}
                  >
                    조회수 <span>{list.hits}</span>
                  </span>

                  {type === "card" ||
                    (type === "list" && (
                      <div className={styles.date}>
                        <h4>{list.dateS}</h4>
                      </div>
                    ))}
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
