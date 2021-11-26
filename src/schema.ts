import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { UsersResolver } from "./graphql/users";

const schema = buildSchema({
  resolvers: [UsersResolver],
  validate: false,
});

export default schema;
