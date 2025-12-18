interface MouseIconProps {
  className?: string;
  size?: number;
}

export default function MouseIcon({
  className = "",
  size = 80,
}: MouseIconProps) {
  return (
    <img
      src="/mouse-icon.svg"
      alt="Mouse"
      width={size}
      height={size}
      className={className}
    />
  );
}
