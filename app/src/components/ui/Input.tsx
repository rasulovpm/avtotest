"use client";
import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, error, hint, leftIcon, className, ...rest },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-1.5">{label}</label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full px-4 py-3 rounded-xl border border-border bg-bg-card text-text-primary",
            "transition-colors placeholder:text-text-tertiary",
            "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
            leftIcon && "pl-11",
            error && "border-error focus:border-error focus:ring-error/20",
            className
          )}
          {...rest}
        />
      </div>
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
      {hint && !error && <p className="mt-1 text-sm text-text-tertiary">{hint}</p>}
    </div>
  );
});
