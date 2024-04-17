import gql from 'graphql-tag';

export const POST_FETCHING_QUERY = gql`
  {
    getPosts {
      id
      content
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        content
      }
    }
  }
`;