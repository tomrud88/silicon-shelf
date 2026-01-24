import Logo from "@/components/icons/Logo";
import VisaIcon from "@/components/icons/VisaIcon";
import MastercardIcon from "@/components/icons/MastercardIcon";
import PaypalIcon from "@/components/icons/PaypalIcon";
import ApplePayIcon from "@/components/icons/ApplePayIcon";
import GooglePayIcon from "@/components/icons/GooglePayIcon";

export default function Footer() {
  return (
    <footer className="w-full bg-[#222327]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-[60px] py-10 sm:py-16 md:py-24 lg:py-[140px] flex flex-col lg:flex-row justify-between gap-12 lg:gap-0">
        {/* Logo container */}
        <div className="w-full lg:w-[532px] flex flex-col gap-6 items-start">
          {/* Logo */}
          <Logo className="h-[50px] sm:h-[60px] md:h-[70px] -my-2" />

          {/* Copyright text */}
          <p className="max-w-full sm:max-w-[216px] font-normal text-sm sm:text-base leading-[26px] tracking-normal text-[#E7E7E7]">
            © 2023 NexusHub. All rights reserved.
          </p>

          {/* Payment icons */}
          <div className="w-full sm:w-[282px] flex flex-wrap items-center justify-start gap-1 sm:-space-x-1">
            <VisaIcon className="h-[32px] sm:h-[40px] sm:-ml-2" />
            <MastercardIcon className="h-[32px] sm:h-[40px]" />
            <PaypalIcon className="h-[32px] sm:h-[40px]" />
            <ApplePayIcon className="h-[32px] sm:h-[40px]" />
            <GooglePayIcon className="h-[32px] sm:h-[40px]" />
          </div>
        </div>

        {/* Menu container */}
        <div className="w-full lg:w-[788px] grid grid-cols-2 sm:grid-cols-4 gap-8 lg:flex lg:justify-between">
          {/* Company */}
          <div className="w-full lg:w-[191px] flex flex-col gap-6 lg:gap-8">
            <h3 className="font-semibold text-lg sm:text-xl leading-[30px] text-[#E7E7E7]">
              Company
            </h3>
            <ul className="w-full flex flex-col gap-3 lg:gap-4">
              <li>
                <a
                  href="#"
                  className="font-normal text-sm sm:text-base leading-[22px] text-[#E7E7E7] hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-normal text-sm sm:text-base leading-[22px] text-[#E7E7E7] hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-normal text-sm sm:text-base leading-[22px] text-[#E7E7E7] hover:text-white transition-colors"
                >
                  Partner
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="w-full lg:w-[191px] flex flex-col gap-6 lg:gap-8">
            <h3 className="font-semibold text-lg sm:text-xl leading-[30px] text-[#E7E7E7]">
              Social
            </h3>
            <ul className="w-full flex flex-col gap-3 lg:gap-4">
              <li>
                <a
                  href="#"
                  className="font-normal text-sm sm:text-base leading-[22px] text-[#E7E7E7] hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-normal text-sm sm:text-base leading-[22px] text-[#E7E7E7] hover:text-white transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-normal text-sm sm:text-base leading-[22px] text-[#E7E7E7] hover:text-white transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-normal text-sm sm:text-base leading-[22px] text-[#E7E7E7] hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="w-full lg:w-[191px] flex flex-col gap-6 lg:gap-8">
            <h3 className="font-semibold text-lg sm:text-xl leading-[30px] text-[#E7E7E7]">
              FAQ
            </h3>
            <ul className="w-full flex flex-col gap-3 lg:gap-4">
              <li>
                <a
                  href="#"
                  className="font-normal text-sm sm:text-base leading-[22px] text-[#E7E7E7] hover:text-white transition-colors"
                >
                  Account
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-normal text-sm sm:text-base leading-[22px] text-[#E7E7E7] hover:text-white transition-colors"
                >
                  Deliveries
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-normal text-sm sm:text-base leading-[22px] text-[#E7E7E7] hover:text-white transition-colors"
                >
                  Orders
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-normal text-sm sm:text-base leading-[22px] text-[#E7E7E7] hover:text-white transition-colors"
                >
                  Payments
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="w-full lg:w-[191px] flex flex-col gap-6 lg:gap-8">
            <h3 className="font-semibold text-lg sm:text-xl leading-[30px] text-[#E7E7E7]">
              Resources
            </h3>
            <ul className="w-full flex flex-col gap-3 lg:gap-4">
              <li>
                <a
                  href="#"
                  className="font-normal text-sm sm:text-base leading-[22px] text-[#E7E7E7] hover:text-white transition-colors"
                >
                  E-books
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-normal text-sm sm:text-base leading-[22px] text-[#E7E7E7] hover:text-white transition-colors"
                >
                  Tutorials
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-normal text-sm sm:text-base leading-[22px] text-[#E7E7E7] hover:text-white transition-colors"
                >
                  Course
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-normal text-sm sm:text-base leading-[22px] text-[#E7E7E7] hover:text-white transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
