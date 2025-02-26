import createCombinedStore from "./createStore";

interface SampleStoreProps {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;
}

const useSampleStore = createCombinedStore<SampleStoreProps>(set => ({
  bears: 0,
  increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: newBears => set({ bears: newBears }),
}));

export default useSampleStore;
