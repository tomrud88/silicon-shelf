import Image from "next/image";
import CheckIcon from "@/components/icons/CheckIcon";

interface CheckoutProductCardProps {
  item: {
    id: string;
    imageUrl: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
  };
  isProtected: boolean;
  onToggleProtection: () => void;
}

export default function CheckoutProductCard({
  item,
  isProtected,
  onToggleProtection,
}: CheckoutProductCardProps) {
  return (
    <div className="w-full max-w-[889px] rounded-[6px] gap-8 opacity-100 border p-6 bg-[#262626] border-[#383B42]">
      {/* Inner Container */}
      <div className="w-full h-[138px] gap-8 max-[538px]:gap-4 opacity-100 flex max-[538px]:flex-col max-[538px]:h-auto">
        {/* Image Container */}
        <div className="w-[172px] h-[138px] max-[538px]:w-full max-[538px]:h-auto rounded-[6px] gap-[10px] opacity-100 border p-3 border-[#383B42]">
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={148}
            height={114}
            className="w-[148px] h-[114px] max-[538px]:w-full max-[538px]:h-auto rounded-[6px] opacity-100 object-contain"
          />
        </div>

        {/* Content Container */}
        <div className="flex-1 min-w-0 h-[138px] max-[700px]:h-auto max-[700px]:min-h-[180px] gap-4 opacity-100 flex flex-col">
          {/* Label + Badge Container */}
          <div className="w-full h-[78px] gap-3 opacity-100 flex flex-col">
            {/* Product Name */}
            <div className="w-full h-[30px] opacity-100 flex items-center">
              <span className="font-['Inter'] font-medium text-[20px] leading-[30px] tracking-[-0.01em] text-[#FCFCFC]">
                {item.name}
              </span>
            </div>

            {/* Badge */}
            <div className="w-fit h-[36px] rounded-[6px] gap-[10px] opacity-100 py-[6px] px-[10px] bg-[#E5610A]">
              <span className="font-['Inter'] font-medium text-[14px] leading-[24px] tracking-[0%] text-[#FDEDD7]">
                {item.category}
              </span>
            </div>
          </div>

          {/* Price + Quantity Container */}
          <div className="w-full h-auto opacity-100 flex flex-col max-[700px]:items-start max-[700px]:gap-2 min-[701px]:flex-row min-[701px]:justify-between min-[701px]:items-center min-[701px]:h-[44px]">
            {/* Price */}
            <span className="font-['Inter'] font-medium text-[24px] leading-[36px] tracking-[-0.01em] text-[#FCFCFC]">
              ${item.price.toFixed(2)}
            </span>

            {/* Quantity Display */}
            <div className="flex items-center gap-2">
              <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-[#E7E7E7]">
                Quantity:
              </span>
              <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-[#FCFCFC]">
                {item.quantity}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full max-w-[841px] h-0 opacity-100 border-t border-[#383B42] mt-6"></div>

      {/* Product Protection Container */}
      <div className="w-full max-w-[841px] h-[56px] gap-1 opacity-100 mt-6">
        {/* Inner Container */}
        <div className="w-full max-w-[841px] h-[28px] opacity-100 flex justify-between items-center">
          {/* Left Side - Checkbox Container */}
          <div
            className="w-[186px] h-[26px] gap-4 opacity-100 flex items-center cursor-pointer"
            onClick={onToggleProtection}
          >
            {/* Checkbox */}
            <div
              className={`w-[26px] h-[26px] rounded-[6px] opacity-100 p-[3px] flex items-center justify-center transition-colors ${
                isProtected
                  ? "bg-[#F29145]"
                  : "bg-[#222327] border border-[#616674]"
              }`}
            >
              {isProtected && (
                <CheckIcon className="text-[#262626]" size={12} />
              )}
            </div>
            {/* Text */}
            <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-[#FCFCFC]">
              Product Protection
            </span>
          </div>

          {/* Right Side - Price */}
          <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-[#FCFCFC]">
            $1
          </span>
        </div>

        {/* Support Text Container */}
        <div className="w-full max-w-[841px] h-[24px] gap-[10px] opacity-100 px-10">
          <span className="font-['Inter'] font-normal text-[14px] leading-[24px] tracking-[0%] text-[#E7E7E7]">
            The claim process is easy and instant, valid for 6 months
          </span>
        </div>
      </div>
    </div>
  );
}
