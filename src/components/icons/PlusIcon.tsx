interface PlusIconProps {
  className?: string;
  size?: number;
}

export default function PlusIcon({ className = "", size = 18 }: PlusIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0.75 8.75H16.75M8.75 0.75V16.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
