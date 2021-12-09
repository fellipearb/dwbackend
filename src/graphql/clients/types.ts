import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
class ClientTypeContent {
  @Field()
  tel: string;
}
@ObjectType()
export class ClientType {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  tel: string;

  @Field()
  cpf: string;

  @Field()
  cep: string;

  @Field()
  street: string;

  @Field()
  number: string;

  @Field()
  district: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  complement: string;

  @Field()
  notes: string;

  @Field()
  content?: ClientTypeContent;
}

@InputType()
export class ClientInput {
  @Field({ nullable: true })
  id?: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  tel: string;

  @Field()
  cpf: string;

  @Field()
  cep: string;

  @Field()
  street: string;

  @Field()
  number: string;

  @Field()
  district: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field({ nullable: true })
  complement: string;

  @Field({ nullable: true })
  notes: string;
}
