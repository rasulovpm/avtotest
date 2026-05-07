"use client";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props extends Omit<HTMLMotionProps<"div">, "ref"> {
  span?: "1x1" | "2x1" | "1x2" | "2x2" | "3x2" | "full";
  href?: string;
  variant?: "default" | "blue" | "green" | "orange" | "dark";
  hoverable?: boolean;
}

export function BentoCard({
  span = "1x1",
  href,
  variant = "default",
  hoverable = true,
  className,
  children,
  ...rest
}: Props) {
  const spanClass = {
    "1x1": "",
    "2x1": "bento-2x1",
    "1x2": "bento-1x2",
    "2x2": "bento-2x2",
    "3x2": "bento-3x2",
    full: "bento-full"
  }[span];

  const variantClass = {
    default: "bg-bg-card border border-border-light",
    blue: "bg-gradient-card-blue border border-blue-100",
    green: "bg-gradient-card-green border border-green-100",
    orange: "bg-gradient-card-orange border border-orange-100",
    dark: "bg-gradient-to-br from-gray-900 to-black text-white border border-gray-800"
  }[variant];

  const inner = (
    <motion.div
      whileHover={hoverable ? { y: -4 } : undefined}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative rounded-2xl p-6 md:p-8 shadow-bento overflow-hidden transition-shadow",
        hoverable && "hover:shadow-bento-hover cursor-pointer",
        spanClass,
        variantClass,
        className
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );

  if (href) return <Link href={href}>{inner}</Link>;
  return inner;
}
