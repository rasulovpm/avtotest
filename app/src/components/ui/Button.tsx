"use client";
import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type Size = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = "primary", size = "md", loading, fullWidth, children, disabled, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-1 focus:ring-offset-transparent",
        "disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]",
        fullWidth && "w-full",
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-base",
        size === "lg" && "px-8 py-4 text-lg",
        variant === "primary" &&
          "bg-gradient-to-r from-primary to-primary-light text-white shadow-md hover:shadow-lg hover:brightness-110",
        variant === "secondary" &&
          "bg-bg-card text-primary border-2 border-primary hover:bg-primary/10",
        variant === "outline" &&
          "bg-transparent text-text-primary border border-border hover:bg-bg-card-hover",
        variant === "ghost" && "bg-transparent text-text-secondary hover:bg-bg-card-hover hover:text-text-primary",
        variant === "danger" && "bg-error text-white hover:brightness-110 shadow-md",
        className
      )}
      {...rest}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  );
});
