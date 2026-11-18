import React from 'react';
import { RefreshCw, Sparkles, ArrowRight } from 'lucide-react';
import { ContentNode, Discipline } from '../types/mastery';
import { getReviewSuggestions } from '../utils/masteryCalc';
import { DISCIPLINE_THEMES } from '../utils/themes';

interface ReviewsViewProps {
  disciplines: Discipline[];
  onOpenContent: (disciplineId: string, content: ContentNode) => void;
}

export const ReviewsView: React.FC<ReviewsViewProps> = ({
  disciplines,
  onOpenContent,
}) => {
  const suggestions = getReviewSuggestions(disciplines);

  return (
    <div className="h-full overflow-y-auto px-4 py-2 space-y-6 pb-10">
      <div className="rounded-[26px] bg-gradient-to-br from-white via-emerald-50/40 to-sky-50/50 border border-slate-200/75 p-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/70 text-[11px] text-emerald-700 font-medium mb-3">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reencontro com o conhecimento</span>
        </div>
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-[#1E2430]">
          Que tal revisitar alguns conhecimentos?
        </h1>
        <p className="mt-1.5 text-sm text-slate-600 max-w-2xl leading-relaxed">
          A revisão não é uma dívida nem uma pendência. É uma oportunidade tranquila de fortalecer o que você já conquistou e fazer essas luzes brilharem com ainda mais clareza.
        </p>
      </div>

      {suggestions.length === 0 ? (
        <div className="rounded-[26px] bg-white/85 border border-slate-200/75 p-10 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="font-display text-lg font-semibold text-[#1E2430]">
            Tudo sereno por aqui
          </h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Conforme você avançar pelas trilhas, marcar conteúdos para revisão ou registrar pontos que merecem mais calma, eles aparecerão aqui como convites para um reencontro.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((item) => {
            const theme = DISCIPLINE_THEMES[item.discipline.theme];
            return (
              <div
                key={`${item.discipline.id}-${item.content.id}`}
                className="rounded-[22px] bg-white border border-slate-200/80 p-5 flex flex-col justify-between shadow-[0_10px_24px_-16px_rgba(30,36,48,0.1)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-2 text-[11px] font-medium text-slate-500">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: theme.dot }}
                      />
                      {item.discipline.name}
                    </span>
                    {item.content.reviewCount > 0 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">
                        {item.content.reviewCount}x revisitado
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-semibold text-lg text-[#1E2430]">
                    {item.content.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                    {item.reason}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() =>
                      onOpenContent(item.discipline.id, item.content)
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1E2430] text-white text-xs font-medium hover:bg-[#2B4C7E] transition-colors"
                  >
                    <span>Revisitar agora</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

