export default function ContactPage() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* Contact Container */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-20 flex flex-col gap-16">
        {/* Header Section */}
        <div className="flex flex-col gap-6 items-center text-center">
          <h1 className="font-medium text-[40px] md:text-[48px] leading-[56px] tracking-[-0.01em] text-[#FCFCFC]">
            Get in Touch
          </h1>
          <p className="max-w-[680px] font-normal text-lg leading-[28px] text-[#B0B0B0]">
            Have questions about our products or need assistance? We're here to
            help! Reach out to us through any of the channels below.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1360px] mx-auto w-full">
          {/* Email Card */}
          <div className="bg-[#262626] border border-[#383B42] rounded-lg p-8 flex flex-col gap-6 hover:border-[#EE701D] transition-colors">
            <div className="w-14 h-14 bg-[#EE701D]/10 rounded-full flex items-center justify-center">
              <svg
                className="w-7 h-7 text-[#EE701D]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-xl leading-[30px] text-[#FCFCFC]">
                Email Us
              </h3>
              <p className="font-normal text-base leading-[26px] text-[#B0B0B0]">
                Send us an email and we'll respond within 24 hours.
              </p>
              <a
                href="mailto:support@siliconshelf.com"
                className="font-medium text-base leading-[26px] text-[#EE701D] hover:text-[#F29145] transition-colors"
              >
                support@siliconshelf.com
              </a>
            </div>
          </div>

          {/* Phone Card */}
          <div className="bg-[#262626] border border-[#383B42] rounded-lg p-8 flex flex-col gap-6 hover:border-[#EE701D] transition-colors">
            <div className="w-14 h-14 bg-[#EE701D]/10 rounded-full flex items-center justify-center">
              <svg
                className="w-7 h-7 text-[#EE701D]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-xl leading-[30px] text-[#FCFCFC]">
                Call Us
              </h3>
              <p className="font-normal text-base leading-[26px] text-[#B0B0B0]">
                Available Monday to Friday, 9am - 6pm EST.
              </p>
              <a
                href="tel:+1234567890"
                className="font-medium text-base leading-[26px] text-[#EE701D] hover:text-[#F29145] transition-colors"
              >
                +1 (234) 567-890
              </a>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-[#262626] border border-[#383B42] rounded-lg p-8 flex flex-col gap-6 hover:border-[#EE701D] transition-colors md:col-span-2 lg:col-span-1">
            <div className="w-14 h-14 bg-[#EE701D]/10 rounded-full flex items-center justify-center">
              <svg
                className="w-7 h-7 text-[#EE701D]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-xl leading-[30px] text-[#FCFCFC]">
                Visit Us
              </h3>
              <p className="font-normal text-base leading-[26px] text-[#B0B0B0]">
                Come visit our showroom to see our products firsthand.
              </p>
              <address className="font-medium text-base leading-[26px] text-[#EE701D] not-italic">
                123 Tech Street
                <br />
                Silicon Valley, CA 94025
                <br />
                United States
              </address>
            </div>
          </div>
        </div>

        {/* Business Hours Section */}
        <div className="max-w-[1360px] mx-auto w-full">
          <div className="bg-[#262626] border border-[#383B42] rounded-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="flex flex-col gap-6">
                <h2 className="font-semibold text-2xl md:text-[28px] leading-[40px] tracking-[-0.01em] text-[#FCFCFC]">
                  Business Hours
                </h2>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center pb-3 border-b border-[#383B42]">
                    <span className="font-normal text-base leading-[26px] text-[#E7E7E7]">
                      Monday - Friday
                    </span>
                    <span className="font-medium text-base leading-[26px] text-[#FCFCFC]">
                      9:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#383B42]">
                    <span className="font-normal text-base leading-[26px] text-[#E7E7E7]">
                      Saturday
                    </span>
                    <span className="font-medium text-base leading-[26px] text-[#FCFCFC]">
                      10:00 AM - 4:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#383B42]">
                    <span className="font-normal text-base leading-[26px] text-[#E7E7E7]">
                      Sunday
                    </span>
                    <span className="font-medium text-base leading-[26px] text-[#FCFCFC]">
                      Closed
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h2 className="font-semibold text-2xl md:text-[28px] leading-[40px] tracking-[-0.01em] text-[#FCFCFC]">
                  Support Response Time
                </h2>
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#EE701D]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4 text-[#EE701D]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-base leading-[26px] text-[#FCFCFC]">
                        Email Support
                      </span>
                      <span className="font-normal text-sm leading-[22px] text-[#B0B0B0]">
                        Response within 24 hours
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#EE701D]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4 text-[#EE701D]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-base leading-[26px] text-[#FCFCFC]">
                        Phone Support
                      </span>
                      <span className="font-normal text-sm leading-[22px] text-[#B0B0B0]">
                        Immediate assistance during business hours
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#EE701D]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4 text-[#EE701D]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-base leading-[26px] text-[#FCFCFC]">
                        In-Store Visit
                      </span>
                      <span className="font-normal text-sm leading-[22px] text-[#B0B0B0]">
                        Personal assistance from our team
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-[1360px] mx-auto w-full flex flex-col gap-8">
          <h2 className="font-medium text-[28px] md:text-[32px] leading-[40px] tracking-[-0.01em] text-[#FCFCFC]">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#262626] border border-[#383B42] rounded-lg p-6 flex flex-col gap-3">
              <h3 className="font-semibold text-lg leading-[28px] text-[#FCFCFC]">
                Do you offer international shipping?
              </h3>
              <p className="font-normal text-base leading-[26px] text-[#B0B0B0]">
                Yes, we ship to most countries worldwide. Shipping costs and
                delivery times vary by location.
              </p>
            </div>

            <div className="bg-[#262626] border border-[#383B42] rounded-lg p-6 flex flex-col gap-3">
              <h3 className="font-semibold text-lg leading-[28px] text-[#FCFCFC]">
                What is your return policy?
              </h3>
              <p className="font-normal text-base leading-[26px] text-[#B0B0B0]">
                We offer a 30-day return policy for unopened products in
                original packaging. Contact us to initiate a return.
              </p>
            </div>

            <div className="bg-[#262626] border border-[#383B42] rounded-lg p-6 flex flex-col gap-3">
              <h3 className="font-semibold text-lg leading-[28px] text-[#FCFCFC]">
                Do you provide technical support?
              </h3>
              <p className="font-normal text-base leading-[26px] text-[#B0B0B0]">
                Yes, our technical support team is available to help with
                product setup and troubleshooting.
              </p>
            </div>

            <div className="bg-[#262626] border border-[#383B42] rounded-lg p-6 flex flex-col gap-3">
              <h3 className="font-semibold text-lg leading-[28px] text-[#FCFCFC]">
                Can I track my order?
              </h3>
              <p className="font-normal text-base leading-[26px] text-[#B0B0B0]">
                Absolutely! Once your order ships, you'll receive a tracking
                number via email to monitor your delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
