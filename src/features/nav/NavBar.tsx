import { observer } from "mobx-react-lite";
import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";

const NavBar: React.FC = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item exact header as={NavLink} to="/">
          <img
            src="/assets/logo.png"
            style={{ marginRight: "10px" }}
            alt="logo"
          ></img>
          Reactivities
        </Menu.Item>
        <Menu.Item name="Users" header as={NavLink} to="/users" />
        <Menu.Item name="Posts" header as={NavLink} to="/posts" />
        <Menu.Item header as={NavLink} to="/createPost">
          <Button positive content="Create Post"></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
