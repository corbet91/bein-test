import { create } from "zustand";

interface ISearch {
  search: string | null;
  setSearch: (search: string) => void;
}

interface IIsLogout {
  isLogout: boolean;
  setIsLogout: (isLogout: boolean) => void;
}

export const useSearch = create<ISearch>((set) => ({
  search: "",
  setSearch: (search: string) =>
    set(() => {
      return { search };
    }),
}));

export const useIsLogout = create<IIsLogout>((set) => ({
  isLogout: false,
  setIsLogout: (isLogout: boolean) =>
    set(() => {
      return { isLogout };
    }),
}));
