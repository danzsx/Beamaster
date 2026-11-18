import {
  AchievementDef,
  AppState,
  CollectibleCardDef,
} from '../types/mastery';
import {
  calculateDisciplineDimensions,
  flattenContents,
} from '../utils/masteryCalc';

export const COLLECTIBLE_CARDS: CollectibleCardDef[] = [
  {
    id: 'chem_lavoisier',
    number: '0001',
    title: 'Antoine Lavoisier',
    category: 'QUÍMICA · PIONEIRO',
    rarity: 'Essencial',
    era: '1743 – 1794',
    elementTag: '8 · O',
    hpLabel: 'DOM 110',
    imageUrl: './cards/lavoisier.jpg',
    caption: 'Retrato de Jacques-Louis David (1788) · Conservação da Massa',
    description:
      'Pai da Química Moderna. Revelou o papel do oxigênio na combustão e estabeleceu o equilíbrio exato das massas.',
    concepts: [
      {
        name: 'Conservação da Massa',
        tag: 'LEI',
        description:
          'Em sistema fechado, a massa dos reagentes é igual à dos produtos.',
      },
      {
        name: 'Nomenclatura Química',
        tag: 'MÉTODO',
        description:
          'Organizou os nomes dos elementos e compostos com precisão.',
      },
    ],
    goodFor: 'equilibrar reações e estequiometria',
    vibes: 'preciso, fundador, luminoso',
    artType: 'lavoisier',
    accent: '#60A5FA',
    conditionLabel: 'Concluir o primeiro conteúdo de Química',
  },
  {
    id: 'chem_dalton',
    number: '0002',
    title: 'John Dalton',
    category: 'QUÍMICA · ATOMÍSTICA',
    rarity: 'Essencial',
    era: '1766 – 1844',
    elementTag: '1 · H',
    hpLabel: 'DOM 120',
    imageUrl: './cards/dalton.jpg',
    caption: 'Gravura histórica de James Stephenson (1845) · Teoria Atômica',
    description:
      'Trouxe o átomo da filosofia para a ciência experimental, descrevendo a matéria como esferas indivisíveis.',
    concepts: [
      {
        name: 'Modelo Bola de Bilhar',
        tag: 'ÁTOMO',
        description:
          'Átomos de um mesmo elemento possuem massa e propriedades idênticas.',
      },
      {
        name: 'Proporções Múltiplas',
        tag: 'LEI',
        description:
          'Elementos combinam-se em razões de números inteiros simples.',
      },
    ],
    goodFor: 'compreender a base da teoria atômica',
    vibes: 'clássico, observador, sólido',
    artType: 'dalton',
    accent: '#E5B95C',
    conditionLabel: 'Concluir 2 conteúdos em Química',
  },
  {
    id: 'chem_avogadro',
    number: '0003',
    title: 'Amedeo Avogadro',
    category: 'QUÍMICA · QUANTIDADES',
    rarity: 'Luminosa',
    era: '1776 – 1856',
    elementTag: '6,02×10²³',
    hpLabel: 'DOM 130',
    imageUrl: './cards/avogadro.jpg',
    caption: 'Retrato histórico · Constante de Avogadro e Mol',
    description:
      'Conectou o mundo microscópico das moléculas à escala palpável do laboratório através do conceito de mol.',
    concepts: [
      {
        name: 'Hipótese de Avogadro',
        tag: 'GASES',
        description:
          'Volumes iguais de gases, sob mesma T e P, contêm o mesmo número de moléculas.',
      },
      {
        name: 'Ponte do Mol',
        tag: 'ESCALA',
        description:
          '6,02 × 10²³ entidades ligam massa atômica à massa em gramas.',
      },
    ],
    goodFor: 'dominar mol, massa molar e gases',
    vibes: 'proporcional, elegante, exato',
    artType: 'avogadro',
    accent: '#34D399',
    conditionLabel: 'Registrar 25 exercícios em Química',
  },
  {
    id: 'chem_mendeleev',
    number: '0004',
    title: 'Dmitri Mendeleev',
    category: 'QUÍMICA · PERIODICIDADE',
    rarity: 'Rara',
    era: '1834 – 1907',
    elementTag: '101 · Md',
    hpLabel: 'DOM 150',
    imageUrl: './cards/mendeleev.jpg',
    caption: 'Fotografia histórica (1897) · Tabela Periódica',
    description:
      'Organizou os elementos segundo suas propriedades periódicas e previu elementos ainda não descobertos.',
    concepts: [
      {
        name: 'Lei Periódica',
        tag: 'TABELA',
        description:
          'Propriedades físicas e químicas repetem-se em ciclos regulares.',
      },
      {
        name: 'Lacunas Visionárias',
        tag: 'PREVISÃO',
        description:
          'Deixou espaços vazios que previram Gálio, Escândio e Germânio.',
      },
    ],
    goodFor: 'prever tendências e reatividade',
    vibes: 'visionário, arquiteto, profundo',
    artType: 'mendeleev',
    accent: '#2B4C7E',
    conditionLabel: 'Concluir o Nível 1 de Química',
  },
  {
    id: 'chem_curie',
    number: '0005',
    title: 'Marie Curie',
    category: 'QUÍMICA · RADIOATIVIDADE',
    rarity: 'Magistral',
    era: '1867 – 1934',
    elementTag: '88 · Ra',
    hpLabel: 'DOM 170',
    imageUrl: './cards/curie.jpg',
    caption: 'Fotografia histórica (c. 1920) · Rádio e Polônio',
    description:
      'Pioneira absoluta da radioatividade e única pessoa laureada com o Nobel em duas ciências distintas.',
    concepts: [
      {
        name: 'Radioatividade',
        tag: 'NÚCLEO',
        description:
          'Descobriu que a radiação é uma propriedade intrínseca do átomo.',
      },
      {
        name: 'Polônio & Rádio',
        tag: 'ISOLAMENTO',
        description:
          'Isolou novos elementos químicos a partir de toneladas de pechblenda.',
      },
    ],
    goodFor: 'entender núcleo atômico e decaimento',
    vibes: 'radiante, resiliente, magistral',
    artType: 'curie',
    accent: '#A78BFA',
    conditionLabel: 'Concluir 5 conteúdos em Química ou atingir 75% de domínio',
  },
  {
    id: 'chem_pauling',
    number: '0006',
    title: 'Linus Pauling',
    category: 'QUÍMICA · LIGAÇÕES',
    rarity: 'Rara',
    era: '1901 – 1994',
    elementTag: '1s² 2s²',
    hpLabel: 'DOM 160',
    imageUrl: './cards/pauling.jpg',
    caption: 'Retrato Nobel (1962) · Eletronegatividade e Hibridização',
    description:
      'Aplicou a mecânica quântica às ligações químicas, revelando a geometria e a polaridade das moléculas.',
    concepts: [
      {
        name: 'Escala de Pauling',
        tag: 'POLARIDADE',
        description:
          'Quantificou a eletronegatividade para prever ligações iônicas e covalentes.',
      },
      {
        name: 'Diagrama de Energia',
        tag: 'ORBITAIS',
        description:
          'Guia visual da distribuição eletrônica em subníveis.',
      },
    ],
    goodFor: 'distribuição eletrônica e ligações',
    vibes: 'quântico, geométrico, claro',
    artType: 'pauling',
    accent: '#38BDF8',
    conditionLabel: 'Concluir Ligações Químicas ou 4 conteúdos em Química',
  },
  {
    id: 'chem_atomo',
    number: '0007',
    title: 'O Átomo Quântico',
    category: 'QUÍMICA · CONCEITO',
    rarity: 'Luminosa',
    era: 'Conceito Central',
    elementTag: 'ψ(x,y,z)',
    hpLabel: 'DOM 140',
    caption: 'Invenção & Modelo · Núcleo denso e nuvem de orbitais',
    description:
      'A unidade fundamental da matéria: prótons e nêutrons no núcleo envolvidos por elétrons em orbitais de probabilidade.',
    concepts: [
      {
        name: 'Orbitais s, p, d, f',
        tag: 'NUVEM',
        description:
          'Regiões de maior probabilidade de encontrar o elétron ao redor do núcleo.',
      },
      {
        name: 'Saltos Quânticos',
        tag: 'ENERGIA',
        description:
          'Absorção e emissão de fótons definem espectros e cores.',
      },
    ],
    goodFor: 'visualizar estrutura atômica moderna',
    vibes: 'translúcido, energético, elegante',
    artType: 'atomo',
    accent: '#818CF8',
    conditionLabel: 'Revisar um conteúdo de Química',
  },
  {
    id: 'chem_organica',
    number: '0008',
    title: 'Anel Benzênico',
    category: 'QUÍMICA · ORGÂNICA',
    rarity: 'Magistral',
    era: 'C₆H₆ · Ressonância',
    elementTag: '6 · C',
    hpLabel: 'DOM 180',
    caption: 'Arquitetura do Carbono · Cadeias e Aromaticidade',
    description:
      'O carbono tetravalente forma cadeias infinitas e anéis aromáticos estáveis por ressonância eletrônica.',
    concepts: [
      {
        name: 'Tetravalência do Carbono',
        tag: 'CADEIAS',
        description:
          'Ligações simples, duplas e triplas constroem a química da vida.',
      },
      {
        name: 'Ressonância Aromática',
        tag: 'ESTABILIDADE',
        description:
          'Elétrons π deslocalizados conferem estabilidade singular ao benzeno.',
      },
    ],
    goodFor: 'dominar química orgânica e funções',
    vibes: 'hexagonal, vivo, magistral',
    artType: 'organica',
    accent: '#F59E0B',
    conditionLabel: 'Concluir a trilha de Química ou atingir 80% de Domínio',
  },
];

export const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: 'ach_first_disc',
    title: 'Primeira Lanterna',
    description: 'Você iniciou sua primeira disciplina no Be a Master.',
    icon: 'Sparkles',
    milestoneLabel: 'Primeira disciplina iniciada',
  },
  {
    id: 'ach_first_module',
    title: 'Primeiro Horizonte',
    description: 'Concluiu todos os conteúdos de um módulo completo.',
    icon: 'Flag',
    milestoneLabel: 'Primeiro módulo concluído',
  },
  {
    id: 'ach_100_exercises',
    title: 'Cem Passos Práticos',
    description: 'Registrou 100 exercícios resolvidos ao longo da jornada.',
    icon: 'Compass',
    milestoneLabel: '100 exercícios realizados',
  },
  {
    id: 'ach_high_accuracy',
    title: 'Olhar Preciso',
    description:
      'Atingiu 85% ou mais de aproveitamento em uma disciplina com pelo menos 20 exercícios.',
    icon: 'Sun',
    milestoneLabel: 'Aproveitamento elevado',
  },
  {
    id: 'ach_first_review',
    title: 'Reencontro Luminoso',
    description: 'Revisou e fortaleceu um conteúdo já estudado.',
    icon: 'RefreshCw',
    milestoneLabel: 'Conteúdo revisado e consolidado',
  },
  {
    id: 'ach_trail_complete',
    title: 'Travessia Completa',
    description: 'Concluiu 100% dos conteúdos de uma trilha de aprendizagem.',
    icon: 'Award',
    milestoneLabel: 'Primeira trilha finalizada',
  },
  {
    id: 'ach_mastery_80',
    title: 'Domínio Sereno',
    description:
      'Alcançou 80% ou mais no indicador de Domínio em uma disciplina.',
    icon: 'Crown',
    milestoneLabel: 'Domínio de uma disciplina',
  },
];

export function evaluateUnlocks(state: AppState): {
  newCards: { cardId: string; disciplineName?: string }[];
  newAchievements: string[];
} {
  const existingCards = new Set(state.unlockedCards.map((c) => c.cardId));
  const existingAch = new Set(
    state.unlockedAchievements.map((a) => a.achievementId)
  );

  const newCards: { cardId: string; disciplineName?: string }[] = [];
  const newAchievements: string[] = [];

  const grantCard = (cardId: string, disciplineName?: string) => {
    if (!existingCards.has(cardId)) {
      existingCards.add(cardId);
      newCards.push({ cardId, disciplineName });
    }
  };
  const grantAch = (achId: string) => {
    if (!existingAch.has(achId)) {
      existingAch.add(achId);
      newAchievements.push(achId);
    }
  };

  if (state.disciplines.length > 0) {
    grantAch('ach_first_disc');
  }

  let totalExercises = 0;
  let anyReview = false;
  let anyModuleDone = false;
  let anyTrailDone = false;
  let anyMastery80 = false;
  let anyHighAcc = false;

  for (const d of state.disciplines) {
    const dim = calculateDisciplineDimensions(d);
    const contents = flattenContents(d);
    totalExercises += dim.exercisesDone;

    const isChem =
      d.name.toLowerCase().includes('quím') ||
      d.name.toLowerCase().includes('quim');

    if (isChem) {
      if (dim.completedCount >= 1) grantCard('chem_lavoisier', d.name);
      if (dim.completedCount >= 2) grantCard('chem_dalton', d.name);
      if (dim.exercisesDone >= 25) grantCard('chem_avogadro', d.name);

      const lvl1 = d.levels[0];
      if (
        lvl1 &&
        lvl1.modules.every((m) =>
          m.contents.every((c) => c.status === 'concluido')
        ) &&
        lvl1.modules.some((m) => m.contents.length > 0)
      ) {
        grantCard('chem_mendeleev', d.name);
      }

      if (dim.completedCount >= 4) grantCard('chem_pauling', d.name);
      if (dim.completedCount >= 5 || dim.mastery >= 75) {
        grantCard('chem_curie', d.name);
      }
      if (contents.some((c) => c.reviewCount > 0)) {
        grantCard('chem_atomo', d.name);
      }
      if (
        (dim.totalCount > 0 && dim.completedCount === dim.totalCount) ||
        dim.mastery >= 80
      ) {
        grantCard('chem_organica', d.name);
      }
    }

    for (const c of contents) {
      if (c.reviewCount > 0) anyReview = true;
    }

    for (const lvl of d.levels) {
      for (const mod of lvl.modules) {
        if (
          mod.contents.length > 0 &&
          mod.contents.every((c) => c.status === 'concluido')
        ) {
          anyModuleDone = true;
        }
      }
    }

    if (dim.totalCount > 0 && dim.completedCount === dim.totalCount) {
      anyTrailDone = true;
    }
    if (dim.mastery >= 80) {
      anyMastery80 = true;
    }
    if (dim.exercisesDone >= 20 && (dim.performance ?? 0) >= 85) {
      anyHighAcc = true;
    }
  }

  if (anyModuleDone) grantAch('ach_first_module');
  if (totalExercises >= 100) grantAch('ach_100_exercises');
  if (anyHighAcc) grantAch('ach_high_accuracy');
  if (anyReview) grantAch('ach_first_review');
  if (anyTrailDone) grantAch('ach_trail_complete');
  if (anyMastery80) grantAch('ach_mastery_80');

  return { newCards, newAchievements };
}
