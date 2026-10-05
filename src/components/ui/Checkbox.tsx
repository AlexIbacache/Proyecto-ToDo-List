import React from "react";
import { Check } from "lucide-react";

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  id?: string;
  disabled?: boolean;
  className?: string;
}

export function Checkbox({
  checked,
  onChange,
  label,
  id,
  disabled = false,
  className = "",
}: CheckboxProps) {
  const generatedId = React.useId();
  const checkboxId = id || generatedId;

  return (
    <label
      htmlFor={checkboxId}
      className={`inline-flex items-center gap-2.5 cursor-pointer select-none ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      <div className="relative">
        <input
          id={checkboxId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-150 ${
            checked
              ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-white shadow-sm shadow-[var(--color-accent)]/30"
              : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]"
          }`}
        >
          {checked && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
        </div>
      </div>
      {label && <span className="text-sm text-[var(--color-text-primary)]">{label}</span>}
    </label>
  );
}
