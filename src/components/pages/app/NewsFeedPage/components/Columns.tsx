import { useMemo } from "react";
import { Column } from "@/types/ui";
import Link from "next/link";
import Image from "next/image";
import IconViewer from "public/images/icon_viewers_rate.svg";

const Columns = () => {
  const contentsColumns: Column[] = useMemo(
    () => [
      {
        id: "group",
        label: "기업명",
        dataAlign: "left",
      },
      {
        id: "title",
        label: "제목",
        dataAlign: "left",
        render: (title: any) => {
          return title.name;
        },
      },
      {
        id: "hits",
        label: "조회수",
        dataAlign: "center",
        render: (hits: any) => {
          return (
            <div className="flex items-center justify-center gap-4">
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
