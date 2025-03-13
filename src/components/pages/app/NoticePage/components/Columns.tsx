import { useMemo } from "react";
import { Column } from "@/types/ui";
import Link from "next/link";
import Image from "next/image";
import IconViewer from "public/images/icon_viewers_rate.svg";

const Columns = () => {
  const contentsColumns: Column[] = useMemo(
    () => [
      {
        id: "date",
        label: "발행일",
        dataAlign: "left",
      },
      {
        id: "emergency",
        label: "",
        dataAlign: "center",
        render: (emergency: any) => {
          return (
            emergency && <span className="text-pub-red text-[2rem] tracking-[-0.028rem]">긴급</span>
          );
        },
      },
      {
        id: "title",
        label: "제목",
        dataAlign: "left",
        render: (title: any) => {
          return <Link href={"/notice-detail"}>{title}</Link>;
        },
      },
      {
        id: "hits",
        label: "조회수",
        dataAlign: "center",
        render: (hits: any) => {
          return (
            <div className="flex items-center gap-4">
              <Image
                src={IconViewer}
                width={28}
                height={28}
                style={{ width: "1.75rem", height: "1.75rem" }}
                alt="icon viewer hits"
              />
              <span className="leading-none">{hits}</span>
            </div>
          );
        },
      },
    ],
    [],
  );

  return { contentsColumns };
};

export default Columns;
