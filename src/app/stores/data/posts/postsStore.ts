import { action, configure, observable, runInAction } from "mobx";
import agent from "../../../api/agent";
import { IComments } from "../../../models/comments";
import { IPost } from "../../../models/posts";
import RootStore from "../../rootStore";
import { history } from "../../../../";
import { toast } from "react-toastify";

configure({ enforceActions: "always" });

export default class PostsStore {
  @observable posts: IPost[] = [];
  @observable post: IPost | null = null;
  @observable comments: IComments[] = [];
  @observable loadingIntial = false;
  @observable loadingCommentsIntial = false;
  @observable submitting = false;

  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action loadPosts = async () => {
    this.posts = [];
    this.loadingIntial = true;
    try {
      const postsLst = await agent.posts.list();
      runInAction("getting posts", () => {
        postsLst.forEach(async (post) => {
          const user = await agent.users.details(post.userId);
          post.postedBy = user.name;
          runInAction(() => {
            this.rootStore.dataStores.postsStore.posts.push(post);
          });
        });
        this.loadingIntial = false;
      });
    } catch (error) {
      runInAction("getting posts error", () => {});
      console.log(error);
    }
  };

  @action loadPost = async (id: string) => {
    let post = this.getPost(id);
    if (post) {
      this.post = post;
      return post;
    } else {
      this.loadingIntial = true;
      try {
        post = await agent.posts.details(id);
        if (post) {
          let user = await agent.users.details(post.userId);
          post.postedBy = user.name;
        }
        runInAction("getting post detail", async () => {
          this.post = post;
          this.loadingIntial = false;
        });
        return post;
      } catch (error) {
        runInAction("getting post detail error", () => {
          this.loadingIntial = false;
        });
        console.log(error);
      }
    }
  };

  getPost = (id: string) => {
    let post = this.posts.find((x) => x.id === id);
    if (post) return post;
    else return null;
  };

  @action loadComments = async (postId: string) => {
    this.comments = [];
    this.loadingCommentsIntial = true;
    try {
      const commentsLst = await agent.comments.list(postId);
      runInAction("getting commets", () => {
        commentsLst.forEach((comment) => {
          this.comments.push(comment);
        });
        this.loadingCommentsIntial = false;
      });
    } catch (error) {
      runInAction("getting comments error", () => {});
      console.log(error);
    }
  };

  @action createPost = async (post: IPost) => {
    this.submitting = true;
    try {
      await agent.posts.create(post);
      runInAction("Create Post", () => {
        this.post = post;
        this.submitting = false;
      });
      toast.success("Post created");
      history.push(`/posts`);
    } catch (error) {
      runInAction("create post error", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action editPost = async (post: IPost) => {
    this.submitting = true;
    try {
      await agent.posts.update(post.id, post);
      runInAction("Edit Post", () => {
        this.post = post;
        this.submitting = false;
      });
      history.push(`/posts`);
    } catch (error) {
      runInAction("edit post error", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };
}
