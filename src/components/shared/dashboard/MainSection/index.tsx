import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MainSection = ({ children }: Props) => {
  return <div className="px-48 pb-40">{children}</div>;
};

export default MainSection;
