"use client";

import { useMemo } from "react";
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
  const breadcrumbs = useMemo(() => {
    if (typeof window === "undefined") return [];

    const historyJson = sessionStorage.getItem("navigationHistory");
    const history: BreadcrumbItem[] = historyJson
      ? JSON.parse(historyJson)
      : [];

    const trail: BreadcrumbItem[] = [];

    history.forEach((item) => {
      if (trail.length === 0 || trail[trail.length - 1].href !== item.href) {
        trail.push(item);
      }
    });

    trail.push({
      label: productName,
      href: "",
    });

    return trail;
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
