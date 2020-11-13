import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import { ToastContainer } from "react-toastify";
import UserDashboard from "../../features/users/dashboard/UserDashboard";
import NavBar from "../../features/nav/NavBar";
import PostsDashboard from "../../features/posts/dashboard/PostsDashboard";
import PostsDetails from "../../features/posts/details/PostsDetails";
import NotFound from "./NotFound";
import PostsForm from "../../features/posts/form/PostsForm";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <ToastContainer position="bottom-right"></ToastContainer>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar></NavBar>
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path="/users" component={UserDashboard} />
                <Route exact path="/posts" component={PostsDashboard} />
                <Route path="/posts/:id" component={PostsDetails} />
                <Route
                  key={location.key}
                  path={["/createPost", "/manage/:id"]}
                  component={PostsForm}
                />
                <Route component={NotFound}></Route>
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
