import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './entities/order-status.enum';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation(() => Order)
  async createOrder(@Args('input') createOrderInput: CreateOrderDto) {
    const order = await this.ordersService.create(createOrderInput);
    pubSub.publish('orderCreated', { orderCreated: order });
    return order;
  }

  @Query(() => [Order], { name: 'orders' })
  findAll(@Args('status', { nullable: true }) status?: OrderStatus) {
    return this.ordersService.findAll(status);
  }

  @Mutation(() => Order)
  async updateOrderStatus(
    @Args('id') id: string,
    @Args('status') status: OrderStatus,
  ) {
    const order = await this.ordersService.updateStatus(id, status);
    pubSub.publish('orderStatusChanged', { orderStatusChanged: order });
    return order;
  }

  @Subscription(() => Order, {
    name: 'orderStatusChanged',
    filter: (payload, variables) => {
      return payload.orderStatusChanged.id === variables.orderId;
    },
  })
  orderStatusChanged(@Args('orderId') orderId: string) {
    return pubSub.asyncIterator('orderStatusChanged');
  }

  @Subscription(() => Order, {
    name: 'orderCreated',
  })
  orderCreated() {
    return pubSub.asyncIterator('orderCreated');
  }
}