export const colors = {
    primary: '#7f13ec',
    secondary: '#00d4ff',
    accent: '#00C2FF',

    background: {
        light: '#f7f6f8',
        dark: '#130b1b',
    },

    surface: {
        light: '#ffffff',
        dark: '#1f162b',
    },

    text: {
        primary: '#ffffff',
        secondary: '#94a3b8',
        muted: '#64748b',
        dark: '#1e293b',
    },

    status: {
        success: '#4caf50',
        warning: '#ff9800',
        error: '#ef4444',
        info: '#3b82f6',
    },

    gamification: {
        gold: '#F59E0B',
        fire: '#ff6b6b',
        bronze: '#cd7f32',
        silver: '#c0c0c0',
    },

    border: {
        light: '#e2e8f0',
        dark: 'rgba(255, 255, 255, 0.1)',
    },
} as const;

export type Colors = typeof colors;
