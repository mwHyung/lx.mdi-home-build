"use client";

import React, { FC, ReactNode, useEffect, useRef } from "react";
import styles from "./DetailContainer.module.scss";
import Link from "next/link";
import { useLayoutContext } from "@/layout/MainLayoutProvider";

interface Props {
  tagList?: string[];
  link?: string;
  files?: string[];
  listLink?: string;
  children: ReactNode;
}

const DetailContainer: FC<Props> = ({ tagList, link, files, listLink = "/", children }) => {
  const { isScrolled, resetToTop } = useLayoutContext();

  return (
    <div className={styles.detail_wrap}>
      <div className={styles.detail_box}>
        <div className={styles.content_area}>
          {children}

          {/* tag list */}
          {tagList && (
            <ul className={styles.tag}>
              {tagList.map((list, idx) => (
                <li key={idx}>
                  <span>{list}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {!link && !files ? (
        ""
      ) : (
        <div className={styles.files}>
          <table>
            <colgroup>
              <col width={"20%"} />
              <col width={"80%"} />
            </colgroup>
            <tbody>
              <tr>
                <th>링크</th>
                <td className={styles.link}>
                  <Link href={`${link}`} target="_blank">
                    {link}
                  </Link>
                </td>
              </tr>
              {files && (
                <>
                  <tr>
                    <th rowSpan={files?.length + 1}>첨부파일</th>
                  </tr>
                  {files?.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item}</td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className={styles.list_wrap}>
        <ul className={styles.lists}>
          <li>
            <Link href={"/"}>
              <strong>이전글</strong>
              <span>News Feed 레포트 신설</span>
            </Link>
          </li>
          <li className={styles.disabled}>
            <Link href={""}>
              <strong>다음글</strong>
              <span>다음글이 없습니다.</span>
            </Link>
          </li>
        </ul>

        <Link href={`/${listLink}`} className={styles.list_link}>
          <button type="button">목록</button>
        </Link>
      </div>

      <div
        className={`flex items-center justify-center w-10 h-10 border border-black bg-black bg-opacity-80 shadow-pc4 fixed bottom-[3.125rem] right-10 cursor-pointer transition-all ${isScrolled ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={resetToTop}
      >
        <span className="block w-3 h-3 text-[0] border-t-2 border-r-2 border-t-white border-r-white -rotate-45 mt-2">
          top button
        </span>
      </div>
    </div>
  );
};

export default DetailContainer;
