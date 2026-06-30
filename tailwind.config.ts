import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', '"Segoe UI Variable Text"', '"Segoe UI"', '-apple-system', 'system-ui', 'sans-serif'],
        mono: ['"Cascadia Code"', '"JetBrains Mono"', 'Consolas', 'ui-monospace', 'monospace'],
      },
      colors: {
        accent: { DEFAULT: '#5aa9ff', strong: '#3d8ef5' },
        danger: '#e5484d',
        success: '#4ade80',
        ink: {
          DEFAULT: '#ffffff',
          soft: 'rgba(255,255,255,.86)',
          dim: 'rgba(255,255,255,.56)',
          faint: 'rgba(255,255,255,.36)',
        },
        surface: {
          hover: 'rgba(255,255,255,.12)',
          active: 'rgba(255,255,255,.18)',
          line: 'rgba(255,255,255,.12)',
          well: 'rgba(0,0,0,.22)',
          select: 'rgba(90,169,255,.24)',
        },
        desk: '#3c3c41',
      },
    },
  },
  plugins: [],
} satisfies Config;
