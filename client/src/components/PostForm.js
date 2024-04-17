import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../util/hooks';
import { POST_FETCHING_QUERY } from '../util/graphql';

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    content: ''
  });
  

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      
      const data = proxy.readQuery({
        query: POST_FETCHING_QUERY
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: POST_FETCHING_QUERY, data });
      values.content = '';
    }
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
            <Form.Input
            placeholder="Hi World!"
            name="content"
            onChange={onChange}
            value={values.content}
            />
            <Button type="submit" color="teal">
            Submit
            </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}    
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($content: String!) {
    createPost(content: $content) {
      id
      content
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        content
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;