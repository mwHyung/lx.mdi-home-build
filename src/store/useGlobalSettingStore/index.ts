import { Id } from "@/types/shared";
import createCombinedStore from "../createStore";
import { getSessionStorage } from "@/utils/shared";

interface Expiration {
  accessToken: number;
  refreshToken: number;
}

interface Props {
  isLoading: boolean;
  expandedNavIds: Id[];
  expiration: Expiration;
  isSessionExpired: boolean;
  isLoggedIn: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setExpandedNavIds: (ids: Id[]) => void;
  setIsSessionExpired: (isSessionExpired: boolean) => void;
  setExpiration: (expiration: Partial<Expiration>) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const getExpirationByName = (name: string) => {
  const expirtaion = getSessionStorage(name);
  if (!expirtaion) return 0;
  return parseInt(expirtaion);
};

const useGlobalSettingStore = createCombinedStore<Props>(set => ({
  isLoading: false,
  isSessionExpired: false,
  expandedNavIds: [],
  isLoggedIn: true,
  expiration: {
    accessToken: getExpirationByName("atk_expiration"),
    refreshToken: getExpirationByName("rtk_expiration"),
  },
  setIsLoading: isLoading => set({ isLoading }),
  setExpandedNavIds: ids => set({ expandedNavIds: ids }),
  setIsSessionExpired: isSessionExpired => set({ isSessionExpired }),
  setExpiration: expiration =>
    set(state => ({ expiration: { ...state.expiration, ...expiration } })),
  setIsLoggedIn: isLoggedIn => set({ isLoggedIn }),
}));

export default useGlobalSettingStore;
