import { useMemo } from "react";
import { Column } from "@/types/ui";
import Image from "next/image";

import IconPlay from "public/images/icon_play.png";
import IconPause from "public/images/icon_pause.png";

const Columns = () => {
  const contentsColumns: Column[] = useMemo(
    () => [
      // {
      //   id: "play",
      //   label: "",
      //   dataAlign: "center",
      //   render: (play: any) => {
      //     return (
      //       <div className="flex items-center justify-center">
      //         {play ? (
      //           <Image src={IconPause} alt="icon play" />
      //         ) : (
      //           <Image src={IconPlay} alt="icon play" />
      //         )}
      //       </div>
      //     );
      //   },
      // },
      {
        id: "tit",
        label: "제목",
        dataAlign: "left",
        render: (tit: any) => {
          return (
            <div className="flex items-start">
              <div className="min-w-48 pr-10 pt-[1px] text-center">{tit.week}</div>
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
