import { DisciplineThemeId } from '../types/mastery';

export interface ThemeTokens {
  id: DisciplineThemeId;
  label: string;
  dot: string;
  softBg: string;
  softBorder: string;
  text: string;
  gradient: string;
  glow: string;
  orbFrom: string;
  orbVia: string;
  orbTo: string;
}

export const DISCIPLINE_THEMES: Record<DisciplineThemeId, ThemeTokens> = {
  sky: {
    id: 'sky',
    label: 'Azul Manhã',
    dot: '#60A5FA',
    softBg: 'bg-sky-50/80',
    softBorder: 'border-sky-200/70',
    text: 'text-sky-800',
    gradient: 'from-sky-100 via-blue-50 to-indigo-50',
    glow: 'rgba(96, 165, 250, 0.28)',
    orbFrom: '#93C5FD',
    orbVia: '#C4B5FD',
    orbTo: '#E0F2FE',
  },
  deep: {
    id: 'deep',
    label: 'Azul Profundo',
    dot: '#2B4C7E',
    softBg: 'bg-slate-100/80',
    softBorder: 'border-slate-300/70',
    text: 'text-slate-800',
    gradient: 'from-blue-100/80 via-slate-50 to-sky-50',
    glow: 'rgba(43, 76, 126, 0.22)',
    orbFrom: '#3B659E',
    orbVia: '#93C5FD',
    orbTo: '#CBD5E1',
  },
  lavender: {
    id: 'lavender',
    label: 'Lavanda',
    dot: '#A78BFA',
    softBg: 'bg-violet-50/80',
    softBorder: 'border-violet-200/70',
    text: 'text-violet-800',
    gradient: 'from-violet-100/80 via-purple-50 to-fuchsia-50',
    glow: 'rgba(167, 139, 250, 0.28)',
    orbFrom: '#C4B5FD',
    orbVia: '#F0ABFC',
    orbTo: '#E0E7FF',
  },
  sage: {
    id: 'sage',
    label: 'Verde Sereno',
    dot: '#4ADE80',
    softBg: 'bg-emerald-50/80',
    softBorder: 'border-emerald-200/70',
    text: 'text-emerald-800',
    gradient: 'from-emerald-100/70 via-teal-50 to-sky-50',
    glow: 'rgba(74, 222, 128, 0.24)',
    orbFrom: '#86EFAC',
    orbVia: '#99F6E4',
    orbTo: '#E0F2FE',
  },
  gold: {
    id: 'gold',
    label: 'Dourado Suave',
    dot: '#E5B95C',
    softBg: 'bg-amber-50/80',
    softBorder: 'border-amber-200/70',
    text: 'text-amber-800',
    gradient: 'from-amber-100/70 via-orange-50 to-yellow-50',
    glow: 'rgba(229, 185, 92, 0.28)',
    orbFrom: '#FCD34D',
    orbVia: '#FDBA74',
    orbTo: '#FEF3C7',
  },
  rose: {
    id: 'rose',
    label: 'Aurora Rosé',
    dot: '#F472B6',
    softBg: 'bg-rose-50/80',
    softBorder: 'border-rose-200/70',
    text: 'text-rose-800',
    gradient: 'from-rose-100/70 via-pink-50 to-violet-50',
    glow: 'rgba(244, 114, 182, 0.24)',
    orbFrom: '#F9A8D4',
    orbVia: '#C4B5FD',
    orbTo: '#FFE4E6',
  },
};

