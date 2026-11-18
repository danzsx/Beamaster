import { PrebuiltTrailTemplate } from '../../types/mastery';
import { ANALISTA_TI_ESPECIFICOS_TRAIL } from './analistaTI';
import { CONHECIMENTOS_GERAIS_CONCURSO_TRAIL } from './conhecimentosGerais';
import { PORTUGUES_CONCURSO_TRAIL } from './portugues';
import { RLM_CONCURSO_TRAIL } from './rlm';

export { buildTrailTemplateFromSyllabus } from './builder';

export const CONCURSO_TI_TRAILS: PrebuiltTrailTemplate[] = [
  PORTUGUES_CONCURSO_TRAIL,
  RLM_CONCURSO_TRAIL,
  CONHECIMENTOS_GERAIS_CONCURSO_TRAIL,
  ANALISTA_TI_ESPECIFICOS_TRAIL,
];

