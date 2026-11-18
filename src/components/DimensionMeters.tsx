import React from 'react';
import { MasteryDimensions } from '../types/mastery';

interface DimensionMetersProps {
  dimensions: MasteryDimensions;
  compact?: boolean;
}

export const DimensionMeters: React.FC<DimensionMetersProps> = ({
  dimensions,
  compact = false,
}) => {
  const items = [
    {
      label: 'Progresso',
      value: `${dimensions.progress}%`,
      percent: dimensions.progress,
      hint: `${dimensions.completedCount} de ${dimensions.totalCount} conteúdos`,
      barClass: 'from-sky-400 to-blue-500',
      badgeClass: 'bg-sky-50 text-sky-700 border-sky-200/60',
    },
    {
      label: 'Desempenho',
      value:
        dimensions.performance !== null ? `${dimensions.performance}%` : '—',
      percent: dimensions.performance ?? 0,
      hint:
        dimensions.exercisesDone > 0
          ? `${dimensions.exercisesCorrect}/${dimensions.exercisesDone} acertos`
          : 'Nenhum exercício ainda',
      barClass: 'from-emerald-300 to-teal-400',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    },
    {
      label: 'Domínio',
      value: `${dimensions.mastery}%`,
      percent: dimensions.mastery,
      hint: 'Compreensão, prática e consistência',
      barClass: 'from-violet-400 to-amber-300',
      badgeClass: 'bg-violet-50 text-violet-700 border-violet-200/60',
    },
  ];

  return (
    <div
      className={`grid ${
        compact ? 'grid-cols-3 gap-3' : 'grid-cols-1 md:grid-cols-3 gap-4'
      }`}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl bg-white/85 backdrop-blur-sm border border-slate-200/70 p-4 shadow-[0_6px_20px_-10px_rgba(30,36,48,0.08)]"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-slate-500">
              {item.label}
            </span>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${item.badgeClass}`}
            >
              {item.value}
            </span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${item.barClass} transition-all duration-700 ease-out`}
              style={{ width: `${Math.max(item.percent, item.percent > 0 ? 4 : 0)}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] text-slate-500">{item.hint}</p>
        </div>
      ))}
    </div>
  );
};

