import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { useNavigate } from 'react-router-dom';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

function AboutMe(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const history = useNavigate();

  const { onChange, onSubmit, values } = useForm(updateUser, {
    fullName: '',
    username: '',
    email: ''
  });

  const [updateUserInfo, { loading }] = useMutation(UPDATE_USER_INFO, {
    update(
      _,
      {
        data: { updateUser: updatedUserData }
      }
    ) {
      context.updateUser(updatedUserData);
      history('/aboutme'); 
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function updateUser() {
    updateUserInfo();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Update Profile</h1>
        <Form.Input
          label="Full Name"
          placeholder="Full Name.."
          name="fullName"
          type="text"
          value={values.fullName}
          error={errors.fullName ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email.."
          name="email"
          type="email"
          value={values.email}
          error={errors.email ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Update
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const UPDATE_USER_INFO = gql`
  mutation updateUser(
    $fullName: String!
    $username: String!
    $email: String!
  ) {
    updateUser(
      updateUserInput: {
        fullName: $fullName
        username: $username
        email: $email
      }
    ) {
      id
      fullName
      username
      email
      updatedAt
    }
  }
`;

export default AboutMe;
