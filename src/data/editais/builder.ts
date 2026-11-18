import {
  ChecklistItem,
  ContentNode,
  DisciplineThemeId,
  PrebuiltTrailTemplate,
} from '../../types/mastery';

export function uid(prefix = 'id'): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}_${Date.now().toString(36).slice(-4)}`;
}

export function defaultChecklist(customLabels?: string[]): ChecklistItem[] {
  const labels = customLabels ?? [
    'Explorar o conceito central',
    'Organizar anotações e exemplos',
    'Praticar exercícios de fixação',
    'Sintetizar o aprendizado com minhas palavras',
  ];
  return labels.map((label) => ({
    id: uid('chk'),
    label,
    done: false,
  }));
}

export interface SyllabusNodeSpec {
  title: string;
  description: string;
  difficulty: 1 | 2 | 3 | 4;
  editalRef?: string;
}

export interface SyllabusModuleSpec {
  id: string;
  title: string;
  subtitle?: string;
  nodes: SyllabusNodeSpec[];
}

export interface SyllabusLevelSpec {
  title: string;
  subtitle: string;
  landscapeName: string;
  modules: SyllabusModuleSpec[];
}

export interface SyllabusDisciplineSpec {
  id: string;
  name: string;
  category: string;
  description: string;
  theme: DisciplineThemeId;
  icon: string;
  levels: SyllabusLevelSpec[];
}

function toContentNode(spec: SyllabusNodeSpec): ContentNode {
  return {
    id: uid('cnt'),
    title: spec.title,
    description: spec.description,
    editalRef: spec.editalRef,
    status: 'nao_iniciado',
    difficulty: spec.difficulty,
    checklist: defaultChecklist(),
    exercisesDone: 0,
    exercisesCorrect: 0,
    notes: '',
    difficulties: '',
    markedForReview: false,
    reviewCount: 0,
    history: [],
  };
}

/**
 * Converte uma especificação declarativa de edital em um PrebuiltTrailTemplate,
 * calculando automaticamente o total de pontos e mantendo a estrutura padronizada.
 */
export function buildTrailTemplateFromSyllabus(
  spec: SyllabusDisciplineSpec
): PrebuiltTrailTemplate {
  const estimatedSteps = spec.levels.reduce(
    (acc, lvl) =>
      acc + lvl.modules.reduce((mAcc, mod) => mAcc + mod.nodes.length, 0),
    0
  );

  return {
    id: spec.id,
    name: spec.name,
    category: spec.category,
    description: spec.description,
    theme: spec.theme,
    icon: spec.icon,
    estimatedSteps,
    levels: spec.levels.map((lvl) => ({
      title: lvl.title,
      subtitle: lvl.subtitle,
      landscapeName: lvl.landscapeName,
      modules: lvl.modules.map((mod) => ({
        id: mod.id,
        title: mod.title,
        subtitle: mod.subtitle,
        contents: mod.nodes.map(toContentNode),
      })),
    })),
  };
}

