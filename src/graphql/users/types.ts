import { Field, InputType, ObjectType } from 'type-graphql';
import { CompaniesType } from '../companies/types';

@ObjectType()
export class UserType {
  @Field()
  id: number;

  @Field()
  company_id: number;

  @Field()
  name: string;

  @Field()
  login: string;

  @Field()
  password: string;

  @Field()
  accessToken: string;

  @Field()
  company: CompaniesType;
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
