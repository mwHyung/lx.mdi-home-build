import Link from "next/link";
import React, { FC, ReactNode } from "react";

interface Props {
  tit: string;
  hits: string;
  className?: string;
  children: ReactNode;
}

const SearchMain: FC<Props> = ({ tit, hits, className, children }) => {
  return (
    <div
      className={`flex flex-col gap-16 px-48 py-40 max-w-[1920px] w-full m-[0_auto] ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-6">
          <h2 className="text-black text-[4.6rem] font-bold">{tit}</h2>
          <span className="text-pub-red text-[1.6rem] font-bold">{hits}</span>
        </div>
        <div>
          <Link href={"/"}>
            <span className="flex items-center justify-center gap-4 text-black text-[1.8rem] tracking-[-0.018rem] after:content-[''] after:w-[0.9rem] after:h-[0.9rem] after:border-r after:border-b after:border-black after:-rotate-45">
              더보기
            </span>
          </Link>
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
};

export default SearchMain;
