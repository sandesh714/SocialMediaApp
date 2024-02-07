const dotenv = require("dotenv");

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// Import the mongoose module
const mongoose = require("mongoose");
dotenv.config();



const connectionString = process.env.MONGODB_SRV;
const connectToDB = async () => {
  try {
      await mongoose.connect(connectionString, {
          autoIndex: true
      })
      console.log('Connected to Mongodb');} catch (error) {
      console.error(error);
  }
}

connectToDB();

// Define schema
const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
  a_string: String,
  a_date: Date,
});

// Compile model from schema
const SomeModel = mongoose.model("SomeModel", SomeModelSchema);


app.use(bodyParser.json());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

var { graphql, buildSchema } = require("graphql")

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`)

// The rootValue provides a resolver function for each API endpoint
var rootValue = {
  hello: () => {
    return "Hello world!"
  },
}

// Run the GraphQL query '{ hello }' and print out the response
graphql({
  schema,
  source: "{ hello }",
  rootValue,
}).then(response => {
  console.log(response)
})