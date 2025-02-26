import { FC, ReactNode } from "react";
import {
  AlertContainer,
  ModalContainer,
  ToastContainer,
  TokenLoader,
  CustomContainer,
  PublicLoader,
  SheetContainer,
} from "@/global";

interface Props {
  children: ReactNode;
}

const GlobalProvider: FC<Props> = ({ children }) => {
  return (
    <>
      <TokenLoader />
      <ToastContainer />
      <AlertContainer />
      <ModalContainer />
      <SheetContainer />
      <CustomContainer />
      <PublicLoader />
      {children}
    </>
  );
};

export default GlobalProvider;
