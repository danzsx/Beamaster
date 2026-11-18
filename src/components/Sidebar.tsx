import React from 'react';
import {
  Compass,
  Home,
  Layers,
  RefreshCw,
  Sparkles,
  TrendingUp,
  Plus,
  Settings,
} from 'lucide-react';
import { Discipline } from '../types/mastery';
import { DISCIPLINE_THEMES } from '../utils/themes';

export type NavTab =
  | 'home'
  | 'trail'
  | 'disciplines'
  | 'reviews'
  | 'collection'
  | 'evolution';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  disciplines: Discipline[];
  activeDisciplineId: string | null;
  onSelectDiscipline: (id: string) => void;
  onOpenNewDiscipline: () => void;
  onOpenSettings: () => void;
  reviewCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  disciplines,
  activeDisciplineId,
  onSelectDiscipline,
  onOpenNewDiscipline,
  onOpenSettings,
  reviewCount,
}) => {
  const navItems: {
    id: NavTab;
    label: string;
    icon: React.ReactNode;
    badge?: number;
  }[] = [
    { id: 'home', label: 'Início', icon: <Home className="w-4 h-4" /> },
    { id: 'trail', label: 'Trilha', icon: <Compass className="w-4 h-4" /> },
    {
      id: 'disciplines',
      label: 'Disciplinas',
      icon: <Layers className="w-4 h-4" />,
    },
    {
      id: 'reviews',
      label: 'Revisões',
      icon: <RefreshCw className="w-4 h-4" />,
      badge: reviewCount > 0 ? reviewCount : undefined,
    },
    {
      id: 'collection',
      label: 'Coleção',
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      id: 'evolution',
      label: 'Evolução',
      icon: <TrendingUp className="w-4 h-4" />,
    },
  ];

  return (
    <aside className="w-60 shrink-0 flex flex-col justify-between bg-white/95 backdrop-blur-md rounded-[26px] border border-slate-200/75 shadow-[0_18px_40px_-20px_rgba(30,36,48,0.14)] p-4 select-none">
      <div>
        {/* Marca */}
        <div className="flex items-center gap-2.5 px-2 pt-1 pb-4">
          <div className="w-8 h-8 rounded-xl luminous-prism flex items-center justify-center shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-white/90" />
          </div>
          <div>
            <div className="font-display font-semibold text-sm tracking-tight text-[#1E2430]">
              Be a Master
            </div>
            <div className="text-[10px] text-slate-400">
              Jornada iluminada
            </div>
          </div>
        </div>

        {/* Navegação principal */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-medium transition-all ${
                  active
                    ? 'bg-[#F3F4F6] text-[#1E2430] shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-[#1E2430]'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span className={active ? 'text-[#2B4C7E]' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  {item.label}
                </span>
                {item.badge !== undefined && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-100 text-violet-700 font-semibold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Disciplinas */}
        <div className="mt-6">
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              Disciplinas
            </span>
            <button
              onClick={onOpenNewDiscipline}
              className="p-1 rounded-lg text-slate-400 hover:text-[#1E2430] hover:bg-slate-100 transition-colors"
              title="Nova disciplina"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
            {disciplines.map((d) => {
              const theme = DISCIPLINE_THEMES[d.theme];
              const isSelected = d.id === activeDisciplineId;
              return (
                <button
                  key={d.id}
                  onClick={() => {
                    onSelectDiscipline(d.id);
                    onSelectTab('trail');
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-[13px] transition-all ${
                    isSelected
                      ? 'bg-slate-100/90 text-[#1E2430] font-medium'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: theme.dot }}
                  />
                  <span className="truncate">{d.name}</span>
                </button>
              );
            })}

            {disciplines.length === 0 && (
              <button
                onClick={onOpenNewDiscipline}
                className="w-full px-3 py-2 rounded-xl text-xs text-slate-500 hover:bg-slate-50 text-left"
              >
                + Começar uma trilha
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Rodapé */}
      <div className="pt-3 border-t border-slate-100">
        <button
          onClick={onOpenSettings}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] text-slate-500 hover:text-[#1E2430] hover:bg-slate-50 transition-colors"
        >
          <Settings className="w-4 h-4 text-slate-400" />
          <span>Dados & Preferências</span>
        </button>
      </div>
    </aside>
  );
};

