interface KeyboardIconProps {
  className?: string;
  size?: number;
}

export default function KeyboardIcon({
  className = "",
  size = 80,
}: KeyboardIconProps) {
  return (
    <img
      src="/keyboard-icon.svg"
      alt="Keyboard"
      width={size}
      height={size}
      className={className}
    />
  );
}
