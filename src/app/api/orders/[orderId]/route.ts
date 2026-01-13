import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { orderId } = await params;

    // Pobierz zamówienie z itemami i produktami
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                name: true,
                imageUrl: true,
                category: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Sprawdź czy zamówienie należy do zalogowanego użytkownika
    if (order.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Przekształć dane do formatu oczekiwanego przez frontend
    const formattedOrder = {
      id: order.id,
      userId: order.userId,
      status: order.status,
      totalAmount: order.totalAmount,
      shippingAddress: "Main Address", // Możesz dodać pole w bazie danych
      paymentMethod: "Apple Pay", // Możesz dodać pole w bazie danych
      shippingMethod: "NexusHub Courier", // Możesz dodać pole w bazie danych
      productProtection: order.productProtection,
      createdAt: order.createdAt,
      items: order.orderItems.map((item) => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.priceAtPurchase,
        product: {
          name: item.product.name,
          imageUrl: item.product.imageUrl,
          category: item.product.category.name,
        },
      })),
    };

    return NextResponse.json(formattedOrder);
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
