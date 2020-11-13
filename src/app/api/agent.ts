import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { IComments } from "../models/comments";
import { IPost } from "../models/posts";
import { IUser } from "../models/user";
import { history } from "../..";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error.");
  }
  const { status, data, config } = error.response;
  if (status === 404) {
    history.push("/notfound");
  }
  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }
  if (status === 500) {
    toast.error("Server error, check terminal for more info!");
  }
  throw error;
});

const responseBody = (resposne: AxiosResponse) => resposne.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
};

const users = {
  list: (): Promise<IUser[]> => requests.get("/users"),
  details: (id: string) => requests.get(`/users/${id}`),
};

const posts = {
  list: (): Promise<IPost[]> => requests.get("/posts"),
  details: (id: string) => requests.get(`/posts/${id}`),
  create: (post: IPost) => requests.post("/posts", post),
  update: (id: string, post: IPost) => requests.put(`/posts/${id}`, post),
};

const comments = {
  list: (postId: string): Promise<IComments[]> =>
    requests.get(`/posts/${postId}/comments`),
};

export default {
  users,
  posts,
  comments,
};
