import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      console.error("Unauthorized order attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    console.log("Order request body:", body);

    const {
      items,
      shippingAddress,
      paymentMethod,
      shippingMethod,
      productProtection,
    } = body;

    if (!items || items.length === 0) {
      console.error("No items in order");
      return NextResponse.json({ error: "No items in order" }, { status: 400 });
    }

    // Oblicz całkowitą kwotę
    let totalAmount = 0;

    // Weryfikuj produkty i ich dostępność
    for (const item of items) {
      console.log("Checking product:", item.productId);
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        console.error("Product not found:", item.productId);
        return NextResponse.json(
          { error: `Product ${item.productId} not found` },
          { status: 404 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.name}` },
          { status: 400 }
        );
      }

      totalAmount += product.price * item.quantity;
    }

    console.log("Total amount calculated:", totalAmount);

    // Dodaj koszty dodatkowe
    if (productProtection) {
      totalAmount += items.length * 1; // $1 za każdy produkt
      console.log("Added protection cost:", items.length * 1);
    }
    totalAmount += 5; // Shipping price
    totalAmount += 6; // Shipping insurance
    totalAmount += 0.5; // Service fees

    console.log("Final total amount:", totalAmount);
    console.log("Starting database transaction...");

    // Utwórz zamówienie w transakcji
    const order = await prisma.$transaction(async (tx) => {
      console.log("Creating order with data:", {
        userId: session.user.id,
        totalAmount,
        productProtection: productProtection || false,
        items: items.map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity,
          priceAtPurchase: item.price,
        })),
      });

      // Stwórz zamówienie
      const newOrder = await tx.order.create({
        data: {
          userId: session.user.id,
          totalAmount,
          status: "PENDING",
          productProtection: productProtection || false,
          orderItems: {
            create: items.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              priceAtPurchase: item.price,
            })),
          },
        },
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      });

      // Zaktualizuj stany magazynowe
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      // Wyczyść koszyk użytkownika
      const cart = await tx.cart.findUnique({
        where: { userId: session.user.id },
      });

      if (cart) {
        await tx.cartItem.deleteMany({
          where: { cartId: cart.id },
        });
      }

      return newOrder;
    });

    return NextResponse.json(
      {
        success: true,
        orderId: order.id,
        order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order - Full error:", error);
    console.error(
      "Error message:",
      error instanceof Error ? error.message : "Unknown error"
    );
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack trace"
    );

    // Return more detailed error information in development
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      {
        error: "Failed to create order",
        details:
          process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                brand: true,
                category: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
