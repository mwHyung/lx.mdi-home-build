"use client";

import Link from "next/link";
import { UserRoundCog } from "lucide-react";

const AdminIcon = () => {
  return (
    <Link href="/admin" className="w-8 h-8 p-2 rounded-full bg-muted hover:text-main-gray">
      <UserRoundCog className="w-full h-full" />
    </Link>
  );
};

export default AdminIcon;
