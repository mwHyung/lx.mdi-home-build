import { useMemo } from "react";
import { Column } from "@/types/ui";
import Link from "next/link";
import Image from "next/image";
import IconViewer from "public/images/icon_viewers_rate.svg";

const Columns = () => {
  const contentsColumns: Column[] = useMemo(
    () => [
      {
        id: "category",
        label: "구분",
        dataAlign: "center",
        render: (category: any) => {
          return <span>{category}</span>;
        },
      },
      {
        id: "name",
        label: "기관명",
        dataAlign: "center",
      },
      {
        id: "week",
        label: "일자",
        dataAlign: "center",
      },
      {
        id: "tit",
        label: "제목",
        dataAlign: "left",
        render: (tit: any) => {
          return (
            <div>
              {tit.name}
              <ul className="flex flex-wrap items-center gap-[0.625rem]">
                {tit.hash.map((item: string, idx: number) => (
                  <li key={idx}>
                    <span className="text-xs text-pub-gray6 before:content-['#']">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        },
      },
      {
        id: "hits",
        label: "조회수",
        dataAlign: "center",
        render: (hits: any) => {
          return (
            <div className="flex items-center justify-center gap-4">
              {/* <Image
                src={IconViewer}
                width={28}
                height={28}
                style={{ width: "1.75rem", height: "1.75rem" }}
                alt="icon viewer hits"
              /> */}
              <span className="leading-none">{hits}</span>
            </div>
          );
        },
      },
      {
        id: "date",
        label: "발행일",
        dataAlign: "center",
      },
    ],
    [],
  );

  return { contentsColumns };
};

export default Columns;
