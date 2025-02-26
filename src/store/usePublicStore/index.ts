import { MenuTree } from "@/types/model-extension";
import createCombinedStore from "../createStore";
import { Role, System, Code } from "@/types/admin";

interface Props {
  roles: Role[];
  systems: System[];
  codes: Code[];
  programMenus: MenuTree[];
  isLoadedNav: boolean;
  setRoles: (roles: Props["roles"]) => void;
  setSystems: (systems: Props["systems"]) => void;
  setCodes: (codes: Props["codes"]) => void;
  setProgramMenus: (programMenus: Props["programMenus"]) => void;
  setIsLoadedNav: (isLoadedNav: Props["isLoadedNav"]) => void;
}

const usePublicStore = createCombinedStore<Props>(set => ({
  roles: [],
  systems: [],
  codes: [],
  programMenus: [],
  isLoadedNav: false,
  setRoles: roles => set({ roles }),
  setSystems: systems => set({ systems }),
  setCodes: codes => set({ codes }),
  setProgramMenus: programMenus => set({ programMenus }),
  setIsLoadedNav: isLoadedNav => set({ isLoadedNav }),
}));

export default usePublicStore;
