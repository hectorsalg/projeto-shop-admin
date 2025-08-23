import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductInput: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data: createProductInput,
    });
  }

  async findAll(search?: string): Promise<Product[]> {
    const where = search
      ? {
          OR: [
            { name: { contains: search } },
          ],
        }
      : {};

    return this.prisma.product.findMany({
      where,
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }
}