import createCombinedStore from "../createStore";

export interface AlertProps {
  id?: string;
  message: string | JSX.Element;
  duration?: number;
  status?: "info" | "success" | "warning" | "error";
  action?: JSX.Element | null;
}

interface Props {
  alertQueue: AlertProps[];
  addAlert: (alert: AlertProps) => void;
  dismissAlert: () => void;
}

const useAlertStore = createCombinedStore<Props>(set => ({
  alertQueue: [],
  addAlert: (alert: AlertProps) => {
    const id = Date.now().toString();
    const newAlert = { ...alert, id };
    return set({ alertQueue: [newAlert] });
  },
  dismissAlert: () => set({ alertQueue: [] }),
}));

export default useAlertStore;
