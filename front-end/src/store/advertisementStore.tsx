import { create } from "zustand";

type AdvertisementState = {
    selectedId?: number;
};
  
type AdvertisementAction = {
    setSelectedId: (selectedId?: number) => void;
};

export const useAdvertisementStore = create<AdvertisementState & AdvertisementAction>((set)=>({
    selectedId : undefined,
    setSelectedId: (selectedId) => set(() => ({ selectedId }))
}))