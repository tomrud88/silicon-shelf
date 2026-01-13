"use client";

import Button from "@/components/ui/Button";
import ClosedEyeIcon from "@/components/icons/ClosedEyeIcon";
import DownArrowIcon from "@/components/icons/DownArrowIcon";
import CheckIcon from "@/components/icons/CheckIcon";
import CheckCircleIcon from "@/components/icons/CheckCircleIcon";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { countries } from "@/constants/countries";

type RegisterFormData = {
  email: string;
  mobileNumber: string;
  password: string;
  confirmPassword: string;
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  postalCode: string;
  terms: boolean;
};

interface RegisterFormProps {
  onSuccess?: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm<RegisterFormData>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          mobileNumber: data.mobileNumber,
          password: data.password,
          country: data.country,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          apartment: data.apartment,
          city: data.city,
          postalCode: data.postalCode,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      // Rejestracja udana - wywołaj callback
      onSuccess?.();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "An error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[400px] flex flex-col gap-[32px]"
    >
      <div className="w-[400px] flex flex-col gap-[24px]">
        <div className="w-[400px] flex flex-col gap-[8px]">
          <label
            htmlFor="email"
            className="font-medium text-[18px] leading-[28px] tracking-[0%] text-[#FCFCFC]"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Please enter a valid email address.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address.",
              },
            })}
            className={`w-[400px] h-[54px] rounded-md border ${
              errors.email ? "border-[#DC2626]" : "border-[#383B42]"
            } bg-[#262626] px-4 py-3 font-normal text-[16px] leading-[26px] tracking-[0%] text-[#FCFCFC] placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#F29145] transition-colors`}
            placeholder="Your Email"
          />
          {errors.email ? (
            <p className="font-normal text-[14px] leading-[24px] tracking-[0%] text-[#F87171]">
              {errors.email.message}
            </p>
          ) : touchedFields.email && watch("email") ? (
            <p className="font-normal text-[14px] leading-[24px] tracking-[0%] text-[#E7E7E7]">
              Email address is valid
            </p>
          ) : null}
        </div>

        <div className="w-[400px] flex flex-col gap-[8px]">
          <label
            htmlFor="mobileNumber"
            className="font-medium text-[18px] leading-[28px] tracking-[0%] text-[#FCFCFC]"
          >
            Mobile Number *
          </label>
          <input
            type="tel"
            id="mobileNumber"
            {...register("mobileNumber", {
              required: "Please enter a valid mobile number.",
              pattern: {
                value: /^[0-9+\-\s()]+$/,
                message: "Please enter a valid mobile number.",
              },
            })}
            className={`w-[400px] h-[54px] rounded-md border ${
              errors.mobileNumber ? "border-[#DC2626]" : "border-[#383B42]"
            } bg-[#262626] px-4 py-3 font-normal text-[16px] leading-[26px] tracking-[0%] text-[#FCFCFC] placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#F29145] transition-colors`}
            placeholder="+(Code country) 10 digit mobile number"
          />
          {errors.mobileNumber ? (
            <p className="font-normal text-[14px] leading-[24px] tracking-[0%] text-[#F87171]">
              {errors.mobileNumber.message}
            </p>
          ) : touchedFields.mobileNumber && watch("mobileNumber") ? (
            <p className="font-normal text-[14px] leading-[24px] tracking-[0%] text-[#E7E7E7]">
              Phone number is correct
            </p>
          ) : null}
        </div>

        <div className="w-[400px] flex flex-col gap-[8px]">
          <label
            htmlFor="password"
            className="font-medium text-[18px] leading-[28px] tracking-[0%] text-[#FCFCFC]"
          >
            Password *
          </label>
          <div
            className={`w-[400px] h-[54px] rounded-md border ${
              errors.password ? "border-[#DC2626]" : "border-[#383B42]"
            } bg-[#262626] px-4 py-3 flex items-center gap-[16px]`}
          >
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 8,
                  message:
                    "Password at least 8 characters and includes at least 1 upper case letter. 1 lower case letter and 1 number.",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                  message:
                    "Password at least 8 characters and includes at least 1 upper case letter. 1 lower case letter and 1 number.",
                },
              })}
              className="w-[320px] h-[26px] bg-transparent font-normal text-[16px] leading-[26px] tracking-[0%] text-[#FCFCFC] placeholder:text-[#B0B0B0] focus:outline-none border-none"
              placeholder="Your Password"
            />
            <ClosedEyeIcon size={24} />
          </div>
          {errors.password ? (
            <p className="font-normal text-[14px] leading-[24px] tracking-[0%] text-[#F87171]">
              {errors.password.message}
            </p>
          ) : (
            <p className="font-normal text-[14px] leading-[24px] tracking-[0%] text-[#E7E7E7]">
              Password at least 8 characters and includes at least 1 upper case
              letter. 1 lower case letter and 1 number.
            </p>
          )}
        </div>

        <div className="w-[400px] flex flex-col gap-[8px]">
          <label
            htmlFor="confirmPassword"
            className="font-medium text-[18px] leading-[28px] tracking-[0%] text-[#FCFCFC]"
          >
            Confirm Password *
          </label>
          <div
            className={`w-[400px] h-[54px] rounded-md border ${
              errors.confirmPassword ? "border-[#DC2626]" : "border-[#383B42]"
            } bg-[#262626] px-4 py-3 flex items-center gap-[16px]`}
          >
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Please confirm your password.",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match.",
              })}
              className="w-[320px] h-[26px] bg-transparent font-normal text-[16px] leading-[26px] tracking-[0%] text-[#FCFCFC] placeholder:text-[#B0B0B0] focus:outline-none border-none"
              placeholder="Confirm Your Password"
            />
            <ClosedEyeIcon size={24} />
          </div>
          {errors.confirmPassword && (
            <p className="font-normal text-[14px] leading-[24px] tracking-[0%] text-[#F87171]">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="w-[400px] h-[98px] flex flex-col gap-[16px]">
          <label
            htmlFor="country"
            className="font-medium text-[18px] leading-[28px] tracking-[0%] text-[#FCFCFC]"
          >
            Country or region *
          </label>
          <div className="relative w-[400px] h-[54px]">
            <select
              id="country"
              {...register("country", { required: true })}
              className="w-full h-full rounded-md border border-[#383B42] bg-[#262626] px-4 py-3 pr-12 font-normal text-[16px] leading-[26px] tracking-[0%] text-[#FCFCFC] focus:outline-none focus:border-[#F29145] transition-colors appearance-none cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled className="text-[#B0B0B0]">
                Select Your Country
              </option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <DownArrowIcon size={18} className="text-[#FCFCFC]" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-[400px] flex flex-col gap-[24px]">
        <div className="w-[400px] h-[48px] flex items-start gap-[16px]">
          <div className="relative w-[26px] h-[26px]">
            <input
              type="checkbox"
              id="terms"
              {...register("terms", { required: true })}
              className="peer w-[26px] h-[26px] rounded-[6px] border border-[#383B42] bg-[#262626] cursor-pointer appearance-none checked:bg-[#F29145] checked:border-[#F29145] transition-colors"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity">
              <CheckIcon size={18} className="text-[#262626]" />
            </div>
          </div>
          <label
            htmlFor="terms"
            className="flex-1 cursor-pointer font-normal text-[14px] leading-[24px] tracking-[0%] text-[#E7E7E7]"
          >
            By creating an account and check, you agree to the{" "}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-[#F29145] pointer-events-none"
            >
              Conditions of Use
            </a>{" "}
            and{" "}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-[#F29145] pointer-events-none"
            >
              Privacy Notice
            </a>
            .
          </label>
        </div>

        {submitError && (
          <p className="font-normal text-[14px] leading-[24px] tracking-[0%] text-[#F87171]">
            {submitError}
          </p>
        )}

        <Button
          type="submit"
          variant="fill"
          size="xl"
          disabled={isSubmitting}
          className="w-[400px] h-[54px] rounded-[6px] px-[20px] py-[14px] bg-[#F29145] hover:bg-[#EE701D] text-[#262626]"
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>
      </div>
    </form>
  );
}
