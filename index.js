const dotenv = require("dotenv");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require("mongoose");
dotenv.config();

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const { ApolloServer } = require("apollo-server");

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

