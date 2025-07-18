import Nav from "./Nav";
import Logo from "./Logo";
import Search from "./Search";
import { useEffect, useState } from "react";
import { useLayoutContext } from "../MainLayoutProvider";

import styles from "./Header.module.scss";

const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  const { isScrolled, setIsScrolled, isDetail } = useLayoutContext();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${styles.header} ${activeMenu || searchOpen ? styles.expanded : ""} ${isScrolled ? styles.scrolled : ""} ${isDetail ? styles.detail : ""}`}
    >
      <div className="max-w-[105rem] flex items-start justify-between w-full h-full m-[0_auto] px-[3.75rem]">
        <Logo
          activeMenu={activeMenu}
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
          isScrolled={isScrolled}
          detail={isDetail}
        />
        <Nav
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
          isScrolled={isScrolled}
          detail={isDetail}
        />
        <Search
          activeMenu={activeMenu}
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
          isScrolled={isScrolled}
          detail={isDetail}
        />
      </div>
    </header>
  );
};

export default Header;
