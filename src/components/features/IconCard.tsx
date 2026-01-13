"use client";

import { ReactNode } from "react";
import Link from "next/link";

interface IconCardProps {
  icon: ReactNode;
  name: string;
  categoryId?: string;
}

export default function IconCard({ icon, name, categoryId }: IconCardProps) {
  const handleClick = () => {
    if (!categoryId) return;

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

  const content = (
    <>
      <div className="scale-75 lg:scale-100">{icon}</div>
      <h3 className="font-medium text-base lg:text-xl leading-6 lg:leading-[30px] tracking-[-0.01em] text-[#FCFCFC]">
        {name}
      </h3>
    </>
  );

  if (categoryId) {
    return (
      <Link
        href={`/products?categoryId=${categoryId}`}
        onClick={handleClick}
        className="w-full max-w-[180px] lg:max-w-[220px] h-[160px] lg:h-[190px] rounded-md border border-[#616674] bg-[#262626] p-2 lg:p-3 flex flex-col items-center justify-center gap-4 lg:gap-6 hover:border-[#F29145] transition-colors cursor-pointer"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="w-full max-w-[180px] lg:max-w-[220px] h-[160px] lg:h-[190px] rounded-md border border-[#616674] bg-[#262626] p-2 lg:p-3 flex flex-col items-center justify-center gap-4 lg:gap-6">
      {content}
    </div>
  );
}
