import { AppState } from '../types/mastery';
import { createStarterSeedDiscipline } from '../data/prebuiltTrails';
import { evaluateUnlocks } from '../data/cardsAndAchievements';

const LOCAL_STORAGE_KEY = 'be_a_master_state_v1';

declare global {
  interface Window {
    beAMasterDesktop?: {
      isDesktop: boolean;
      loadState: () => Promise<AppState | null>;
      saveState: (payload: AppState) => Promise<{ ok: boolean; path?: string }>;
      getStoragePath: () => Promise<string>;
      exportFile: (
        filename: string,
        data: unknown
      ) => Promise<{ ok: boolean; filePath?: string; canceled?: boolean }>;
    };
  }
}

export function createInitialState(): AppState {
  const starter = createStarterSeedDiscipline();
  const base: AppState = {
    version: 1,
    userName: 'Explorador',
    activeDisciplineId: starter.id,
    disciplines: [starter],
    unlockedCards: [],
    unlockedAchievements: [],
    lastUpdatedAt: new Date().toISOString(),
  };
  const { newAchievements } = evaluateUnlocks(base);
  const now = new Date().toISOString();
  // Todas as cartas iniciam bloqueadas, inclusive a pré-visualização
  base.unlockedCards = [];
  base.unlockedAchievements = newAchievements.map((id) => ({
    achievementId: id,
    unlockedAt: now,
  }));
  return base;
}

export async function loadPersistedState(): Promise<AppState> {
  try {
    if (window.beAMasterDesktop?.loadState) {
      const diskState = await window.beAMasterDesktop.loadState();
      if (diskState && Array.isArray(diskState.disciplines)) {
        return diskState;
      }
    }
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AppState;
      if (parsed && Array.isArray(parsed.disciplines)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Falha ao ler estado local, iniciando jornada padrão:', err);
  }
  const initial = createInitialState();
  await savePersistedState(initial);
  return initial;
}

export async function savePersistedState(state: AppState): Promise<void> {
  const payload: AppState = {
    ...state,
    lastUpdatedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.warn('Erro ao salvar no localStorage:', err);
  }
  try {
    if (window.beAMasterDesktop?.saveState) {
      await window.beAMasterDesktop.saveState(payload);
    }
  } catch (err) {
    console.warn('Erro ao salvar no arquivo local do desktop:', err);
  }
}

export async function exportStateBackup(state: AppState): Promise<string> {
  const filename = `be-a-master-backup-${new Date().toISOString().slice(0, 10)}.json`;
  if (window.beAMasterDesktop?.exportFile) {
    const res = await window.beAMasterDesktop.exportFile(filename, state);
    if (res.ok && res.filePath) return `Backup salvo em ${res.filePath}`;
    if (res.canceled) return 'Exportação cancelada.';
  }
  const blob = new Blob([JSON.stringify(state, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  return `Backup "${filename}" baixado com sucesso.`;
}

