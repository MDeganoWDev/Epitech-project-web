import { create } from "zustand";

type TableState = {
    selectedTable: [];
    SelectedTableName: string
};
  
type TableAction = {
    setSelectedTable: (selectedTable: []) => void;
    setSelectedTableName: (SelectedTableName: string) => void;
};

export const useTableStore = create<TableState & TableAction>((set)=>({
    selectedTable : [],
    SelectedTableName : "",
    setSelectedTable: (selectedTable) => set(() => ({ selectedTable })),
    setSelectedTableName: (SelectedTableName) => set(() => ({ SelectedTableName }))
}))