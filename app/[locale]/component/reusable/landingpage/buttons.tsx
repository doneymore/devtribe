import React from "react";

interface PillButtonProps {
  text: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline" | "white";
  disabled?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<PillButtonProps> = ({
  text,
  size = "md",
  variant = "primary",
  disabled = false,
  className = "",
  onClick,
}) => {
  // Size classes for pill button
  const sizeClasses = {
    sm: "px-4 py-2 text-sm font-medium",
    md: "px-6 py-3 text-base font-medium",
    lg: "px-8 py-4 text-lg font-medium",
  };

  // Variant classes for different styles
  const variantClasses = {
    primary:
      "bg-blue-900 text-white hover:bg-blue-800 active:bg-blue-950 shadow-sm",
    secondary:
      "bg-gray-600 text-white hover:bg-gray-500 active:bg-gray-700 shadow-sm",
    outline:
      "bg-transparent text-blue-900 border-2 border-blue-900 hover:bg-blue-900 hover:text-white active:bg-blue-950",
    white:
      "bg-white text-blue-900 border border-gray-200 hover:bg-gray-50 active:bg-gray-100 shadow-sm",
  };

  // Disabled styles
  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "cursor-pointer";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabledClasses}
        rounded-full
        transition-all
        duration-200
        ease-in-out
        focus:outline-none
        focus:ring-4
        focus:ring-blue-200
        whitespace-nowrap
        ${className}
      `}
    >
      {text}
    </button>
  );
};
