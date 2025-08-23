import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class OrderItemDto {
  @Field()
  productId: string;

  @Field()
  quantity: number;
}