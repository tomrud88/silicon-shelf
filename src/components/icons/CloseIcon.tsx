interface CloseIconProps {
  size?: number;
  className?: string;
}

export default function CloseIcon({
  size = 19,
  className = "",
}: CloseIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M18.25 0.75L0.75 18.25M0.750037 0.75L18.2501 18.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
