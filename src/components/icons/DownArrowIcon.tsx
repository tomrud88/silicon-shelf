interface DownArrowIconProps {
  className?: string;
  size?: number;
}

export default function DownArrowIcon({
  className = "",
  size = 18,
}: DownArrowIconProps) {
  return (
    <svg
      width={size}
      height={(size * 10) / 18}
      viewBox="0 0 18 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0.75 0.75L8.75 8.75L16.75 0.75"
        stroke="#FCFCFC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
