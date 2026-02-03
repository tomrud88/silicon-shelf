"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DownArrowIcon from "@/components/icons/DownArrowIcon";
import Button from "@/components/ui/Button";

interface PriceFilterProps {
  minPrice?: string;
  maxPrice?: string;
}

export default function PriceFilter({ minPrice, maxPrice }: PriceFilterProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [minValue, setMinValue] = useState(minPrice || "");
  const [maxValue, setMaxValue] = useState(maxPrice || "");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleApplyFilter = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Parse and validate values
    const min = parseFloat(minValue);
    const max = parseFloat(maxValue);

    // Don't allow negative values
    const validMin = !isNaN(min) && min >= 0 ? min : null;
    const validMax = !isNaN(max) && max >= 0 ? max : null;

    // If both values exist, ensure min is not greater than max
    if (validMin !== null && validMax !== null && validMin > validMax) {
      // Swap values if min > max
      setMinValue(validMax.toString());
      setMaxValue(validMin.toString());
      params.set("minPrice", validMax.toString());
      params.set("maxPrice", validMin.toString());
    } else {
      if (validMin !== null) {
        params.set("minPrice", validMin.toString());
      } else {
        params.delete("minPrice");
      }

      if (validMax !== null) {
        params.set("maxPrice", validMax.toString());
      } else {
        params.delete("maxPrice");
      }
    }

    router.push(`/products?${params.toString()}`);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty string or valid positive numbers
    if (value === "" || parseFloat(value) >= 0) {
      setMinValue(value);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty string or valid positive numbers
    if (value === "" || parseFloat(value) >= 0) {
      setMaxValue(value);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleApplyFilter();
    }
  };

  return (
    <div className="w-[283px] flex flex-col gap-4 px-[10px] opacity-100">
      {/* Title + Icon */}
      <div className="w-[263px] h-[46px] flex justify-between items-center py-2 opacity-100">
        <h3 className="font-['Inter'] font-semibold text-[20px] leading-[30px] tracking-[-0.01em] text-[#FCFCFC]">
          Price
        </h3>
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="!w-6 !h-6 !p-0 !bg-transparent hover:!opacity-80 hover:!bg-transparent !min-w-0 !rounded-none relative"
        >
          <div className="absolute top-[9px] left-1">
            <DownArrowIcon size={16} />
          </div>
        </Button>
      </div>

      {isExpanded && (
        <>
          {/* Min Price Input Container */}
          <div className="w-[263px] h-[54px] flex items-center opacity-100">
            <input
              type="number"
              placeholder="$ 10.00"
              value={minValue}
              onChange={handleMinChange}
              onKeyPress={handleKeyPress}
              onBlur={handleApplyFilter}
              min="0"
              step="0.01"
              className="w-[157px] h-[54px] gap-[10px] py-[14px] px-[18px] rounded-l-[6px] bg-[#262626] border border-[#616674] border-r-0 text-[#FCFCFC] font-['Inter'] font-normal text-base leading-[26px] tracking-[0%] focus:outline-none focus:border-[#F29145] opacity-100"
            />
            <div className="w-[106px] h-[54px] flex items-center justify-center gap-3 py-[14px] px-[18px] rounded-r-[6px] bg-[#262626] border border-[#616674] opacity-100">
              <span className="text-[#FCFCFC] font-['Inter'] text-base">
                USD
              </span>
            </div>
          </div>

          {/* Max Price Input Container */}
          <div className="w-[263px] h-[54px] flex items-center opacity-100">
            <input
              type="number"
              placeholder="$ 10.00"
              value={maxValue}
              onChange={handleMaxChange}
              onKeyPress={handleKeyPress}
              onBlur={handleApplyFilter}
              min="0"
              step="0.01"
              className="w-[157px] h-[54px] gap-[10px] py-[14px] px-[18px] rounded-l-[6px] bg-[#262626] border border-[#616674] border-r-0 text-[#FCFCFC] font-['Inter'] font-normal text-base leading-[26px] tracking-[0%] focus:outline-none focus:border-[#F29145] opacity-100"
            />
            <div className="w-[106px] h-[54px] flex items-center justify-center gap-3 py-[14px] px-[18px] rounded-r-[6px] bg-[#262626] border border-[#616674] opacity-100">
              <span className="text-[#FCFCFC] font-['Inter'] text-base">
                USD
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
