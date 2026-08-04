import type { Config } from 'tailwindcss';
import containerQueries from '@tailwindcss/container-queries';
import plugin from 'tailwindcss/plugin';
import { deskInsets, layout } from './src/config/layout';

const px = (value: number) => `${value}px`;

// Liquid-glass light edge: a real 1px border overlay, brighter on top, nearly invisible at the bottom
const glassEdge = (top: number, sides: number, bottom: number) => ({
  content: '""',
  position: 'absolute',
  inset: '0',
  zIndex: '20',
  borderRadius: 'inherit',
  pointerEvents: 'none',
  border: '1px solid transparent',
  borderColor: `rgba(255,255,255,${top}) rgba(255,255,255,${sides}) rgba(255,255,255,${bottom})`,
});

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
          dim: 'rgba(255,255,255,.64)',
          faint: 'rgba(255,255,255,.36)',
        },
        surface: {
          hover: 'rgba(255,255,255,.12)',
          active: 'rgba(255,255,255,.18)',
          line: 'rgba(255,255,255,.12)',
          well: 'rgba(0,0,0,.22)',
          select: 'rgba(90,169,255,.24)',
        },
        // Neutral gray while (or if) no wallpaper is loaded
        desk: '#3c3c41',
      },
      spacing: {
        'bar-gap': px(layout.barGap),
        topbar: px(layout.topbarHeight),
        taskbar: px(layout.taskbarHeight),
        'taskbar-offset': px(layout.taskbarOffset),
        'desk-top': px(deskInsets.top),
        'desk-bottom': px(deskInsets.bottom),
        'flyout-bottom': px(deskInsets.bottom + 4),
        'icon-w': px(layout.grid.iconWidth),
      },
      borderRadius: {
        window: '14px',
        panel: '20px',
        bar: '22px',
      },
      boxShadow: {
        // Soft shadows only – the edge comes from the overlay (glassEdge), no hard outer ring
        glass: '0 12px 40px -8px rgba(0,0,0,.35)',
        panel: '0 24px 60px -12px rgba(0,0,0,.55), 0 2px 8px rgba(0,0,0,.18)',
        window: '0 30px 80px -12px rgba(0,0,0,.6), 0 4px 14px rgba(0,0,0,.22)',
        'window-inactive': '0 16px 40px -12px rgba(0,0,0,.45), 0 2px 8px rgba(0,0,0,.16)',
        glow: '0 4px 16px rgba(90,169,255,.45)',
        field: 'inset 0 1px 2px rgba(0,0,0,.25), inset 0 0 0 1px rgba(255,255,255,.1)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(.16,1,.3,1)',
        spring: 'cubic-bezier(.34,1.45,.64,1)',
        minimize: 'cubic-bezier(.5,0,.2,1)',
      },
      zIndex: {
        clock: '1',
        icons: '2',
        selection: '3',
        widgets: '5',
        windows: '10',
        snap: '900',
        bar: '1000',
        flyout: '1001',
        menu: '1002',
        toast: '1003',
        boot: '2000',
      },
      keyframes: {
        'slide-down': { from: { opacity: '0', transform: 'translateY(-16px)' }, to: { opacity: '1', transform: 'none' } },
        'slide-up': { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'none' } },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'fade-up': { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'none' } },
        'toast-in': { from: { opacity: '0', transform: 'translateX(24px) scale(.96)' }, to: { opacity: '1', transform: 'none' } },
        'toast-out': { to: { opacity: '0', transform: 'translateX(24px) scale(.96)' } },
        'boot-bar': { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(250%)' } },
        'cal-next': { from: { opacity: '0', transform: 'translateX(18px)' }, to: { opacity: '1', transform: 'none' } },
        'cal-prev': { from: { opacity: '0', transform: 'translateX(-18px)' }, to: { opacity: '1', transform: 'none' } },
      },
      animation: {
        'slide-down': 'slide-down .7s cubic-bezier(.16,1,.3,1) both',
        'slide-up': 'slide-up .7s cubic-bezier(.16,1,.3,1) both',
        'fade-in': 'fade-in 1s ease both',
        'fade-up': 'fade-up .35s cubic-bezier(.16,1,.3,1) both',
        'toast-in': 'toast-in .45s cubic-bezier(.16,1,.3,1) both',
        'toast-out': 'toast-out .28s ease-in forwards',
        'boot-bar': 'boot-bar 1.1s ease-in-out infinite',
        'cal-next': 'cal-next .3s cubic-bezier(.16,1,.3,1) both',
        'cal-prev': 'cal-prev .3s cubic-bezier(.16,1,.3,1) both',
      },
    },
  },
  plugins: [
    containerQueries,
    plugin(({ addComponents, addUtilities, theme }) => {
      addComponents({
        // Light liquid glass – bars, snap preview
        '.glass': {
          background:
            'linear-gradient(150deg, rgba(255,255,255,.2) 0%, rgba(255,255,255,.07) 45%, rgba(255,255,255,.11) 100%)',
          backdropFilter: 'blur(22px) saturate(185%)',
          WebkitBackdropFilter: 'blur(22px) saturate(185%)',
          boxShadow: theme('boxShadow.glass'),
          '&::after': glassEdge(0.34, 0.14, 0.08),
        },
        // Denser glass – flyouts, menus, toasts
        '.glass-strong': {
          background: 'linear-gradient(150deg, rgba(64,54,56,.6), rgba(28,24,28,.68))',
          backdropFilter: 'blur(36px) saturate(180%)',
          WebkitBackdropFilter: 'blur(36px) saturate(180%)',
          boxShadow: theme('boxShadow.panel'),
          '&::after': glassEdge(0.2, 0.1, 0.05),
        },
        // Windows
        '.glass-window': {
          background: 'linear-gradient(160deg, rgba(52,45,49,.66), rgba(22,19,22,.76))',
          backdropFilter: 'blur(40px) saturate(170%)',
          WebkitBackdropFilter: 'blur(40px) saturate(170%)',
          '&::after': glassEdge(0.16, 0.08, 0.04),
        },
      });
      addUtilities({
        '.scrollbar-thin': {
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255,255,255,.25) transparent',
        },
        '.text-shadow': { textShadow: '0 1px 3px rgba(0,0,0,.7), 0 0 12px rgba(0,0,0,.35)' },
        '.text-shadow-soft': { textShadow: '0 2px 20px rgba(0,0,0,.25)' },
        '.tabular': { fontVariantNumeric: 'tabular-nums' },
      });
    }),
  ],
} satisfies Config;
