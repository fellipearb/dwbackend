import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class LoginInput {
  @Field()
  login: string;

  @Field()
  password: string;
}
