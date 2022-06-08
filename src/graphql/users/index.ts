import { Resolver, Query, Mutation, Arg, Authorized, Ctx } from 'type-graphql';
import { UserType, UserInput } from './types';
import * as db from '../../database/db';
import { encrypt } from '../../utils/password';
import { AppContext } from '../types/AppContext';
import getUserByToken from '../../utils/getUserByToken';

@Resolver()
export class UsersResolver {
  @Query(() => [UserType])
  @Authorized()
  async getAllUsers(@Ctx() { token }: AppContext): Promise<[UserType]> {
    const userByToken = await getUserByToken(token);

    if (!userByToken) {
      throw new Error('Could not find user');
    }

    return await db.default.users.findAll({
      where: { company_id: userByToken.company.id },
      include: ['company'],
    });
  }

  @Query(() => UserType)
  @Authorized()
  async getUser(
    @Ctx() { token }: AppContext,
    @Arg('userId') userId: number,
  ): Promise<UserType> {
    const userByToken = await getUserByToken(token);

    if (!userByToken) {
      throw new Error('Could not find user');
    }

    const user = await db.default.users.findByPk(userId, {
      where: { company_id: userByToken.company.id },
      include: ['company'],
    });

    if (!user) {
      throw new Error('Could not find user');
    }

    return user;
  }

  @Mutation(() => UserType)
  @Authorized()
  async storeUser(
    @Ctx() { token }: AppContext,
    @Arg('UserData') UserData: UserInput,
  ): Promise<UserType> {
    const userByToken = await getUserByToken(token);

    if (!userByToken) {
      throw new Error('Could not find user');
    }

    try {
      return await db.default.users.create({
        ...UserData,
        company_id: userByToken.company.id,
        password: await encrypt(UserData.password),
      });
    } catch (error) {
      throw new Error('error when store user');
    }
  }

  @Mutation(() => UserType)
  @Authorized()
  async updateUser(
    @Ctx() { token }: AppContext,
    @Arg('UserData') UserData: UserInput,
  ): Promise<UserType> {
    const userByToken = await getUserByToken(token);

    if (!userByToken) {
      throw new Error('Could not find user');
    }

    try {
      if (UserData.password) {
        UserData.password = await encrypt(UserData.password);
      }

      await db.default.users.update(
        { ...UserData, company_id: userByToken.company.id },
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
