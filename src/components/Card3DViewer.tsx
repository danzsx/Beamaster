import React, { useState } from 'react';
import { RotateCw, X, Lock, Sparkles } from 'lucide-react';
import { CollectibleCardDef } from '../types/mastery';
import { CardBack, CollectibleCard } from './CardArtwork';

interface Card3DViewerProps {
  card: CollectibleCardDef;
  unlockedAt?: string;
  disciplineName?: string;
  onClose: () => void;
}

export const Card3DViewer: React.FC<Card3DViewerProps> = ({
  card,
  unlockedAt,
  disciplineName,
  onClose,
}) => {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const [flipped, setFlipped] = useState(false);

  const locked = !unlockedAt;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const ry = (x - 0.5) * 32; // -16 a +16 deg
    const rx = -(y - 0.5) * 28; // -14 a +14 deg
    setTilt({
      rx,
      ry,
      gx: Math.round(x * 100),
      gy: Math.round(y * 100),
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E2430]/45 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col items-center gap-5 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra superior de controle */}
        <div className="w-full flex items-center justify-between text-white">
          <div className="flex items-center gap-2 text-xs">
            {locked ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md">
                <Lock className="w-3.5 h-3.5" />
                <span>Carta bloqueada · Visualização 3D</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{card.title} · Inspeção 3D</span>
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors"
            title="Fechar visualização 3D"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Palco 3D */}
        <div
          className="w-[340px] h-[510px] cursor-grab active:cursor-grabbing"
          style={{ perspective: '1200px' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => setFlipped((f) => !f)}
        >
          <div
            className="relative w-full h-full transition-transform duration-300 ease-out"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${tilt.rx}deg) rotateY(${
                tilt.ry + (flipped ? 180 : 0)
              }deg)`,
            }}
          >
            {/* Frente da Carta */}
            <div
              className="absolute inset-0 rounded-[24px] overflow-hidden shadow-[0_30px_70px_-15px_rgba(0,0,0,0.45)]"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="w-full h-full [&>div]:h-full">
                <CollectibleCard
                  card={card}
                  unlockedAt={unlockedAt}
                  disciplineName={disciplineName}
                />
              </div>

              {/* Brilho holográfico seguindo o ponteiro */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                style={{
                  background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.42), transparent 55%)`,
                  mixBlendMode: 'overlay',
                }}
              />
            </div>

            {/* Verso da Carta */}
            <div
              className="absolute inset-0 rounded-[24px] overflow-hidden shadow-[0_30px_70px_-15px_rgba(0,0,0,0.45)]"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <CardBack card={card} />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.22), transparent 55%)`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Controles inferiores */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFlipped((f) => !f)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#1E2430] text-xs font-semibold shadow-lg hover:bg-slate-100 transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>{flipped ? 'Ver frente' : 'Virar carta 3D'}</span>
          </button>
          <span className="text-[11px] text-white/75">
            Mova o cursor para inclinar · Clique na carta para girar
          </span>
        </div>
      </div>
    </div>
  );
};

