interface HeadphoneIconProps {
  className?: string;
  size?: number;
}

export default function HeadphoneIcon({
  className = "",
  size = 80,
}: HeadphoneIconProps) {
  return (
    <img
      src="/headphone-icon.svg"
      alt="Headphone"
      width={size}
      height={size}
      className={className}
    />
  );
}
