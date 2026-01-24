import { prisma } from "@/lib/prisma";

interface OrdersListProps {
  userId: string;
}

export default async function OrdersList({ userId }: OrdersListProps) {
  // Server-side data fetching
  const ordersData = await prisma.order.findMany({
    where: { userId },
    include: {
      orderItems: {
        include: {
          product: {
            select: { name: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const orders = ordersData.map((order) => ({
    ...order,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
  }));

  if (orders.length === 0) {
    return (
      <div className="w-full min-h-[200px] rounded-[6px] opacity-100 border p-8 bg-[#262626] border-[#383B42] flex items-center justify-center">
        <div className="text-center">
          <p className="font-['Inter'] font-normal text-base leading-[26px] text-[var(--text-secondary)]">
            No orders yet
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full gap-6 opacity-100 flex flex-col">
      {orders.map((order) => (
        <div
          key={order.id}
          className="w-full min-h-[100px] rounded-[6px] gap-6 opacity-100 border p-6 bg-[#262626] border-[#383B42] flex flex-col"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="font-['Inter'] font-medium text-base leading-[26px] text-[var(--text-primary)]">
                  Order #{order.id.slice(-8)}
                </span>
              </div>
              <span className="font-['Inter'] font-normal text-sm leading-[24px] text-[var(--text-secondary)]">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-1">
              <span className="font-['Inter'] font-semibold text-lg leading-[28px] text-[#F29145]">
                ${order.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="w-full border-t border-[#383B42] pt-4">
            <div className="flex flex-col gap-2">
              {order.orderItems.map((item) => (
                <div
                  key={item.id}
                  className="font-['Inter'] font-normal text-sm leading-[24px] text-[var(--text-secondary)]"
                >
                  • {item.product.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
