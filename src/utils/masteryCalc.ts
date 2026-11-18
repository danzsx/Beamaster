import {
  ContentNode,
  Discipline,
  MasteryDimensions,
} from '../types/mastery';

export function flattenContents(discipline: Discipline): ContentNode[] {
  const list: ContentNode[] = [];
  for (const level of discipline.levels) {
    for (const mod of level.modules) {
      for (const content of mod.contents) {
        list.push(content);
      }
    }
  }
  return list;
}

export function calculateContentMastery(node: ContentNode): {
  progress: number;
  performance: number | null;
  mastery: number;
} {
  const totalSteps = node.checklist.length;
  const doneSteps = node.checklist.filter((c) => c.done).length;
  const checklistRatio = totalSteps > 0 ? doneSteps / totalSteps : 0;

  let progress = 0;
  if (node.status === 'concluido') {
    progress = 100;
  } else if (node.status === 'revisao') {
    progress = Math.max(80, Math.round(checklistRatio * 100));
  } else if (node.status === 'em_andamento') {
    progress = Math.max(15, Math.round(checklistRatio * 90));
  }

  const performance =
    node.exercisesDone > 0
      ? Math.round((node.exercisesCorrect / node.exercisesDone) * 100)
      : null;

  // Domínio combina: conclusão estruturada (35%), aproveitamento consistente (45%),
  // volume mínimo de prática (10%) e consolidação por revisão/dificuldade (10%).
  const completionScore =
    node.status === 'concluido'
      ? 35
      : node.status === 'revisao'
      ? 30
      : checklistRatio * 25;

  const perfScore = performance !== null ? (performance / 100) * 45 : 0;
  const volumeRatio = Math.min(1, node.exercisesDone / 10);
  const volumeScore = volumeRatio * 10;
  const consolidationBonus =
    (node.reviewCount > 0 ? 6 : 0) +
    (node.status === 'concluido' && (performance ?? 0) >= 75 ? 4 : 0);

  const mastery = Math.min(
    100,
    Math.round(completionScore + perfScore + volumeScore + consolidationBonus)
  );

  return { progress, performance, mastery };
}

export function calculateDisciplineDimensions(
  discipline: Discipline
): MasteryDimensions {
  const contents = flattenContents(discipline);
  const totalCount = contents.length;
  if (totalCount === 0) {
    return {
      progress: 0,
      performance: null,
      mastery: 0,
      completedCount: 0,
      inProgressCount: 0,
      reviewCount: 0,
      totalCount: 0,
      exercisesDone: 0,
      exercisesCorrect: 0,
    };
  }

  let completedCount = 0;
  let inProgressCount = 0;
  let reviewCount = 0;
  let exercisesDone = 0;
  let exercisesCorrect = 0;
  let weightedDifficultySum = 0;
  let weightedMasterySum = 0;
  let progressSum = 0;

  for (const c of contents) {
    if (c.status === 'concluido') completedCount++;
    if (c.status === 'em_andamento') inProgressCount++;
    if (c.status === 'revisao' || c.markedForReview) reviewCount++;
    exercisesDone += c.exercisesDone;
    exercisesCorrect += c.exercisesCorrect;

    const cm = calculateContentMastery(c);
    progressSum += cm.progress;

    const weight = 0.8 + c.difficulty * 0.2;
    weightedDifficultySum += weight;
    weightedMasterySum += cm.mastery * weight;
  }

  const progress = Math.round(progressSum / totalCount);
  const performance =
    exercisesDone > 0 ? Math.round((exercisesCorrect / exercisesDone) * 100) : null;
  const mastery = Math.round(weightedMasterySum / weightedDifficultySum);

  return {
    progress,
    performance,
    mastery,
    completedCount,
    inProgressCount,
    reviewCount,
    totalCount,
    exercisesDone,
    exercisesCorrect,
  };
}

export function calculateGlobalDimensions(
  disciplines: Discipline[]
): MasteryDimensions {
  if (disciplines.length === 0) {
    return {
      progress: 0,
      performance: null,
      mastery: 0,
      completedCount: 0,
      inProgressCount: 0,
      reviewCount: 0,
      totalCount: 0,
      exercisesDone: 0,
      exercisesCorrect: 0,
    };
  }

  let completedCount = 0;
  let inProgressCount = 0;
  let reviewCount = 0;
  let totalCount = 0;
  let exercisesDone = 0;
  let exercisesCorrect = 0;
  let progressSum = 0;
  let masterySum = 0;

  for (const d of disciplines) {
    const dim = calculateDisciplineDimensions(d);
    completedCount += dim.completedCount;
    inProgressCount += dim.inProgressCount;
    reviewCount += dim.reviewCount;
    totalCount += dim.totalCount;
    exercisesDone += dim.exercisesDone;
    exercisesCorrect += dim.exercisesCorrect;
    progressSum += dim.progress;
    masterySum += dim.mastery;
  }

  return {
    progress: Math.round(progressSum / disciplines.length),
    performance:
      exercisesDone > 0 ? Math.round((exercisesCorrect / exercisesDone) * 100) : null,
    mastery: Math.round(masterySum / disciplines.length),
    completedCount,
    inProgressCount,
    reviewCount,
    totalCount,
    exercisesDone,
    exercisesCorrect,
  };
}

export function getGentleGuidance(dim: MasteryDimensions): string {
  if (dim.totalCount === 0) {
    return 'Sua trilha está pronta para ganhar forma. Adicione o primeiro conteúdo quando se sentir confortável.';
  }
  if (dim.completedCount === 0 && dim.inProgressCount === 0) {
    return 'O primeiro ponto da jornada espera por você. Comece com calma, um passo de cada vez.';
  }
  if (dim.progress >= 85 && dim.mastery >= 75) {
    return 'Você construiu uma base luminosa e sólida nesta disciplina. Que tal revisitar algum ponto favorito para consolidar ainda mais?';
  }
  if (dim.performance !== null && dim.performance < 65 && dim.exercisesDone >= 5) {
    return 'Os exercícios estão revelando pontos interessantes para explorar com mais calma. Revisitá-los em pequenas doses fortalece o domínio.';
  }
  if (dim.progress > dim.mastery + 20) {
    return 'Você avançou bem pela trilha! Praticar alguns exercícios nos conteúdos recentes ajudará a transformar progresso em domínio.';
  }
  return 'Seu ritmo está sereno e consistente. Continue explorando o próximo ponto da trilha no seu tempo.';
}

export interface ReviewSuggestion {
  discipline: Discipline;
  content: ContentNode;
  reason: string;
  daysSinceContact: number;
}

export function getReviewSuggestions(
  disciplines: Discipline[]
): ReviewSuggestion[] {
  const now = Date.now();
  const suggestions: ReviewSuggestion[] = [];

  for (const d of disciplines) {
    for (const c of flattenContents(d)) {
      const isFlagged = c.markedForReview || c.status === 'revisao';
      const lastDate = c.lastStudiedAt || c.completedAt;
      const daysSince = lastDate
        ? Math.floor((now - new Date(lastDate).getTime()) / (1000 * 60 * 60 * 24))
        : 0;
      const perf =
        c.exercisesDone > 0 ? (c.exercisesCorrect / c.exercisesDone) * 100 : null;

      if (isFlagged) {
        suggestions.push({
          discipline: d,
          content: c,
          reason: 'Marcado por você para um reencontro tranquilo',
          daysSinceContact: daysSince,
        });
      } else if (
        c.status === 'concluido' &&
        (daysSince >= 7 || (perf !== null && perf < 75) || c.difficulties.trim().length > 0)
      ) {
        let reason = 'Bom momento para reencontrar este conhecimento';
        if (c.difficulties.trim().length > 0) {
          reason = 'Você registrou algumas nuances aqui — revisitar pode trazer nova clareza';
        } else if (perf !== null && perf < 75) {
          reason = 'Praticar mais um pouco pode fortalecer sua confiança neste tema';
        } else if (daysSince >= 7) {
          reason = `Último contato há ${daysSince} dias — ótimo momento para iluminar de novo`;
        }
        suggestions.push({
          discipline: d,
          content: c,
          reason,
          daysSinceContact: daysSince,
        });
      }
    }
  }

  return suggestions;
}

export function findNextDiscovery(discipline: Discipline): ContentNode | null {
  const all = flattenContents(discipline);
  const inProgress = all.find((c) => c.status === 'em_andamento');
  if (inProgress) return inProgress;
  const next = all.find((c) => c.status === 'nao_iniciado');
  return next || null;
}

