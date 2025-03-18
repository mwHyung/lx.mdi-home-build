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
    <div className="py-20 bg-pub-bg">
      <ul className="flex flex-wrap max-w-[105rem] m-[0_auto] px-[3.75rem]">
        {tabsList.map((list, idx) => (
          <li
            key={idx}
            className={`flex flex-col items-center justify-center gap-[0.8rem] flex-1 basis-1/5 h-[7.5rem] border border-pub-grayD cursor-pointer transition-all hover:bg-pub-nav hover:text-white ${isActive === idx ? "bg-pub-nav text-white" : "bg-white text-pub-gray6 "}`}
            onClick={() => setIsActive(idx)}
          >
            <span className="text-[1.25rem] font-medium leading-[2rem]">{list.name}</span>
            <span className="text-[0.875rem] font-bold leading-[1.4rem]">{list.hits}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchTab;
