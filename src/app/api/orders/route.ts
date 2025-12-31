import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      items,
      shippingAddress,
      paymentMethod,
      shippingMethod,
      productProtection,
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in order" }, { status: 400 });
    }

    // Oblicz całkowitą kwotę
    let totalAmount = 0;

    // Weryfikuj produkty i ich dostępność
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
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

    // Dodaj koszty dodatkowe
    if (productProtection) {
      totalAmount += items.length * 1; // $1 za każdy produkt
    }
    totalAmount += 5; // Shipping price
    totalAmount += 6; // Shipping insurance
    totalAmount += 0.5; // Service fees

    // Utwórz zamówienie w transakcji
    const order = await prisma.$transaction(async (tx) => {
      // Stwórz zamówienie
      const newOrder = await tx.order.create({
        data: {
          userId: session.user.id,
          totalAmount,
          status: "PENDING",
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
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
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
