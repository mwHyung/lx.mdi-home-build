"use client";

import { House } from "lucide-react";
import Link from "next/link";

const PortalIcon = () => {
  return (
    <Link href="/" className="w-8 h-8 p-2 rounded-full bg-muted hover:text-main-gray">
      <House className="w-full h-full" />
    </Link>
  );
};

export default PortalIcon;
