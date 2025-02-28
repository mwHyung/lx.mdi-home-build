"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useRef } from "react";

interface LayoutContextProps {
  currentSection: number;
  setCurrentSection: (section: number) => void;
  currentSectionRef: React.MutableRefObject<number>;
  isScrolled: boolean;
  setIsScrolled: (section: boolean) => void;
  isDetail: boolean;
  setIsDetail: (section: boolean) => void;
  resetToTop: () => void;
}

const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayoutContext must be used within LayoutProvider");
  }
  return context;
};

interface LayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const currentSectionRef = useRef<number>(0);

  const updateCurrentSection = (section: number) => {
    setCurrentSection(section);
    currentSectionRef.current = section;
  };

  const resetToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentSection(0);
    currentSectionRef.current = 0;
    setIsScrolled(false);
  };

  return (
    <LayoutContext.Provider
      value={{
        currentSection,
        setCurrentSection: updateCurrentSection,
        currentSectionRef,
        isScrolled,
        setIsScrolled,
        resetToTop,
        isDetail,
        setIsDetail,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
