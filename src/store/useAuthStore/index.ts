import { User } from "@/types/user";
import createCombinedStore from "../createStore";

interface Props {
  isLoggedIn: boolean;
  userInfo: User | null;
  setAuthStore: (props: Partial<Props>) => void;
}

const useAuthStore = createCombinedStore<Props>(set => ({
  isLoggedIn: typeof window !== "undefined" ? document.cookie.includes("atk") : false,
  userInfo: null,
  setAuthStore: props => set(state => ({ ...state, ...props })),
}));

export default useAuthStore;
