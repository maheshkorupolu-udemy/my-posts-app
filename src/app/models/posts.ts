export interface IPost {
  userId: string;
  id: string;
  title: string;
  body: string;
  postedBy: string;
}

export interface IPostFormValues extends Partial<IPost> {}

export class PostFormValues implements IPostFormValues {
  userId: string = "";
  id: string = "";
  title: string = "";
  body: string = "";
  postedBy: string = "";
  constructor(init?: IPostFormValues) {
    Object.assign(this, init);
  }
}
