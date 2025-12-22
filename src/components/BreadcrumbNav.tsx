"use client";

import { useEffect, useState } from "react";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import Link from "next/link";

interface BreadcrumbNavProps {
  productName: string;
}

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function BreadcrumbNav({ productName }: BreadcrumbNavProps) {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  useEffect(() => {
    // Get navigation history from sessionStorage
    const historyJson = sessionStorage.getItem("navigationHistory");
    const history: BreadcrumbItem[] = historyJson
      ? JSON.parse(historyJson)
      : [];

    // Build breadcrumb trail from history
    const trail: BreadcrumbItem[] = [];

    // Add items from history
    history.forEach((item) => {
      // Avoid duplicates of the same page in a row
      if (trail.length === 0 || trail[trail.length - 1].href !== item.href) {
        trail.push(item);
      }
    });

    // Add current product page
    trail.push({
      label: productName,
      href: "", // Current page, no link
    });

    setBreadcrumbs(trail);
  }, [productName]);

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-[1440px] h-[46px] mx-auto flex items-center gap-2 opacity-100 py-[10px] px-10">
      {breadcrumbs.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.href ? (
            <Link
              href={item.href}
              className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-[#FCFCFC] hover:text-[#F29145] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-[#FCFCFC]">
              {item.label}
            </span>
          )}
          {index < breadcrumbs.length - 1 && (
            <div className="w-6 h-6 flex items-center justify-center opacity-100">
              <ArrowRightIcon size={24} className="text-[#FCFCFC]" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
