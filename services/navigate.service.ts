import type { NavigateFunction } from "react-router";

interface IAppHistory {
  navigate: NavigateFunction | null;
  push: (data: string | object) => void;
}

const AppHistory: IAppHistory = {
  navigate: null,
  push: (data: string | object) => {
    if (AppHistory.navigate) {
      AppHistory.navigate(data); // Call navigate with data
    }
  },
};

export default AppHistory;
