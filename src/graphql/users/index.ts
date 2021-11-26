import { Resolver, Query } from "type-graphql";
import UserType from "./type";
import * as db from "../../database/db";

@Resolver()
export class UsersResolver {
  @Query(() => [UserType])
  async getAllUsers(): Promise<[UserType]> {
    return await db.default.users.findAll();
  }
}
