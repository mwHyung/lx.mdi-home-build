"use client";

import { useModalStore } from "@/store";

const useModal = () => {
  const { modals, addModal, dismissModal } = useModalStore();

  return {
    modals,
    addModal,
    dismissModal,
  };
};

export default useModal;
