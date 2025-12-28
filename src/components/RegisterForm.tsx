"use client";

import Button from "@/components/Button";
import ClosedEyeIcon from "@/components/icons/ClosedEyeIcon";
import DownArrowIcon from "@/components/icons/DownArrowIcon";
import CheckIcon from "@/components/icons/CheckIcon";
import CheckCircleIcon from "@/components/icons/CheckCircleIcon";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
              <option value="AF">Afghanistan</option>
              <option value="AL">Albania</option>
              <option value="DZ">Algeria</option>
              <option value="AD">Andorra</option>
              <option value="AO">Angola</option>
              <option value="AG">Antigua and Barbuda</option>
              <option value="AR">Argentina</option>
              <option value="AM">Armenia</option>
              <option value="AU">Australia</option>
              <option value="AT">Austria</option>
              <option value="AZ">Azerbaijan</option>
              <option value="BS">Bahamas</option>
              <option value="BH">Bahrain</option>
              <option value="BD">Bangladesh</option>
              <option value="BB">Barbados</option>
              <option value="BY">Belarus</option>
              <option value="BE">Belgium</option>
              <option value="BZ">Belize</option>
              <option value="BJ">Benin</option>
              <option value="BT">Bhutan</option>
              <option value="BO">Bolivia</option>
              <option value="BA">Bosnia and Herzegovina</option>
              <option value="BW">Botswana</option>
              <option value="BR">Brazil</option>
              <option value="BN">Brunei</option>
              <option value="BG">Bulgaria</option>
              <option value="BF">Burkina Faso</option>
              <option value="BI">Burundi</option>
              <option value="KH">Cambodia</option>
              <option value="CM">Cameroon</option>
              <option value="CA">Canada</option>
              <option value="CV">Cape Verde</option>
              <option value="CF">Central African Republic</option>
              <option value="TD">Chad</option>
              <option value="CL">Chile</option>
              <option value="CN">China</option>
              <option value="CO">Colombia</option>
              <option value="KM">Comoros</option>
              <option value="CG">Congo</option>
              <option value="CR">Costa Rica</option>
              <option value="HR">Croatia</option>
              <option value="CU">Cuba</option>
              <option value="CY">Cyprus</option>
              <option value="CZ">Czech Republic</option>
              <option value="DK">Denmark</option>
              <option value="DJ">Djibouti</option>
              <option value="DM">Dominica</option>
              <option value="DO">Dominican Republic</option>
              <option value="EC">Ecuador</option>
              <option value="EG">Egypt</option>
              <option value="SV">El Salvador</option>
              <option value="GQ">Equatorial Guinea</option>
              <option value="ER">Eritrea</option>
              <option value="EE">Estonia</option>
              <option value="ET">Ethiopia</option>
              <option value="FJ">Fiji</option>
              <option value="FI">Finland</option>
              <option value="FR">France</option>
              <option value="GA">Gabon</option>
              <option value="GM">Gambia</option>
              <option value="GE">Georgia</option>
              <option value="DE">Germany</option>
              <option value="GH">Ghana</option>
              <option value="GR">Greece</option>
              <option value="GD">Grenada</option>
              <option value="GT">Guatemala</option>
              <option value="GN">Guinea</option>
              <option value="GW">Guinea-Bissau</option>
              <option value="GY">Guyana</option>
              <option value="HT">Haiti</option>
              <option value="HN">Honduras</option>
              <option value="HU">Hungary</option>
              <option value="IS">Iceland</option>
              <option value="IN">India</option>
              <option value="ID">Indonesia</option>
              <option value="IR">Iran</option>
              <option value="IQ">Iraq</option>
              <option value="IE">Ireland</option>
              <option value="IL">Israel</option>
              <option value="IT">Italy</option>
              <option value="JM">Jamaica</option>
              <option value="JP">Japan</option>
              <option value="JO">Jordan</option>
              <option value="KZ">Kazakhstan</option>
              <option value="KE">Kenya</option>
              <option value="KI">Kiribati</option>
              <option value="KP">Korea, North</option>
              <option value="KR">Korea, South</option>
              <option value="KW">Kuwait</option>
              <option value="KG">Kyrgyzstan</option>
              <option value="LA">Laos</option>
              <option value="LV">Latvia</option>
              <option value="LB">Lebanon</option>
              <option value="LS">Lesotho</option>
              <option value="LR">Liberia</option>
              <option value="LY">Libya</option>
              <option value="LI">Liechtenstein</option>
              <option value="LT">Lithuania</option>
              <option value="LU">Luxembourg</option>
              <option value="MK">Macedonia</option>
              <option value="MG">Madagascar</option>
              <option value="MW">Malawi</option>
              <option value="MY">Malaysia</option>
              <option value="MV">Maldives</option>
              <option value="ML">Mali</option>
              <option value="MT">Malta</option>
              <option value="MH">Marshall Islands</option>
              <option value="MR">Mauritania</option>
              <option value="MU">Mauritius</option>
              <option value="MX">Mexico</option>
              <option value="FM">Micronesia</option>
              <option value="MD">Moldova</option>
              <option value="MC">Monaco</option>
              <option value="MN">Mongolia</option>
              <option value="ME">Montenegro</option>
              <option value="MA">Morocco</option>
              <option value="MZ">Mozambique</option>
              <option value="MM">Myanmar</option>
              <option value="NA">Namibia</option>
              <option value="NR">Nauru</option>
              <option value="NP">Nepal</option>
              <option value="NL">Netherlands</option>
              <option value="NZ">New Zealand</option>
              <option value="NI">Nicaragua</option>
              <option value="NE">Niger</option>
              <option value="NG">Nigeria</option>
              <option value="NO">Norway</option>
              <option value="OM">Oman</option>
              <option value="PK">Pakistan</option>
              <option value="PW">Palau</option>
              <option value="PA">Panama</option>
              <option value="PG">Papua New Guinea</option>
              <option value="PY">Paraguay</option>
              <option value="PE">Peru</option>
              <option value="PH">Philippines</option>
              <option value="PL">Poland</option>
              <option value="PT">Portugal</option>
              <option value="QA">Qatar</option>
              <option value="RO">Romania</option>
              <option value="RU">Russia</option>
              <option value="RW">Rwanda</option>
              <option value="KN">Saint Kitts and Nevis</option>
              <option value="LC">Saint Lucia</option>
              <option value="VC">Saint Vincent and the Grenadines</option>
              <option value="WS">Samoa</option>
              <option value="SM">San Marino</option>
              <option value="ST">Sao Tome and Principe</option>
              <option value="SA">Saudi Arabia</option>
              <option value="SN">Senegal</option>
              <option value="RS">Serbia</option>
              <option value="SC">Seychelles</option>
              <option value="SL">Sierra Leone</option>
              <option value="SG">Singapore</option>
              <option value="SK">Slovakia</option>
              <option value="SI">Slovenia</option>
              <option value="SB">Solomon Islands</option>
              <option value="SO">Somalia</option>
              <option value="ZA">South Africa</option>
              <option value="SS">South Sudan</option>
              <option value="ES">Spain</option>
              <option value="LK">Sri Lanka</option>
              <option value="SD">Sudan</option>
              <option value="SR">Suriname</option>
              <option value="SZ">Swaziland</option>
              <option value="SE">Sweden</option>
              <option value="CH">Switzerland</option>
              <option value="SY">Syria</option>
              <option value="TW">Taiwan</option>
              <option value="TJ">Tajikistan</option>
              <option value="TZ">Tanzania</option>
              <option value="TH">Thailand</option>
              <option value="TL">Timor-Leste</option>
              <option value="TG">Togo</option>
              <option value="TO">Tonga</option>
              <option value="TT">Trinidad and Tobago</option>
              <option value="TN">Tunisia</option>
              <option value="TR">Turkey</option>
              <option value="TM">Turkmenistan</option>
              <option value="TV">Tuvalu</option>
              <option value="UG">Uganda</option>
              <option value="UA">Ukraine</option>
              <option value="AE">United Arab Emirates</option>
              <option value="GB">United Kingdom</option>
              <option value="US">United States</option>
              <option value="UY">Uruguay</option>
              <option value="UZ">Uzbekistan</option>
              <option value="VU">Vanuatu</option>
              <option value="VA">Vatican City</option>
              <option value="VE">Venezuela</option>
              <option value="VN">Vietnam</option>
              <option value="YE">Yemen</option>
              <option value="ZM">Zambia</option>
              <option value="ZW">Zimbabwe</option>
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
