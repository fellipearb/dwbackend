import { Resolver, Query, Mutation, Arg, Authorized } from 'type-graphql';
import { ClientType, ClientInput } from './types';
import * as db from '../../database/db';
import { buildClient, buildClients } from './domain';

@Resolver()
export class ClientsResolver {
  @Query(() => [ClientType])
  @Authorized()
  async getAllClients(): Promise<[ClientType]> {
    const clients = await db.default.clients.findAll({
      include: ['company'],
      order: [['name', 'ASC']],
    });

    return buildClients(clients);
  }

  @Query(() => ClientType)
  @Authorized()
  async getClient(@Arg('cliendId') cliendId: number): Promise<ClientType> {
    const user = await db.default.clients.findByPk(cliendId, {
      include: ['company'],
    });

    if (!user) {
      throw new Error('Could not find user');
    }

    return buildClient(user);
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
      console.error(error);
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

      return await db.default.clients.findByPk(ClientData.id, {
        include: ['company'],
      });
    } catch (error) {
      throw new Error('error when update user');
    }
  }
}
