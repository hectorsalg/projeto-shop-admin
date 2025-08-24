import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Laptop',
        price: 2200.99,
        inStock: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Mouse',
        price: 79.50,
        inStock: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Keyboard',
        price: 90.00,
        inStock: false,
      },
    }),
  ]);

  console.log('Seeded database with products:', products);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });