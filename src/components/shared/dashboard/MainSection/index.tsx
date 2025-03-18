import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MainSection = ({ children }: Props) => {
  return <div className="px-[3.75rem] pb-40 max-w-[105rem] m-[0_auto]">{children}</div>;
};

export default MainSection;
