import { cn } from "@/lib/utils";

type Variant = "blue" | "green" | "red" | "yellow" | "gray" | "purple";

export function Badge({
  variant = "blue",
  children,
  className
}: {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
        variant === "blue" && "bg-primary/10 text-primary",
        variant === "green" && "bg-success/10 text-success",
        variant === "red" && "bg-error/10 text-error",
        variant === "yellow" && "bg-warning/20 text-yellow-700",
        variant === "gray" && "bg-gray-100 text-gray-600",
        variant === "purple" && "bg-purple-100 text-purple-700",
        className
      )}
    >
      {children}
    </span>
  );
}
