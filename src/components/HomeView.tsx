import React, { useState } from 'react';
import {
  ArrowRight,
  Compass,
  Plus,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import {
  CollectibleCardDef,
  ContentNode,
  Discipline,
  UnlockedCard,
} from '../types/mastery';
import {
  calculateDisciplineDimensions,
  calculateGlobalDimensions,
  findNextDiscovery,
} from '../utils/masteryCalc';
import { DISCIPLINE_THEMES } from '../utils/themes';
import { MinimalClock } from './MinimalClock';
import { COLLECTIBLE_CARDS } from '../data/cardsAndAchievements';
import { CollectibleCard } from './CardArtwork';
import { Card3DViewer } from './Card3DViewer';
import { NavTab } from './Sidebar';

interface HomeViewProps {
  userName: string;
  disciplines: Discipline[];
  activeDiscipline: Discipline | null;
  unlockedCards: UnlockedCard[];
  reviewCount: number;
  onSelectDiscipline: (id: string) => void;
  onOpenContent: (disciplineId: string, content: ContentNode) => void;
  onNavigate: (tab: NavTab) => void;
  onOpenNewDiscipline: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  userName,
  disciplines,
  activeDiscipline,
  unlockedCards,
  reviewCount,
  onSelectDiscipline,
  onOpenContent,
  onNavigate,
  onOpenNewDiscipline,
}) => {
  const [inspectingCard, setInspectingCard] =
    useState<CollectibleCardDef | null>(null);
  const globalDim = calculateGlobalDimensions(disciplines);
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';

  const nextDiscovery = activeDiscipline
    ? findNextDiscovery(activeDiscipline)
    : null;

  const latestUnlocked = unlockedCards
    .slice()
    .reverse()
    .map((u) => ({
      unlocked: u,
      def: COLLECTIBLE_CARDS.find((c) => c.id === u.cardId),
    }))
    .filter((item) => item.def);

  const featuredCard = latestUnlocked[0]?.def || COLLECTIBLE_CARDS[0];
  const featuredUnlock = latestUnlocked[0]?.unlocked;

  // Checklist acolhedor no estilo do card lilás da referência
  const gentleSteps = [
    {
      label: 'Escolher uma disciplina',
      done: disciplines.length > 0,
      action: () => onNavigate('disciplines'),
    },
    {
      label: 'Explorar a trilha visual',
      done: globalDim.inProgressCount > 0 || globalDim.completedCount > 0,
      action: () => onNavigate('trail'),
    },
    {
      label: 'Registrar primeiros exercícios',
      done: globalDim.exercisesDone > 0,
      action: () =>
        activeDiscipline && nextDiscovery
          ? onOpenContent(activeDiscipline.id, nextDiscovery)
          : onNavigate('trail'),
    },
    {
      label: 'Desbloquear primeira carta',
      done: unlockedCards.length > 0,
      action: () => onNavigate('collection'),
    },
  ];

  return (
    <div className="relative h-full flex flex-col justify-between px-4 py-2 overflow-y-auto">
      {/* Cabeçalho sereno + Relógio minimalista */}
      <div className="flex items-start justify-between gap-6">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-slate-200/70 text-[11px] text-slate-500 mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>O conhecimento como uma jornada iluminada</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-[#1E2430]">
            {greeting}, {userName}.
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Não tenha pressa para chegar. Descubra o prazer de avançar.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-4">
          <MinimalClock />
        </div>
      </div>

      {/* Palco central orgânico inspirado na imagem de referência */}
      <div className="relative my-6 flex-1 min-h-[360px] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Esquerda: Card suave de descobertas / próximos passos (estilo lilás da referência) */}
        <div className="lg:col-span-3 flex flex-col gap-4 z-10">
          <div className="rounded-[22px] bg-[#F1DDF4]/90 backdrop-blur-sm border border-purple-200/60 p-5 shadow-[0_14px_30px_-18px_rgba(167,139,250,0.45)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#3B2A4A]">
                Roteiro de descoberta
              </span>
              <Sparkles className="w-3.5 h-3.5 text-purple-600/70" />
            </div>
            <div className="space-y-2.5">
              {gentleSteps.map((step) => (
                <button
                  key={step.label}
                  onClick={step.action}
                  className="w-full flex items-center gap-2.5 text-left text-xs text-[#3B2A4A]/90 hover:text-[#1E2430] transition-colors group"
                >
                  {step.done ? (
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-purple-400 group-hover:text-purple-600 shrink-0" />
                  )}
                  <span className={step.done ? 'line-through opacity-65' : ''}>
                    {step.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {reviewCount > 0 && (
            <button
              onClick={() => onNavigate('reviews')}
              className="rounded-2xl bg-white/85 hover:bg-white border border-slate-200/80 p-4 text-left shadow-xs transition-all group"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-700">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reencontro sereno</span>
              </div>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Que tal revisitar alguns conhecimentos? Há {reviewCount}{' '}
                {reviewCount === 1 ? 'ponto pronto' : 'pontos prontos'} para brilhar de novo.
              </p>
            </button>
          )}
        </div>

        {/* Centro: Prisma Luminoso do Conhecimento + Satélites das Disciplinas */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[320px]">
          {/* Aura suave */}
          <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-sky-200/40 via-violet-200/35 to-amber-100/40 blur-3xl animate-pulse-soft pointer-events-none" />

          {/* Núcleo translúcido rotacionado inspirado no cubo central da referência */}
          <div
            onClick={() => onNavigate('trail')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onNavigate('trail')}
            className="relative w-56 h-56 md:w-64 md:h-64 rounded-[46px] rotate-12 luminous-prism animate-float-slow cursor-pointer flex items-center justify-center transition-transform hover:scale-[1.03]"
            title="Abrir trilha de aprendizagem"
          >
            <div className="-rotate-12 text-center px-6">
              <div className="text-[11px] uppercase tracking-[0.18em] text-[#1E2430]/70 font-semibold">
                Domínio Geral
              </div>
              <div className="font-display text-5xl font-bold text-[#1E2430] mt-1">
                {globalDim.mastery}%
              </div>
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/75 backdrop-blur-md text-[11px] font-medium text-[#1E2430] shadow-xs">
                <Compass className="w-3.5 h-3.5 text-[#2B4C7E]" />
                <span>
                  {activeDiscipline ? activeDiscipline.name : 'Explorar trilhas'}
                </span>
              </div>
            </div>
          </div>

          {/* Satélites flutuantes das disciplinas */}
          {disciplines.slice(0, 3).map((d, idx) => {
            const theme = DISCIPLINE_THEMES[d.theme];
            const dim = calculateDisciplineDimensions(d);
            const positions = [
              'top-2 left-2 md:left-6',
              'top-4 right-2 md:right-6',
              'bottom-2 left-6 md:left-12',
            ];
            return (
              <button
                key={d.id}
                onClick={() => {
                  onSelectDiscipline(d.id);
                  onNavigate('trail');
                }}
                className={`hidden sm:flex absolute ${positions[idx]} items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-[0_10px_24px_-12px_rgba(30,36,48,0.18)] hover:-translate-y-1 transition-all animate-float`}
                style={{ animationDelay: `${idx * 1.4}s` }}
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: theme.dot }}
                />
                <div className="text-left">
                  <div className="text-xs font-semibold text-[#1E2430]">
                    {d.name}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {dim.progress}% trilha · {dim.mastery}% domínio
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Direita: Carta Colecionável em destaque (bloqueada até conquistar, com inspeção 3D) */}
        <div className="lg:col-span-3 flex flex-col items-stretch z-10">
          <div className="relative">
            <div className="absolute -inset-2 rounded-[26px] bg-white/50 border border-slate-200/50 rotate-3 pointer-events-none" />
            <div className="relative">
              <CollectibleCard
                card={featuredCard}
                unlockedAt={featuredUnlock?.unlockedAt}
                disciplineName={featuredUnlock?.disciplineName}
                compact
                onClick={() => setInspectingCard(featuredCard)}
              />
            </div>
          </div>
          <button
            onClick={() => onNavigate('collection')}
            className="mt-3 text-xs text-slate-500 hover:text-[#1E2430] inline-flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Ver galeria de cartas ({unlockedCards.length}/{COLLECTIBLE_CARDS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Barra inferior convidativa para continuar o próximo passo */}
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3 rounded-[22px] bg-white/85 backdrop-blur-md border border-slate-200/75 px-5 py-3.5 shadow-[0_12px_30px_-18px_rgba(30,36,48,0.12)]">
        {activeDiscipline && nextDiscovery ? (
          <>
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-breathe" />
              <div>
                <div className="text-[11px] text-slate-400 font-medium">
                  Próxima descoberta em {activeDiscipline.name}
                </div>
                <div className="text-sm font-semibold text-[#1E2430]">
                  {nextDiscovery.title}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenContent(activeDiscipline.id, nextDiscovery)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1E2430] text-white text-xs font-medium hover:bg-[#2B4C7E] transition-colors"
              >
                <span>Continuar jornada</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigate('trail')}
                className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200/70 transition-colors"
              >
                Ver trilha
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-sm text-slate-600">
              Escolha uma trilha pronta ou desenhe sua própria jornada de aprendizagem.
            </div>
            <button
              onClick={onOpenNewDiscipline}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1E2430] text-white text-xs font-medium hover:bg-[#2B4C7E] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nova disciplina</span>
            </button>
          </>
        )}
      </div>

      {inspectingCard && (
        <Card3DViewer
          card={inspectingCard}
          unlockedAt={
            unlockedCards.find((u) => u.cardId === inspectingCard.id)?.unlockedAt
          }
          disciplineName={
            unlockedCards.find((u) => u.cardId === inspectingCard.id)
              ?.disciplineName
          }
          onClose={() => setInspectingCard(null)}
        />
      )}
    </div>
  );
};

