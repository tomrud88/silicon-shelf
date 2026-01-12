"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import ShapeLeftIcon from "@/components/icons/ShapeLeftIcon";

interface Category {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  carouselImage?: string | null;
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

  const handleExploreCategoryClick = () => {
    // Save current page (Home) to navigation history
    const historyJson = sessionStorage.getItem("navigationHistory");
    const history = historyJson ? JSON.parse(historyJson) : [];

    const homeItem = { label: "Home", href: "/" };

    // Avoid adding the same page twice in a row
    if (
      history.length === 0 ||
      history[history.length - 1].href !== homeItem.href
    ) {
      history.push(homeItem);
    }

    sessionStorage.setItem("navigationHistory", JSON.stringify(history));
  };

  const currentCategory = categories[currentIndex];

  if (!currentCategory) return null;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full max-w-[1360px] h-auto lg:h-[488px] flex items-center justify-center">
        {/* Ad Banner */}
        <div className="w-full max-w-[1360px] min-h-[400px] lg:h-[452px] rounded-md border border-[#383B42] py-10 lg:py-20 px-8 lg:px-[120px] flex flex-col lg:flex-row gap-8 lg:gap-2.5 items-center justify-between overflow-hidden relative">
          {/* Left Arrow */}
          <Button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-11 h-[74px] py-1 px-[7px] bg-[#F29145] hover:bg-[#E08034] rounded-r-md text-[#262626] rounded-l-none"
          >
            <ShapeLeftIcon size={16} className="text-[#262626]" />
          </Button>

          <div className="w-full max-w-[433px] flex flex-col gap-6 lg:gap-10 z-10">
            <div className="flex flex-col gap-4 lg:gap-6">
              <h2 className="font-medium text-2xl lg:text-[32px] leading-8 lg:leading-[44px] tracking-tight text-[#FCFCFC]">
                {currentCategory.name}
              </h2>
              <p className="font-normal text-sm lg:text-base leading-6 lg:leading-[26px] tracking-normal text-[#E7E7E7]">
                {currentCategory.description || currentCategory.exploreInfo}
              </p>
            </div>
            <Link
              href={`/products?categoryId=${currentCategory.id}`}
              onClick={handleExploreCategoryClick}
            >
              <Button
                variant="stroke"
                size="xl"
                rightIcon={<ArrowRightIcon />}
                className="w-[211px] h-[54px]"
              >
                Explore category
              </Button>
            </Link>
          </div>

          {/* Category Image */}
          {currentCategory.carouselImage && (
            <Image
              src={currentCategory.carouselImage}
              alt={currentCategory.name}
              width={583}
              height={473}
              className="w-[300px] h-[243px] md:w-[400px] md:h-[324px] lg:w-[582.61px] lg:h-[472.68px]"
              style={{ transform: "rotate(-2.55deg)" }}
            />
          )}

          {/* Right Arrow */}
          <Button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-[74px] py-1 px-[7px] bg-[#F29145] hover:bg-[#E08034] rounded-l-md text-[#262626] rounded-r-none"
          >
            <ShapeLeftIcon size={16} className="text-[#262626] rotate-180" />
          </Button>
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
