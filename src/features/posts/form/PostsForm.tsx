import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import { RouteComponentProps } from "react-router-dom";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import TextInput from "../../../app/common/form/TextInput";
import UserSelectInput from "../../../app/common/form/UserSelectInput";
import { PostFormValues } from "../../../app/models/posts";
import { useStores } from "../../../app/stores/helpers/useStores";

interface DetailParam {
  id: string;
}

const PostsForm: React.FC<RouteComponentProps<DetailParam>> = ({
  match,
  history,
}) => {
  const {
    dataStores: { postsStore },
  } = useStores();
  const { loadPost, createPost, editPost, submitting } = postsStore;

  const [post, setPost] = useState(new PostFormValues());

  useEffect(() => {
    if (match.params.id) {
      loadPost(match.params.id).then((post) => {
        if (post) {
          setPost(new PostFormValues(post));
        }
      });
    }
  }, [loadPost, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const { ...post } = values;
    let newPost = {
      ...post,
    };
    if (!post.id) {
      createPost(newPost);
    } else {
      editPost(post);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            initialValues={post}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <UserSelectInput></UserSelectInput>
                <Field name="title" placeholder="Title" component={TextInput} />
                <Field
                  rows={4}
                  placeholder="Description"
                  name="body"
                  component={TextAreaInput}
                  value={post.body}
                />
                <Button
                  positive
                  floated="right"
                  type="submit"
                  content="Submit"
                  loading={submitting}
                ></Button>
                <Button
                  onClick={() => history.push("/posts")}
                  floated="right"
                  type="button"
                  content="Cancel"
                ></Button>
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(PostsForm);
