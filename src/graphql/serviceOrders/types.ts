import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class ServiceOrdersType {
  @Field()
  id: number;

  @Field()
  client_id: number;

  @Field()
  equipment: string;

  @Field()
  brand: string;

  @Field()
  identification: string;

  @Field()
  reports: string;

  @Field()
  description: string;

  @Field()
  notes: string;

  @Field()
  value: string;

  @Field()
  status_id: number;
}

@InputType()
export class ServiceOrdersInput {
  @Field({ nullable: true })
  id?: number;

  @Field()
  client_id: number;

  @Field({ nullable: true })
  equipment: string;

  @Field({ nullable: true })
  brand: string;

  @Field({ nullable: true })
  identification: string;

  @Field({ nullable: true })
  reports: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  notes: string;

  @Field({ nullable: true })
  value: string;

  @Field()
  status_id: number;
}
