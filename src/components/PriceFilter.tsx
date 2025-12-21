"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DownArrowIcon from "./icons/DownArrowIcon";

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

  useEffect(() => {
    setMinValue(minPrice || "");
    setMaxValue(maxPrice || "");
  }, [minPrice, maxPrice]);

  const handleApplyFilter = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (minValue) {
      params.set("minPrice", minValue);
    } else {
      params.delete("minPrice");
    }

    if (maxValue) {
      params.set("maxPrice", maxValue);
    } else {
      params.delete("maxPrice");
    }

    router.push(`/products?${params.toString()}`);
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
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-6 h-6 opacity-100 relative cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="absolute top-[9px] left-1">
            <DownArrowIcon size={16} />
          </div>
        </button>
      </div>

      {isExpanded && (
        <>
          {/* Min Price Input Container */}
          <div className="w-[263px] h-[54px] flex items-center opacity-100">
            <input
              type="number"
              placeholder="$ 10.00"
              value={minValue}
              onChange={(e) => setMinValue(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={handleApplyFilter}
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
              onChange={(e) => setMaxValue(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={handleApplyFilter}
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
