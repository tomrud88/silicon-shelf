import Button from "@/components/ui/Button";

interface OrderSummaryProps {
  totalItems: number;
  totalPrice: number;
  protectionCost: number;
  shippingCost: number;
  insuranceCost: number;
  serviceFee: number;
  finalTotal: number;
  isLoading: boolean;
  onCheckout: () => void;
  hasItems: boolean;
}

export default function OrderSummary({
  totalItems,
  totalPrice,
  protectionCost,
  shippingCost,
  insuranceCost,
  serviceFee,
  finalTotal,
  isLoading,
  onCheckout,
  hasItems,
}: OrderSummaryProps) {
  return (
    <div className="w-[423px] max-[430px]:w-[344px] h-auto rounded-[6px] gap-6 opacity-100 border p-6 bg-[#262626] border-[#383B42] flex flex-col">
      {/* Top Container */}
      <div className="w-[375px] max-[430px]:w-[296px] h-auto gap-4 opacity-100 flex flex-col">
        {/* Title */}
        <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] align-middle text-[#FCFCFC]">
          Total Product
        </span>

        {/* Price Row */}
        <div className="w-[375px] max-[430px]:w-[296px] h-[28px] opacity-100 flex justify-between items-center">
          {/* Left Text */}
          <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] align-middle text-[#E7E7E7]">
            Total Product Price ({totalItems}{" "}
            {totalItems === 1 ? "Item" : "Items"})
          </span>

          {/* Right Text */}
          <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-center align-middle text-[#FCFCFC]">
            ${totalPrice.toFixed(2)}
          </span>
        </div>

        {/* Product Protection Row */}
        <div className="w-[375px] max-[430px]:w-[296px] h-[28px] opacity-100 flex justify-between items-center">
          {/* Left Text */}
          <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] align-middle text-[#E7E7E7]">
            Total Product Protection
          </span>

          {/* Right Text */}
          <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-center align-middle text-[#FCFCFC]">
            ${protectionCost.toFixed(2)}
          </span>
        </div>

        {/* Shipping Price Row */}
        <div className="w-[375px] max-[430px]:w-[296px] h-[28px] opacity-100 flex justify-between items-center">
          {/* Left Text */}
          <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] align-middle text-[#E7E7E7]">
            Total Shipping Price
          </span>

          {/* Right Text */}
          <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-center align-middle text-[#FCFCFC]">
            ${shippingCost.toFixed(2)}
          </span>
        </div>

        {/* Shipping Insurance Row */}
        <div className="w-[375px] max-[430px]:w-[296px] h-[28px] opacity-100 flex justify-between items-center">
          {/* Left Text */}
          <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] align-middle text-[#E7E7E7]">
            Shipping Insurance
          </span>

          {/* Right Text */}
          <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-center align-middle text-[#FCFCFC]">
            ${insuranceCost.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="w-[375px] max-[430px]:w-[296px] h-0 opacity-100 border-t border-[#383B42]"></div>

      {/* Transaction Fees Container */}
      <div className="w-[375px] max-[430px]:w-[296px] h-[72px] gap-4 opacity-100 flex flex-col">
        {/* Title */}
        <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] align-middle text-[#FCFCFC]">
          Transaction Fees
        </span>

        {/* Service Fees Row */}
        <div className="w-[375px] max-[430px]:w-[296px] h-[28px] opacity-100 flex justify-between items-center">
          {/* Left Text */}
          <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-center align-middle text-[#E7E7E7]">
            Service Fees
          </span>

          {/* Right Text */}
          <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-center align-middle text-[#FCFCFC]">
            ${serviceFee.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="w-[375px] max-[430px]:w-[296px] h-0 opacity-100 border-t border-[#383B42]"></div>

      {/* Bottom Container */}
      <div className="w-[375px] max-[430px]:w-[296px] h-auto gap-8 opacity-100 flex flex-col">
        {/* Subtotal Row */}
        <div className="w-[375px] max-[430px]:w-[296px] h-[40px] opacity-100 flex justify-between items-center">
          {/* Left Text */}
          <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] align-middle text-[#FCFCFC]">
            Subtotal
          </span>

          {/* Right Text */}
          <span className="font-['Inter'] font-medium text-[28px] leading-[40px] tracking-[-0.01em] text-[#FCFCFC]">
            ${finalTotal.toFixed(2)}
          </span>
        </div>

        {/* Checkout Button */}
        <Button
          onClick={onCheckout}
          disabled={isLoading || !hasItems}
          variant="fill"
          size="l"
          className="w-[375px] max-[430px]:w-[296px] h-[54px]"
        >
          {isLoading ? "Processing..." : "Pay Now"}
        </Button>
      </div>
    </div>
  );
}
