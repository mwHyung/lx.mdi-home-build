import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MainSection = ({ children }: Props) => {
  return <div className="px-48 pb-40 max-w-[1680px] m-[0_auto]">{children}</div>;
};

export default MainSection;
