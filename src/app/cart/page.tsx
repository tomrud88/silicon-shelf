"use client";

import Link from "next/link";
import Image from "next/image";
import TrashIcon from "@/components/icons/TrashIcon";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { useCart } from "@/contexts/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice } =
    useCart();
  return (
    <div>
      {/* Breadcrumb */}
      <BreadcrumbNav productName="Cart" />

      {/* Main Container */}
      <div className="max-w-[1440px] w-full min-h-[500px] gap-12 opacity-100 pr-10 pl-10 max-[700px]:pl-[5px] py-10 mx-auto">
        <div className="flex flex-col min-[1400px]:flex-row gap-12">
          {/* Cart Content Container */}
          <div className="w-full min-[1400px]:w-[889px] min-h-[462px] gap-8 opacity-100 flex flex-col">
            {cartItems.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-[#FCFCFC] text-xl mb-4">
                  Your cart is empty
                </p>
                <Link
                  href="/products"
                  className="text-[#F29145] hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <>
                {/* Select All Checkbox */}
                <div className="w-[114px] h-[26px] gap-4 opacity-100 flex items-center">
                  <div className="w-[26px] h-[26px] rounded-[6px] opacity-100 border bg-[#222327] border-[#616674]"></div>
                  <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-[#FCFCFC]">
                    Select All
                  </span>
                </div>

                {/* Product List */}
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="w-full h-[186px] max-[700px]:h-auto gap-6 max-[700px]:gap-2 opacity-100 flex items-center"
                  >
                    {/* Checkbox */}
                    <div className="w-[26px] h-[26px] gap-4 opacity-100">
                      <div className="w-[26px] h-[26px] rounded-[6px] opacity-100 border bg-[#222327] border-[#616674]"></div>
                    </div>

                    {/* Product Card */}
                    <div className="w-full max-w-[839px] h-[186px] max-[700px]:h-auto max-[700px]:min-h-[220px] rounded-[6px] gap-8 opacity-100 border p-6 bg-[#262626] border-[#383B42]">
                      {/* Inner Container */}
                      <div className="w-full h-[138px] gap-8 max-[538px]:gap-4 opacity-100 flex max-[538px]:flex-col max-[538px]:h-auto">
                        {/* Image Container */}
                        <div className="w-[172px] h-[138px] max-[538px]:w-full max-[538px]:h-auto rounded-[6px] gap-[10px] opacity-100 border p-3 border-[#383B42]">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-[148px] h-[114px] max-[538px]:w-full max-[538px]:h-auto rounded-[6px] opacity-100 object-contain"
                          />
                        </div>

                        {/* Content Container */}
                        <div className="flex-1 min-w-0 h-[138px] max-[700px]:h-auto max-[700px]:min-h-[180px] gap-4 opacity-100 flex flex-col">
                          {/* Label + Badge Container */}
                          <div className="w-full h-[78px] gap-3 opacity-100 flex flex-col">
                            {/* Label + Icon Container */}
                            <div className="w-full h-[30px] opacity-100 flex items-center max-[700px]:justify-start max-[700px]:gap-[20px] min-[701px]:justify-between">
                              {/* Product Name */}
                              <span className="font-['Inter'] font-medium text-[20px] leading-[30px] tracking-[-0.01em] text-[#FCFCFC]">
                                {item.name}
                              </span>

                              {/* Trash Icon Container */}
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="w-[30px] h-[30px] opacity-100 flex items-center justify-center hover:scale-110 transition-transform flex-shrink-0"
                              >
                                <TrashIcon />
                              </button>
                            </div>

                            {/* Badge */}
                            <div className="w-fit h-[36px] rounded-[6px] gap-[10px] opacity-100 py-[6px] px-[10px] bg-[#E5610A]">
                              <span className="font-['Inter'] font-medium text-[14px] leading-[24px] tracking-[0%] text-[#FDEDD7]">
                                {item.category}
                              </span>
                            </div>
                          </div>

                          {/* Price + Action Container */}
                          <div className="w-full h-auto opacity-100 flex flex-col max-[700px]:items-start max-[700px]:gap-2 min-[701px]:flex-row min-[701px]:justify-between min-[701px]:items-center min-[701px]:h-[44px]">
                            {/* Price */}
                            <span className="font-['Inter'] font-medium text-[24px] leading-[36px] tracking-[-0.01em] text-[#FCFCFC]">
                              ${item.price.toFixed(2)}
                            </span>

                            {/* Actions Container */}
                            <div className="w-[255px] max-[700px]:w-full h-[44px] gap-6 max-[700px]:gap-4 opacity-100 flex items-center">
                              {/* Write Note Button */}
                              <button className="w-[82px] h-[26px] rounded-[6px] gap-[14px] opacity-100">
                                <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-center align-middle text-[#F29145]">
                                  Write Note
                                </span>
                              </button>

                              {/* Divider */}
                              <div className="w-0 h-[24px] opacity-100 border-l border-[#848A97]"></div>

                              {/* Quantity Controls */}
                              <div className="w-[125px] h-[44px] rounded-[6px] gap-[14px] opacity-100 border py-[10px] px-5 border-[#FCFCFC] flex items-center justify-between">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  disabled={item.quantity <= 1}
                                  className="disabled:opacity-50"
                                >
                                  <Image
                                    src="/minus.svg"
                                    alt="Decrease"
                                    width={16}
                                    height={16}
                                  />
                                </button>
                                <span className="font-['Inter'] font-medium text-[14px] text-[#FCFCFC]">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                >
                                  <Image
                                    src="/plus.svg"
                                    alt="Increase"
                                    width={16}
                                    height={16}
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Checkout/Total Container */}
          {cartItems.length > 0 && (
            <div className="w-[423px] max-[430px]:w-[344px] max-[678px]:ml-[25px] h-[294px] rounded-[6px] gap-6 opacity-100 border p-6 bg-[#262626] border-[#383B42] flex flex-col">
              {/* Top Container */}
              <div className="w-[375px] max-[430px]:w-[296px] h-[72px] gap-4 opacity-100 flex flex-col">
                {/* Title */}
                <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] align-middle text-[#FCFCFC]">
                  Total Product
                </span>

                {/* Price Row */}
                <div className="w-[375px] max-[430px]:w-[296px] h-[28px] opacity-100 flex justify-between items-center">
                  {/* Left Text */}
                  <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] align-middle text-[#E7E7E7]">
                    Total Product Price ({totalItems}{" "}
                    {totalItems === 1 ? "Item" : "Items"})
                  </span>

                  {/* Right Text */}
                  <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-center align-middle text-[#FCFCFC]">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="w-[375px] max-[430px]:w-[296px] h-0 opacity-100 border-t border-[#383B42]"></div>

              {/* Bottom Container */}
              <div className="w-[375px] max-[430px]:w-[296px] h-[126px] gap-8 opacity-100 flex flex-col">
                {/* Subtotal Row */}
                <div className="w-[375px] max-[430px]:w-[296px] h-[40px] opacity-100 flex justify-between items-center">
                  {/* Left Text */}
                  <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] align-middle text-[#FCFCFC]">
                    Subtotal
                  </span>

                  {/* Right Text */}
                  <span className="font-['Inter'] font-medium text-[28px] leading-[40px] tracking-[-0.01em] text-[#FCFCFC]">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button className="w-[375px] max-[430px]:w-[296px] h-[54px] rounded-[6px] gap-[14px] opacity-100 py-[14px] px-5 bg-[#F29145] hover:bg-[#E17F33] transition-colors">
                  <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-center align-middle text-[#262626]">
                    Checkout
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
