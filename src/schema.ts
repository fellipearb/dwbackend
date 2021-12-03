import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import Auth from './auth';
import { ClientsResolver } from './graphql/clients';
import { LoginResolver } from './graphql/login';
import { ServiceOrdersResolver } from './graphql/serviceOrders';
import { StatusResolver } from './graphql/status';
import { UsersResolver } from './graphql/users';

const schema = buildSchema({
  resolvers: [
    UsersResolver,
    LoginResolver,
    StatusResolver,
    ServiceOrdersResolver,
    ClientsResolver,
  ],
  authChecker: Auth,
});

export default schema;
