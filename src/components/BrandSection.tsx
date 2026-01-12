"use client";

import { useRef } from "react";
import IconCard from "./IconCard";
import ArrowRightIcon from "./icons/ArrowRightIcon";
import Button from "./Button";
import Image from "next/image";

export default function BrandSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleSeeAll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 220; // max-w-[220px] on large screens
      const gap = 32; // gap-8
      const paddingLeft = 40; // pl-10 = 40px

      // Check if screen is large (>= 1568px)
      const isLargeScreen = container.clientWidth >= 1568;
      const spacerWidth = isLargeScreen ? 178 : 32;

      // Calculate the total width needed to show all 6 brands
      const totalContentWidth =
        paddingLeft + 6 * cardWidth + 5 * gap + spacerWidth;

      // Scroll to show the last brand aligned to the right edge of the container
      const scrollPosition = totalContentWidth - container.clientWidth;

      container.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: "smooth",
      });
    }
  };

  const brands = [
    { name: "Corsair", logo: "https://i.ibb.co/FSgWf01/Corsair-logo.png" },
    { name: "Sony", logo: "https://i.ibb.co/PzGDXQrh/sony-logo.png" },
    { name: "Logitech", logo: "https://i.ibb.co/b50JhqxK/Logitech-Logo.png" },
    { name: "Razer", logo: "https://i.ibb.co/jkTtnrtf/Razer-Logo.png" },
    { name: "Samsung", logo: "https://i.ibb.co/DDPxgHVH/samsung-logo.png" },
    { name: "Dell", logo: "https://i.ibb.co/7dFXphNX/dell-logo.png" },
  ];

  return (
    <div className="w-full max-w-[1360px] flex flex-col gap-8 opacity-100">
      {/* Header with Title and See All Button */}
      <div className="w-full h-10 flex items-center justify-between gap-2.5 opacity-100">
        <h2 className="flex-1 h-10 font-['Inter'] font-medium text-[28px] leading-[40px] tracking-[-0.01em] text-[#FCFCFC] opacity-100">
          Brand
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
      {/* Brand List Container - Scrollable */}
      <div
        ref={scrollContainerRef}
        className="w-screen -ml-10 pl-10 pr-10 scrollbar-hide relative z-10 overflow-x-auto overflow-y-visible flex gap-8"
      >
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="flex-shrink-0 w-[180px] lg:w-[220px]"
          >
            <IconCard
              icon={
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={120}
                  height={60}
                  className="h-[60px] w-auto object-contain"
                />
              }
              name={brand.name}
            />
          </div>
        ))}
        {/* Spacer to ensure last card is fully visible when scrolled */}
        <div className="flex-shrink-0 w-32"></div>
      </div>
    </div>
  );
}
