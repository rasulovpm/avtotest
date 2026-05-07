import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUzs(amount: number): string {
  return new Intl.NumberFormat("uz-UZ").format(amount) + " so'm";
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function formatPhone(phone: string): string {
  const clean = phone.replace(/\D/g, "");
  if (clean.length === 12 && clean.startsWith("998")) {
    return `+998 ${clean.slice(3, 5)} ${clean.slice(5, 8)} ${clean.slice(8, 10)} ${clean.slice(10)}`;
  }
  return phone;
}

export function normalizePhone(phone: string): string {
  let clean = phone.replace(/\D/g, "");
  if (clean.length === 9) clean = "998" + clean;
  if (clean.startsWith("998") && clean.length === 12) {
    return "+" + clean;
  }
  return "+" + clean;
}

export function isValidUzPhone(phone: string): boolean {
  const clean = phone.replace(/\D/g, "");
  return /^998\d{9}$/.test(clean);
}

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function relativeTime(date: Date | string, lang: "uz" | "ru" | "cy" = "uz"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const diff = Date.now() - d.getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (lang === "ru") {
    if (m < 1) return "только что";
    if (m < 60) return `${m} мин назад`;
    if (h < 24) return `${h} ч назад`;
    return `${days} дн назад`;
  }
  if (lang === "cy") {
    if (m < 1) return "ҳозиргина";
    if (m < 60) return `${m} дақиқа олдин`;
    if (h < 24) return `${h} соат олдин`;
    return `${days} кун олдин`;
  }
  if (m < 1) return "hozirgina";
  if (m < 60) return `${m} daq oldin`;
  if (h < 24) return `${h} soat oldin`;
  return `${days} kun oldin`;
}
