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
    3.5: "0.84375rem",    /* 13.5px */
    4: "1rem",            /* 16px */
    5: "1.25rem",         /* 20px */
    6: "2rem",            /* 32px */
    7: "2.5rem",          /* 40px */
    8: "3rem",            /* 48px */
    9: "3.5rem",          /* 56px */
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
};

type LineHeightKey = keyof typeof lineHeight;

function typeStyle(
    size: keyof typeof fontSize,
    weight: keyof typeof fontWeight,
    lineHeightKey: LineHeightKey = "relaxed",
): TypeStyle {
    return {
        fontFamily: fontFamily.primary,
        fontSize: fontSize[size],
        fontWeight: fontWeight[weight],
        lineHeight: lineHeight[lineHeightKey],
    };
}

export const typeStyles: Record<string, TypeStyle> = {
    "display-d1": typeStyle(9, "extraBold", "relaxed"),
    "display-d2": typeStyle(9, "light", "relaxed"),

    "heading-default-h4": typeStyle(5, "regular", "normal"),
    "heading-strong-h1": typeStyle(8, "bold", "small"),
    "heading-strong-h2": typeStyle(7, "bold", "normal"),
    "heading-strong-h3": typeStyle(6, "semiBold", "normal"),
    "heading-strong-h4": typeStyle(5, "semiBold", "normal"),

    "body-default-b1": typeStyle(4, "regular", "loose"),
    "body-default-b2": typeStyle(3.5, "regular", "loose"),
    "body-default-b3": typeStyle(2, "regular", "loose"),
    "body-strong-b1": typeStyle(4, "medium", "loose"),
    "body-strong-b2": typeStyle(3.5, "medium", "loose"),
    "body-strong-b3": typeStyle(2, "medium", "loose"),

    "mono-m1": typeStyle(3, "medium", "tight"),
    "mono-m2": typeStyle(2, "medium", "tight"),
    "mono-m3": typeStyle(1, "medium", "tight"),
};

