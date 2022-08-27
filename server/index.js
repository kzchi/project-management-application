const express = require('express');
const colors = require('colors');
const cors = require('cors');

require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
//const { buildSchema } = require('graphql');
const connectDB = require('./config/db')
const port = process.env.PORT || 4000;

const app = express();

connectDB();

app.use(cors());

// Connect to database

//app.use(
//  '/graphql',
 // graphqlHTTP({
 //   schema,
 //   graphiql: process.env.NODE_ENV === 'development',
//  })
//);

/*
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);
*/

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  },
};

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
 