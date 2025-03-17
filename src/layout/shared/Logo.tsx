"use client";

import Image from "next/image";
import Link from "next/link";
import LogoIcon from "public/images/LX.MDILOGO.svg";
import LogoIconHover from "public/images/LX.MDILOGO_hover.svg";
import { FC } from "react";

interface Props {
  activeMenu?: string | null;
  searchOpen?: boolean;
  isScrolled?: boolean | null;
  detail?: boolean | null;
}

const Logo: FC<Props> = ({ activeMenu, searchOpen, isScrolled, detail }) => {
  return (
    <div className="shrink-0 flex items-center logo h-full">
      {activeMenu || searchOpen || isScrolled || detail ? (
        <Link href={"/home"}>
          <Image
            src={LogoIconHover}
            width={182}
            height={30}
            alt="logo image"
            priority
            style={{ width: "100%", height: "1.875rem" }}
          />
        </Link>
      ) : (
        <Link href={"/home"}>
          <Image
            src={LogoIcon}
            width={182}
            height={30}
            alt="logo image"
            priority
            style={{ width: "100%", height: "1.875rem" }}
          />
        </Link>
      )}
    </div>
  );
};

export default Logo;
