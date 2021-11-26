import { Field, ObjectType } from "type-graphql";

@ObjectType()
class UserType {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  login: string;
}

export default UserType;
