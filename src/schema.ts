import "reflect-metadata";
import { buildSchema } from "type-graphql";
import Auth from "./auth";
import { LoginResolver } from "./graphql/login";
import { UsersResolver } from "./graphql/users";

const schema = buildSchema({
  resolvers: [UsersResolver, LoginResolver],
  authChecker: Auth,
});

export default schema;
