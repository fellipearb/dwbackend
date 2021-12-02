import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import Auth from './auth';
import { ClientsResolver } from './graphql/clients';
import { LoginResolver } from './graphql/login';
import { ServiceOrdersResolver } from './graphql/serviceOrders';
import { UsersResolver } from './graphql/users';

const schema = buildSchema({
  resolvers: [
    UsersResolver,
    LoginResolver,
    ServiceOrdersResolver,
    ClientsResolver,
  ],
  authChecker: Auth,
});

export default schema;
