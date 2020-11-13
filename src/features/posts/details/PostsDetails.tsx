import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStores } from "../../../app/stores/helpers/useStores";
import PostDetailsInfo from "./PostDetailsInfo";
import PostsCommentsList from "./PostsCommentsList";

interface DetailParam {
  id: string;
}

const PostsDetails: React.FC<RouteComponentProps<DetailParam>> = ({
  match,
}) => {
  const {
    dataStores: { postsStore },
  } = useStores();

  const { post, loadPost, loadingIntial } = postsStore;

  useEffect(() => {
    loadPost(match.params.id);
  }, [loadPost, match.params.id]);

  if (loadingIntial)
    return (
      <LoadingComponent content="Loading Posts Details...."></LoadingComponent>
    );

  if (!post) return <h1>Post not found.</h1>;

  return (
    <Grid>
      <Grid.Column width={10}>
        <PostDetailsInfo post={post}></PostDetailsInfo>
        <PostsCommentsList postId={match.params.id}></PostsCommentsList>
      </Grid.Column>
      <Grid.Column width={6}></Grid.Column>
    </Grid>
  );
};

export default observer(PostsDetails);
