import "reflect-metadata";

import { ApolloServer, gql } from "apollo-server";

import * as db from "./database/db";
import schema from "./schema";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type User {
    id: Int
    name: String
    login: String
  }

  type Query {
    users: [User]
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    users: async () => db.default.users.findAll(),
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

const startApp = async () => {
  const server = new ApolloServer({ schema: await schema });

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

startApp();
