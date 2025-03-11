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
    <div className="bg-black bg-opacity-40 backdrop-blur-[2rem]">
      <ul className="flex items-center px-48 max-w-[1680px] m-[0_auto]">
        {list.map((item, idx) => (
          <li key={idx} onClick={() => handleClick(idx)}>
            <div
              className={`text-white text-[2.2rem] font-medium px-[4.3rem] py-[2.35rem] cursor-pointer transition-all hover:bg-pub-red ${active === idx ? "bg-pub-red" : ""}`}
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
