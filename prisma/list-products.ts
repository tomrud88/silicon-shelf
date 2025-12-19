import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
      brand: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      category: {
        name: "asc",
      },
    },
  });

  console.log(`\nTotal products: ${products.length}\n`);

  const groupedByCategory = products.reduce((acc, product) => {
    const categoryName = product.category.name;
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(product);
    return acc;
  }, {} as Record<string, typeof products>);

  Object.entries(groupedByCategory).forEach(
    ([categoryName, categoryProducts]) => {
      console.log(
        `\n=== ${categoryName} (${categoryProducts.length} products) ===`
      );
      categoryProducts.forEach((product) => {
        console.log(`  • ${product.name}`);
        console.log(`    Brand: ${product.brand?.name || "N/A"}`);
        console.log(`    Price: $${product.price}`);
        console.log(`    Stock: ${product.stock}`);
        console.log(`    Image URL: ${product.imageUrl}`);
      });
    }
  );

  await prisma.$disconnect();
}

main();
