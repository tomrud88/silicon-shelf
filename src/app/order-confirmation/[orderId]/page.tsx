"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import CheckCircleIcon from "@/components/icons/CheckCircleIcon";

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: {
    name: string;
    imageUrl: string;
    category: string;
  };
}

interface Order {
  id: string;
  userId: string;
  status: string;
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: string;
  shippingMethod: string;
  productProtection: boolean;
  createdAt: string;
  items: OrderItem[];
}

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch order");
        }
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-[var(--text-primary)] text-xl">
          Loading order details...
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-[var(--text-primary)] text-xl">
          Error: {error || "Order not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start py-10 px-4 min-h-screen">
      {/* Main Invoice Container - 640px width, min 1356px height */}
      <div className="w-full max-w-[640px] min-h-[1356px] rounded-[6px] border p-6 bg-[#262626] border-[#383B42] flex flex-col">
        {/* 1. Check Circle + Text Container */}
        <div className="w-[298px] h-[144px] gap-6 opacity-100 flex flex-col items-center mx-auto">
          {/* Check Circle Icon - 60x60px with 5px border */}
          <div className="w-[60px] h-[60px] rounded-full border-[5px] border-[#4ADE80] flex items-center justify-center">
            <CheckCircleIcon size={60} className="text-[#4ADE80]" />
          </div>

          {/* Thanks Text */}
          <h1 className="font-['Inter'] font-medium text-[28px] leading-[40px] tracking-[-0.01em] text-center text-[var(--text-primary)] whitespace-nowrap">
            Thanks for Your Order!
          </h1>
        </div>

        {/* 2. Order ID Text */}
        <p className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-center text-[var(--text-secondary)]">
          {orderId}
        </p>

        {/* 3. Main Content Container */}
        <div className="w-[592px] min-h-[1090px] gap-6 opacity-100 flex flex-col mt-6">
          {/* Transaction Date */}
          <div className="w-[592px] h-[70px] gap-4 opacity-100 flex flex-col">
            <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-[var(--text-primary)]">
              Transaction Date
            </span>
            <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-[var(--text-secondary)]">
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Divider */}
          <div className="w-[592px] h-0 opacity-100 border-t border-[#383B42]"></div>

          {/* Payment Method */}
          <div className="w-[592px] h-[70px] gap-4 opacity-100 flex flex-col">
            <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-[var(--text-primary)]">
              Payment Method
            </span>
            <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-[var(--text-secondary)]">
              {order.paymentMethod}
            </span>
          </div>

          {/* Divider */}
          <div className="w-[592px] h-0 opacity-100 border-t border-[#383B42]"></div>

          {/* Shipping Method */}
          <div className="w-[592px] h-[70px] gap-4 opacity-100 flex flex-col">
            <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-[var(--text-primary)]">
              Shipping Method
            </span>
            <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-[var(--text-secondary)]">
              {order.shippingMethod}
            </span>
          </div>

          {/* Divider */}
          <div className="w-[592px] h-0 opacity-100 border-t border-[#383B42]"></div>

          {/* Your Order Container */}
          <div className="w-[592px] min-h-[390px] gap-4 opacity-100 flex flex-col">
            {/* Your Order Title */}
            <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-[var(--text-primary)]">
              Your Order
            </span>

            {/* Product Cards */}
            {order.items.map((item) => (
              <div
                key={item.id}
                className="w-[592px] h-[170px] rounded-[6px] gap-6 opacity-100 border p-4 bg-[#262626] border-[#383B42] flex"
              >
                {/* Image Container */}
                <div className="w-[172px] h-[138px] rounded-[6px] gap-[10px] border p-3 border-[#383B42] flex-shrink-0">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-[148px] h-[114px] rounded-[6px] opacity-100 object-contain"
                  />
                </div>

                {/* Content Container */}
                <div className="flex-1 h-[138px] gap-4 flex flex-col">
                  {/* Label + Badge Container */}
                  <div className="w-full gap-3 flex flex-col">
                    {/* Product Name */}
                    <span className="font-['Inter'] font-medium text-[20px] leading-[30px] tracking-[-0.01em] text-[var(--text-primary)]">
                      {item.product.name}
                    </span>

                    {/* Badge */}
                    <div className="w-fit h-[36px] rounded-[6px] py-[6px] px-[10px] bg-[#E5610A]">
                      <span className="font-['Inter'] font-medium text-[14px] leading-[24px] tracking-[0%] text-[#FDEDD7]">
                        {item.product.category}
                      </span>
                    </div>
                  </div>

                  {/* Price + Quantity Container */}
                  <div className="w-full flex justify-between items-center">
                    {/* Price */}
                    <span className="font-['Inter'] font-medium text-[24px] leading-[36px] tracking-[-0.01em] text-[var(--text-primary)]">
                      ${item.price.toFixed(2)}
                    </span>

                    {/* Quantity Display */}
                    <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-[var(--text-primary)]">
                      x{item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Total Product Price */}
            <div className="w-full h-[28px] flex justify-between items-center">
              <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-[var(--text-secondary)]">
                Total Product Price (
                {order.items.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                Items)
              </span>
              <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-[var(--text-primary)]">
                $
                {order.items
                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toFixed(2)}
              </span>
            </div>

            {/* Total Product Protection */}
            <div className="w-full h-[28px] flex justify-between items-center">
              <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-[var(--text-secondary)]">
                Total Product Protection
              </span>
              <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-[var(--text-primary)]">
                $
                {(order.productProtection ? order.items.length * 1 : 0).toFixed(
                  2
                )}
              </span>
            </div>

            {/* Total Shipping Price */}
            <div className="w-full h-[28px] flex justify-between items-center">
              <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-[var(--text-secondary)]">
                Total Shipping Price
              </span>
              <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-[var(--text-primary)]">
                $5.00
              </span>
            </div>

            {/* Shipping Insurance */}
            <div className="w-full h-[28px] flex justify-between items-center">
              <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-[var(--text-secondary)]">
                Shipping Insurance
              </span>
              <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-[var(--text-primary)]">
                $6.00
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-[592px] h-0 opacity-100 border-t border-[#383B42]"></div>

          {/* Transaction Fees Container */}
          <div className="w-[592px] h-[72px] gap-4 opacity-100 flex flex-col">
            {/* Transaction Fees Title */}
            <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-[var(--text-primary)]">
              Transaction Fees
            </span>

            {/* Service Fees Row */}
            <div className="w-[592px] h-[28px] flex justify-between items-center opacity-100">
              <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-[var(--text-secondary)]">
                Service Fees
              </span>
              <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-[var(--text-primary)]">
                $0.50
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-[592px] h-0 opacity-100 border-t border-[#383B42]"></div>

          {/* Grand Total Container */}
          <div className="w-[592px] h-[40px] flex justify-between items-center opacity-100">
            <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-[var(--text-primary)]">
              Grand Total
            </span>
            <span className="font-['Inter'] font-medium text-[28px] leading-[40px] tracking-[-0.01em] text-[var(--text-primary)]">
              ${order.totalAmount.toFixed(2)}
            </span>
          </div>

          {/* Status Container */}
          <div className="w-[592px] h-[36px] flex justify-between items-center opacity-100">
            <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-[var(--text-primary)]">
              Status
            </span>
            <div className="w-[77px] h-[36px] rounded-[6px] gap-[10px] py-[6px] px-[10px] bg-[#295B40] flex items-center justify-center">
              <span className="font-['Inter'] font-medium text-[14px] leading-[24px] tracking-[0%] text-[#DCFCE8]">
                Success
              </span>
            </div>
          </div>

          {/* Button Container */}
          <div className="w-[592px] h-[54px] gap-6 opacity-100">
            <Link
              href="/"
              className="w-[592px] h-[54px] rounded-[6px] gap-[14px] opacity-100 py-[14px] px-5 bg-[#F29145] hover:bg-[#E5610A] transition-colors flex items-center justify-center"
            >
              <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-center text-[#262626]">
                Continue Shopping
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
