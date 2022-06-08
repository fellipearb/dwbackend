import { Resolver, Query, Mutation, Arg, Authorized } from 'type-graphql';
import { UserType, UserInput } from './types';
import * as db from '../../database/db';
import { encrypt } from '../../utils/password';

@Resolver()
export class UsersResolver {
  @Query(() => [UserType])
  @Authorized()
  async getAllUsers(): Promise<[UserType]> {
    return await db.default.users.findAll({ include: ['company'] });
  }

  @Query(() => UserType)
  @Authorized()
  async getUser(@Arg('userId') userId: number): Promise<UserType> {
    const user = await db.default.users.findByPk(userId, {
      include: ['company'],
    });

    if (!user) {
      throw new Error('Could not find user');
    }

    return user;
  }

  @Mutation(() => UserType)
  @Authorized()
  async storeUser(@Arg('UserData') UserData: UserInput): Promise<UserType> {
    try {
      return await db.default.users.create({
        ...UserData,
        password: await encrypt(UserData.password),
      });
    } catch (error) {
      throw new Error('error when store user');
    }
  }

  @Mutation(() => UserType)
  @Authorized()
  async updateUser(@Arg('UserData') UserData: UserInput): Promise<UserType> {
    try {
      if (UserData.password) {
        UserData.password = await encrypt(UserData.password);
      }

      await db.default.users.update(
        { ...UserData },
        { where: { id: UserData.id } },
      );

      return await db.default.users.findByPk(UserData.id, {
        include: ['company'],
      });
    } catch (error) {
      throw new Error('error when update user');
    }
  }
}
