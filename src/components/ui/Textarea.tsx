import React, { forwardRef } from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", error, disabled, rows = 3, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          ref={ref}
          rows={rows}
          disabled={disabled}
          className={`w-full bg-[var(--color-surface)] border ${
            error ? "border-[var(--color-danger)]" : "border-[var(--color-border)]"
          } text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] rounded-lg p-3 text-sm transition-colors focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] disabled:opacity-50 disabled:bg-[var(--color-bg-primary)] resize-y ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-[var(--color-danger)] mt-1 ml-0.5">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
