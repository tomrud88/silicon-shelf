"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import ProfileIcon from "@/components/icons/ProfileIcon";
import BagIcon from "@/components/icons/BagIcon";

interface User {
  id?: string;
  name?: string | null;
  email?: string | null;
}

interface Order {
  id: string;
  totalAmount: number;
  createdAt: string;
  orderItems: {
    id: string;
    product: {
      name: string;
    };
  }[];
}

interface ProfileClientComponentProps {
  user: User;
  orders: Order[];
}

export default function ProfileClientComponent({
  user,
  orders = [],
}: ProfileClientComponentProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <div>
      {/* Breadcrumb */}
      <BreadcrumbNav productName="Profile" />

      {/* Main Content Container - 1440px width */}
      <div className="max-w-[1440px] w-full min-h-[424px] gap-8 min-[1400px]:gap-12 opacity-100 px-6 py-8 min-[1400px]:p-10 mx-auto flex flex-col min-[900px]:flex-row items-stretch min-[900px]:items-start">
        {/* Sidebar Container - Left side */}
        <div className="w-full min-[900px]:w-[320px] min-h-[194px] rounded-[6px] gap-6 opacity-100 border p-6 bg-[#262626] border-[#383B42] flex flex-col min-[900px]:flex-shrink-0">
          {/* Account Container */}
          <div className="w-full h-[72px] gap-6 opacity-100 flex items-center">
            {/* Profile Image - Left */}
            <div className="w-[72px] h-[72px] opacity-100 flex-shrink-0">
              <ProfileIcon size={72} />
            </div>

            {/* Text Container - Right */}
            <div className="flex-1 h-[72px] opacity-100 flex flex-col justify-center">
              {/* Name */}
              <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] align-middle text-[var(--text-primary)]">
                {user?.name || "User"}
              </span>

              {/* Email */}
              <span className="font-['Inter'] font-normal text-[14px] leading-[24px] tracking-[0%] align-middle text-[var(--text-secondary)]">
                {user?.email || ""}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-0 opacity-100 border-t border-[#383B42]"></div>

          {/* Logout Text */}
          <button
            onClick={handleLogout}
            className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] align-middle text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer transition-colors text-left"
          >
            Logout
          </button>
        </div>

        {/* Content Container - Right side (Order History) */}
        <div className="w-full min-[900px]:flex-1 min-h-[344px] gap-8 opacity-100 flex flex-col">
          {/* Link Container */}
          <div className="w-full min-[900px]:max-w-[470px] h-10 opacity-100">
            {/* Transaction Container */}
            <div className="w-full min-[900px]:max-w-[470px] h-10 gap-3 opacity-100 flex flex-col items-center">
              {/* Text */}
              <span className="font-['Inter'] font-semibold text-[18px] leading-[28px] tracking-[0%] text-[#F29145]">
                Transaction
              </span>

              {/* Divider */}
              <div className="w-full h-0 opacity-100 border-t-2 border-[#F29145]"></div>
            </div>
          </div>

          {/* Notification List Container */}
          <div className="w-full min-h-[272px] gap-4 opacity-100 flex flex-col">
            {orders.length === 0 ? (
              <div className="text-[var(--text-secondary)]">
                No orders found
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="w-full rounded-[6px] gap-4 opacity-100 border p-4 bg-[#262626] border-[#383B42] flex flex-col sm:flex-row sm:items-start cursor-pointer hover:bg-[#2a2a2a] transition-colors"
                  onClick={() => router.push(`/order-confirmation/${order.id}`)}
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
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
