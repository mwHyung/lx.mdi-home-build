"use client";

import { FC, ReactNode } from "react";
import { Footer, Header } from "../shared";
import { cn } from "@/utils/styles";

interface Props {
  children?: ReactNode;
}

const GlobalLayout: FC<Props> = ({ children }) => {
  return (
    <div className={cn("flex flex-col min-h-screen w-full", {})}>
      <Header />
      <main className="grow">{children && children}</main>
      <Footer />
    </div>
  );
};

export default GlobalLayout;
