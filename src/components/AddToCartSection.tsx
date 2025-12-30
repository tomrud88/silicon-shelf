"use client";

import { useState } from "react";
import Button from "@/components/Button";
import CheckIcon from "@/components/icons/CheckIcon";
import MinusIcon from "@/components/icons/MinusIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import CartIcon from "@/components/icons/CartIcon";
import { useCart } from "@/contexts/CartContext";
import { useNotification } from "@/contexts/NotificationContext";

interface AddToCartSectionProps {
  productId: string;
  productName: string;
  productImage: string;
  categoryName: string;
  price: number;
  stock: number;
}

export default function AddToCartSection({
  productId,
  productName,
  productImage,
  categoryName,
  price,
  stock,
}: AddToCartSectionProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { showNotification } = useNotification();

  const handleIncrement = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    await addToCart({
      id: productId,
      name: productName,
      price,
      imageUrl: productImage,
      category: categoryName,
    });

    showNotification("Product Successfully Added");
  };

  const subtotal = price * quantity;

  return (
    <div className="w-[423px] h-[430px] rounded-[6px] flex flex-col gap-8 opacity-100 p-6 border border-[#383B42] bg-[#262626]">
      {/* Colors Container */}
      <div className="w-[132px] h-24 flex flex-col gap-[14px] opacity-100">
        <span className="font-['Inter'] font-medium text-lg leading-[28px] tracking-[0%] text-left text-[#B0B0B0]">
          Colors
        </span>

        {/* Color Options */}
        <div className="w-[124px] h-[54px] flex gap-4 opacity-100">
          {/* Color Option 1 - Active */}
          <div className="w-[54px] h-[54px] opacity-100">
            <div className="w-[54px] h-[54px] rounded-[6px] opacity-100 bg-[#FCFCFC] flex items-center justify-center">
              <div className="w-6 h-6 flex items-center justify-center opacity-100">
                <CheckIcon size={18} className="text-[#262626]" />
              </div>
            </div>
          </div>

          {/* Color Option 2 */}
          <div className="w-[54px] h-[54px] opacity-100">
            <div className="w-[54px] h-[54px] rounded-[6px] opacity-100 bg-[#222327] border border-[#383B42]"></div>
          </div>
        </div>
      </div>

      {/* Quantity Container */}
      <div className="w-[243px] h-24 flex flex-col gap-[14px] opacity-100">
        <span className="font-['Inter'] font-medium text-lg leading-[28px] tracking-[0%] text-left text-[#B0B0B0]">
          Quantity
        </span>

        {/* Quantity Editor + Stock */}
        <div className="w-[243px] h-[54px] flex gap-4 opacity-100">
          {/* Quantity Editor */}
          <div className="w-[142px] h-[54px] rounded-[6px] flex items-center gap-[14px] opacity-100 py-[14px] px-5 border border-[#FCFCFC]">
            {/* Minus Button */}
            <button
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className="w-6 h-6 flex items-center justify-center opacity-100 bg-transparent border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MinusIcon size={18} className="text-[#FCFCFC]" />
            </button>

            {/* Quantity Value */}
            <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-center text-[#FCFCFC]">
              {quantity}
            </span>

            {/* Plus Button */}
            <button
              onClick={handleIncrement}
              disabled={quantity >= stock}
              className="w-6 h-6 flex items-center justify-center opacity-100 bg-transparent border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PlusIcon size={18} className="text-[#FCFCFC]" />
            </button>
          </div>

          {/* Stock */}
          <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-center text-[#FCFCFC] flex items-center">
            Stock: {stock}
          </span>
        </div>
      </div>

      {/* Subtotal Container */}
      <div className="w-[375px] h-10 flex justify-between items-center opacity-100">
        <span className="font-['Inter'] font-medium text-lg leading-[28px] tracking-[0%] text-[#B0B0B0]">
          Subtotal:
        </span>
        <span className="font-['Inter'] font-medium text-[28px] leading-[40px] tracking-[-0.01em] text-[#FCFCFC]">
          ${subtotal.toFixed(2)}
        </span>
      </div>

      {/* Add to Cart Button */}
      <Button
        variant="stroke"
        size="xl"
        className="w-[375px] h-[54px] rounded-[6px] gap-[14px] py-[14px] px-5 border-[#F29145] text-[#F29145] hover:bg-[#1a1a1a]"
        rightIcon={<CartIcon className="text-[#F29145]" />}
        onClick={handleAddToCart}
      >
        <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-center">
          Add to cart
        </span>
      </Button>
    </div>
  );
}
