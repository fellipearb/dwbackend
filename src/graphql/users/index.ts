import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { UserType, UserInput } from "./type";
import * as db from "../../database/db";

@Resolver()
export class UsersResolver {
  @Query(() => [UserType])
  async getAllUsers(): Promise<[UserType]> {
    return await db.default.users.findAll();
  }

  @Query(() => UserType)
  async getUser(@Arg("userId") userId: number): Promise<UserType> {
    return await db.default.users.findByPk(userId);
  }

  @Mutation(() => UserType)
  async storeUser(@Arg("UserData") UserData: UserInput): Promise<UserType> {
    return await db.default.users.create(UserData);
  }

  @Mutation(() => UserType)
  async updateUser(@Arg("UserData") UserData: UserInput): Promise<UserType> {
    await db.default.users.update(
      { ...UserData },
      { where: { id: UserData.id } }
    );

    return await db.default.users.findByPk(UserData.id);
  }
}
