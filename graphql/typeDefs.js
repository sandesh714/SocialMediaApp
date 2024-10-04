const { gql } = require('apollo-server');


module.exports = gql`
  type Post{
    id: ID!
    content: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment{
    id: ID!
    createdAt: String!
    username: String!
    content: String!
  }
  type Like{
    id: ID!
    createdAt: String!
    username: String!
  }

  type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
  }
  input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
  }
  type Query{
    getPosts: [Post]
    getPost(postId: ID!): Post!
  }
  type Mutation{
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(content:String!): Post!
    deletePost(postId:ID!): String!
    createComment(postId: String!, content: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    addFriend(userId: ID!): User!
  }
`;