"use client";
import { FC, ReactNode, useEffect } from "react";
import { useLayoutContext } from "@/layout/MainLayoutProvider";

interface Props {
  children?: ReactNode;
}

const DashboardPageContainer: FC<Props> = ({ children }) => {
  const { currentSection, currentSectionRef, setCurrentSection, setIsScrolled, resetToTop } =
    useLayoutContext();

  const checkScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };
  useEffect(() => {
    checkScroll();
  }, []);
  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      let newSection = currentSectionRef.current;

      if (event.deltaY > 0 && currentSection < 1) {
        // wheel down
        newSection++;
      } else if (event.deltaY < 0 && currentSection > 0 && window.scrollY < 500) {
        // wheel up
        newSection--;
      }

      setCurrentSection(newSection);
    };

    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [currentSection, setCurrentSection]);
  return (
    <div className="w-full">
      {children && children}

      <div
        className={`flex items-center justify-center w-16 h-16 mb-16 border border-black bg-black bg-opacity-80 shadow-pc4 sticky left-[calc(100%-8.2rem)] bottom-16 cursor-pointer transition-all ${currentSection < 1 ? "opacity-0 invisible" : "opacity-100 visible"}`}
        onClick={resetToTop}
      >
        <span className="block w-4 h-4 text-[0] border-t-2 border-r-2 border-t-white border-r-white -rotate-45 mt-[0.4rem]">
          top button
        </span>
      </div>
    </div>
  );
};

export default DashboardPageContainer;
