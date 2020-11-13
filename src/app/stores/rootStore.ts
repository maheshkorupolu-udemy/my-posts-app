import DataStore from "./data/dataStore";
import UiStore from "./ui/uiStore";

export default class RootStore {
  dataStores: DataStore;
  uiStores: UiStore;

  constructor() {
    this.dataStores = new DataStore(this);
    this.uiStores = new UiStore(this);
  }
}
