import { Field, InputType, ObjectType } from 'type-graphql';
import { ClientType } from '../clients/types';
import {
  ServiceOrdersImagesInput,
  ServiceOrdersImagesType,
} from '../serviceOrdersImages/types';
import { StatusType } from '../status/types';
@ObjectType()
export class ServiceOrdersContentType {
  @Field({ nullable: true })
  value?: string;
}
@ObjectType()
export class ServiceOrdersType {
  @Field()
  id: number;

  @Field()
  client_id: number;

  @Field({ nullable: true })
  equipment?: string;

  @Field({ nullable: true })
  brand?: string;

  @Field({ nullable: true })
  identification?: string;

  @Field({ nullable: true })
  reports?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  notes?: string;

  @Field({ nullable: true })
  value?: string;

  @Field()
  status_id: number;

  @Field({ nullable: true })
  closedAt?: string;

  @Field({ nullable: true })
  client: ClientType;

  @Field(type => [ServiceOrdersImagesType])
  images?: ServiceOrdersImagesType[];

  @Field({ nullable: true })
  status?: StatusType;

  @Field()
  content: ServiceOrdersContentType;
}

@InputType()
export class ServiceOrdersInput {
  @Field({ nullable: true })
  id?: number;

  @Field()
  client_id: number;

  @Field({ nullable: true })
  equipment?: string;

  @Field({ nullable: true })
  brand?: string;

  @Field({ nullable: true })
  identification?: string;

  @Field({ nullable: true })
  reports?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  notes?: string;

  @Field({ nullable: true })
  value?: string;

  @Field()
  status_id: number;

  @Field({ nullable: true })
  closedAt?: string;

  @Field(type => [ServiceOrdersImagesInput], { nullable: true })
  images?: ServiceOrdersImagesInput[];
}
