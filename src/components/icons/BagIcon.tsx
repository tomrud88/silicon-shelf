interface BagIconProps {
  className?: string;
  size?: number;
}

export default function BagIcon({ className, size = 26 }: BagIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g transform="translate(4.34, 3.25)">
        <path
          d="M5.14583 9.47917V5.14583C5.14583 2.7526 7.08593 0.8125 9.47917 0.8125C11.8724 0.8125 13.8125 2.7526 13.8125 5.14583V9.47917M5.14583 6.22917H13.8125C17.0625 6.22917 18.1458 10.4433 18.1458 12.1875C18.1458 18.7156 16.4088 19.7708 9.47916 19.7708C2.5495 19.7708 0.8125 18.7156 0.8125 12.1875C0.8125 10.4433 1.89583 6.22917 5.14583 6.22917Z"
          stroke="#F29145"
          strokeWidth="1.625"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
