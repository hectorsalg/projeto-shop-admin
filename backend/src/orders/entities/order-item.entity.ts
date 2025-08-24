import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Product } from '../../products/entities/product.entity';

@ObjectType()
export class OrderItem {
  @Field(() => ID)
  id: string;

  @Field(() => Product)
  product: Product;

  @Field()
  quantity: number;

  @Field(() => Float)
  subtotal: number;
}