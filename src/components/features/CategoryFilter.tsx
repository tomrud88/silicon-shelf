"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DownArrowIcon from "@/components/icons/DownArrowIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import Button from "@/components/ui/Button";

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  selectedCategoryId?: string;
}

export default function CategoryFilter({
  selectedCategoryId,
}: CategoryFilterProps) {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleCategoryChange = (categoryId: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (categoryId === null) {
      // "All" selected - remove categoryId param
      params.delete("categoryId");
    } else {
      params.set("categoryId", categoryId);
    }

    router.push(`/products?${params.toString()}`);
  };

  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, 4);

  return (
    <div className="w-[283px] h-[318px] flex flex-col gap-4 px-[10px] opacity-100">
      {/* Title + Icon */}
      <div className="w-[263px] h-[46px] flex justify-between items-center py-2 opacity-100">
        <h3 className="font-['Inter'] font-semibold text-[20px] leading-[30px] tracking-[-0.01em] text-[#FCFCFC]">
          Category
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-6 h-6 opacity-100 relative cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="absolute top-[9px] left-1">
            <DownArrowIcon size={16} />
          </div>
        </button>
      </div>

      {/* Category List Container */}
      {isExpanded && (
        <div className="w-[263px] flex flex-col gap-5 px-2 opacity-100">
          {/* Checkbox Item - All */}
          <label className="flex items-center gap-4 opacity-100 cursor-pointer">
            <input
              type="radio"
              name="category"
              className="w-[26px] h-[26px] rounded-[6px] p-[3px] bg-[#222327] border border-[#616674] appearance-none checked:bg-[#F29145] checked:border-0 cursor-pointer flex-shrink-0"
              checked={!selectedCategoryId}
              onChange={() => handleCategoryChange(null)}
            />
            <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-[#FCFCFC]">
              All
            </span>
          </label>

          {/* Dynamic Category List */}
          {visibleCategories.map((category) => (
            <label
              key={category.id}
              className="flex items-center gap-4 opacity-100 cursor-pointer"
            >
              <input
                type="radio"
                name="category"
                className="w-[26px] h-[26px] rounded-[6px] p-[3px] bg-[#222327] border border-[#616674] appearance-none checked:bg-[#F29145] checked:border-0 cursor-pointer flex-shrink-0"
                checked={selectedCategoryId === category.id}
                onChange={() => handleCategoryChange(category.id)}
              />
              <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-[#FCFCFC]">
                {category.name}
              </span>
            </label>
          ))}

          {/* Load More Button */}
          {!showAllCategories && categories.length > 4 && (
            <Button
              onClick={() => setShowAllCategories(true)}
              variant="stroke"
              rightIcon={<PlusIcon size={16} />}
              className="w-[120px] h-[26px] !justify-start !px-0"
            >
              Load More
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
