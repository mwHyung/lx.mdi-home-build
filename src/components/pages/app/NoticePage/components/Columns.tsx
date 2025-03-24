import { useMemo } from "react";
import { Column } from "@/types/ui";

const Columns = () => {
  const contentsColumns: Column[] = useMemo(
    () => [
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
          return title;
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
