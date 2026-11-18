import React from 'react';
import { Lock, Sparkles } from 'lucide-react';
import { CollectibleCardDef } from '../types/mastery';

export const ConceptIllustration: React.FC<{
  artType: CollectibleCardDef['artType'];
  accent: string;
}> = ({ artType, accent }) => {
  return (
    <svg
      viewBox="0 0 240 150"
      className="w-full h-full select-none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`glow-${artType}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.28" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="240" height="150" fill="#F8F8F5" />
      <circle cx="120" cy="75" r="64" fill={`url(#glow-${artType})`} />

      {artType === 'atomo' && (
        <g>
          <ellipse
            cx="120"
            cy="75"
            rx="62"
            ry="22"
            transform="rotate(-28 120 75)"
            fill="none"
            stroke="#1E2430"
            strokeWidth="1.8"
          />
          <ellipse
            cx="120"
            cy="75"
            rx="62"
            ry="22"
            transform="rotate(28 120 75)"
            fill="none"
            stroke={accent}
            strokeWidth="2"
          />
          <ellipse
            cx="120"
            cy="75"
            rx="62"
            ry="22"
            transform="rotate(90 120 75)"
            fill="none"
            stroke="#1E2430"
            strokeOpacity="0.35"
            strokeWidth="1.4"
          />
          <circle cx="120" cy="75" r="11" fill={accent} />
          <circle cx="116" cy="71" r="3" fill="#FFFFFF" opacity="0.85" />
          <circle cx="166" cy="50" r="4" fill="#1E2430" />
          <circle cx="72" cy="98" r="4" fill={accent} />
          <circle cx="120" cy="14" r="3.5" fill="#1E2430" />
        </g>
      )}

      {artType === 'organica' && (
        <g>
          {/* Anel benzênico com ressonância */}
          <polygon
            points="120,24 164,49 164,101 120,126 76,101 76,49"
            fill={accent}
            fillOpacity="0.14"
            stroke="#1E2430"
            strokeWidth="2.4"
          />
          <circle
            cx="120"
            cy="75"
            r="26"
            fill="none"
            stroke={accent}
            strokeWidth="2.2"
            strokeDasharray="6 4"
          />
          {/* Ligações externas C-H */}
          <line x1="120" y1="24" x2="120" y2="10" stroke="#1E2430" strokeWidth="1.8" />
          <line x1="164" y1="49" x2="177" y2="41" stroke="#1E2430" strokeWidth="1.8" />
          <line x1="164" y1="101" x2="177" y2="109" stroke="#1E2430" strokeWidth="1.8" />
          <line x1="120" y1="126" x2="120" y2="140" stroke="#1E2430" strokeWidth="1.8" />
          <line x1="76" y1="101" x2="63" y2="109" stroke="#1E2430" strokeWidth="1.8" />
          <line x1="76" y1="49" x2="63" y2="41" stroke="#1E2430" strokeWidth="1.8" />
          <circle cx="120" cy="24" r="4" fill={accent} stroke="#1E2430" strokeWidth="1.4" />
          <circle cx="164" cy="101" r="4" fill={accent} stroke="#1E2430" strokeWidth="1.4" />
          <circle cx="76" cy="101" r="4" fill={accent} stroke="#1E2430" strokeWidth="1.4" />
        </g>
      )}
    </svg>
  );
};

interface CollectibleCardProps {
  card: CollectibleCardDef;
  unlockedAt?: string;
  disciplineName?: string;
  compact?: boolean;
  onClick?: () => void;
}

export const CollectibleCard: React.FC<CollectibleCardProps> = ({
  card,
  unlockedAt,
  disciplineName,
  compact = false,
  onClick,
}) => {
  const locked = !unlockedAt;
  const formattedDate = unlockedAt
    ? new Date(unlockedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : null;

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`relative rounded-[24px] bg-white border border-slate-200/90 shadow-[0_16px_38px_-18px_rgba(30,36,48,0.16)] flex flex-col justify-between overflow-hidden select-none ${
        compact ? 'p-4' : 'p-5'
      } ${onClick ? 'cursor-pointer card-depth' : ''}`}
    >
      {/* Moldura interna estilo Pokémon editorial */}
      <div className="flex items-center justify-between text-[10px] tracking-[0.14em] uppercase font-semibold text-slate-400">
        <span>{card.category}</span>
        <span className="font-mono text-slate-500">Nº {card.number}</span>
      </div>

      {/* Linha de título + HP / Símbolo atômico estilo Pokémon */}
      <div className="mt-1.5 flex items-baseline justify-between gap-2">
        <h3
          className={`font-display font-bold text-[#1E2430] tracking-tight truncate ${
            compact ? 'text-base' : 'text-lg'
          }`}
        >
          {locked ? 'Carta Bloqueada' : card.title}
        </h3>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="font-mono text-[11px] font-semibold text-slate-600">
            {card.hpLabel}
          </span>
          <span
            className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border"
            style={{
              backgroundColor: `${card.accent}18`,
              borderColor: `${card.accent}45`,
              color: '#1E2430',
            }}
          >
            {card.elementTag}
          </span>
        </div>
      </div>

      {/* Janela de Ilustração (Retrato Histórico Real ou Diagrama Científico) */}
      <div
        className={`relative mt-2.5 rounded-2xl overflow-hidden border border-slate-200/80 bg-[#F4F3EE] ${
          compact ? 'h-36' : 'h-48'
        }`}
      >
        {locked ? (
          /* Estado Bloqueado — inclusive na pré-visualização */
          <div className="w-full h-full relative flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-slate-100 via-[#F4F3EE] to-slate-200/70">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(30,36,48,0.22) 1px, transparent 1px)',
                backgroundSize: '14px 14px',
              }}
            />
            <div className="relative w-12 h-12 rounded-2xl bg-white/90 border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 mb-2">
              <Lock className="w-5 h-5" />
            </div>
            <span className="relative text-[11px] font-semibold text-slate-600">
              Descoberta ainda bloqueada
            </span>
            <span className="relative text-[10px] text-slate-400 mt-0.5 line-clamp-2 max-w-[200px]">
              {card.conditionLabel}
            </span>
          </div>
        ) : card.imageUrl ? (
          <>
            <img
              src={card.imageUrl}
              alt={card.title}
              className="w-full h-full object-cover object-top grayscale-[15%] contrast-[1.06] sepia-[10%]"
            />
            {/* Edição gráfica sutil sobre a imagem real: vinheta suave e marca orbital */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(180deg, transparent 55%, rgba(30,36,48,0.28) 100%), radial-gradient(circle at 85% 18%, ${card.accent}35, transparent 45%)`,
              }}
            />
            <span className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded-md bg-white/85 backdrop-blur-sm text-[10px] font-mono font-medium text-[#1E2430]">
              {card.era}
            </span>
          </>
        ) : (
          <ConceptIllustration artType={card.artType} accent={card.accent} />
        )}
      </div>

      {/* Legenda técnica estilo Pokémon */}
      <div className="mt-1.5 px-2 py-1 rounded-lg bg-slate-50 border border-slate-100 text-[10px] text-slate-500 truncate">
        {locked ? 'Clique para visualizar em 3D' : card.caption}
      </div>

      {/* Habilidades / Conceitos de Química estilo Pokémon */}
      {!compact && (
        <div className="mt-3 space-y-2.5 flex-1">
          {locked ? (
            <div className="rounded-xl bg-slate-50/80 border border-dashed border-slate-200 p-3 text-center">
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Avance na trilha de <strong>Química</strong> para revelar este retrato histórico e seus conceitos-chave.
              </p>
            </div>
          ) : (
            card.concepts.map((concept) => (
              <div
                key={concept.name}
                className="rounded-xl bg-[#FAF9F6] border border-slate-200/60 px-3 py-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display font-semibold text-xs text-[#1E2430]">
                    {concept.name}
                  </span>
                  <span
                    className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: `${card.accent}20`,
                      color: '#1E2430',
                    }}
                  >
                    {concept.tag}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                  {concept.description}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Rodapé em duas colunas mantendo a direção de design */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 grid grid-cols-2 gap-2 text-[10px]">
        <div>
          <span className="block font-semibold text-slate-700">
            {locked ? 'Requisito:' : 'Foco:'}
          </span>
          <span className="text-slate-500 leading-snug block truncate">
            {locked ? card.conditionLabel : card.goodFor}
          </span>
        </div>
        <div>
          <span className="block font-semibold text-slate-700">
            {formattedDate ? 'Conquistada:' : 'Raridade:'}
          </span>
          <span className="text-slate-500 leading-snug block truncate">
            {formattedDate
              ? `${formattedDate}${disciplineName ? ` · ${disciplineName}` : ''}`
              : card.rarity}
          </span>
        </div>
      </div>
    </div>
  );
};

export const CardBack: React.FC<{ card: CollectibleCardDef }> = ({ card }) => {
  return (
    <div className="w-full h-full rounded-[24px] bg-[#1E2430] border-2 border-white/20 p-6 flex flex-col items-center justify-between text-white shadow-2xl select-none relative overflow-hidden">
      {/* Brilho sutil */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 45%, ${card.accent}, transparent 65%)`,
        }}
      />

      <div className="relative w-full flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-white/55 uppercase">
        <span>BE A MASTER</span>
        <span>Nº {card.number}</span>
      </div>

      {/* Emblema orbital central */}
      <div className="relative flex flex-col items-center justify-center my-auto">
        <div className="relative w-40 h-40 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-white/15 animate-spin" style={{ animationDuration: '28s' }} />
          <div className="absolute inset-4 rounded-full border border-dashed border-sky-300/35" />
          <div className="w-16 h-16 rounded-2xl rotate-12 luminous-prism flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white -rotate-12" />
          </div>
        </div>
        <div className="mt-4 font-display text-lg font-semibold tracking-wide text-white/95">
          {card.category}
        </div>
        <div className="text-[11px] text-white/55 mt-1">
          O conhecimento como jornada iluminada
        </div>
      </div>

      <div className="relative w-full text-center text-[10px] text-white/45 font-mono">
        ED. QUÍMICA HISTÓRICA
      </div>
    </div>
  );
};
