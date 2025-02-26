"use client";

import { Modal } from "@/components/ui";
import { useModal } from "@/hooks/";

const ModalContainer = () => {
  const { modals, dismissModal } = useModal();

  return (
    <>
      {modals.map(({ id, element, interactClose = true }) => (
        <Modal key={id} open interactClose={interactClose} onClose={() => dismissModal(id)}>
          {element}
        </Modal>
      ))}
    </>
  );
};

export default ModalContainer;
