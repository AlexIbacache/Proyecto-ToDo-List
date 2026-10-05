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
            <div className="absolute left-3 text-[var(--color-text-muted)] pointer-events-none flex items-center">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            disabled={disabled}
            className={`w-full bg-[var(--color-surface)] border ${
              error ? "border-[var(--color-danger)]" : "border-[var(--color-border)]"
            } text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] rounded-lg px-3.5 py-2 text-sm transition-colors focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] disabled:opacity-50 disabled:bg-[var(--color-bg-primary)] ${
              icon ? "pl-9" : ""
            } ${className}`}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-[var(--color-danger)] mt-1 ml-0.5">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
