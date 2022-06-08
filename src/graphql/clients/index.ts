import { Resolver, Query, Mutation, Arg, Authorized, Ctx } from 'type-graphql';
import { ClientType, ClientInput } from './types';
import * as db from '../../database/db';
import { buildClient, buildClients } from './domain';
import { AppContext } from '../types/AppContext';
import getUserByToken from '../../utils/getUserByToken';

@Resolver()
export class ClientsResolver {
  @Query(() => [ClientType])
  @Authorized()
  async getAllClients(@Ctx() { token }: AppContext): Promise<[ClientType]> {
    const userByToken = await getUserByToken(token);

    if (!userByToken) {
      throw new Error('Could not find user');
    }

    const clients = await db.default.clients.findAll({
      where: { company_id: userByToken.company.id },
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
    @Ctx() { token }: AppContext,
  ): Promise<ClientType> {
    const userByToken = await getUserByToken(token);

    if (!userByToken) {
      throw new Error('Could not find user');
    }

    try {
      return await db.default.clients.create({
        ...ClientData,
        company_id: userByToken.company.id,
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
    @Ctx() { token }: AppContext,
  ): Promise<ClientType> {
    const userByToken = await getUserByToken(token);

    if (!userByToken) {
      throw new Error('Could not find user');
    }

    try {
      await db.default.clients.update(
        { ...ClientData, company_id: userByToken.company.id },
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
