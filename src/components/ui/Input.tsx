import React, { forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", icon, error, disabled, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3 text-[#64748b] pointer-events-none flex items-center">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            disabled={disabled}
            className={`w-full bg-[#18202e] border ${
              error ? "border-[#ef4444]" : "border-[#28354c]"
            } text-[#f1f5f9] placeholder-[#64748b] rounded-lg px-3.5 py-2 text-sm transition-colors focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] disabled:opacity-50 disabled:bg-[#131924] ${
              icon ? "pl-9" : ""
            } ${className}`}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-[#ef4444] mt-1 ml-0.5">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
