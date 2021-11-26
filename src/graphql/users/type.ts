import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class UserType {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  login: string;
}

@InputType()
export class UserInput {
  @Field({ nullable: true })
  id?: number;

  @Field()
  name: string;

  @Field()
  login: string;

  @Field({ nullable: true })
  password?: string;
}
