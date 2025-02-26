"use client";

import { FC, ReactNode, useState } from "react";
import Image from "next/image";
import { ICONS } from "@/utils/constants-icons";

type AccordionProps = {
  title: string;
  content: ReactNode;
  type?: any;
};

const Accordion: FC<AccordionProps> = ({ title, type, content }) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleClick = () => {
    setIsOpened(!isOpened);
  };

  return (
    <div className="accordion">
      <div
        className="accordion-header flex items-center justify-between pb-4 border-b border-b-pub-lightG "
        onClick={handleClick}
      >
        <div className="flex items-center gap-2 border-main-gray text-base font-bold text-pub-gray6">
          {type && <Image src={type} width={24} height={24} alt="icons" />}
          <span>{title}</span>
        </div>
        <span>
          {isOpened ? (
            <Image
              src={ICONS.ARROW}
              width={12}
              height={12}
              alt="arrow icon"
              className="rotate-180"
            />
          ) : (
            <Image src={ICONS.ARROW} width={12} height={12} alt="arrow icon" />
          )}
        </span>
      </div>
      {isOpened && <div className="accordion-content">{content}</div>}
    </div>
  );
};

export default Accordion;
