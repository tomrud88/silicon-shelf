"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ["/login", "/register"];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  useEffect(() => {
    if (status === "loading") return;

    if (!session && !isPublicRoute) {
      router.push("/login");
    }
  }, [session, status, isPublicRoute, router]);

  if (status === "loading") {
    return null; // lub loading spinner
  }

  if (!session && !isPublicRoute) {
    return null;
  }

  return <>{children}</>;
}
