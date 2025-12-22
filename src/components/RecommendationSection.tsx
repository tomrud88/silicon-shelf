"use client";

import { useRef } from "react";
import ProductCard from "./ProductCard";
import ArrowRightIcon from "./icons/ArrowRightIcon";
import Button from "./Button";

interface RecommendationSectionProps {
  recommendations: any[];
}

export default function RecommendationSection({
  recommendations,
}: RecommendationSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleSeeAll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const productCardWidth = 300;
      const gap = 32;
      const paddingLeft = 40; // pl-10 = 40px

      // Check if screen is large (>= 1568px)
      const isLargeScreen = container.clientWidth >= 1568;
      const spacerWidth = isLargeScreen ? 178 : 0; // w-32 (128px) + 50px extra on large screens

      // Calculate the total width needed to show all 6 products
      const totalContentWidth =
        paddingLeft + 6 * productCardWidth + 5 * gap + spacerWidth;

      // Scroll to show the last product aligned to the right edge of the container
      const scrollPosition = totalContentWidth - container.clientWidth;

      container.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full max-w-[1360px] h-[458px] flex flex-col gap-8 opacity-100">
      {/* Header with Title and See All Button */}
      <div className="w-full h-10 flex items-center justify-between gap-2.5 opacity-100">
        <h2 className="flex-1 h-10 font-['Inter'] font-medium text-[28px] leading-[40px] tracking-[-0.01em] text-[#FCFCFC] opacity-100">
          Recomendation
        </h2>
        <Button
          variant="stroke"
          onClick={handleSeeAll}
          className="flex-shrink-0 !w-[91px] !h-[26px] !px-0 !py-0 !text-base !leading-[26px] !border-0 !bg-transparent !text-[#F29145] hover:!text-[#E08034] !gap-[14px]"
          rightIcon={
            <div className="relative w-6 h-6 opacity-100">
              <ArrowRightIcon className="absolute top-[6px] left-1 w-4 h-3 text-[#F29145] [stroke-width:1.5px]" />
            </div>
          }
        >
          See All
        </Button>
      </div>
      {/* Card List Container - Scrollable */}
      <div
        ref={scrollContainerRef}
        className="w-screen -ml-10 pl-10 pr-10 h-[386px] scrollbar-hide relative z-10 overflow-x-auto overflow-y-hidden flex gap-8"
      >
        {recommendations.map((product: any) => (
          <div key={product.id} className="flex-shrink-0">
            <ProductCard
              id={product.id}
              imageUrl={product.imageUrl}
              categoryName={product.category.name}
              productName={product.name}
              price={product.price}
            />
          </div>
        ))}
        {/* Spacer to ensure last card is fully visible when scrolled */}
        <div className="flex-shrink-0 w-32"></div>
      </div>
    </div>
  );
}
