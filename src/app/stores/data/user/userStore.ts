import { action, configure, observable, runInAction } from "mobx";
import agent from "../../../api/agent";
import { IUser } from "../../../models/user";
import RootStore from "../../rootStore";

configure({ enforceActions: "always" });

export default class UserStore {
  @observable users: IUser[] = [];
  @observable user: IUser | null = null;
  @observable loadingIntial = false;

  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action loadUsers = async () => {
    this.loadingIntial = true;
    this.users = [];
    try {
      const userLst = await agent.users.list();
      runInAction("getting user list", () => {
        userLst.forEach((user) => {
          this.users.push(user);
        });
        this.loadingIntial = false;
      });
    } catch (error) {
      runInAction("getting user list error", () => {});
      console.log(error);
    }
  };

  @action loadUser = async (id: string) => {
    let user = this.getUser(id);
    if (user) {
      this.user = user;
    } else {
      this.loadingIntial = true;
      try {
        user = await agent.users.details(id);
        runInAction("getting user", () => {
          this.user = user;
          this.loadingIntial = false;
        });
      } catch (error) {
        runInAction("getting user error", () => {
          this.loadingIntial = false;
        });
        console.log(error);
      }
    }
  };

  getUser = (id: string) => {
    let user = this.users.find((x) => x.id === id);
    if (user) return user;
    else return null;
  };
}
