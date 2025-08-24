import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './entities/order-status.enum';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
  
  private toGraphQLEntity(orderFromDb: any): Order {
    return {
      ...orderFromDb,
      items: orderFromDb.items.map((item) => ({
        ...item,
        subtotal: item.product.price * item.quantity,
      })),
    };
  }

  async create(createOrderInput: CreateOrderDto): Promise<Order> {
    const { items } = createOrderInput;

    const productIds = items.map((item) => item.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    const productMap = new Map(products.map((p) => [p.id, p]));

    let total = 0;

    for (const item of items) {
      const product = productMap.get(item.productId);

      if (!product) {
        throw new NotFoundException(`Produto com ID ${item.productId} não encontrado.`);
      }

      if (!product.inStock) {
        throw new Error(`Produto ${product.name} está fora de estoque.`);
      }

      total += product.price * item.quantity;
    }

    const createdOrderFromDb = await this.prisma.order.create({
      data: {
        total,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return this.toGraphQLEntity(createdOrderFromDb);
  }

  async findAll(status?: OrderStatus): Promise<Order[]> {
    const where = status ? { status } : {};

    const ordersFromDb = await this.prisma.order.findMany({
      where,
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { id: 'desc' },
    });

    return ordersFromDb.map(this.toGraphQLEntity);
  }

  async findOne(id: string): Promise<Order | null> {
    const orderFromDb = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!orderFromDb) {
      return null;
    }
    return this.toGraphQLEntity(orderFromDb);
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const updatedOrderFromDb = await this.prisma.order.update({
      where: { id },
      data: { status },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return this.toGraphQLEntity(updatedOrderFromDb);
  }
}