interface ArrowRightIconProps {
  className?: string;
  size?: number;
}

export default function ArrowRightIcon({
  className = "",
  size = 20,
}: ArrowRightIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4.16675 10H15.8334M15.8334 10L10.0001 4.16669M15.8334 10L10.0001 15.8334"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
