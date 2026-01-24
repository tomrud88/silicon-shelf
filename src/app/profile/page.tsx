import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Suspense } from "react";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import ProfileIcon from "@/components/icons/ProfileIcon";
import { signOut } from "next-auth/react";
import LogoutButton from "./LogoutButton";
import OrdersList from "./OrdersList";

export default async function ProfilePage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <div>
      <BreadcrumbNav productName="Profile" />

      <div className="max-w-[1440px] w-full min-h-[424px] gap-8 min-[1400px]:gap-12 opacity-100 px-6 py-8 min-[1400px]:p-10 mx-auto flex flex-col min-[900px]:flex-row items-stretch min-[900px]:items-start">
        {/* Sidebar - Shows immediately */}
        <div className="w-full min-[900px]:w-[320px] min-h-[194px] rounded-[6px] gap-6 opacity-100 border p-6 bg-[#262626] border-[#383B42] flex flex-col min-[900px]:flex-shrink-0">
          <div className="w-full h-[72px] gap-6 opacity-100 flex items-center">
            <div className="w-[72px] h-[72px] opacity-100 flex-shrink-0">
              <ProfileIcon size={72} />
            </div>
            <div className="flex-1 h-[72px] opacity-100 flex flex-col justify-center">
              <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] align-middle text-[var(--text-primary)]">
                {session.user?.name || "User"}
              </span>
              <span className="font-['Inter'] font-normal text-[14px] leading-[24px] tracking-[0%] align-middle text-[var(--text-secondary)]">
                {session.user?.email || ""}
              </span>
            </div>
          </div>
          <div className="w-full h-0 opacity-100 border-t border-[#383B42]"></div>
          <LogoutButton />
        </div>

        {/* Orders - Loads with Suspense */}
        <div className="w-full min-[900px]:flex-1 min-h-[344px] gap-8 opacity-100 flex flex-col">
          <div className="w-full min-[900px]:max-w-[470px] h-10 opacity-100">
            <div className="w-full min-[900px]:max-w-[470px] h-10 gap-3 opacity-100 flex flex-col items-center">
              <span className="font-['Inter'] font-semibold text-[18px] leading-[28px] tracking-[0%] text-[#F29145]">
                Transaction
              </span>
              <div className="w-full h-0 opacity-100 border-t-2 border-[#F29145]"></div>
            </div>
          </div>

          <Suspense
            fallback={
              <div className="w-full min-h-[200px] rounded-[6px] opacity-100 border p-8 bg-[#262626] border-[#383B42] flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F29145] mx-auto mb-4"></div>
                  <p className="font-['Inter'] font-normal text-base leading-[26px] text-[var(--text-secondary)]">
                    Loading orders...
                  </p>
                </div>
              </div>
            }
          >
            <OrdersList userId={session.user.id!} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
