"use client";

import { useState } from "react";
import Button from "@/components/Button";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";

interface Category {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  exploreInfo: string | null;
}

interface CategoryCarouselProps {
  categories: Category[];
}

export default function CategoryCarousel({
  categories,
}: CategoryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? categories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === categories.length - 1 ? 0 : prev + 1));
  };

  const currentCategory = categories[currentIndex];

  if (!currentCategory) return null;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-[1360px] h-[488px] flex items-center justify-center">
        {/* Ad Banner */}
        <div className="w-[1360px] h-[452px] rounded-md border border-[#383B42] py-20 px-[120px] flex gap-2.5 items-center justify-between overflow-hidden relative">
          {/* Left Arrow */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 w-11 h-[74px] py-1 px-[7px] bg-[#F29145] hover:bg-[#E08034] rounded-r-md flex items-center justify-center transition-all z-10"
          >
            <img src="/shape-left.svg" alt="Previous" className="w-2 h-4" />
          </button>

          <div className="w-[433px] h-[240px] flex flex-col gap-10">
            <div className="w-[433px] h-[146px] flex flex-col gap-6">
              <h2 className="h-11 font-medium text-[32px] leading-[44px] tracking-tight text-[#FCFCFC]">
                {currentCategory.name}
              </h2>
              <p className="w-[433px] h-[78px] font-normal text-base leading-[26px] tracking-normal text-[#E7E7E7]">
                {currentCategory.description || currentCategory.exploreInfo}
              </p>
            </div>
            <Button
              variant="stroke"
              size="xl"
              rightIcon={<ArrowRightIcon />}
              className="w-[211px] h-[54px]"
            >
              Explore category
            </Button>
          </div>

          {/* Category Image */}
          <img
            src={currentCategory.image || "/monitor-big.png"}
            alt={currentCategory.name}
            className="w-[582.61px] h-[472.68px]"
            style={{ transform: "rotate(-2.55deg)" }}
          />

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 w-11 h-[74px] py-1 px-[7px] bg-[#F29145] hover:bg-[#E08034] rounded-l-md flex items-center justify-center transition-all z-10"
          >
            <img
              src="/shape-left.svg"
              alt="Next"
              className="w-2 h-4 rotate-180"
            />
          </button>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="flex gap-4">
        {categories.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-[#F29145]" : "bg-[#383B42]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
