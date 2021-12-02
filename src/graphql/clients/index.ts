import { Resolver, Query, Mutation, Arg, Authorized } from 'type-graphql';
import { ClientType, ClientInput } from './types';
import * as db from '../../database/db';

@Resolver()
export class ClientsResolver {
  @Query(() => [ClientType])
  @Authorized()
  async getAllClients(): Promise<[ClientType]> {
    return await db.default.clients.findAll();
  }

  @Query(() => ClientType)
  @Authorized()
  async getClient(@Arg('cliendId') cliendId: number): Promise<ClientType> {
    const user = await db.default.clients.findByPk(cliendId);

    if (!user) {
      throw new Error('Could not find user');
    }

    return user;
  }

  @Mutation(() => ClientType)
  @Authorized()
  async storeClient(
    @Arg('ClientData') ClientData: ClientInput,
  ): Promise<ClientType> {
    try {
      return await db.default.clients.create({
        ...ClientData,
      });
    } catch (error) {
      throw new Error('error when store user');
    }
  }

  @Mutation(() => ClientType)
  @Authorized()
  async updateClient(
    @Arg('ClientData') ClientData: ClientInput,
  ): Promise<ClientType> {
    try {
      await db.default.clients.update(
        { ...ClientData },
        { where: { id: ClientData.id } },
      );

      return await db.default.clients.findByPk(ClientData.id);
    } catch (error) {
      throw new Error('error when update user');
    }
  }
}