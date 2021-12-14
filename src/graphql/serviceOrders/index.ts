import { Resolver, Query, Mutation, Arg, Authorized } from 'type-graphql';
import { ServiceOrdersType, ServiceOrdersInput } from './types';
import * as db from '../../database/db';
import { fileImageToStore, uploadImage } from '../../utils/file';
import { resolve } from 'path/posix';

@Resolver()
export class ServiceOrdersResolver {
  @Query(() => [ServiceOrdersType])
  @Authorized()
  async getAllServiceOrders(): Promise<[ServiceOrdersType]> {
    return await db.default.service_orders.findAll({
      include: ['client', 'images'],
    });
  }

  @Query(() => ServiceOrdersType)
  @Authorized()
  async getServiceOrder(
    @Arg('serviceOrderId') userId: number,
  ): Promise<ServiceOrdersType> {
    const user = await db.default.service_orders.findByPk(userId, {
      include: ['client', 'images'],
    });

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
      const serviceOrder = await db.default.service_orders.create({
        ...ServiceOrderData,
      });

      const { images } = ServiceOrderData;

      await uploadImage(db, images, serviceOrder.id);

      return await db.default.service_orders.findByPk(serviceOrder.id, {
        include: ['client', 'images'],
      });
    } catch (error) {
      console.log(error);
      throw new Error('error when store service order');
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

      const { images } = ServiceOrderData;

      await uploadImage(db, images, ServiceOrderData.id);

      return await db.default.service_orders.findByPk(ServiceOrderData.id, {
        include: ['client', 'images'],
      });
    } catch (error) {
      console.log('error', error);
      throw new Error('error when update service order');
    }
  }
}
