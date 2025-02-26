import { Toast } from "@/types/ui";
import createCombinedStore from "../createStore";
import { getRandomString } from "@/utils/shared";

interface ToastProps extends Toast {
  id: string;
}

interface Props {
  toasts: ToastProps[];
  addToast: (toast: Toast) => void;
  dismissToast: (id: string) => void;
  removeToast: () => void;
}

const initialState = {
  duration: 3000,
  toasts: [],
};

const useToastStore = createCombinedStore<Props>(set => ({
  ...initialState,
  addToast: (toast: Toast) =>
    set(state => ({ toasts: [...state.toasts, { ...toast, id: getRandomString() }] })),
  dismissToast: (id: string) =>
    set(state => ({ toasts: state.toasts.filter(toast => toast.id !== id) })),
  removeToast: () => set({ toasts: [] }),
}));

export default useToastStore;
