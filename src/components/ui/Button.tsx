import React, { forwardRef } from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", icon, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#10141d] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none";

    const variantStyles = {
      primary:
        "bg-[#2563eb] text-white hover:bg-[#1d4ed8] active:bg-[#1e40af] focus:ring-[#3b82f6] shadow-sm shadow-[#2563eb]/20",
      secondary:
        "bg-[#1e2636] text-[#f1f5f9] hover:bg-[#28354c] active:bg-[#1a2230] border border-[#2d3a52] focus:ring-[#3b82f6]",
      ghost:
        "bg-transparent text-[#94a3b8] hover:text-[#f1f5f9] hover:bg-[#18202e] focus:ring-[#3b82f6]",
      danger:
        "bg-[#dc2626] text-white hover:bg-[#b91c1c] active:bg-[#991b1b] focus:ring-[#ef4444] shadow-sm shadow-[#dc2626]/20",
    };

    const sizeStyles = {
      sm: "text-xs px-2.5 py-1.5 gap-1.5",
      md: "text-sm px-3.5 py-2 gap-2",
      lg: "text-base px-4 py-2.5 gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
