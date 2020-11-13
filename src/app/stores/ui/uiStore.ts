import RootStore from "../rootStore";
import GlobalView from "./globalView";

export default class UiStore {
  globalView: GlobalView;

  constructor(rootStore: RootStore) {
    this.globalView = new GlobalView(rootStore);
  }
}
