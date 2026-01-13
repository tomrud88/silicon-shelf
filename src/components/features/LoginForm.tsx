"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import ClosedEyeIcon from "@/components/icons/ClosedEyeIcon";
import CheckIcon from "@/components/icons/CheckIcon";
import Notification from "@/components/ui/Notification";

type StepOneFormData = {
  emailOrPhone: string;
};

type StepTwoFormData = {
  password: string;
  remember: boolean;
};

export default function LoginForm() {
  const [step, setStep] = useState(1);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [notification, setNotification] = useState<string | null>(null);
  const router = useRouter();

  const stepOneForm = useForm<StepOneFormData>();
  const stepTwoForm = useForm<StepTwoFormData>();

  const handleContinue = (data: StepOneFormData) => {
    setEmailOrPhone(data.emailOrPhone);
    setLoginError("");
    setStep(2);
  };

  const handleSignIn = async (data: StepTwoFormData) => {
    setIsLoading(true);
    setLoginError("");

    try {
      const result = await signIn("credentials", {
        emailOrPhone,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setLoginError("Invalid email/phone or password");
        setIsLoading(false);
        return;
      }

      // Show success notification
      setNotification("You have been logged in");

      // Redirect to home page
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("An error occurred during login");
      setIsLoading(false);
    }
  };

  if (step === 2) {
    return (
      <>
        {notification && (
          <Notification
            message={notification}
            onClose={() => setNotification(null)}
          />
        )}
        <form
          onSubmit={stepTwoForm.handleSubmit(handleSignIn)}
          className="w-[400px] flex flex-col gap-[32px]"
        >
          <div className="w-[400px] flex flex-col gap-[24px]">
            <div className="w-[400px] flex flex-col gap-[8px]">
              <label
                htmlFor="password"
                className="font-medium text-[18px] leading-[28px] tracking-[0%] text-[#FCFCFC]"
              >
                Password
              </label>
              <div
                className={`w-[400px] h-[54px] rounded-md border ${
                  stepTwoForm.formState.errors.password
                    ? "border-[#DC2626]"
                    : "border-[#383B42]"
                } bg-[#262626] px-4 py-3 flex items-center gap-[16px]`}
              >
                <input
                  type="password"
                  id="password"
                  {...stepTwoForm.register("password", {
                    required: "Please enter your password.",
                  })}
                  className="w-[320px] h-[26px] bg-transparent font-normal text-[16px] leading-[26px] tracking-[0%] text-[#FCFCFC] placeholder:text-[#B0B0B0] focus:outline-none border-none"
                  placeholder="Your Password"
                />
                <ClosedEyeIcon size={24} />
              </div>
              {stepTwoForm.formState.errors.password && (
                <p className="font-normal text-[14px] leading-[24px] tracking-[0%] text-[#F87171]">
                  {stepTwoForm.formState.errors.password.message}
                </p>
              )}
              {loginError && (
                <p className="font-normal text-[14px] leading-[24px] tracking-[0%] text-[#F87171]">
                  {loginError}
                </p>
              )}
            </div>

            <div className="w-[400px] h-[26px] flex items-center justify-between gap-[16px]">
              <div className="w-[192px] h-[26px] flex items-center gap-[12px]">
                <div className="relative w-[26px] h-[26px]">
                  <input
                    type="checkbox"
                    id="remember"
                    {...stepTwoForm.register("remember")}
                    className="peer w-[26px] h-[26px] rounded-[6px] border border-[#383B42] bg-[#262626] cursor-pointer appearance-none checked:bg-[#F29145] checked:border-[#F29145] transition-colors"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity p-[3px]">
                    <div className="w-[18px] h-[18px] flex items-center justify-center">
                      <CheckIcon size={18} className="text-[#262626]" />
                    </div>
                  </div>
                </div>
                <label
                  htmlFor="remember"
                  className="font-normal text-[16px] leading-[26px] tracking-[0%] text-[#E7E7E7] cursor-pointer"
                >
                  Save password
                </label>
              </div>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="font-medium text-[16px] leading-[26px] tracking-[0%] text-[#FCFCFC] text-right hover:underline"
              >
                Forgot your password?
              </a>
            </div>

            <Button
              type="submit"
              variant="fill"
              size="xl"
              disabled={isLoading}
              className="w-[400px] h-[54px] rounded-[6px] px-[20px] py-[14px] bg-[#F29145] hover:bg-[#EE701D] text-[#262626]"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        </form>
      </>
    );
  }

  return (
    <form
      onSubmit={stepOneForm.handleSubmit(handleContinue)}
      className="w-[400px] flex flex-col gap-[32px]"
    >
      <div className="w-[400px] flex flex-col gap-[24px]">
        <div className="w-[400px] flex flex-col gap-[8px]">
          <label
            htmlFor="emailOrPhone"
            className="font-medium text-[18px] leading-[28px] tracking-[0%] text-[#FCFCFC]"
          >
            Email or mobile phone number
          </label>
          <input
            type="text"
            id="emailOrPhone"
            {...stepOneForm.register("emailOrPhone", {
              required: "Please enter your email or mobile phone number.",
            })}
            className={`w-[400px] h-[54px] rounded-md border ${
              stepOneForm.formState.errors.emailOrPhone
                ? "border-[#DC2626]"
                : "border-[#383B42]"
            } bg-[#262626] px-4 py-3 font-normal text-[16px] leading-[26px] tracking-[0%] text-[#FCFCFC] placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#F29145] transition-colors`}
            placeholder="Email or mobile phone number"
          />
          {stepOneForm.formState.errors.emailOrPhone && (
            <p className="font-normal text-[14px] leading-[24px] tracking-[0%] text-[#F87171]">
              {stepOneForm.formState.errors.emailOrPhone.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="fill"
          size="xl"
          className="w-[400px] h-[54px] rounded-[6px] px-[20px] py-[14px] bg-[#F29145] hover:bg-[#EE701D] text-[#262626]"
        >
          Continue
        </Button>

        <p className="font-normal text-[16px] leading-[26px] tracking-[0%] text-[#E7E7E7]">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="hover:underline font-medium text-[#E7E7E7]"
          >
            Register
          </Link>
        </p>
      </div>
    </form>
  );
}
