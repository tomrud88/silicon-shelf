interface CheckIconProps {
  className?: string;
  size?: number;
}

export default function CheckIcon({
  className = "",
  size = 18,
}: CheckIconProps) {
  return (
    <svg
      width={size}
      height={(size * 13) / 18}
      viewBox="0 0 18 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16.7501 0.75L5.7501 11.75L0.75 6.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
