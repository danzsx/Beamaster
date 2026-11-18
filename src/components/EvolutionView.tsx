import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Discipline } from '../types/mastery';
import {
  calculateDisciplineDimensions,
  calculateGlobalDimensions,
  getGentleGuidance,
} from '../utils/masteryCalc';
import { DISCIPLINE_THEMES } from '../utils/themes';
import { DimensionMeters } from './DimensionMeters';

interface EvolutionViewProps {
  disciplines: Discipline[];
  onSelectDiscipline: (id: string) => void;
}

export const EvolutionView: React.FC<EvolutionViewProps> = ({
  disciplines,
  onSelectDiscipline,
}) => {
  const globalDim = calculateGlobalDimensions(disciplines);
  const guidance = getGentleGuidance(globalDim);

  return (
    <div className="h-full overflow-y-auto px-4 py-2 space-y-6 pb-10">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-[#1E2430]">
          Painel Geral de Evolução
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Acompanhe progresso, desempenho e domínio de forma clara e acolhedora.
        </p>
      </div>

      {/* Dimensões Globais */}
      <DimensionMeters dimensions={globalDim} />

      <div className="rounded-2xl bg-white/85 border border-slate-200/75 p-4 flex items-center gap-3 text-xs text-slate-600">
        <Sparkles className="w-4 h-4 text-sky-500 shrink-0" />
        <span>{guidance}</span>
      </div>

      {/* Resumo por disciplina */}
      <div className="space-y-3">
        <h2 className="font-display text-lg font-semibold text-[#1E2430]">
          Visão por Disciplina
        </h2>
        {disciplines.length === 0 ? (
          <div className="rounded-2xl bg-white/80 border border-slate-200/75 p-8 text-center text-xs text-slate-500">
            Adicione uma disciplina para acompanhar sua evolução aqui.
          </div>
        ) : (
          <div className="space-y-3">
            {disciplines.map((d) => {
              const theme = DISCIPLINE_THEMES[d.theme];
              const dim = calculateDisciplineDimensions(d);
              return (
                <div
                  key={d.id}
                  className="rounded-[22px] bg-white border border-slate-200/80 p-5 flex flex-wrap items-center justify-between gap-4"
                >
                  <div className="min-w-[220px]">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: theme.dot }}
                      />
                      <h3 className="font-display font-semibold text-base text-[#1E2430]">
                        {d.name}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {dim.completedCount} de {dim.totalCount} conteúdos iluminados ·{' '}
                      {dim.exercisesDone} exercícios registrados
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    <div className="text-center">
                      <div className="text-[10px] uppercase tracking-wider text-slate-400">
                        Progresso
                      </div>
                      <div className="font-display text-lg font-semibold text-[#1E2430]">
                        {dim.progress}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] uppercase tracking-wider text-slate-400">
                        Desempenho
                      </div>
                      <div className="font-display text-lg font-semibold text-[#1E2430]">
                        {dim.performance !== null ? `${dim.performance}%` : '—'}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] uppercase tracking-wider text-slate-400">
                        Domínio
                      </div>
                      <div className="font-display text-lg font-semibold text-[#2B4C7E]">
                        {dim.mastery}%
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectDiscipline(d.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-[#1E2430] hover:text-white text-xs font-medium text-[#1E2430] transition-colors"
                    >
                      <span>Abrir</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

