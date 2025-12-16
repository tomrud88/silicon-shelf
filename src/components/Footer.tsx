export default function Footer() {
  return (
    <footer className="w-full bg-[#222327]">
      <div className="max-w-[1440px] mx-auto px-[60px] py-[140px] flex justify-between">
        {/* Logo container */}
        <div className="w-[532px] h-[214px] flex flex-col gap-6 items-start">
          {/* Logo */}
          <img src="/logo.svg" alt="Silicon Shelf" className="h-[70px] -my-2" />

          {/* Copyright text */}
          <p className="w-[216px] font-normal text-base leading-[26px] tracking-normal text-[#E7E7E7]">
            © 2023 NexusHub. All rights reserved.
          </p>

          {/* Payment icons */}
          <div className="w-[282px] h-[40px] flex items-center justify-start -space-x-1">
            <img src="/Visa.svg" alt="Visa" className="h-[40px] -ml-2" />
            <img src="/mastercard.svg" alt="Mastercard" className="h-[40px]" />
            <img src="/paypal.svg" alt="PayPal" className="h-[40px]" />
            <img src="/apple.svg" alt="Apple Pay" className="h-[40px]" />
            <img src="/gpay.svg" alt="Google Pay" className="h-[40px]" />
          </div>
        </div>

        {/* Menu container */}
        <div className="w-[788px] h-[214px] flex justify-between">
          {/* Company */}
          <div className="w-[191px] h-[214px] flex flex-col gap-8">
            <h3 className="font-semibold text-xl leading-[30px] text-[#E7E7E7]">
              Company
            </h3>
            <ul className="w-[191px] h-[110px] flex flex-col gap-4">
              <li>
                <a
                  href="#"
                  className="font-normal text-base leading-[22px] text-[#E7E7E7]"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-normal text-base leading-[22px] text-[#E7E7E7]"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-normal text-base leading-[22px] text-[#E7E7E7]"
                >
                  Partner
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="w-[191px] h-[214px] flex flex-col gap-8">
            <h3 className="font-semibold text-xl leading-[30px] text-[#E7E7E7]">
              Social
            </h3>
            <ul className="w-[191px] h-[110px] flex flex-col gap-4">
              <li>
                <a
                  href="#"
                  className="font-normal text-base leading-[22px] text-[#E7E7E7]"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-normal text-base leading-[22px] text-[#E7E7E7]"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-normal text-base leading-[22px] text-[#E7E7E7]"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-normal text-base leading-[22px] text-[#E7E7E7]"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="w-[191px] h-[214px] flex flex-col gap-8">
            <h3 className="font-semibold text-xl leading-[30px] text-[#E7E7E7]">
              FAQ
            </h3>
            <ul className="w-[191px] h-[110px] flex flex-col gap-4">
              <li>
                <a
                  href="#"
                  className="font-normal text-base leading-[22px] text-[#E7E7E7]"
                >
                  Account
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-normal text-base leading-[22px] text-[#E7E7E7]"
                >
                  Deliveries
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-normal text-base leading-[22px] text-[#E7E7E7]"
                >
                  Orders
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-normal text-base leading-[22px] text-[#E7E7E7]"
                >
                  Payments
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="w-[191px] h-[214px] flex flex-col gap-8">
            <h3 className="font-semibold text-xl leading-[30px] text-[#E7E7E7]">
              Resources
            </h3>
            <ul className="w-[191px] h-[110px] flex flex-col gap-4">
              <li>
                <a
                  href="#"
                  className="font-normal text-base leading-[22px] text-[#E7E7E7]"
                >
                  E-books
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-normal text-base leading-[22px] text-[#E7E7E7]"
                >
                  Tutorials
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-normal text-base leading-[22px] text-[#E7E7E7]"
                >
                  Course
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-normal text-base leading-[22px] text-[#E7E7E7]"
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
