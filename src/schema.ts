import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { LoginResolver } from "./graphql/login";
import { UsersResolver } from "./graphql/users";

const schema = buildSchema({
  resolvers: [UsersResolver, LoginResolver],
  validate: false,
});

export default schema;
