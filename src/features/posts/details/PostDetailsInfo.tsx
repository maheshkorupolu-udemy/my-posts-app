import React from "react";
import { Segment, Grid, Icon } from "semantic-ui-react";
import { IPost } from "../../../app/models/posts";

const PostDetailsInfo: React.FC<{ post: IPost }> = ({ post }) => {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{post.title}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="paragraph" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{post.body}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="user" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{post.postedBy}</span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default PostDetailsInfo;
