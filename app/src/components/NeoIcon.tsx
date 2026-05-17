// Geometrik neon ikonalar (single-stroke)

type NeoIconName =
  | "play"
  | "target"
  | "layers"
  | "flag"
  | "ticket"
  | "flame"
  | "alert"
  | "bookmark"
  | "rocket"
  | "send";

export function NeoIcon({
  name,
  size = 22,
  tone
}: {
  name: NeoIconName;
  size?: number;
  tone?: "error" | "lime" | "default";
}) {
  const color =
    tone === "error" ? "var(--error)" : tone === "lime" ? "var(--success)" : "var(--accent)";
  const sw = 1.8;
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: sw,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const
  };

  switch (name) {
    case "play":
      return (
        <svg {...common}>
          <polygon points="6,4 20,12 6,20" fill={color} fillOpacity="0.15" />
          <polygon points="6,4 20,12 6,20" />
        </svg>
      );
    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill={color} />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="M12 3 L21 8 L12 13 L3 8 Z" />
          <path d="M3 13 L12 18 L21 13" />
          <path d="M3 17 L12 22 L21 17" opacity="0.5" />
        </svg>
      );
    case "flag":
      return (
        <svg {...common}>
          <path d="M5 21 V4" />
          <path d="M5 4 H17 L14 8 L17 12 H5" />
        </svg>
      );
    case "ticket":
      return (
        <svg {...common}>
          <path d="M3 8 V6 H21 V8 A2 2 0 0 0 21 12 V14 A2 2 0 0 0 21 18 V20 H3 V18 A2 2 0 0 0 3 14 V12 A2 2 0 0 0 3 8 Z" />
          <path d="M14 6 V20" strokeDasharray="2 2" />
        </svg>
      );
    case "flame":
      return (
        <svg {...common}>
          <path d="M12 22 C7 22 5 18 5 15 C5 12 8 11 9 8 C9 6 8 4 9 3 C11 5 13 6 14 9 C15 7 16 6 17 6 C16 9 19 11 19 15 C19 18 17 22 12 22 Z" />
        </svg>
      );
    case "alert":
      return (
        <svg {...common}>
          <path d="M12 3 L22 20 H2 Z" />
          <path d="M12 10 V14" />
          <circle cx="12" cy="17" r="0.8" fill={color} />
        </svg>
      );
    case "bookmark":
      return (
        <svg {...common}>
          <path d="M6 3 H18 V21 L12 17 L6 21 Z" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...common}>
          <path d="M12 2 C16 5 18 9 18 13 V18 L15 21 H9 L6 18 V13 C6 9 8 5 12 2 Z" />
          <circle cx="12" cy="11" r="2" fill={color} fillOpacity="0.3" />
          <path d="M9 18 L7 22" />
          <path d="M15 18 L17 22" />
        </svg>
      );
    case "send":
      return (
        <svg {...common} fill={color}>
          <path d="M9.78 18.65 10.06 14.42 17.74 7.5C18.08 7.19 17.67 7.04 17.22 7.31L7.74 13.3 3.64 12.01C2.76 11.75 2.75 11.14 3.84 10.7L19.81 4.54C20.54 4.21 21.24 4.72 20.96 5.84L18.24 18.65C18.05 19.56 17.5 19.78 16.74 19.36L12.6 16.3 10.61 18.23C10.38 18.46 10.19 18.65 9.78 18.65Z" />
        </svg>
      );
    default:
      return <svg {...common} />;
  }
}
