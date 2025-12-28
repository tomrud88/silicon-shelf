import React from "react";

interface CheckCircleIconProps {
  size?: number;
  className?: string;
}

export default function CheckCircleIcon({
  size = 79,
  className = "",
}: CheckCircleIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 79 79"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M60.3333 27L31.1666 56.1667L18.6664 43.6667M77 39.5C77 60.2107 60.2107 77 39.5 77C18.7893 77 2 60.2107 2 39.5C2 18.7893 18.7893 2 39.5 2C60.2107 2 77 18.7893 77 39.5Z"
        stroke="#86EFAD"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
