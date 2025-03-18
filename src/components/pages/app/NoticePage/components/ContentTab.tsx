"use client";

import React, { useState } from "react";

interface Props {
  list: string[];
}

const ContentTab = ({ list }: Props) => {
  const [active, setActive] = useState(0);
  const handleClick = (index: number) => {
    setActive(index);
  };

  return (
    <div className="bg-black bg-opacity-40 backdrop-blur-[1.25rem]">
      <ul className="flex items-center px-[3.75rem] max-w-[105rem] m-[0_auto]">
        {list.map((item, idx) => (
          <li key={idx} onClick={() => handleClick(idx)}>
            <div
              className={`text-white text-[1.375rem] font-medium px-[2.688rem] py-[1.469rem] cursor-pointer transition-all hover:bg-pub-red ${active === idx ? "bg-pub-red" : ""}`}
            >
              {item}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentTab;
