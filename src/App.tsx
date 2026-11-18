import React, { useEffect, useState } from 'react';
import { Download, Sparkles, Upload, RotateCcw, X } from 'lucide-react';
import { AppState, ContentNode, Discipline } from './types/mastery';
import {
  createInitialState,
  exportStateBackup,
  loadPersistedState,
  savePersistedState,
} from './utils/storage';
import {
  ACHIEVEMENTS,
  COLLECTIBLE_CARDS,
  evaluateUnlocks,
} from './data/cardsAndAchievements';
import { getReviewSuggestions } from './utils/masteryCalc';
import { NavTab, Sidebar } from './components/Sidebar';
import { HomeView } from './components/HomeView';
import { TrailView } from './components/TrailView';
import { DisciplinesView } from './components/DisciplinesView';
import { ReviewsView } from './components/ReviewsView';
import { CollectionView } from './components/CollectionView';
import { EvolutionView } from './components/EvolutionView';
import { ContentDetailDrawer } from './components/ContentDetailDrawer';

export function App() {
  const [state, setState] = useState<AppState | null>(null);
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [openContentRef, setOpenContentRef] = useState<{
    disciplineId: string;
    contentId: string;
  } | null>(null);
  const [createModalSignal, setCreateModalSignal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [storagePath, setStoragePath] = useState<string>(
    'Armazenamento local do navegador'
  );
  const [backupMessage, setBackupMessage] = useState<string | null>(null);
  const [celebrationToast, setCelebrationToast] = useState<{
    title: string;
    subtitle: string;
  } | null>(null);

  useEffect(() => {
    loadPersistedState().then((loaded) => {
      setState(loaded);
    });
    if (window.beAMasterDesktop?.getStoragePath) {
      window.beAMasterDesktop.getStoragePath().then(setStoragePath);
    }
  }, []);

  const commitState = (updater: (prev: AppState) => AppState) => {
    setState((prev) => {
      if (!prev) return prev;
      const nextBase = updater(prev);
      const { newCards, newAchievements } = evaluateUnlocks(nextBase);
      const now = new Date().toISOString();

      const next: AppState = {
        ...nextBase,
        unlockedCards: [
          ...nextBase.unlockedCards,
          ...newCards.map((c) => ({
            cardId: c.cardId,
            disciplineName: c.disciplineName,
            unlockedAt: now,
          })),
        ],
        unlockedAchievements: [
          ...nextBase.unlockedAchievements,
          ...newAchievements.map((id) => ({
            achievementId: id,
            unlockedAt: now,
          })),
        ],
        lastUpdatedAt: now,
      };

      savePersistedState(next);

      if (newCards.length > 0) {
        const cardDef = COLLECTIBLE_CARDS.find(
          (c) => c.id === newCards[0].cardId
        );
        if (cardDef) {
          setCelebrationToast({
            title: `Nova carta: ${cardDef.title}`,
            subtitle: cardDef.description,
          });
          setTimeout(() => setCelebrationToast(null), 5500);
        }
      } else if (newAchievements.length > 0) {
        const achDef = ACHIEVEMENTS.find((a) => a.id === newAchievements[0]);
        if (achDef) {
          setCelebrationToast({
            title: `Marco alcançado: ${achDef.title}`,
            subtitle: achDef.description,
          });
          setTimeout(() => setCelebrationToast(null), 5500);
        }
      }

      return next;
    });
  };

  if (!state) {
    return (
      <div className="min-h-screen canvas-dots flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl luminous-prism mx-auto animate-breathe" />
          <p className="text-xs text-slate-500">Iluminando sua jornada...</p>
        </div>
      </div>
    );
  }

  const activeDiscipline =
    state.disciplines.find((d) => d.id === state.activeDisciplineId) ||
    state.disciplines[0] ||
    null;

  const reviewSuggestions = getReviewSuggestions(state.disciplines);

  const handleUpdateDiscipline = (updated: Discipline) => {
    commitState((prev) => ({
      ...prev,
      disciplines: prev.disciplines.map((d) =>
        d.id === updated.id ? updated : d
      ),
    }));
  };

  const handleAddDiscipline = (newDisc: Discipline) => {
    commitState((prev) => ({
      ...prev,
      activeDisciplineId: newDisc.id,
      disciplines: [...prev.disciplines, newDisc],
    }));
    setActiveTab('trail');
  };

  const handleDeleteDiscipline = (id: string) => {
    commitState((prev) => {
      const remaining = prev.disciplines.filter((d) => d.id !== id);
      return {
        ...prev,
        disciplines: remaining,
        activeDisciplineId:
          prev.activeDisciplineId === id
            ? remaining[0]?.id || null
            : prev.activeDisciplineId,
      };
    });
  };

  const handleSaveContent = (disciplineId: string, updatedNode: ContentNode) => {
    commitState((prev) => ({
      ...prev,
      disciplines: prev.disciplines.map((d) => {
        if (d.id !== disciplineId) return d;
        return {
          ...d,
          levels: d.levels.map((lvl) => ({
            ...lvl,
            modules: lvl.modules.map((mod) => ({
              ...mod,
              contents: mod.contents.map((c) =>
                c.id === updatedNode.id ? updatedNode : c
              ),
            })),
          })),
        };
      }),
    }));
  };

  const openDrawerDiscipline = openContentRef
    ? state.disciplines.find((d) => d.id === openContentRef.disciplineId) ||
      null
    : null;

  const openDrawerContent =
    openDrawerDiscipline && openContentRef
      ? openDrawerDiscipline.levels
          .flatMap((l) => l.modules)
          .flatMap((m) => m.contents)
          .find((c) => c.id === openContentRef.contentId) || null
      : null;

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as AppState;
        if (parsed && Array.isArray(parsed.disciplines)) {
          setState(parsed);
          savePersistedState(parsed);
          setBackupMessage('Jornada restaurada com sucesso!');
        } else {
          setBackupMessage('Arquivo inválido para o Be a Master.');
        }
      } catch {
        setBackupMessage('Não foi possível ler este arquivo JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="h-screen w-screen canvas-dots p-4 md:p-5 flex gap-5 overflow-hidden">
      {/* Sidebar flutuante */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        disciplines={state.disciplines}
        activeDisciplineId={activeDiscipline?.id || null}
        onSelectDiscipline={(id) =>
          commitState((prev) => ({ ...prev, activeDisciplineId: id }))
        }
        onOpenNewDiscipline={() => {
          setActiveTab('disciplines');
          setCreateModalSignal(true);
        }}
        onOpenSettings={() => setShowSettings(true)}
        reviewCount={reviewSuggestions.length}
      />

      {/* Área principal */}
      <main className="flex-1 min-w-0 h-full overflow-hidden">
        {activeTab === 'home' && (
          <HomeView
            userName={state.userName}
            disciplines={state.disciplines}
            activeDiscipline={activeDiscipline}
            unlockedCards={state.unlockedCards}
            reviewCount={reviewSuggestions.length}
            onSelectDiscipline={(id) =>
              commitState((prev) => ({ ...prev, activeDisciplineId: id }))
            }
            onOpenContent={(disciplineId, content) =>
              setOpenContentRef({ disciplineId, contentId: content.id })
            }
            onNavigate={setActiveTab}
            onOpenNewDiscipline={() => {
              setActiveTab('disciplines');
              setCreateModalSignal(true);
            }}
          />
        )}

        {activeTab === 'trail' &&
          (activeDiscipline ? (
            <TrailView
              discipline={activeDiscipline}
              onOpenContent={(content) =>
                setOpenContentRef({
                  disciplineId: activeDiscipline.id,
                  contentId: content.id,
                })
              }
              onUpdateDiscipline={handleUpdateDiscipline}
            />
          ) : (
            <DisciplinesView
              disciplines={state.disciplines}
              activeDisciplineId={null}
              onSelectDiscipline={(id) => {
                commitState((prev) => ({ ...prev, activeDisciplineId: id }));
                setActiveTab('trail');
              }}
              onAddDiscipline={handleAddDiscipline}
              onDeleteDiscipline={handleDeleteDiscipline}
            />
          ))}

        {activeTab === 'disciplines' && (
          <DisciplinesView
            disciplines={state.disciplines}
            activeDisciplineId={activeDiscipline?.id || null}
            onSelectDiscipline={(id) => {
              commitState((prev) => ({ ...prev, activeDisciplineId: id }));
              setActiveTab('trail');
            }}
            onAddDiscipline={handleAddDiscipline}
            onDeleteDiscipline={handleDeleteDiscipline}
            openCreateModalSignal={createModalSignal}
            onConsumeCreateModalSignal={() => setCreateModalSignal(false)}
          />
        )}

        {activeTab === 'reviews' && (
          <ReviewsView
            disciplines={state.disciplines}
            onOpenContent={(disciplineId, content) =>
              setOpenContentRef({ disciplineId, contentId: content.id })
            }
          />
        )}

        {activeTab === 'collection' && (
          <CollectionView
            unlockedCards={state.unlockedCards}
            unlockedAchievements={state.unlockedAchievements}
          />
        )}

        {activeTab === 'evolution' && (
          <EvolutionView
            disciplines={state.disciplines}
            onSelectDiscipline={(id) => {
              commitState((prev) => ({ ...prev, activeDisciplineId: id }));
              setActiveTab('trail');
            }}
          />
        )}
      </main>

      {/* Drawer de acompanhamento individual do conteúdo */}
      {openDrawerDiscipline && openDrawerContent && (
        <ContentDetailDrawer
          discipline={openDrawerDiscipline}
          content={openDrawerContent}
          onClose={() => setOpenContentRef(null)}
          onSaveContent={(updated) =>
            handleSaveContent(openDrawerDiscipline.id, updated)
          }
        />
      )}

      {/* Toast luminoso de nova conquista ou carta */}
      {celebrationToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl bg-white/95 backdrop-blur-md border border-amber-200 shadow-[0_18px_40px_-14px_rgba(229,185,92,0.45)] p-4 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="font-display font-semibold text-sm text-[#1E2430]">
              {celebrationToast.title}
            </div>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              {celebrationToast.subtitle}
            </p>
          </div>
          <button
            onClick={() => setCelebrationToast(null)}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Modal de Dados & Preferências */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E2430]/25 backdrop-blur-[2px] p-4">
          <div className="w-full max-w-md bg-white rounded-[26px] shadow-2xl border border-slate-200 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-semibold text-[#1E2430]">
                Dados & Preferências
              </h3>
              <button
                onClick={() => {
                  setShowSettings(false);
                  setBackupMessage(null);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Como prefere ser chamado(a)
              </label>
              <input
                type="text"
                value={state.userName}
                onChange={(e) =>
                  commitState((prev) => ({
                    ...prev,
                    userName: e.target.value,
                  }))
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-400"
              />
            </div>

            <div className="rounded-2xl bg-[#F6F6F3] p-3.5 border border-slate-200/70">
              <div className="text-[11px] font-medium text-slate-500">
                Persistência local
              </div>
              <div className="text-[11px] font-mono text-slate-700 break-all mt-1">
                {storagePath}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={async () => {
                  const msg = await exportStateBackup(state);
                  setBackupMessage(msg);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-medium text-[#1E2430]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar backup</span>
              </button>

              <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-medium text-[#1E2430] cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>Importar backup</span>
                <input
                  type="file"
                  accept="application/json"
                  onChange={handleImportBackup}
                  className="hidden"
                />
              </label>

              <button
                onClick={() => {
                  const fresh = createInitialState();
                  setState(fresh);
                  savePersistedState(fresh);
                  setBackupMessage('Jornada reiniciada para o estado inicial.');
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-xs font-medium text-rose-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar padrão</span>
              </button>
            </div>

            {backupMessage && (
              <div className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200/70 rounded-xl px-3 py-2">
                {backupMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

