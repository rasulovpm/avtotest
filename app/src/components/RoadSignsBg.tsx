import { RoadSignSvg } from "./RoadSignSvg";

/**
 * Bosh sahifa fon animatsiyasi — sekin "suzayotgan" yo'l belgilari.
 *
 * Tarqoq joylashuv, har biri o'z tezligi va aylantirish burchagi bilan
 * drift qiladi. Opacity ataylab past (0.08-0.14) — kontent o'qishga
 * to'sqinlik qilmaydi. Blur 3-6px — yorqin ranglarni yumshatadi.
 *
 * prefers-reduced-motion bo'lsa animatsiya o'chiriladi, lekin belgilar joyida
 * qoladi (statik fon).
 */

type Kind =
  | "warning-curve"
  | "prohibit-no-entry"
  | "prohibit-speed"
  | "mandatory-roundabout"
  | "priority-stop"
  | "priority-main"
  | "info-parking";

type SignItem = {
  kind: Kind;
  size: number;
  top: string;
  left: string;
  rotate: number;       // deg
  opacity: number;
  blur: number;         // px
  anim: 1 | 2 | 3 | 4;  // qaysi keyframes'ni ishlatish
  delay: number;        // s
  duration: number;     // s
};

// 12 ta belgini ataylab tasodifiy va tarqoq joylashtiramiz (deterministic
// joylar — har sahifa yuklanishida bir xil ko'rinishi uchun).
const SIGNS: SignItem[] = [
  { kind: "priority-main",         size: 90,  top: "6%",  left: "8%",  rotate: -8,  opacity: 0.10, blur: 3, anim: 1, delay: 0,   duration: 62 },
  { kind: "warning-curve",         size: 110, top: "14%", left: "78%", rotate: 6,   opacity: 0.09, blur: 4, anim: 2, delay: -8,  duration: 72 },
  { kind: "prohibit-no-entry",     size: 70,  top: "32%", left: "46%", rotate: -12, opacity: 0.08, blur: 4, anim: 3, delay: -20, duration: 90 },
  { kind: "info-parking",          size: 80,  top: "44%", left: "12%", rotate: 4,   opacity: 0.10, blur: 3, anim: 4, delay: -32, duration: 68 },
  { kind: "prohibit-speed",        size: 95,  top: "52%", left: "70%", rotate: -4,  opacity: 0.09, blur: 4, anim: 1, delay: -12, duration: 78 },
  { kind: "mandatory-roundabout",  size: 105, top: "66%", left: "30%", rotate: 10,  opacity: 0.10, blur: 5, anim: 2, delay: -42, duration: 84 },
  { kind: "priority-stop",         size: 75,  top: "74%", left: "84%", rotate: -6,  opacity: 0.09, blur: 3, anim: 3, delay: -18, duration: 70 },
  { kind: "warning-curve",         size: 65,  top: "86%", left: "20%", rotate: 14,  opacity: 0.08, blur: 4, anim: 4, delay: -6,  duration: 76 },
  { kind: "priority-main",         size: 70,  top: "22%", left: "26%", rotate: 18,  opacity: 0.07, blur: 5, anim: 2, delay: -55, duration: 88 },
  { kind: "info-parking",          size: 60,  top: "8%",  left: "58%", rotate: -10, opacity: 0.08, blur: 4, anim: 3, delay: -28, duration: 82 },
  { kind: "mandatory-roundabout",  size: 75,  top: "88%", left: "62%", rotate: -8,  opacity: 0.08, blur: 4, anim: 1, delay: -38, duration: 74 },
  { kind: "prohibit-speed",        size: 60,  top: "38%", left: "92%", rotate: 4,   opacity: 0.07, blur: 5, anim: 4, delay: -50, duration: 86 },
];

export default function RoadSignsBg() {
  return (
    <div className="signs-bg" aria-hidden="true">
      {SIGNS.map((s, i) => (
        <span
          key={i}
          className={`signs-bg__item signs-bg__item--anim${s.anim}`}
          style={{
            top: s.top,
            left: s.left,
            opacity: s.opacity,
            filter: `blur(${s.blur}px)`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            // joriy turg'un rotate'ni CSS var orqali animation ichida o'qiymiz
            ["--r" as any]: `${s.rotate}deg`,
          }}
        >
          <span className="signs-bg__sign">
            <RoadSignSvg kind={s.kind} size={s.size} />
          </span>
        </span>
      ))}
    </div>
  );
}
