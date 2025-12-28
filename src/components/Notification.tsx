"use client";

import CheckCircleIcon from "@/components/icons/CheckCircleIcon";
import CloseIcon from "@/components/icons/CloseIcon";

interface NotificationProps {
  message: string;
  onClose: () => void;
}

export default function Notification({ message, onClose }: NotificationProps) {
  return (
    <div className="w-full flex justify-center px-4 py-4">
      <div className="w-full max-w-[1360px] h-[66px] flex items-center gap-[16px] rounded-[6px] border border-[#22C55E] bg-[#295B40] px-[18px]">
        {/* Check Circle Icon */}
        <CheckCircleIcon size={24} />

        {/* Message */}
        <p className="flex-1 font-medium text-[20px] leading-[30px] tracking-[-0.01em] text-[#FCFCFC]">
          {message}
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="flex items-center justify-center w-6 h-6 hover:opacity-70 transition-opacity text-[#FCFCFC]"
          aria-label="Close notification"
        >
          <CloseIcon size={19} />
        </button>
      </div>
    </div>
  );
}
