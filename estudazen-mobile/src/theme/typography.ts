export const typography = {
    // Font families
    fonts: {
        display: 'Lexend',      // For headings and titles
        body: 'Plus Jakarta Sans', // For content and UI text
    },

    // Font sizes
    sizes: {
        xs: 10,
        sm: 12,
        base: 14,
        md: 16,
        lg: 18,
        xl: 20,
        '2xl': 24,
        '3xl': 30,
        '4xl': 36,
        '5xl': 48,
    },

    // Font weights
    weights: {
        light: '300' as const,
        regular: '400' as const,
        medium: '500' as const,
        semibold: '600' as const,
        bold: '700' as const,
        extrabold: '800' as const,
    },

    // Line heights
    lineHeights: {
        tight: 1.15,
        normal: 1.5,
        relaxed: 1.75,
    },
} as const;

export type Typography = typeof typography;
