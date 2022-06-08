import { Resolver, Query, Mutation, Arg, Authorized, Ctx } from 'type-graphql';
import { ServiceOrdersType, ServiceOrdersInput } from './types';
import * as db from '../../database/db';
import { uploadImage } from '../../utils/file';
import { buildOrderService, buildOrderServices } from './domain';
import { AppContext } from '../types/AppContext';
import getUserByToken from '../../utils/getUserByToken';

@Resolver()
export class ServiceOrdersResolver {
  @Query(() => [ServiceOrdersType])
  @Authorized()
  async getAllServiceOrders(
    @Ctx() { token }: AppContext,
  ): Promise<[ServiceOrdersType]> {
    const userByToken = await getUserByToken(token);

    if (!userByToken) {
      throw new Error('Could not find user');
    }

    const orders = await db.default.service_orders.findAll({
      include: [
        {
          model: db.default.clients,
          as: 'client',
          where: {
            company_id: userByToken.company.id,
          },
          required: true,
        },
        'images',
        'status',
      ],
      order: [
        ['updatedAt', 'DESC'],
        ['id', 'DESC'],
      ],
    });

    return buildOrderServices(orders);
  }

  @Query(() => ServiceOrdersType)
  @Authorized()
  async getServiceOrder(
    @Ctx() { token }: AppContext,
    @Arg('serviceOrderId') serviceOrderId: number,
  ): Promise<ServiceOrdersType> {
    const userByToken = await getUserByToken(token);

    if (!userByToken) {
      throw new Error('Could not find user');
    }

    const order = await db.default.service_orders.findByPk(serviceOrderId, {
      include: [
        {
          model: db.default.clients,
          as: 'client',
          where: {
            company_id: userByToken.company.id,
          },
          required: true,
        },
        'images',
        'status',
      ],
    });

    if (!order) {
      throw new Error('Could not find order');
    }

    return buildOrderService(order);
  }

  @Mutation(() => ServiceOrdersType)
  @Authorized()
  async storeServiceOrder(
    @Ctx() { token }: AppContext,
    @Arg('ServiceOrderData') ServiceOrderData: ServiceOrdersInput,
  ): Promise<ServiceOrdersType> {
    const userByToken = await getUserByToken(token);

    if (!userByToken) {
      throw new Error('Could not find user');
    }

    try {
      const serviceOrder = await db.default.service_orders.create({
        ...ServiceOrderData,
      });

      const { images } = ServiceOrderData;

      !!images.length && (await uploadImage(db, images, serviceOrder.id));

      const order = await db.default.service_orders.findByPk(serviceOrder.id, {
        include: [
          {
            model: db.default.clients,
            as: 'client',
            where: {
              company_id: userByToken.company.id,
            },
            required: true,
          },
          'images',
          'status',
        ],
      });

      return buildOrderService(order);
    } catch (error) {
      console.log(error);
      throw new Error('error when store service order');
    }
  }

  @Mutation(() => ServiceOrdersType)
  @Authorized()
  async updateServiceOrder(
    @Ctx() { token }: AppContext,
    @Arg('ServiceOrderData') ServiceOrderData: ServiceOrdersInput,
  ): Promise<ServiceOrdersType> {
    const userByToken = await getUserByToken(token);

    if (!userByToken) {
      throw new Error('Could not find user');
    }

    try {
      await db.default.service_orders.update(
        { ...ServiceOrderData },
        { where: { id: ServiceOrderData.id } },
      );

      const { images } = ServiceOrderData;

      !!images.length && (await uploadImage(db, images, ServiceOrderData.id));

      const order = await db.default.service_orders.findByPk(
        ServiceOrderData.id,
        {
          include: [
            {
              model: db.default.clients,
              as: 'client',
              where: {
                company_id: userByToken.company.id,
              },
              required: true,
            },
            'images',
            'status',
          ],
        },
      );

      return buildOrderService(order);
    } catch (error) {
      console.log('error', error);
      throw new Error('error when update service order');
    }
  }
}
