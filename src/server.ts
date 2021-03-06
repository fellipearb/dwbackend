import 'reflect-metadata';
import * as dotenv from 'dotenv';

import schema from './schema';

import { ApolloServer } from 'apollo-server';

const startApp = async () => {
  dotenv.config();

  const server = new ApolloServer({
    cors: {
      origin: '*',
    },
    schema: await schema,
    context: ({ req }) => {
      const context = {
        req,
        token: req?.headers?.authorization,
      };

      return context;
    },
  });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

startApp();
