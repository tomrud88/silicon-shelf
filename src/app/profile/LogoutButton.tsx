"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] align-middle text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer transition-colors text-left"
    >
      Logout
    </button>
  );
}
