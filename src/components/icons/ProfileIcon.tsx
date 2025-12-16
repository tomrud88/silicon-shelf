interface ProfileIconProps {
  className?: string;
  size?: number;
}

export default function ProfileIcon({
  className,
  size = 40,
}: ProfileIconProps) {
  return (
    <img
      src="/account.svg"
      alt="Profile"
      width={size}
      height={size}
      className={className}
    />
  );
}
