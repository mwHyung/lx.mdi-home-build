"use client";

import { ComponentProps, ComponentPropsWithoutRef, ElementRef, FC, forwardRef } from "react";
import * as ModalPrimitive from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";
import { cn } from "@/utils/styles";
import { Button } from "@/components/ui";
import { Props as ButtonProps } from "@/components/ui/Button";

const ModalContainer = ModalPrimitive.Root;
const ModalClose = ModalPrimitive.Close;
const ModalPortal = ModalPrimitive.Portal;

const ModalOverlay = forwardRef<
  ElementRef<typeof ModalPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof ModalPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <ModalPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
ModalOverlay.displayName = ModalPrimitive.Overlay.displayName;

const ModalContent = forwardRef<
  ElementRef<typeof ModalPrimitive.Content>,
  ComponentPropsWithoutRef<typeof ModalPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <ModalPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid min-w-[80%] max-w-[80%] md:min-w-96 md:max-w-[70%] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background overflow-hidden shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg",
        className,
      )}
      aria-describedby={undefined}
      {...props}
    >
      {children}
      <ModalPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-muted data-[state=open]:text-main-gray">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </ModalPrimitive.Close>
      <VisuallyHidden.Root asChild>
        <ModalPrimitive.Title>Title</ModalPrimitive.Title>
      </VisuallyHidden.Root>
    </ModalPrimitive.Content>
  </ModalPortal>
));
ModalContent.displayName = ModalPrimitive.Content.displayName;

type InteractionOutsideType = Parameters<
  Exclude<ComponentProps<typeof ModalPrimitive.Content>["onInteractOutside"], undefined>
>[0];

export interface ModalProps extends ModalPrimitive.DialogProps {
  className?: string;
  onClose?: () => void;
  /**
   * esc, overlay click 으로 모달을 닫을 건지 설정
   */
  interactClose?: boolean;
}

const Modal: FC<ModalProps> = ({ open, interactClose = true, onClose, children }) => {
  const handleEscapeKeyDown = (e: KeyboardEvent) => {
    if (!interactClose) {
      e.preventDefault();
    }
  };

  const handleOverlayClick = (e: InteractionOutsideType) => {
    if (!interactClose) {
      e.preventDefault();
    }
  };

  return (
    <ModalContainer open={open} onOpenChange={onClose}>
      <ModalContent
        onOpenAutoFocus={e => e.preventDefault()}
        onEscapeKeyDown={handleEscapeKeyDown}
        onInteractOutside={handleOverlayClick}
      >
        {children}
      </ModalContent>
    </ModalContainer>
  );
};

interface ModalButtonProps extends ButtonProps {
  label?: string;
}

interface ConfirmModalProps extends ModalProps {
  content: string;
  success?: ModalButtonProps;
  cancel?: ModalButtonProps;
  buttonOrder?: "success-cancel" | "cancel-success";
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  content,
  success,
  cancel,
  buttonOrder = "success-cancel",
}) => {
  const { label: successLabel = "확인", ...successProps } = success || {};
  const { label: cancelLabel = "취소", ...cancelProps } = cancel || {};

  return (
    <>
      <div className="text-base leading-none text-center p-3">{content}</div>
      <div
        className={cn("flex justify-center gap-2", {
          "flex-row-reverse": buttonOrder === "cancel-success",
        })}
      >
        <Button {...successProps}>{successLabel}</Button>
        {cancel && (
          <ModalClose asChild>
            <Button {...cancelProps} variant={"muted"}>
              {cancel.label || "취소"}
            </Button>
          </ModalClose>
        )}
      </div>
    </>
  );
};

export { Modal, ConfirmModal, ModalClose };
