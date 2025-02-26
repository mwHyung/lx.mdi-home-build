import { useLayoutContext } from "@/layout/MainLayoutProvider";
import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const SearchContainer: FC<Props> = ({ children }) => {
  const { resetToTop } = useLayoutContext();
  return (
    <div className="flex flex-col">
      {children}
      <div
        className="flex items-center justify-center w-16 h-16 border border-black bg-black bg-opacity-80 shadow-pc4 fixed bottom-20 right-16 cursor-pointer"
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
