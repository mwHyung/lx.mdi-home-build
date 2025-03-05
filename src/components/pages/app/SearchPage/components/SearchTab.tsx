import React, { FC, useState } from "react";

interface Props {
  tabsList: {
    name: string;
    hits: string;
  }[];
}

const SearchTab: FC<Props> = ({ tabsList }) => {
  const [isActive, setIsActive] = useState(0);
  return (
    <div className="px-48 py-32 bg-pub-bg">
      <ul className="flex flex-wrap max-w-[1680px] m-[0_auto]">
        {tabsList.map((list, idx) => (
          <li
            key={idx}
            className={`flex flex-col items-center justify-center gap-[0.8rem] flex-1 basis-1/5 h-48 border border-pub-grayD cursor-pointer transition-all hover:bg-pub-nav hover:text-white ${isActive === idx ? "bg-pub-nav text-white" : "bg-white text-pub-gray6 "}`}
            onClick={() => setIsActive(idx)}
          >
            <span className="text-[2.2rem] font-medium leading-[2.64rem]">{list.name}</span>
            <span className="text-[1.6rem] font-bold leading-[1.92rem]">{list.hits}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchTab;
