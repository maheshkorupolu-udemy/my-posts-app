import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Menu, Popup, Table, TableCell } from "semantic-ui-react";
import { useStores } from "../../../app/stores/helpers/useStores";

const PostsList = () => {
  const {
    dataStores: { postsStore },
  } = useStores();
  const { posts } = postsStore;

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Posted By</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {posts.map((post) => (
          <Fragment key={post.id}>
            <Table.Row>
              <TableCell>
                <Popup
                  content="Edit post"
                  trigger={
                    <Button
                      as={Link}
                      to={`/manage/${post.id}`}
                      color="blue"
                      icon="edit"
                      size="mini"
                    />
                  }
                />
                <Popup
                  content="View post"
                  trigger={
                    <Button
                      as={Link}
                      to={`/posts/${post.id}`}
                      color="blue"
                      icon="eye"
                      size="mini"
                    />
                  }
                />
              </TableCell>
              <Table.Cell>{post.title}</Table.Cell>
              <Table.Cell>{post.postedBy}</Table.Cell>
            </Table.Row>
          </Fragment>
        ))}
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="3">
            <Menu floated="right" pagination>
              <Menu.Item as="a" icon>
                <Icon name="chevron left" />
              </Menu.Item>
              <Menu.Item as="a">1</Menu.Item>
              <Menu.Item as="a">2</Menu.Item>
              <Menu.Item as="a">3</Menu.Item>
              <Menu.Item as="a">4</Menu.Item>
              <Menu.Item as="a" icon>
                <Icon name="chevron right" />
              </Menu.Item>
            </Menu>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default observer(PostsList);
