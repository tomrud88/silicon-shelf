"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CartIcon from "@/components/icons/CartIcon";
import ProfileIcon from "@/components/icons/ProfileIcon";
import Button from "@/components/ui/Button";

export default function Header() {
  const pathname = usePathname();
  const isAuthPage = pathname === "/register" || pathname === "/login";

  const handleNavClick = (label: string, href: string) => {
    // Clear navigation history when clicking main nav items
    if (href === "/" || href === "/products") {
      sessionStorage.setItem("navigationHistory", JSON.stringify([]));
    }
  };

  return (
    <header className="w-full bg-[#1A1A1A]">
      <div className="max-w-[1440px] mx-auto px-10 py-8 flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <img
            src="/logo.svg"
            alt="SiliconShelf"
            className="w-[210px] h-[80px]"
          />
          {isAuthPage ? (
            <Link href="/login">
              <Button variant="fill" size="xl" className="w-[121px] h-[54px]">
                Sign In
              </Button>
            </Link>
          ) : (
            <div className="flex gap-7 items-center w-[92px] h-10">
              <Link href="/cart">
                <CartIcon />
              </Link>
              <Link href="/profile">
                <ProfileIcon />
              </Link>
            </div>
          )}
        </div>
        {!isAuthPage && (
          <nav className="flex gap-8 list-none">
            <li className=" h-[26px] font-semibold text-base leading-[26px] tracking-normal text-[var(--primary-500)]">
              <Link
                href="/"
                onClick={() => handleNavClick("Home", "/")}
                className="hover:text-[#F29145] transition-colors"
              >
                Home
              </Link>
            </li>
            <li className=" h-[26px] font-semibold text-base leading-[26px] tracking-normal text-[var(--neutral-500)]">
              <Link
                href="/products"
                onClick={() => handleNavClick("Products", "/products")}
                className="hover:text-[#F29145] transition-colors"
              >
                Product
              </Link>
            </li>
            <li className=" h-[26px] font-semibold text-base leading-[26px] tracking-normal text-[var(--neutral-500)]">
              <Link
                href="/contact"
                onClick={() => handleNavClick("Contact", "/contact")}
                className="hover:text-[#F29145] transition-colors"
              >
                Contact
              </Link>
            </li>
          </nav>
        )}
        <hr className="w-[1360px] border-t border-[#383B42]" />
      </div>
    </header>
  );
}
