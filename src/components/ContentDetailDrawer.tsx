import React, { useState } from 'react';
import {
  Check,
  CheckCircle2,
  Circle,
  Clock,
  Plus,
  RefreshCw,
  Send,
  Sparkles,
  X,
} from 'lucide-react';
import { ContentNode, ContentStatus, Discipline } from '../types/mastery';
import { calculateContentMastery } from '../utils/masteryCalc';
import { uid } from '../data/prebuiltTrails';

interface ContentDetailDrawerProps {
  discipline: Discipline;
  content: ContentNode;
  onClose: () => void;
  onSaveContent: (updated: ContentNode) => void;
}

export const ContentDetailDrawer: React.FC<ContentDetailDrawerProps> = ({
  discipline,
  content,
  onClose,
  onSaveContent,
}) => {
  const [addDone, setAddDone] = useState('5');
  const [addCorrect, setAddCorrect] = useState('4');
  const [newStepLabel, setNewStepLabel] = useState('');
  const [cicloSentMsg, setCicloSentMsg] = useState<string | null>(null);

  const cm = calculateContentMastery(content);

  const updateWithHistory = (
    patch: Partial<ContentNode>,
    historyType: 'inicio' | 'exercicio' | 'conclusao' | 'revisao' | 'nota',
    summary: string,
    extra?: { exercisesDone?: number; exercisesCorrect?: number }
  ) => {
    const now = new Date().toISOString();
    onSaveContent({
      ...content,
      ...patch,
      lastStudiedAt: now,
      history: [
        {
          id: uid('hist'),
          date: now,
          type: historyType,
          summary,
          ...extra,
        },
        ...content.history,
      ],
    });
  };

  const handleStatusChange = (status: ContentStatus) => {
    const now = new Date().toISOString();
    if (status === 'em_andamento') {
      updateWithHistory({ status }, 'inicio', 'Exploração iniciada.');
    } else if (status === 'concluido') {
      updateWithHistory(
        {
          status: 'concluido',
          markedForReview: false,
          completedAt: content.completedAt || now,
        },
        'conclusao',
        'Etapa concluída e iluminada na trilha.'
      );
    } else if (status === 'revisao') {
      updateWithHistory(
        { status: 'revisao', markedForReview: true },
        'revisao',
        'Marcado para um reencontro tranquilo.'
      );
    } else {
      onSaveContent({ ...content, status: 'nao_iniciado' });
    }
  };

  const handleCompleteReview = () => {
    updateWithHistory(
      {
        status: 'concluido',
        markedForReview: false,
        reviewCount: content.reviewCount + 1,
      },
      'revisao',
      `Reencontro concluído (${content.reviewCount + 1}ª revisão consolidada).`
    );
  };

  const handleToggleChecklist = (itemId: string) => {
    const nextChecklist = content.checklist.map((item) =>
      item.id === itemId ? { ...item, done: !item.done } : item
    );
    const nextStatus =
      content.status === 'nao_iniciado' ? 'em_andamento' : content.status;
    onSaveContent({
      ...content,
      status: nextStatus,
      checklist: nextChecklist,
      lastStudiedAt: new Date().toISOString(),
    });
  };

  const handleAddChecklistStep = () => {
    if (!newStepLabel.trim()) return;
    onSaveContent({
      ...content,
      checklist: [
        ...content.checklist,
        { id: uid('chk'), label: newStepLabel.trim(), done: false },
      ],
    });
    setNewStepLabel('');
  };

  const handleLogExercises = (e: React.FormEvent) => {
    e.preventDefault();
    const d = Math.max(0, parseInt(addDone, 10) || 0);
    const c = Math.min(d, Math.max(0, parseInt(addCorrect, 10) || 0));
    if (d === 0) return;

    const nextStatus =
      content.status === 'nao_iniciado' ? 'em_andamento' : content.status;
    updateWithHistory(
      {
        status: nextStatus,
        exercisesDone: content.exercisesDone + d,
        exercisesCorrect: content.exercisesCorrect + c,
      },
      'exercicio',
      `Prática registrada: ${c} de ${d} acertos.`,
      { exercisesDone: d, exercisesCorrect: c }
    );
  };

  const handleSendToCiclo = async () => {
    const payload = {
      source: 'be-a-master',
      exportedAt: new Date().toISOString(),
      discipline: discipline.name,
      contentTitle: content.title,
      status: content.status,
      suggestedFocus:
        cm.performance !== null && cm.performance < 70
          ? 'pratica_e_revisao'
          : 'avanco_na_trilha',
      currentMastery: cm.mastery,
    };
    try {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      setCicloSentMsg(
        'Pacote de estudo copiado! Pronto para integrar ao seu Ciclo de Estudos.'
      );
      setTimeout(() => setCicloSentMsg(null), 4000);
    } catch {
      setCicloSentMsg('Dados preparados para envio ao Ciclo de Estudos.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#1E2430]/20 backdrop-blur-[2px]">
      <div className="w-full max-w-2xl h-full bg-[#FAF9F6] shadow-2xl border-l border-slate-200/80 flex flex-col overflow-hidden">
        {/* Topo */}
        <div className="px-6 py-5 bg-white border-b border-slate-200/70 flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
              {discipline.name}
            </div>
            <h2 className="font-display text-2xl font-semibold text-[#1E2430] mt-0.5">
              {content.title}
            </h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {content.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-[#1E2430] hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo rolável */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status e Dimensões */}
          <div className="rounded-2xl bg-white border border-slate-200/75 p-4 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-medium text-slate-500">
                Estado na trilha
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(
                  [
                    ['nao_iniciado', 'Por descobrir'],
                    ['em_andamento', 'Em andamento'],
                    ['concluido', 'Iluminado'],
                    ['revisao', 'Revisão'],
                  ] as [ContentStatus, string][]
                ).map(([st, label]) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      content.status === st
                        ? 'bg-[#1E2430] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {(content.status === 'revisao' || content.markedForReview) && (
              <div className="flex items-center justify-between gap-3 rounded-xl bg-amber-50/90 border border-amber-200/70 px-4 py-3">
                <div className="text-xs text-amber-900">
                  Este conteúdo está iluminado para um reencontro tranquilo.
                </div>
                <button
                  onClick={handleCompleteReview}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-medium hover:bg-amber-700 transition-colors shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Concluir reencontro</span>
                </button>
              </div>
            )}

            {/* Três indicadores do conteúdo */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-100">
              <div className="rounded-xl bg-slate-50 p-3">
                <div className="text-[11px] text-slate-500">Progresso</div>
                <div className="font-display text-lg font-semibold text-[#1E2430]">
                  {cm.progress}%
                </div>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <div className="text-[11px] text-slate-500">Desempenho</div>
                <div className="font-display text-lg font-semibold text-[#1E2430]">
                  {cm.performance !== null ? `${cm.performance}%` : '—'}
                </div>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <div className="text-[11px] text-slate-500">Domínio</div>
                <div className="font-display text-lg font-semibold text-[#2B4C7E]">
                  {cm.mastery}%
                </div>
              </div>
            </div>
          </div>

          {/* Checklist de Aprendizagem */}
          <div className="rounded-2xl bg-white border border-slate-200/75 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold text-sm text-[#1E2430]">
                Etapas de aprendizagem
              </h3>
              <span className="text-[11px] text-slate-400">
                {content.checklist.filter((c) => c.done).length}/
                {content.checklist.length} concluídas
              </span>
            </div>

            <div className="space-y-2">
              {content.checklist.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleToggleChecklist(item.id)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 text-left transition-colors"
                >
                  {item.done ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                  )}
                  <span
                    className={`text-xs ${
                      item.done
                        ? 'line-through text-slate-400'
                        : 'text-slate-700'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={newStepLabel}
                onChange={(e) => setNewStepLabel(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddChecklistStep()}
                placeholder="Adicionar etapa personalizada..."
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-400"
              />
              <button
                onClick={handleAddChecklistStep}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar</span>
              </button>
            </div>
          </div>

          {/* Registro Rápido de Exercícios */}
          <div className="rounded-2xl bg-white border border-slate-200/75 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-semibold text-sm text-[#1E2430]">
                  Prática & Exercícios
                </h3>
                <p className="text-[11px] text-slate-500">
                  Total registrado: {content.exercisesCorrect} acertos em{' '}
                  {content.exercisesDone} exercícios
                </p>
              </div>
              {cm.performance !== null && (
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                  {cm.performance}% aproveitamento
                </span>
              )}
            </div>

            <form
              onSubmit={handleLogExercises}
              className="flex flex-wrap items-end gap-3"
            >
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">
                  Realizados agora
                </label>
                <input
                  type="number"
                  min={1}
                  value={addDone}
                  onChange={(e) => setAddDone(e.target.value)}
                  className="w-24 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-400"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">
                  Acertos
                </label>
                <input
                  type="number"
                  min={0}
                  value={addCorrect}
                  onChange={(e) => setAddCorrect(e.target.value)}
                  className="w-24 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-400"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#1E2430] text-white text-xs font-medium hover:bg-[#2B4C7E] transition-colors inline-flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Registrar prática</span>
              </button>
            </form>
          </div>

          {/* Anotações e Pontos de Atenção */}
          <div className="rounded-2xl bg-white border border-slate-200/75 p-5 space-y-4">
            <div>
              <label className="block font-display font-semibold text-sm text-[#1E2430] mb-1.5">
                Anotações e descobertas
              </label>
              <textarea
                rows={3}
                value={content.notes}
                onChange={(e) =>
                  onSaveContent({ ...content, notes: e.target.value })
                }
                placeholder="Ideias-chave, insights, exemplos que fizeram sentido para você..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs leading-relaxed focus:outline-none focus:border-sky-400"
              />
            </div>

            <div>
              <label className="block font-display font-semibold text-sm text-[#1E2430] mb-1">
                Pontos que merecem um olhar mais calmo
              </label>
              <p className="text-[11px] text-slate-400 mb-1.5">
                Dificuldades fazem parte natural da jornada. Anote aqui para revisitar sem pressa.
              </p>
              <textarea
                rows={2}
                value={content.difficulties}
                onChange={(e) =>
                  onSaveContent({ ...content, difficulties: e.target.value })
                }
                placeholder="Ex: Preciso praticar mais quando há frações no denominador..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs leading-relaxed focus:outline-none focus:border-violet-400"
              />
            </div>
          </div>

          {/* Integração futura com Ciclo de Estudos */}
          <div className="rounded-2xl bg-gradient-to-r from-sky-50/90 to-violet-50/90 border border-sky-200/60 p-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2B4C7E]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Integração com Ciclo de Estudos</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                {cicloSentMsg ||
                  'Leve este conteúdo para organizar quando estudá-lo no seu Ciclo de Estudos.'}
              </p>
            </div>
            <button
              onClick={handleSendToCiclo}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-[#1E2430] hover:bg-slate-50 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Enviar para o Ciclo</span>
            </button>
          </div>

          {/* Histórico de Evolução */}
          <div className="rounded-2xl bg-white border border-slate-200/75 p-5">
            <h3 className="font-display font-semibold text-sm text-[#1E2430] mb-3">
              Histórico de evolução
            </h3>
            {content.history.length === 0 ? (
              <p className="text-xs text-slate-400">
                Seus passos neste conteúdo aparecerão aqui com serenidade.
              </p>
            ) : (
              <div className="space-y-3">
                {content.history.map((h) => (
                  <div
                    key={h.id}
                    className="flex items-start gap-3 text-xs border-l-2 border-sky-200 pl-3"
                  >
                    <Clock className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-slate-700">{h.summary}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {new Date(h.date).toLocaleString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

