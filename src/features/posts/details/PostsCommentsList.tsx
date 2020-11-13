import { observer } from "mobx-react-lite";
import React, { Fragment, useEffect } from "react";
import { Segment, Header, Comment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStores } from "../../../app/stores/helpers/useStores";

const PostsCommentsList: React.FC<{ postId: string }> = ({ postId }) => {
  const {
    dataStores: { postsStore },
  } = useStores();

  const { comments, loadComments, loadingCommentsIntial } = postsStore;

  useEffect(() => {
    loadComments(postId);
  }, [loadComments, postId]);

  if (loadingCommentsIntial)
    return <LoadingComponent content="Loading Comments...."></LoadingComponent>;

  if (!comments) return <h1>Comments not found.</h1>;

  return (
    <Fragment>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Comments</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          {comments.map((comment) => (
            <Fragment key={comment.id}>
              <Comment>
                <Comment.Avatar src="/assets/user.png" />
                <Comment.Content>
                  <Comment.Author as="a">{comment.email}</Comment.Author>
                  <Comment.Text>{comment.name}</Comment.Text>
                  <Comment.Metadata>{comment.body}</Comment.Metadata>
                </Comment.Content>
              </Comment>
            </Fragment>
          ))}
        </Comment.Group>
      </Segment>
    </Fragment>
  );
};

export default observer(PostsCommentsList);
