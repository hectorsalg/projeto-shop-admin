import { InputType, Field } from '@nestjs/graphql';
import { OrderItemDto } from './order-item.dto';

@InputType()
export class CreateOrderDto {
  @Field(() => [OrderItemDto])
  items: OrderItemDto[];
}