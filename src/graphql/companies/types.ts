import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class CompaniesType {
  @Field()
  id: number;

  @Field()
  name: string;
}
