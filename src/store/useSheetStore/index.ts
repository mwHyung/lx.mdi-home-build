import { Sheet } from "@/types/ui";
import createCombinedStore from "../createStore";

interface SheetProps extends Sheet {
  id: string;
  element: JSX.Element;
}

interface Props {
  sheets: SheetProps[];
  addSheet: (sheet: SheetProps) => void;
  dismissSheet: (id: string) => void;
}

const useSheetStore = createCombinedStore<Props>(set => ({
  sheets: [],
  addSheet: (sheet: SheetProps) =>
    set(state => {
      return { sheets: [...state.sheets, sheet] };
    }),
  dismissSheet: (id: string) =>
    set(state => ({ sheets: state.sheets.filter(sheet => sheet.id !== id) })),
}));

export default useSheetStore;
