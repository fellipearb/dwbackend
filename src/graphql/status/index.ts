import { Resolver, Query, Mutation, Arg, Authorized } from 'type-graphql';
import { StatusType, StatusInput } from './types';
import * as db from '../../database/db';

@Resolver()
export class StatusResolver {
  @Query(() => [StatusType])
  @Authorized()
  async getAllStatus(): Promise<[StatusType]> {
    return await db.default.status.findAll();
  }
}
