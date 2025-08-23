import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateProductDto {
  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field({ defaultValue: true })
  inStock: boolean;
}