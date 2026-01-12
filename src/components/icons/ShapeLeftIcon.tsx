interface ShapeLeftIconProps {
  className?: string;
  size?: number;
}

export default function ShapeLeftIcon({
  className,
  size = 18,
}: ShapeLeftIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.75 0.75L0.75 8.75L8.75 16.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
