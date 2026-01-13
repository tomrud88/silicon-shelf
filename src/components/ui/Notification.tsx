"use client";

import CheckCircleIcon from "@/components/icons/CheckCircleIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import Button from "@/components/ui/Button";

interface NotificationProps {
  message: string;
  onClose: () => void;
}

export default function Notification({ message, onClose }: NotificationProps) {
  return (
    <div className="fixed top-0 left-0 right-0 w-full flex justify-center px-4 py-4 z-50">
      <div className="w-full max-w-[1360px] h-[66px] flex items-center gap-[16px] rounded-[6px] border border-[#22C55E] bg-[#295B40] px-[18px]">
        {/* Check Circle Icon */}
        <CheckCircleIcon size={24} />

        {/* Message */}
        <p className="flex-1 font-medium text-[20px] leading-[30px] tracking-[-0.01em] text-[#FCFCFC]">
          {message}
        </p>

        {/* Close Button */}
        <Button
          onClick={onClose}
          className="!w-6 !h-6 !p-0 !bg-transparent hover:!opacity-70 hover:!bg-transparent !text-[#FCFCFC] !min-w-0 !rounded-none"
        >
          <CloseIcon size={19} />
        </Button>
      </div>
    </div>
  );
}
