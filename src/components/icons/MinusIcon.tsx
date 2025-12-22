interface MinusIconProps {
  className?: string;
  size?: number;
}

export default function MinusIcon({
  className = "",
  size = 18,
}: MinusIconProps) {
  return (
    <svg
      width={size}
      height={(size * 2) / 18}
      viewBox="0 0 18 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0.75 0.75H16.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
