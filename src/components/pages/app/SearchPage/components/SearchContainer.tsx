import { useLayoutContext } from "@/layout/MainLayoutProvider";
import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const SearchContainer: FC<Props> = ({ children }) => {
  const { isScrolled, resetToTop } = useLayoutContext();

  return (
    <div className="flex flex-col">
      {children}

      <div
        className={`flex items-center justify-center w-16 h-16 mb-16 border border-black bg-black bg-opacity-80 shadow-pc4 sticky left-[calc(100%-8.2rem)] bottom-16 cursor-pointer transition-all ${isScrolled ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={resetToTop}
      >
        <span className="block w-4 h-4 text-[0] border-t-2 border-r-2 border-t-white border-r-white -rotate-45 mt-[0.4rem]">
          top button
        </span>
      </div>
    </div>
  );
};

export default SearchContainer;
