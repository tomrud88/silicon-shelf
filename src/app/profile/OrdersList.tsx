import { prisma } from "@/lib/prisma";
import BagIcon from "@/components/icons/BagIcon";
import Link from "next/link";

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
      <div className="text-[var(--text-secondary)]">
        No orders found
      </div>
    );
  }

  return (
    <div className="w-full min-h-[272px] gap-4 opacity-100 flex flex-col">
      {orders.map((order) => (
        <Link
          key={order.id}
          href={`/order-confirmation/${order.id}`}
          className="w-full rounded-[6px] gap-4 opacity-100 border p-4 bg-[#262626] border-[#383B42] flex flex-col sm:flex-row sm:items-start cursor-pointer hover:bg-[#2a2a2a] transition-colors"
        >
          {/* Icon Container */}
          <div className="w-[26px] h-[26px] opacity-100 flex-shrink-0">
            <BagIcon size={26} />
          </div>

          {/* Data and Info Container */}
          <div className="w-full gap-[14px] opacity-100 flex flex-col">
            {/* Data Component */}
            <div className="w-full gap-4 opacity-100">
              <span className="font-['Inter'] font-normal text-base leading-[26px] tracking-[0%] text-[var(--text-secondary)]">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            {/* Info Container */}
            <div className="w-full gap-1 opacity-100 flex flex-col">
              <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-[var(--text-primary)]">
                Your order nr {order.id}
              </span>
              <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-[var(--text-primary)]">
                {order.orderItems[0]?.product.name || "Product"}
                {order.orderItems.length > 1 &&
                  ` +${order.orderItems.length - 1} more`}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
