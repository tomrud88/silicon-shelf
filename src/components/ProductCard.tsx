"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ProductCardProps {
  id?: string;
  imageUrl: string;
  categoryName: string;
  productName: string;
  price: number;
}

export default function ProductCard({
  id,
  imageUrl,
  categoryName,
  productName,
  price,
}: ProductCardProps) {
  const pathname = usePathname();

  const handleClick = () => {
    // Get current navigation history
    const historyJson = sessionStorage.getItem("navigationHistory");
    const history = historyJson ? JSON.parse(historyJson) : [];

    // Determine current page info
    let currentPage = { label: "", href: "" };

    if (pathname === "/") {
      currentPage = { label: "Home", href: "/" };
    } else if (pathname === "/products") {
      currentPage = { label: "Products", href: "/products" };
    }

    // Add current page to history if it has a label
    if (currentPage.label) {
      // Avoid adding the same page twice in a row
      if (
        history.length === 0 ||
        history[history.length - 1].href !== currentPage.href
      ) {
        history.push(currentPage);
      }
    }

    // Save updated history
    sessionStorage.setItem("navigationHistory", JSON.stringify(history));
  };

  return (
    <Link
      href={`/products/${id}`}
      onClick={handleClick}
      className="w-[300px] h-[386px] rounded-[6px] border border-[#383B42] bg-[#262626] flex flex-col gap-[18px] pt-4 px-4 pb-5 opacity-100 overflow-visible hover:border-[#F29145] transition-colors cursor-pointer"
    >
      {/* Product Image */}
      <div className="w-[268px] h-[204px] relative flex gap-[10px] opacity-100">
        <img
          src={imageUrl}
          alt={productName}
          className="w-[268px] h-[204px] rounded-[6px] opacity-100 object-cover"
        />
        {/* Cart Icon */}
        <div className="absolute top-3 left-3 w-8 h-8 rounded-[6px] bg-[#262626] flex items-center justify-center gap-[10px] p-1 opacity-100">
          <img src="/cart-4.svg" alt="Add to cart" className="w-6 h-6 invert" />
        </div>
      </div>
      {/* Product Details */}
      <div className="w-[268px] h-32 flex flex-col gap-4 opacity-100">
        {/* Badge */}
        <div className="w-[268px] h-9 flex gap-[10px] opacity-100">
          {/* Type Badge */}
          <div className="h-9 rounded-[6px] flex items-center justify-center gap-[10px] py-[6px] px-3 opacity-100 bg-[#E5610A] whitespace-nowrap">
            <span className="font-['Inter'] font-medium text-sm leading-6 tracking-[0%]">
              {categoryName}
            </span>
          </div>
        </div>
        {/* Label + Price */}
        <div className="w-[268px] h-[76px] flex flex-col gap-2 opacity-100">
          {/* Product Label */}
          <h3 className="font-['Inter'] font-normal text-lg leading-7 tracking-[0%] text-[#FCFCFC]">
            {productName}
          </h3>
          {/* Price Container */}
          <div className="w-[268px] h-10 flex items-center gap-[10px] opacity-100">
            <span className="font-['Inter'] font-semibold text-[28px] leading-[40px] tracking-[-0.01em] text-[#FCFCFC]">
              ${price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
