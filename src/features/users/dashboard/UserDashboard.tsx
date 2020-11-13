import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid, List } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStores } from "../../../app/stores/helpers/useStores";
import UsersList from "./UsersList";

const UserDashboard = () => {
  const {
    dataStores: { userStore },
  } = useStores();

  useEffect(() => {
    userStore.loadUsers();
  }, [userStore]);

  if (userStore.loadingIntial)
    return <LoadingComponent content="Loading Posts...."></LoadingComponent>;

  return (
    <Grid>
      <Grid.Column width={13}>
        <List>
          <UsersList></UsersList>
        </List>
      </Grid.Column>

      <Grid.Column width={3}>
        <h2>User filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(UserDashboard);
