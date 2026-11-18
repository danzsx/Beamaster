import React, { useState } from 'react';
import {
  Check,
  Compass,
  Edit3,
  Plus,
  RefreshCw,
  Sparkles,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
} from 'lucide-react';
import { ContentNode, ContentStatus, Discipline } from '../types/mastery';
import {
  calculateContentMastery,
  calculateDisciplineDimensions,
  findNextDiscovery,
  getGentleGuidance,
} from '../utils/masteryCalc';
import { DISCIPLINE_THEMES } from '../utils/themes';
import { DimensionMeters } from './DimensionMeters';
import { defaultChecklist, uid } from '../data/prebuiltTrails';

interface TrailViewProps {
  discipline: Discipline;
  onOpenContent: (content: ContentNode) => void;
  onUpdateDiscipline: (updated: Discipline) => void;
}

export const TrailView: React.FC<TrailViewProps> = ({
  discipline,
  onOpenContent,
  onUpdateDiscipline,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'todos' | ContentStatus>('todos');
  const [newLevelTitle, setNewLevelTitle] = useState('');
  const [addingContentTo, setAddingContentTo] = useState<{
    levelId: string;
    moduleId: string;
  } | null>(null);
  const [newContentTitle, setNewContentTitle] = useState('');
  const [newContentDesc, setNewContentDesc] = useState('');

  const theme = DISCIPLINE_THEMES[discipline.theme];
  const dimensions = calculateDisciplineDimensions(discipline);
  const nextNode = findNextDiscovery(discipline);
  const guidance = getGentleGuidance(dimensions);

  const handleAddLevel = () => {
    if (!newLevelTitle.trim()) return;
    const nextNum = discipline.levels.length + 1;
    const updated: Discipline = {
      ...discipline,
      levels: [
        ...discipline.levels,
        {
          id: uid('lvl'),
          title: `Nível ${nextNum} — ${newLevelTitle.trim()}`,
          subtitle: 'Nova etapa da sua jornada',
          landscapeName: `Horizonte ${nextNum}`,
          modules: [
            {
              id: uid('mod'),
              title: 'Módulo Principal',
              contents: [],
            },
          ],
        },
      ],
    };
    onUpdateDiscipline(updated);
    setNewLevelTitle('');
  };

  const handleAddContent = (levelId: string, moduleId: string) => {
    if (!newContentTitle.trim()) return;
    const newNode: ContentNode = {
      id: uid('cnt'),
      title: newContentTitle.trim(),
      description:
        newContentDesc.trim() ||
        'Novo ponto de descoberta nesta trilha de aprendizagem.',
      status: 'nao_iniciado',
      difficulty: 2,
      checklist: defaultChecklist(),
      exercisesDone: 0,
      exercisesCorrect: 0,
      notes: '',
      difficulties: '',
      markedForReview: false,
      reviewCount: 0,
      history: [],
    };
    const updated: Discipline = {
      ...discipline,
      levels: discipline.levels.map((lvl) =>
        lvl.id !== levelId
          ? lvl
          : {
              ...lvl,
              modules: lvl.modules.map((mod) =>
                mod.id !== moduleId
                  ? mod
                  : { ...mod, contents: [...mod.contents, newNode] }
              ),
            }
      ),
    };
    onUpdateDiscipline(updated);
    setNewContentTitle('');
    setNewContentDesc('');
    setAddingContentTo(null);
  };

  const handleMoveContent = (
    levelId: string,
    moduleId: string,
    index: number,
    dir: -1 | 1
  ) => {
    const updated: Discipline = {
      ...discipline,
      levels: discipline.levels.map((lvl) => {
        if (lvl.id !== levelId) return lvl;
        return {
          ...lvl,
          modules: lvl.modules.map((mod) => {
            if (mod.id !== moduleId) return mod;
            const target = index + dir;
            if (target < 0 || target >= mod.contents.length) return mod;
            const copy = [...mod.contents];
            const [item] = copy.splice(index, 1);
            copy.splice(target, 0, item);
            return { ...mod, contents: copy };
          }),
        };
      }),
    };
    onUpdateDiscipline(updated);
  };

  const handleDeleteContent = (
    levelId: string,
    moduleId: string,
    contentId: string
  ) => {
    const updated: Discipline = {
      ...discipline,
      levels: discipline.levels.map((lvl) =>
        lvl.id !== levelId
          ? lvl
          : {
              ...lvl,
              modules: lvl.modules.map((mod) =>
                mod.id !== moduleId
                  ? mod
                  : {
                      ...mod,
                      contents: mod.contents.filter((c) => c.id !== contentId),
                    }
              ),
            }
      ),
    };
    onUpdateDiscipline(updated);
  };

  const handleDeleteLevel = (levelId: string) => {
    onUpdateDiscipline({
      ...discipline,
      levels: discipline.levels.filter((l) => l.id !== levelId),
    });
  };

  // Posições horizontais sinuosas (em %) para criar um caminho orgânico
  const sinuousOffsets = [0, 18, 28, 14, -12, -26, -16, 4];

  return (
    <div className="h-full overflow-y-auto px-4 py-2 space-y-6">
      {/* Cabeçalho da disciplina */}
      <div className="rounded-[26px] bg-white/90 backdrop-blur-md border border-slate-200/75 p-6 shadow-[0_14px_34px_-20px_rgba(30,36,48,0.12)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5 mb-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: theme.dot }}
              />
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Trilha de Aprendizagem
              </span>
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-semibold text-[#1E2430] tracking-tight">
              {discipline.name}
            </h1>
            <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
              {discipline.description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {nextNode && !editMode && (
              <button
                onClick={() => onOpenContent(nextNode)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1E2430] text-white text-xs font-medium hover:bg-[#2B4C7E] transition-colors shadow-xs"
              >
                <Compass className="w-4 h-4" />
                <span>Próxima descoberta: {nextNode.title}</span>
              </button>
            )}
            <button
              onClick={() => setEditMode((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors ${
                editMode
                  ? 'bg-violet-50 border-violet-200 text-violet-800'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {editMode ? (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Visualizar jornada</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Personalizar trilha</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Três dimensões separadas */}
        <div className="mt-5">
          <DimensionMeters dimensions={dimensions} />
        </div>

        {/* Orientação acolhedora */}
        <div className="mt-4 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#F6F6F3]/90 border border-slate-200/60 text-xs text-slate-600">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <span>{guidance}</span>
        </div>

        {/* Filtro rápido por status */}
        {!editMode && (
          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            {(
              [
                { id: 'todos', label: 'Todos' },
                { id: 'nao_iniciado', label: 'Por descobrir' },
                { id: 'em_andamento', label: 'Em andamento' },
                { id: 'revisao', label: 'Revisão' },
                { id: 'concluido', label: 'Iluminados' },
              ] as const
            ).map((f) => {
              const active = statusFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setStatusFilter(f.id)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors ${
                    active
                      ? 'bg-[#1E2430] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Paisagens e Caminho Sinuoso por Nível */}
      <div className="space-y-8 pb-10">
        {discipline.levels.map((level, lvlIdx) => {
          const allLevelContents = level.modules.flatMap((m) => m.contents);
          const completedInLevel = allLevelContents.filter(
            (c) => c.status === 'concluido'
          ).length;
          const levelIlluminated =
            allLevelContents.length > 0 &&
            completedInLevel === allLevelContents.length;

          return (
            <section
              key={level.id}
              className={`relative rounded-[28px] border border-slate-200/75 p-6 md:p-8 overflow-hidden transition-all ${
                levelIlluminated
                  ? `bg-gradient-to-br ${theme.gradient}`
                  : 'bg-white/80 backdrop-blur-sm'
              }`}
            >
              {/* Partículas luminosas sutis de fundo */}
              <div
                className="absolute -top-12 -right-12 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-45"
                style={{ backgroundColor: theme.glow }}
              />

              {/* Cabeçalho da região/nível */}
              <div className="relative flex flex-wrap items-center justify-between gap-3 mb-8">
                <div>
                  <span className="inline-block text-[10px] uppercase tracking-[0.18em] font-semibold text-slate-400">
                    {level.landscapeName || `Região ${lvlIdx + 1}`}
                  </span>
                  <h2 className="font-display text-xl font-semibold text-[#1E2430] mt-0.5">
                    {level.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {level.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/85 border border-slate-200/80 text-slate-600">
                    {completedInLevel}/{allLevelContents.length} iluminados
                  </span>
                  {editMode && (
                    <button
                      onClick={() => handleDeleteLevel(level.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Remover nível"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Módulos e trilha sinuosa */}
              <div className="space-y-10 relative">
                {level.modules.map((mod) => (
                  <div key={mod.id} className="relative">
                    {level.modules.length > 1 && (
                      <div className="text-xs font-semibold text-slate-500 mb-4 text-center">
                        {mod.title}
                      </div>
                    )}

                    {/* Caminho Sinuoso */}
                    <div className="relative max-w-2xl mx-auto flex flex-col items-center gap-6">
                      {(editMode || statusFilter === 'todos'
                        ? mod.contents
                        : mod.contents.filter((c) =>
                            statusFilter === 'revisao'
                              ? c.status === 'revisao' || c.markedForReview
                              : c.status === statusFilter
                          )
                      ).map((node, idx, visibleContents) => {
                        const offsetPercent =
                          sinuousOffsets[idx % sinuousOffsets.length];
                        const isNext = nextNode?.id === node.id;
                        const isDone = node.status === 'concluido';
                        const isInProgress = node.status === 'em_andamento';
                        const isReview =
                          node.status === 'revisao' || node.markedForReview;
                        const isFuture =
                          !isDone && !isInProgress && !isNext && !isReview;
                        const cm = calculateContentMastery(node);

                        return (
                          <div
                            key={node.id}
                            className="relative w-full flex flex-col items-center"
                          >
                            {/* Linha curva orgânica conectando ao próximo ponto */}
                            {idx < visibleContents.length - 1 && (
                              <svg
                                viewBox="0 0 200 44"
                                className="w-48 h-10 -mb-6 mt-1 pointer-events-none overflow-visible"
                                style={{
                                  transform: `translateX(${offsetPercent * 1.4}px)`,
                                }}
                              >
                                <path
                                  d={`M 100 0 C 100 22, ${
                                    100 +
                                    (sinuousOffsets[(idx + 1) % sinuousOffsets.length] -
                                      offsetPercent) *
                                      1.8
                                  } 22, ${
                                    100 +
                                    (sinuousOffsets[(idx + 1) % sinuousOffsets.length] -
                                      offsetPercent) *
                                      1.8
                                  } 44`}
                                  fill="none"
                                  stroke={
                                    isDone ? theme.dot : 'rgba(148, 163, 184, 0.35)'
                                  }
                                  strokeWidth={isDone ? '2.5' : '2'}
                                  strokeDasharray={isDone ? undefined : '5 5'}
                                  strokeLinecap="round"
                                />
                              </svg>
                            )}

                            {/* Nó da Trilha */}
                            <div
                              className="relative flex items-center gap-4 transition-all duration-300"
                              style={{
                                transform: editMode
                                  ? 'none'
                                  : `translateX(${offsetPercent * 2.2}px)`,
                              }}
                            >
                              <button
                                onClick={() => onOpenContent(node)}
                                className={`group relative flex items-center gap-4 text-left rounded-[22px] px-4 py-3.5 transition-all min-w-[280px] max-w-[360px] ${
                                  isDone
                                    ? 'bg-white border border-emerald-200/90 shadow-[0_12px_28px_-14px_rgba(74,222,128,0.45)]'
                                    : isInProgress
                                    ? 'bg-white border-2 border-sky-300 shadow-[0_14px_30px_-14px_rgba(96,165,250,0.45)]'
                                    : isNext
                                    ? 'bg-white border border-violet-300/90 shadow-[0_10px_26px_-14px_rgba(167,139,250,0.35)]'
                                    : isReview
                                    ? 'bg-white border border-amber-200 shadow-[0_12px_26px_-14px_rgba(229,185,92,0.4)]'
                                    : 'bg-white/60 border border-slate-200/70 opacity-75 hover:opacity-100 hover:bg-white'
                                }`}
                              >
                                {/* Ponto de luz */}
                                <div
                                  className={`relative w-11 h-11 rounded-full shrink-0 flex items-center justify-center transition-transform group-hover:scale-105 ${
                                    isDone
                                      ? 'bg-gradient-to-br from-emerald-200 to-amber-100 text-emerald-800 shadow-[0_0_20px_rgba(134,239,172,0.7)]'
                                      : isInProgress
                                      ? 'bg-gradient-to-br from-sky-200 to-violet-200 text-[#2B4C7E] animate-breathe shadow-[0_0_22px_rgba(147,197,253,0.75)]'
                                      : isReview
                                      ? 'bg-amber-100 text-amber-700 shadow-[0_0_18px_rgba(229,185,92,0.55)]'
                                      : isNext
                                      ? 'bg-violet-50 text-violet-700 border border-violet-200'
                                      : 'bg-slate-100 text-slate-400'
                                  }`}
                                >
                                  {isDone ? (
                                    <Check className="w-5 h-5" />
                                  ) : isReview ? (
                                    <RefreshCw className="w-4 h-4" />
                                  ) : isInProgress ? (
                                    <span className="w-3 h-3 rounded-full bg-[#2B4C7E]" />
                                  ) : isNext ? (
                                    <Sparkles className="w-4 h-4" />
                                  ) : (
                                    <span className="w-2 h-2 rounded-full bg-slate-300" />
                                  )}
                                </div>

                                {/* Informações do conteúdo */}
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                                      {isDone
                                        ? 'Iluminado'
                                        : isReview
                                        ? 'Reencontro'
                                        : isInProgress
                                        ? 'Em andamento'
                                        : isNext
                                        ? 'Próxima descoberta'
                                        : 'Por descobrir'}
                                    </span>
                                    {node.editalRef && (
                                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/70">
                                        {node.editalRef}
                                      </span>
                                    )}
                                    {cm.mastery > 0 && (
                                      <span className="text-[10px] font-mono text-slate-500">
                                        {cm.mastery}% domínio
                                      </span>
                                    )}
                                  </div>
                                  <div className="font-display font-semibold text-sm text-[#1E2430] truncate">
                                    {node.title}
                                  </div>
                                  {!isFuture && (
                                    <div className="text-[11px] text-slate-500 truncate mt-0.5">
                                      {node.description}
                                    </div>
                                  )}
                                </div>
                              </button>

                              {/* Controles de edição da trilha */}
                              {editMode && (
                                <div className="flex items-center gap-1 bg-white rounded-xl border border-slate-200 p-1 shadow-xs">
                                  <button
                                    onClick={() =>
                                      handleMoveContent(level.id, mod.id, idx, -1)
                                    }
                                    disabled={idx === 0}
                                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30"
                                    title="Mover para cima"
                                  >
                                    <ArrowUp className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleMoveContent(level.id, mod.id, idx, 1)
                                    }
                                    disabled={idx === mod.contents.length - 1}
                                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30"
                                    title="Mover para baixo"
                                  >
                                    <ArrowDown className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteContent(level.id, mod.id, node.id)
                                    }
                                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
                                    title="Remover conteúdo"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}

                      {/* Adicionar novo conteúdo ao módulo no modo edição */}
                      {editMode && (
                        <div className="w-full max-w-md pt-2">
                          {addingContentTo?.levelId === level.id &&
                          addingContentTo?.moduleId === mod.id ? (
                            <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-2.5 shadow-sm">
                              <input
                                type="text"
                                value={newContentTitle}
                                onChange={(e) => setNewContentTitle(e.target.value)}
                                placeholder="Título do novo conteúdo..."
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-400"
                              />
                              <input
                                type="text"
                                value={newContentDesc}
                                onChange={(e) => setNewContentDesc(e.target.value)}
                                placeholder="Breve descrição (opcional)..."
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-400"
                              />
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => setAddingContentTo(null)}
                                  className="px-3 py-1.5 rounded-lg text-xs text-slate-500 hover:bg-slate-100"
                                >
                                  Cancelar
                                </button>
                                <button
                                  onClick={() =>
                                    handleAddContent(level.id, mod.id)
                                  }
                                  className="px-3 py-1.5 rounded-lg text-xs bg-[#1E2430] text-white font-medium"
                                >
                                  Adicionar ponto
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() =>
                                setAddingContentTo({
                                  levelId: level.id,
                                  moduleId: mod.id,
                                })
                              }
                              className="w-full py-2.5 rounded-2xl border border-dashed border-slate-300 text-xs font-medium text-slate-500 hover:text-[#1E2430] hover:border-slate-400 flex items-center justify-center gap-1.5 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Adicionar conteúdo neste nível</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* Adicionar novo nível no modo edição */}
        {editMode && (
          <div className="rounded-[24px] bg-white/90 border border-dashed border-slate-300 p-5 flex flex-wrap items-center gap-3">
            <input
              type="text"
              value={newLevelTitle}
              onChange={(e) => setNewLevelTitle(e.target.value)}
              placeholder="Nome do novo nível (ex: Cálculo Introdutório)..."
              className="flex-1 min-w-[220px] px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-400"
            />
            <button
              onClick={handleAddLevel}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1E2430] text-white text-xs font-medium hover:bg-[#2B4C7E] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar nível</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

