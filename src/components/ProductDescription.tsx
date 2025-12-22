"use client";

import { useState } from "react";

interface ProductDescriptionProps {
  description: string;
}

export default function ProductDescription({
  description,
}: ProductDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-[427px] flex flex-col gap-1 opacity-100">
      <p
        className={`font-['Inter'] font-normal text-base leading-[26px] tracking-[0%] text-[#FCFCFC] ${
          !isExpanded ? "line-clamp-4" : ""
        }`}
      >
        {description}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-fit h-[26px] flex items-center justify-center gap-[14px] opacity-100 font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-[#E5610A] hover:text-[#F29145] transition-colors bg-transparent border-none p-0"
      >
        {isExpanded ? "View Less" : "View More"}
      </button>
    </div>
  );
}
