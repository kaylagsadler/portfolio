export const fontFamily = {
    primary: "'Outfit', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica', Arial, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'Menlo', 'Ubuntu Mono', 'Courier New', monospace",
} as const;

export const fontWeight = {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900,
} as const;

export const fontSize = {
    1: "0.625rem",        /* 10px */
    2: "0.6875rem",       /* 11px */
    3: "0.8125rem",       /* 13px */
    4: "0.84375rem",      /* 13.5px */
    5: "1rem",            /* 16px */
    6: "1.25rem",         /* 20px */
    7: "2rem",            /* 32px */
    8: "2.5rem",          /* 40px */
    9: "3rem",            /* 48px */
    10: "3.5rem",         /* 56px */
} as const;

export const lineHeight = {
    tight: 0.8,
    small: 1.05,
    normal: 1.25,
    relaxed: 1.5,
    loose: 1.65,
} as const;

// Type styles (one class = one full style; only used ones are emitted)
type TypeStyle = {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
    letterSpacing?: string;
};

type LineHeightKey = keyof typeof lineHeight;

function typeStyle(
    size: keyof typeof fontSize,
    weight: keyof typeof fontWeight,
    lineHeightKey: LineHeightKey = "relaxed",
    letterSpacing?: string,
): TypeStyle {
    return {
        fontFamily: fontFamily.primary,
        fontSize: fontSize[size],
        fontWeight: fontWeight[weight],
        lineHeight: lineHeight[lineHeightKey],
        ...(letterSpacing && { letterSpacing }),
    };
}

export const typeStyles: Record<string, TypeStyle> = {
    "display-d1": typeStyle(10, "extraBold", "relaxed"),
    "display-d2": typeStyle(10, "regular", "relaxed"),

    "heading-default-h4": typeStyle(6, "regular", "normal"),
    "heading-strong-h1": typeStyle(9, "bold", "small"),
    "heading-strong-h2": typeStyle(8, "bold", "normal"),
    "heading-strong-h3": typeStyle(7, "semiBold", "normal"),
    "heading-strong-h4": typeStyle(6, "semiBold", "normal"),

    "body-default-b1": typeStyle(5, "regular", "loose"),
    "body-default-b2": typeStyle(4, "regular", "loose"),
    "body-default-b3": typeStyle(2, "regular", "loose"),
    "body-strong-b1": typeStyle(5, "medium", "loose"),
    "body-strong-b2": typeStyle(4, "medium", "loose"),
    "body-strong-b3": typeStyle(2, "medium", "loose"),

    "mono-m1": typeStyle(3, "medium", "tight", "0.1em"),
    "mono-m2": typeStyle(2, "medium", "tight", "0.1em"),
    "mono-m3": typeStyle(1, "medium", "tight", "0.1em"),
};

