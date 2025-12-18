interface MonitorIconProps {
  className?: string;
  size?: number;
}

export default function MonitorIcon({
  className = "",
  size = 80,
}: MonitorIconProps) {
  return (
    <img
      src="/monitor-icon.svg"
      alt="Monitor"
      width={size}
      height={size}
      className={className}
    />
  );
}
