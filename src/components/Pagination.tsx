"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Button from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/products?${params.toString()}`);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // Generate page numbers to display
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Show all pages if 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Near the beginning
        pages.push(2, 3, 4, "...", totalPages - 1, totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push(
          2,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        // In the middle
        pages.push(
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="w-full max-w-[997px] h-auto min-h-11 flex flex-col sm:flex-row items-center justify-between gap-4 opacity-100">
      {/* Pagination Number List (Left) */}
      <div className="flex items-center gap-2 opacity-100 flex-wrap justify-center sm:justify-start">
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-center text-[#FCFCFC] px-2"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`w-11 h-11 rounded-[6px] gap-[10px] p-3 opacity-100 flex items-center justify-center transition-colors ${
                isActive ? "bg-[#F29145]" : "hover:bg-[#F29145]"
              }`}
            >
              <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-center text-[#FCFCFC]">
                {pageNum}
              </span>
            </button>
          );
        })}
      </div>

      {/* Button List Container (Right) */}
      <div className="w-auto sm:w-[270px] h-11 flex items-center gap-4 sm:gap-8 opacity-100 flex-shrink-0">
        {/* Previous Button */}
        <Button
          variant="stroke"
          size="xl"
          className={`w-[132px] h-11 border-[#FCFCFC] text-[#FCFCFC] gap-[14px] py-[10px] px-5 ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-[#FCFCFC] hover:text-[#262626] hover:border-[#FCFCFC]"
          }`}
          onClick={handlePrevious}
          disabled={currentPage === 1}
          leftIcon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8334 10H4.16675M4.16675 10L10.0001 15.8333M4.16675 10L10.0001 4.16667"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        >
          Previous
        </Button>

        {/* Next Button */}
        <Button
          variant="stroke"
          size="xl"
          className={`w-[106px] h-11 border-[#FCFCFC] text-[#FCFCFC] gap-[14px] py-[10px] px-5 ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-[#FCFCFC] hover:text-[#262626] hover:border-[#FCFCFC]"
          }`}
          onClick={handleNext}
          disabled={currentPage === totalPages}
          rightIcon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.16675 10H15.8334M15.8334 10L10.0001 4.16667M15.8334 10L10.0001 15.8333"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}
