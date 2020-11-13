import UserStore from "./user/userStore";
import PostsStore from "./posts/postsStore";
import RootStore from "../rootStore";

export default class DataStore {
  postsStore: PostsStore;
  userStore: UserStore;

  constructor(rootStore: RootStore) {
    this.postsStore = new PostsStore(rootStore);
    this.userStore = new UserStore(rootStore);
  }
}
