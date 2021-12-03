import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class StatusType {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  types: string;
}

@InputType()
export class StatusInput {
  @Field({ nullable: true })
  id?: number;

  @Field()
  name: string;

  @Field()
  types: string;
}
