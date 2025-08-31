import { create } from "zustand";

interface ISearch {
  search: string | null;
  setSearch: (search: string) => void;
}

export const useSearch = create<ISearch>((set) => ({
  search: "",
  setSearch: (search: string) =>
    set(() => {
      return { search };
    }),
}));
