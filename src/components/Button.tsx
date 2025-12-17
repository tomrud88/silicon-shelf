interface ButtonProps {
  variant?: "fill" | "stroke";
  size?: "l" | "xl";
  disabled?: boolean;
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  className?: string; // Dodatkowe klasy, np. dla width/height
}

export default function Button({
  variant = "fill",
  size = "l",
  disabled = false,
  children,
  leftIcon,
  rightIcon,
  onClick,
  className = "",
}: ButtonProps) {
  const baseClasses =
    "font-medium rounded-md transition-all inline-flex items-center justify-center";

  const variantClasses = {
    fill: "bg-[#EE701D] text-white hover:bg-[#E05816]",
    stroke:
      "bg-transparent text-[#EE701D] border border-[#EE701D] hover:text-[#F29145] hover:border-[#F29145]",
  };

  const sizeClasses = {
    l: "px-8 py-4 text-lg gap-2",
    xl: "px-5 py-3.5 text-base gap-3.5",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${
        sizeClasses[size]
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {leftIcon && <span className="flex items-center">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </button>
  );
}
