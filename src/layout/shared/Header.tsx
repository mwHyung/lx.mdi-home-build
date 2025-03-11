import Nav from "./Nav";
import Logo from "./Logo";
import Search from "./Search";
import { useEffect, useState } from "react";
import { useLayoutContext } from "../MainLayoutProvider";

import styles from "./Header.module.scss";

const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  const { isScrolled, isDetail } = useLayoutContext();

  return (
    <header
      className={`${styles.header} ${activeMenu || searchOpen ? styles.expanded : ""} ${isScrolled ? styles.scrolled : ""} ${isDetail ? styles.detail : ""}`}
    >
      <div className="max-w-[1680px] flex items-start justify-between w-full h-full m-[0_auto] px-48">
        <Logo
          activeMenu={activeMenu}
          searchOpen={searchOpen}
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
