import React, { useState } from 'react';
import { Award, CheckCircle2, Sparkles } from 'lucide-react';
import {
  CollectibleCardDef,
  UnlockedAchievement,
  UnlockedCard,
} from '../types/mastery';
import { ACHIEVEMENTS, COLLECTIBLE_CARDS } from '../data/cardsAndAchievements';
import { CollectibleCard } from './CardArtwork';
import { Card3DViewer } from './Card3DViewer';

interface CollectionViewProps {
  unlockedCards: UnlockedCard[];
  unlockedAchievements: UnlockedAchievement[];
}

export const CollectionView: React.FC<CollectionViewProps> = ({
  unlockedCards,
  unlockedAchievements,
}) => {
  const [inspectingCard, setInspectingCard] =
    useState<CollectibleCardDef | null>(null);

  const inspectingUnlock = inspectingCard
    ? unlockedCards.find((u) => u.cardId === inspectingCard.id)
    : undefined;
  return (
    <div className="h-full overflow-y-auto px-4 py-2 space-y-8 pb-10">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/70 text-[11px] text-slate-500 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Galeria Pessoal de Conhecimentos</span>
        </div>
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-[#1E2430]">
          Cartas Colecionáveis & Conquistas
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Cada carta representa um marco intelectual real construído com calma e consistência.
        </p>
      </div>

      {/* Cartas Colecionáveis */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-[#1E2430]">
            Cartas de Maestria ({unlockedCards.length}/{COLLECTIBLE_CARDS.length})
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {COLLECTIBLE_CARDS.map((card) => {
            const unlock = unlockedCards.find((u) => u.cardId === card.id);
            return (
              <CollectibleCard
                key={card.id}
                card={card}
                unlockedAt={unlock?.unlockedAt}
                disciplineName={unlock?.disciplineName}
                onClick={() => setInspectingCard(card)}
              />
            );
          })}
        </div>
      </section>

      {/* Marcos & Conquistas */}
      <section className="space-y-4">
        <h2 className="font-display text-lg font-semibold text-[#1E2430]">
          Marcos da Jornada ({unlockedAchievements.length}/{ACHIEVEMENTS.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {ACHIEVEMENTS.map((ach) => {
            const unlock = unlockedAchievements.find(
              (u) => u.achievementId === ach.id
            );
            const isUnlocked = Boolean(unlock);
            return (
              <div
                key={ach.id}
                className={`rounded-2xl border p-4 flex items-start gap-3.5 transition-all ${
                  isUnlocked
                    ? 'bg-white border-amber-200/80 shadow-[0_10px_24px_-16px_rgba(229,185,92,0.35)]'
                    : 'bg-white/55 border-slate-200/70 opacity-65'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isUnlocked
                      ? 'bg-amber-50 text-amber-600'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {isUnlocked ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Award className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                    {ach.milestoneLabel}
                  </div>
                  <h3 className="font-display font-semibold text-sm text-[#1E2430]">
                    {ach.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {ach.description}
                  </p>
                  {unlock && (
                    <div className="text-[10px] text-amber-700 mt-1.5 font-medium">
                      Alcançado em{' '}
                      {new Date(unlock.unlockedAt).toLocaleDateString('pt-BR')}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {inspectingCard && (
        <Card3DViewer
          card={inspectingCard}
          unlockedAt={inspectingUnlock?.unlockedAt}
          disciplineName={inspectingUnlock?.disciplineName}
          onClose={() => setInspectingCard(null)}
        />
      )}
    </div>
  );
};

