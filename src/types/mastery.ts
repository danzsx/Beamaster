export type ContentStatus =
  | 'nao_iniciado'
  | 'em_andamento'
  | 'concluido'
  | 'revisao';

export type DisciplineThemeId =
  | 'sky'
  | 'deep'
  | 'lavender'
  | 'sage'
  | 'gold'
  | 'rose';

export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

export interface EvolutionEntry {
  id: string;
  date: string; // ISO
  type: 'inicio' | 'exercicio' | 'conclusao' | 'revisao' | 'nota';
  summary: string;
  exercisesDone?: number;
  exercisesCorrect?: number;
}

export interface ContentNode {
  id: string;
  title: string;
  description: string;
  editalRef?: string;
  status: ContentStatus;
  difficulty: 1 | 2 | 3 | 4; // 1: base, 4: avançado
  checklist: ChecklistItem[];
  exercisesDone: number;
  exercisesCorrect: number;
  notes: string;
  difficulties: string;
  markedForReview: boolean;
  reviewCount: number;
  lastStudiedAt?: string;
  completedAt?: string;
  history: EvolutionEntry[];
}

export interface TrailModule {
  id: string;
  title: string;
  subtitle?: string;
  contents: ContentNode[];
}

export interface TrailLevel {
  id: string;
  title: string;
  subtitle: string;
  landscapeName: string; // e.g. "Clareira dos Fundamentos"
  modules: TrailModule[];
}

export interface Discipline {
  id: string;
  name: string;
  description: string;
  theme: DisciplineThemeId;
  icon: string; // lucide icon key or symbol
  createdAt: string;
  templateId?: string;
  levels: TrailLevel[];
}

export type CardRarity = 'Essencial' | 'Luminosa' | 'Rara' | 'Magistral';

export interface CardConcept {
  name: string;
  tag: string;
  description: string;
}

export interface CollectibleCardDef {
  id: string;
  number: string; // e.g. "0001"
  title: string;
  category: string;
  rarity: CardRarity;
  era: string;
  elementTag: string; // e.g. "8 · O" ou "6 · C"
  hpLabel: string; // e.g. "DOM 120"
  imageUrl?: string; // Real historical portrait/drawing path
  caption: string;
  description: string;
  concepts: CardConcept[];
  goodFor: string;
  vibes: string;
  artType:
    | 'lavoisier'
    | 'dalton'
    | 'avogadro'
    | 'mendeleev'
    | 'curie'
    | 'pauling'
    | 'atomo'
    | 'organica';
  accent: string;
  conditionLabel: string;
}

export interface UnlockedCard {
  cardId: string;
  unlockedAt: string;
  disciplineName?: string;
  contentTitle?: string;
}

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  icon: string;
  milestoneLabel: string;
}

export interface UnlockedAchievement {
  achievementId: string;
  unlockedAt: string;
}

export interface MasteryDimensions {
  progress: number; // 0-100
  performance: number | null; // 0-100 or null if no exercises yet
  mastery: number; // 0-100
  completedCount: number;
  inProgressCount: number;
  reviewCount: number;
  totalCount: number;
  exercisesDone: number;
  exercisesCorrect: number;
}

export interface AppState {
  version: number;
  userName: string;
  activeDisciplineId: string | null;
  disciplines: Discipline[];
  unlockedCards: UnlockedCard[];
  unlockedAchievements: UnlockedAchievement[];
  lastUpdatedAt: string;
}

export interface PrebuiltTrailTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  theme: DisciplineThemeId;
  icon: string;
  estimatedSteps: number;
  levels: Omit<TrailLevel, 'id'>[];
}

