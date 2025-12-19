import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Get all products with their categories and brands
    const allProducts = await prisma.product.findMany({
      include: {
        category: {
          select: { name: true },
        },
        brand: {
          select: { name: true },
        },
      },
    });

    if (allProducts.length === 0) {
      return NextResponse.json([]);
    }

    // Shuffle products randomly and take 6
    const shuffled = allProducts.sort(() => Math.random() - 0.5);
    const recommendations = shuffled.slice(0, 6);

    return NextResponse.json(recommendations);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return NextResponse.json(
      { error: "Failed to fetch recommendations" },
      { status: 500 }
    );
  }
}
