import { useContext } from "react";
import RootStore from "../rootStore";
import { StoreContext } from "./storeContext";

export const useStores = () => {
  return useContext<RootStore>(StoreContext);
};
