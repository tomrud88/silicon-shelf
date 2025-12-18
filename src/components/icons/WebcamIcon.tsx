interface WebcamIconProps {
  className?: string;
  size?: number;
}

export default function WebcamIcon({
  className = "",
  size = 80,
}: WebcamIconProps) {
  return (
    <img
      src="/webcam-icon.svg"
      alt="Webcam"
      width={size}
      height={size}
      className={className}
    />
  );
}
