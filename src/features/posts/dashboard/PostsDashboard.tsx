import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid, List } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStores } from "../../../app/stores/helpers/useStores";
import PostsList from "./PostsList";

const PostsDashboard = () => {
  const {
    dataStores: { postsStore },
  } = useStores();

  useEffect(() => {
    postsStore.loadPosts();
  }, [postsStore]);

  if (postsStore.loadingIntial)
    return <LoadingComponent content="Loading Posts...."></LoadingComponent>;

  return (
    <Grid>
      <Grid.Column width={13}>
        <List>
          <PostsList></PostsList>
        </List>
      </Grid.Column>

      <Grid.Column width={3}>
        <h2>Posts filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(PostsDashboard);
