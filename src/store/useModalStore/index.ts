import createCombinedStore from "../createStore";

interface ModalProps {
  id: string;
  element: JSX.Element;
  interactClose?: boolean;
}

interface Props {
  modals: ModalProps[];
  addModal: (modal: ModalProps) => void;
  dismissModal: (id: string) => void;
}

const useModalStore = createCombinedStore<Props>(set => ({
  modals: [],
  addModal: (newModal: ModalProps) =>
    set(state => {
      return { modals: [...state.modals, newModal] };
    }),
  dismissModal: (id: string) =>
    set(state => ({ modals: state.modals.filter(modal => modal.id !== id) })),
}));

export default useModalStore;
