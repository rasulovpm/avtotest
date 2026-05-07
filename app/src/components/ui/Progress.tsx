import { cn } from "@/lib/utils";

export function Progress({
  value,
  max = 100,
  className,
  variant = "primary"
}: {
  value: number;
  max?: number;
  className?: string;
  variant?: "primary" | "success" | "error";
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const bg =
    variant === "success"
      ? "bg-gradient-success"
      : variant === "error"
        ? "bg-error"
        : "bg-gradient-primary";

  return (
    <div className={cn("w-full h-2 bg-gray-200 rounded-full overflow-hidden", className)}>
      <div
        className={cn("h-full rounded-full transition-all duration-500", bg)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
