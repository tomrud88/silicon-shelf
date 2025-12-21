"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DownArrowIcon from "./icons/DownArrowIcon";

interface SortOption {
  value: string;
  label: string;
}

const sortOptions: SortOption[] = [
  { value: "newest", label: "Latest" },
  { value: "cheapest", label: "Cheapest" },
  { value: "expensive", label: "Expensive" },
];

interface SortDropdownProps {
  selectedSort?: string;
}

export default function SortDropdown({ selectedSort }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentSort = selectedSort || "newest";
  const currentLabel =
    sortOptions.find((opt) => opt.value === currentSort)?.label || "Latest";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSortChange = (sortValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sortValue);
    router.push(`/products?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <div
      className="w-[211px] h-11 flex items-center gap-4 opacity-100"
      ref={dropdownRef}
    >
      <span className="font-['Inter'] font-semibold text-[20px] leading-[30px] tracking-[-0.01em] text-[#FCFCFC]">
        Sort by
      </span>

      {/* Dropdown */}
      <div className="relative">
        <div
          className="w-[126px] h-11 flex items-center justify-between rounded-[6px] py-[10px] px-4 border border-[#616674] opacity-100 cursor-pointer hover:border-[#F29145] transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-['Inter'] font-normal text-sm leading-6 tracking-[0%] text-center text-[#FCFCFC]">
            {currentLabel}
          </span>
          <div className="w-5 h-5 opacity-100 flex items-center justify-center">
            <DownArrowIcon size={18} />
          </div>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full mt-2 w-[158px] bg-[#262626] border border-[#616674] rounded-[6px] shadow-lg z-50">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                className="w-full px-4 py-3 text-left font-['Inter'] font-normal text-sm leading-6 text-[#FCFCFC] hover:bg-[#383B42] transition-colors first:rounded-t-[6px] last:rounded-b-[6px]"
                onClick={() => handleSortChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
