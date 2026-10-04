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
          className={`w-full bg-[#18202e] border ${
            error ? "border-[#ef4444]" : "border-[#28354c]"
          } text-[#f1f5f9] placeholder-[#64748b] rounded-lg p-3 text-sm transition-colors focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] disabled:opacity-50 disabled:bg-[#131924] resize-none ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-[#ef4444] mt-1 ml-0.5">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
