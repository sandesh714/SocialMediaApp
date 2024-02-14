const dotenv = require("dotenv");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require("mongoose");
dotenv.config();


const Post = require("./models/Post");
const { ApolloServer } = require("apollo-server");
const graphql = require('graphql-tag');


const typeDefs = graphql`
  type Post{
    id: ID!
    content: String!
    createdAt: String!
    username: String!
  }
  type Query{
    getPosts: [Post]
  }
`;

const resolvers = {
  Query: {
    async getPosts(){
      try{
        const posts = await Post.find();
        return posts;
      } catch(err){
        throw new Error(err);
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs, 
  resolvers
});






const connectionString = process.env.MONGODB_SRV;
mongoose  
  .connect(connectionString)
  .then(()=> {
    console.log("Mongodb connected")
    return server.listen({ port: 5000});
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })

