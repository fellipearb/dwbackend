import { Resolver, Query, Mutation, Arg, Authorized } from 'type-graphql';
import { ServiceOrdersType, ServiceOrdersInput } from './types';
import * as db from '../../database/db';

@Resolver()
export class ServiceOrdersResolver {
  @Query(() => [ServiceOrdersType])
  @Authorized()
  async getAllServiceOrders(): Promise<[ServiceOrdersType]> {
    return await db.default.service_orders.findAll();
  }

  @Query(() => ServiceOrdersType)
  @Authorized()
  async getServiceOrder(
    @Arg('serviceOrderId') userId: number,
  ): Promise<ServiceOrdersType> {
    const user = await db.default.service_orders.findByPk(userId);

    if (!user) {
      throw new Error('Could not find user');
    }

    return user;
  }

  @Mutation(() => ServiceOrdersType)
  @Authorized()
  async storeServiceOrder(
    @Arg('ServiceOrderData') ServiceOrderData: ServiceOrdersInput,
  ): Promise<ServiceOrdersType> {
    try {
      return await db.default.service_orders.create({
        ...ServiceOrderData,
      });
    } catch (error) {
      throw new Error('error when store user');
    }
  }

  @Mutation(() => ServiceOrdersType)
  @Authorized()
  async updateServiceOrder(
    @Arg('ServiceOrderData') ServiceOrderData: ServiceOrdersInput,
  ): Promise<ServiceOrdersType> {
    try {
      await db.default.service_orders.update(
        { ...ServiceOrderData },
        { where: { id: ServiceOrderData.id } },
      );

      return await db.default.service_orders.findByPk(ServiceOrderData.id);
    } catch (error) {
      throw new Error('error when update user');
    }
  }
}
