import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

const createCombinedStore = <T>(initializer: StateCreator<T, [], []>) =>
  create<T, [["zustand/devtools", T]]>(devtools(initializer));

export default createCombinedStore;
