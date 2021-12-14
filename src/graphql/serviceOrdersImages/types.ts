import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class ServiceOrdersImagesType {
  @Field()
  id: number;

  @Field()
  service_orders_id: number;

  @Field()
  path: string;
}

@InputType()
export class ServiceOrdersImagesInput {
  @Field({ nullable: true })
  id?: number;

  @Field()
  service_orders_id: number;

  @Field()
  file: string;
}
