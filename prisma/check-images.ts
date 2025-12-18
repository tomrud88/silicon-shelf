import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function check() {
  const categories = await prisma.category.findMany({
    select: {
      name: true,
      image: true,
    },
  });

  console.log(JSON.stringify(categories, null, 2));
  await prisma.$disconnect();
}

check();
