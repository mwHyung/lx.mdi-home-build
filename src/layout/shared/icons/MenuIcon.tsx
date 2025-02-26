"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui";
import { Sheet } from "@/components/shared/Sheet";
import Logo from "../Logo";
import Nav from "../Nav";

const MenuIcon = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Menu Icon */}
      <div className="absolute left-3 bottom-3">
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 md:hidden rounded-full"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-4 w-4" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </div>

      {/* Side Nav */}
      <Sheet title={<Logo />} open={open} side="left" className="px-2 py-4" onClose={handleClose}>
        <div className="flex-1">{/* <Nav onClick={handleClose} /> */}</div>
      </Sheet>
    </>
  );
};

export default MenuIcon;
