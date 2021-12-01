import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import Auth from './auth';
import { LoginResolver } from './graphql/login';
import { ServiceOrdersResolver } from './graphql/serviceOrders';
import { UsersResolver } from './graphql/users';

const schema = buildSchema({
  resolvers: [UsersResolver, LoginResolver, ServiceOrdersResolver],
  authChecker: Auth,
});

export default schema;
