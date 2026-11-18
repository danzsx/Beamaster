import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Eye,
  Plus,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react';
import {
  Discipline,
  DisciplineThemeId,
  PrebuiltTrailTemplate,
} from '../types/mastery';
import {
  PREBUILT_TRAILS,
  instantiateTrailTemplate,
  uid,
} from '../data/prebuiltTrails';
import { calculateDisciplineDimensions } from '../utils/masteryCalc';
import { DISCIPLINE_THEMES } from '../utils/themes';

interface DisciplinesViewProps {
  disciplines: Discipline[];
  activeDisciplineId: string | null;
  onSelectDiscipline: (id: string) => void;
  onAddDiscipline: (discipline: Discipline) => void;
  onDeleteDiscipline: (id: string) => void;
  openCreateModalSignal?: boolean;
  onConsumeCreateModalSignal?: () => void;
}

export const DisciplinesView: React.FC<DisciplinesViewProps> = ({
  disciplines,
  activeDisciplineId,
  onSelectDiscipline,
  onAddDiscipline,
  onDeleteDiscipline,
  openCreateModalSignal,
  onConsumeCreateModalSignal,
}) => {
  const [previewTemplate, setPreviewTemplate] =
    useState<PrebuiltTrailTemplate | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [showCustomModal, setShowCustomModal] = useState(
    Boolean(openCreateModalSignal)
  );
  const [customName, setCustomName] = useState('');
  const [customDesc, setCustomDesc] = useState('');
  const [customTheme, setCustomTheme] = useState<DisciplineThemeId>('sky');
  const [firstLevelName, setFirstLevelName] = useState('Fundamentos');

  React.useEffect(() => {
    if (openCreateModalSignal) {
      setShowCustomModal(true);
      onConsumeCreateModalSignal?.();
    }
  }, [openCreateModalSignal, onConsumeCreateModalSignal]);

  const handleStartTemplate = (template: PrebuiltTrailTemplate) => {
    const newDisc = instantiateTrailTemplate(template);
    onAddDiscipline(newDisc);
    setPreviewTemplate(null);
  };

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    const newDisc: Discipline = {
      id: uid('disc'),
      name: customName.trim(),
      description:
        customDesc.trim() ||
        'Trilha personalizada construída no seu ritmo de descoberta.',
      theme: customTheme,
      icon: 'Compass',
      createdAt: new Date().toISOString(),
      levels: [
        {
          id: uid('lvl'),
          title: `Nível 1 — ${firstLevelName.trim() || 'Fundamentos'}`,
          subtitle: 'Os primeiros passos desta jornada',
          landscapeName: 'Clareira Inicial',
          modules: [
            {
              id: uid('mod'),
              title: 'Módulo 1',
              contents: [],
            },
          ],
        },
      ],
    };
    onAddDiscipline(newDisc);
    setCustomName('');
    setCustomDesc('');
    setShowCustomModal(false);
  };

  return (
    <div className="h-full overflow-y-auto px-4 py-2 space-y-8 pb-10">
      {/* Cabeçalho */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-[#1E2430]">
            Suas Disciplinas
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Acompanhe várias áreas simultaneamente ou comece uma nova trilha pronta.
          </p>
        </div>
        <button
          onClick={() => setShowCustomModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1E2430] text-white text-xs font-medium hover:bg-[#2B4C7E] transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Criar trilha do zero</span>
        </button>
      </div>

      {/* Disciplinas ativas */}
      {disciplines.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {disciplines.map((d) => {
            const theme = DISCIPLINE_THEMES[d.theme];
            const dim = calculateDisciplineDimensions(d);
            const isCurrent = d.id === activeDisciplineId;

            return (
              <div
                key={d.id}
                className={`rounded-[24px] bg-white border p-5 flex flex-col justify-between transition-all shadow-[0_12px_28px_-18px_rgba(30,36,48,0.12)] ${isCurrent ? 'border-sky-300 ring-2 ring-sky-100' : 'border-slate-200/80'
                  }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full"
                        style={{ backgroundColor: theme.dot }}
                      />
                      <h3 className="font-display font-semibold text-lg text-[#1E2430]">
                        {d.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => onDeleteDiscipline(d.id)}
                      className="p-1.5 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                      title="Remover disciplina"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {d.description}
                  </p>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-xl bg-slate-50 py-2">
                      <div className="text-[10px] text-slate-400">Progresso</div>
                      <div className="text-xs font-semibold text-[#1E2430]">
                        {dim.progress}%
                      </div>
                    </div>
                    <div className="rounded-xl bg-slate-50 py-2">
                      <div className="text-[10px] text-slate-400">Desempenho</div>
                      <div className="text-xs font-semibold text-[#1E2430]">
                        {dim.performance !== null ? `${dim.performance}%` : '—'}
                      </div>
                    </div>
                    <div className="rounded-xl bg-slate-50 py-2">
                      <div className="text-[10px] text-slate-400">Domínio</div>
                      <div className="text-xs font-semibold text-[#2B4C7E]">
                        {dim.mastery}%
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectDiscipline(d.id)}
                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-[#1E2430] hover:text-white text-[#1E2430] text-xs font-medium transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <span>Abrir trilha</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Catálogo de Trilhas Prontas */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h2 className="font-display text-xl font-semibold text-[#1E2430]">
            Trilhas prontas para começar agora
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Estruturadas pedagogicamente dos fundamentos aos níveis avançados. Você pode visualizar antes de iniciar e personalizar tudo depois.
        </p>

        {/* Filtro por categoria */}
        <div className="flex flex-wrap items-center gap-1.5">
          {['Todas', ...Array.from(new Set(PREBUILT_TRAILS.map((t) => t.category)))].map(
            (cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors ${active
                      ? 'bg-[#1E2430] text-white'
                      : 'bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  {cat}
                </button>
              );
            }
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {PREBUILT_TRAILS.filter(
            (tpl) => selectedCategory === 'Todas' || tpl.category === selectedCategory
          ).map((tpl) => {
            const theme = DISCIPLINE_THEMES[tpl.theme];
            return (
              <div
                key={tpl.id}
                className="rounded-[22px] bg-white/90 border border-slate-200/80 p-5 flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                      {tpl.category}
                    </span>
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: theme.dot }}
                    />
                  </div>
                  <h3 className="font-display font-semibold text-base text-[#1E2430]">
                    {tpl.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {tpl.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-400">
                    {tpl.levels.length} níveis · {tpl.estimatedSteps} pontos
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setPreviewTemplate(tpl)}
                      className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                      title="Visualizar estrutura"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleStartTemplate(tpl)}
                      className="px-3 py-1.5 rounded-xl bg-[#1E2430] text-white text-xs font-medium hover:bg-[#2B4C7E] transition-colors"
                    >
                      Iniciar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Modal de pré-visualização da trilha */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E2430]/25 backdrop-blur-[2px] p-4">
          <div className="w-full max-w-2xl max-h-[85vh] bg-white rounded-[26px] shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-400">
                  Pré-visualização da trilha
                </span>
                <h3 className="font-display text-2xl font-semibold text-[#1E2430]">
                  {previewTemplate.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {previewTemplate.description}
                </p>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {previewTemplate.levels.map((lvl, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#F6F6F3] p-4 border border-slate-200/70"
                >
                  <div className="font-display font-semibold text-sm text-[#1E2430]">
                    {lvl.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mb-3">
                    {lvl.subtitle}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {lvl.modules.flatMap((m) =>
                      m.contents.map((c, cIdx) => (
                        <span
                          key={cIdx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200/80 text-xs text-slate-700"
                        >
                          <BookOpen className="w-3 h-3 text-sky-500" />
                          {c.editalRef && (
                            <span className="text-[10px] font-mono text-slate-400">
                              {c.editalRef}
                            </span>
                          )}
                          {c.title}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => setPreviewTemplate(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-200/60"
              >
                Fechar
              </button>
              <button
                onClick={() => handleStartTemplate(previewTemplate)}
                className="px-5 py-2 rounded-xl bg-[#1E2430] text-white text-xs font-medium hover:bg-[#2B4C7E] transition-colors"
              >
                Começar esta trilha
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de criação do zero */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E2430]/25 backdrop-blur-[2px] p-4">
          <form
            onSubmit={handleCreateCustom}
            className="w-full max-w-md bg-white rounded-[26px] shadow-2xl border border-slate-200 p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-semibold text-[#1E2430]">
                Criar trilha do zero
              </h3>
              <button
                type="button"
                onClick={() => setShowCustomModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Nome da disciplina ou habilidade
              </label>
              <input
                type="text"
                required
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Ex: Filosofia, Desenho, Cálculo..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Descrição serena
              </label>
              <textarea
                rows={2}
                value={customDesc}
                onChange={(e) => setCustomDesc(e.target.value)}
                placeholder="O que você deseja explorar nesta jornada?"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Primeiro nível da trilha
              </label>
              <input
                type="text"
                value={firstLevelName}
                onChange={(e) => setFirstLevelName(e.target.value)}
                placeholder="Fundamentos"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-2">
                Identidade visual
              </label>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(DISCIPLINE_THEMES) as DisciplineThemeId[]).map(
                  (tid) => {
                    const t = DISCIPLINE_THEMES[tid];
                    return (
                      <button
                        type="button"
                        key={tid}
                        onClick={() => setCustomTheme(tid)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all ${customTheme === tid
                            ? 'border-[#1E2430] bg-slate-50 font-medium'
                            : 'border-slate-200 text-slate-500'
                          }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: t.dot }}
                        />
                        {t.label}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCustomModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-500 hover:bg-slate-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#1E2430] text-white text-xs font-medium hover:bg-[#2B4C7E]"
              >
                Criar disciplina
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

