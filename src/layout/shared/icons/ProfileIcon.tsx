"use client";

import { CircleUser } from "lucide-react";
import { Button, Dropdown } from "@/components/ui";

const ProfileIcon = () => {

  return (
    <Dropdown list={[]} align="end">
      <Button variant="muted" size="icon" className="rounded-full hover:text-main-gray p-2">
        <CircleUser className="w-full h-full" />
      </Button>
    </Dropdown>
  );
};

export default ProfileIcon;
