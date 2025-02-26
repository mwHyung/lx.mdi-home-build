"use client";

import { Sheet } from "@/components/shared/Sheet";
import { useSheet } from "@/hooks";

const SheetContainer = () => {
  const { sheets, dismissSheet } = useSheet();

  return (
    <>
      {sheets.map(({ id, element, ...props }) => (
        <Sheet key={id} open onClose={() => dismissSheet(id)} {...props}>
          {element}
        </Sheet>
      ))}
    </>
  );
};

export default SheetContainer;
