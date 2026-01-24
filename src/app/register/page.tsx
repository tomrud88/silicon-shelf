"use client";

import RegisterForm from "@/components/features/RegisterForm";
import Logo from "@/components/icons/Logo";
import { useState } from "react";
import CheckCircleIcon from "@/components/icons/CheckCircleIcon";
import Link from "next/link";

export default function RegisterPage() {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  if (registrationSuccess) {
    return (
      <main className="w-full overflow-x-hidden">
        <div className="w-full flex items-center justify-center px-4 pt-20 pb-40">
          <div className="w-full max-w-[1440px] flex flex-col items-center gap-[40px]">
            {/* Check Circle Icon */}
            <CheckCircleIcon size={75} />

            {/* Text + Icon Container */}
            <div className="w-full max-w-[1440px] flex flex-col items-center gap-[56px]">
              {/* Text Container */}
              <div className="w-full max-w-[1440px] flex flex-col items-center gap-[32px]">
                {/* Heading Container */}
                <div className="w-full max-w-[1440px] flex flex-col items-center gap-[16px]">
                  <h1 className="font-bold text-[44px] leading-[54px] tracking-[-0.01em] text-center text-[#FCFCFC]">
                    Thank you!
                  </h1>
                  <p className="font-medium text-[24px] leading-[36px] tracking-[-0.01em] text-center text-[#FCFCFC]">
                    You have successfully register
                  </p>
                </div>

                {/* Description Container */}
                <div className="w-full max-w-[1440px] flex flex-col items-center gap-[19px]">
                  <p className="font-normal text-[18px] leading-[28px] tracking-[0%] text-center text-[#E7E7E7]">
                    Please check your e-mail for further information. Let&apos;s
                    exploring our products and enjoy many gifts.
                  </p>

                  {/* Information Container */}
                  <div className="flex items-center gap-[4px]">
                    <span className="font-normal text-[18px] leading-[28px] tracking-[0%] text-center text-[#E7E7E7]">
                      Having problem?
                    </span>
                    <Link
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="font-normal text-[18px] leading-[28px] tracking-[0%] text-center text-[#F7B87A] hover:underline"
                    >
                      Contact us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full overflow-x-hidden">
      {/* Register Container */}
      <div className="w-full max-w-[1440px] min-h-[calc(100vh-200px)] mx-auto flex items-center justify-center p-10">
        <div className="w-[448px] flex flex-col gap-[32px] items-center">
          <Logo />
          <div className="w-[448px] min-h-[936px] rounded-md border border-[#383B42] bg-[#262626] p-6 flex flex-col gap-[32px]">
            <div className="w-[400px] flex items-center border-b border-[#383B42] pb-[20px]">
              <h1 className="font-medium text-[24px] leading-[36px] tracking-[-0.01em] text-[#FCFCFC]">
                Create Account
              </h1>
            </div>

            <RegisterForm onSuccess={() => setRegistrationSuccess(true)} />
          </div>
        </div>
      </div>
    </main>
  );
}
