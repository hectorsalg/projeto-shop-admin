import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { OrderStatus } from './order-status.enum';
import { OrderItem } from './order-item.entity';

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string;

  @Field(() => [OrderItem])
  items: OrderItem[];

  @Field(() => OrderStatus)
  status: OrderStatus;

  @Field(() => Float)
  total: number;
}