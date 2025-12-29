import Link from "next/link";
import Image from "next/image";
import TrashIcon from "@/components/icons/TrashIcon";

export default function CartPage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="max-w-[1440px] w-full h-[46px] gap-2 opacity-100 py-[10px] px-10 mx-auto">
        <div className="flex items-center gap-2">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Cart</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-[1440px] w-full min-h-[500px] gap-12 opacity-100 p-10 mx-auto">
        <div className="flex gap-12">
          {/* Cart Content Container */}
          <div className="w-[889px] min-h-[462px] gap-8 opacity-100 flex flex-col">
            {/* Select All Checkbox */}
            <div className="w-[114px] h-[26px] gap-4 opacity-100 flex items-center">
              <div className="w-[26px] h-[26px] rounded-[6px] opacity-100 border bg-[#222327] border-[#616674]"></div>
              <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-[#FCFCFC]">
                Select All
              </span>
            </div>

            {/* Single Product Container */}
            <div className="w-[889px] h-[186px] gap-6 opacity-100 flex items-center">
              {/* Checkbox */}
              <div className="w-[26px] h-[26px] gap-4 opacity-100">
                <div className="w-[26px] h-[26px] rounded-[6px] opacity-100 border bg-[#222327] border-[#616674]"></div>
              </div>

              {/* Product Card */}
              <div className="w-[839px] h-[186px] rounded-[6px] gap-8 opacity-100 border p-6 bg-[#262626] border-[#383B42]">
                {/* Inner Container */}
                <div className="w-[791px] h-[138px] gap-8 opacity-100 flex">
                  {/* Image Container */}
                  <div className="w-[172px] h-[138px] rounded-[6px] gap-[10px] opacity-100 border p-3 border-[#383B42]">
                    <Image
                      src="/mouse-img.png"
                      alt="Product"
                      width={148}
                      height={114}
                      className="w-[148px] h-[114px] rounded-[6px] opacity-100 object-contain"
                    />
                  </div>

                  {/* Content Container */}
                  <div className="w-[587px] h-[138px] gap-4 opacity-100 flex flex-col">
                    {/* Label + Badge Container */}
                    <div className="w-[587px] h-[78px] gap-3 opacity-100 flex flex-col">
                      {/* Label + Icon Container */}
                      <div className="w-[587px] h-[30px] opacity-100 flex justify-between">
                        {/* Product Name */}
                        <span className="font-['Inter'] font-medium text-[20px] leading-[30px] tracking-[-0.01em] text-[#FCFCFC]">
                          Rexus Xierra X16
                        </span>

                        {/* Trash Icon Container */}
                        <div className="w-[30px] h-[30px] opacity-100 flex items-center justify-center">
                          <TrashIcon />
                        </div>
                      </div>

                      {/* Badge */}
                      <div className="w-[66px] h-[36px] rounded-[6px] gap-[10px] opacity-100 py-[6px] px-[10px] bg-[#E5610A]">
                        <span className="font-['Inter'] font-medium text-[14px] leading-[24px] tracking-[0%] text-[#FDEDD7]">
                          Mouse
                        </span>
                      </div>
                    </div>

                    {/* Price + Action Container */}
                    <div className="w-[587px] h-[44px] opacity-100 flex justify-between items-center">
                      {/* Price */}
                      <span className="font-['Inter'] font-medium text-[24px] leading-[36px] tracking-[-0.01em] text-[#FCFCFC]">
                        $25.99
                      </span>

                      {/* Actions Container */}
                      <div className="w-[255px] h-[44px] gap-6 opacity-100 flex items-center">
                        {/* Save for Later Button */}
                        <button className="w-[82px] h-[26px] rounded-[6px] gap-[14px] opacity-100">
                          <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-center align-middle text-[#F29145]">
                            Write Note
                          </span>
                        </button>

                        {/* Divider */}
                        <div className="w-0 h-[24px] opacity-100 border-l border-[#848A97]"></div>

                        {/* Quantity Controls */}
                        <div className="w-[125px] h-[44px] rounded-[6px] gap-[14px] opacity-100 border py-[10px] px-5 border-[#FCFCFC] flex items-center justify-between">
                          <Image
                            src="/minus.svg"
                            alt="Decrease"
                            width={16}
                            height={16}
                          />
                          <span className="font-['Inter'] font-medium text-[14px] text-[#FCFCFC]">
                            1
                          </span>
                          <Image
                            src="/plus.svg"
                            alt="Increase"
                            width={16}
                            height={16}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout/Total Container */}
          <div className="w-[423px] h-[294px] rounded-[6px] gap-6 opacity-100 border p-6 bg-[#262626] border-[#383B42] flex flex-col">
            {/* Top Container */}
            <div className="w-[375px] h-[72px] gap-4 opacity-100 flex flex-col">
              {/* Title */}
              <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] align-middle text-[#FCFCFC]">
                Total Product
              </span>

              {/* Price Row */}
              <div className="w-[375px] h-[28px] opacity-100 flex justify-between items-center">
                {/* Left Text */}
                <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] align-middle text-[#E7E7E7]">
                  Total Product Price (10 Item)
                </span>

                {/* Right Text */}
                <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-center align-middle text-[#FCFCFC]">
                  $259.9
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="w-[375px] h-0 opacity-100 border-t border-[#383B42]"></div>

            {/* Bottom Container */}
            <div className="w-[375px] h-[126px] gap-8 opacity-100 flex flex-col">
              {/* Subtotal Row */}
              <div className="w-[375px] h-[40px] opacity-100 flex justify-between items-center">
                {/* Left Text */}
                <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] align-middle text-[#FCFCFC]">
                  Subtotal
                </span>

                {/* Right Text */}
                <span className="font-['Inter'] font-medium text-[28px] leading-[40px] tracking-[-0.01em] text-[#FCFCFC]">
                  $259.9
                </span>
              </div>

              {/* Checkout Button */}
              <button className="w-[375px] h-[54px] rounded-[6px] gap-[14px] opacity-100 py-[14px] px-5 bg-[#F29145]">
                <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-center align-middle text-[#262626]">
                  Checkout
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
