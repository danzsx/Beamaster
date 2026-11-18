import {
  ChecklistItem,
  ContentNode,
  Discipline,
  PrebuiltTrailTemplate,
} from '../types/mastery';
import { CONCURSO_TI_TRAILS } from './editais';

export function uid(prefix = 'id'): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}_${Date.now().toString(36).slice(-4)}`;
}

export function defaultChecklist(): ChecklistItem[] {
  return [
    { id: uid('chk'), label: 'Explorar o conceito central', done: false },
    { id: uid('chk'), label: 'Organizar anotações e exemplos', done: false },
    { id: uid('chk'), label: 'Praticar exercícios de fixação', done: false },
    { id: uid('chk'), label: 'Sintetizar o aprendizado com minhas palavras', done: false },
  ];
}

function makeNode(
  title: string,
  description: string,
  difficulty: 1 | 2 | 3 | 4
): ContentNode {
  return {
    id: uid('cnt'),
    title,
    description,
    status: 'nao_iniciado',
    difficulty,
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

export const PREBUILT_TRAILS: PrebuiltTrailTemplate[] = [
  {
    id: 'math-complete',
    name: 'Matemática Completa',
    category: 'Ciências Exatas',
    description:
      'Uma jornada serena e estruturada dos fundamentos numéricos até a elegância da geometria analítica e trigonometria.',
    theme: 'sky',
    icon: 'Compass',
    estimatedSteps: 19,
    levels: [
      {
        title: 'Nível 1 — Fundamentos',
        subtitle: 'Construindo segurança com os números e suas relações',
        landscapeName: 'Clareira dos Números',
        modules: [
          {
            id: 'm1',
            title: 'Base Numérica',
            contents: [
              makeNode('Operações básicas', 'Soma, subtração, multiplicação e divisão com fluidez e raciocínio mental.', 1),
              makeNode('Frações', 'Equivalência, simplificação e operações com partes do todo.', 1),
              makeNode('Números decimais', 'Representação decimal, conversão entre frações e cálculos do cotidiano.', 1),
              makeNode('Potenciação', 'Propriedades das potências e notação científica.', 1),
              makeNode('Radiciação', 'Raízes, simplificação de radicais e relação com potências fracionárias.', 1),
            ],
          },
        ],
      },
      {
        title: 'Nível 2 — Álgebra',
        subtitle: 'Transformando padrões em linguagem simbólica',
        landscapeName: 'Vale das Expressões',
        modules: [
          {
            id: 'm2',
            title: 'Linguagem Algébrica e Equações',
            contents: [
              makeNode('Expressões algébricas', 'Variáveis, termos semelhantes e valor numérico.', 2),
              makeNode('Produtos notáveis', 'Quadrado da soma, diferença e produto da soma pela diferença.', 2),
              makeNode('Fatoração', 'Fator comum, agrupamento e trinômio quadrado perfeito.', 2),
              makeNode('Equações do primeiro grau', 'Equilíbrio, isolamento de incógnitas e modelagem de problemas.', 2),
              makeNode('Equações do segundo grau', 'Fórmula resolutiva, soma e produto e interpretação das raízes.', 2),
            ],
          },
        ],
      },
      {
        title: 'Nível 3 — Funções',
        subtitle: 'Compreendendo como grandezas se relacionam e evoluem',
        landscapeName: 'Mirante das Relações',
        modules: [
          {
            id: 'm3',
            title: 'Modelos Funcionais',
            contents: [
              makeNode('Conceito de função', 'Domínio, contradomínio, imagem e leitura de gráficos.', 2),
              makeNode('Função afim', 'Taxa de variação constante, coeficiente angular e linear.', 2),
              makeNode('Função quadrática', 'Parábolas, vértice, concavidade e pontos de máximo e mínimo.', 3),
              makeNode('Funções exponenciais', 'Crescimento acelerado, decaimento e equações exponenciais.', 3),
              makeNode('Funções logarítmicas', 'Inversa da exponencial, propriedades operatórias e aplicações.', 3),
            ],
          },
        ],
      },
      {
        title: 'Nível 4 — Geometria',
        subtitle: 'Visualizando formas, espaços e medidas no plano e no espaço',
        landscapeName: 'Horizonte das Formas',
        modules: [
          {
            id: 'm4',
            title: 'Formas, Espaço e Coordenadas',
            contents: [
              makeNode('Geometria plana', 'Ângulos, triângulos, polígonos, circunferências e áreas.', 3),
              makeNode('Geometria espacial', 'Prismas, pirâmides, cilindros, cones e esferas.', 3),
              makeNode('Trigonometria', 'Razões trigonométricas, ciclo trigonométrico e leis dos senos e cossenos.', 4),
              makeNode('Geometria analítica', 'Pontos, retas, distâncias e equações da circunferência no plano.', 4),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'math-vestibular',
    name: 'Matemática para Vestibulares',
    category: 'Preparação & Provas',
    description:
      'Foco nos temas de maior recorrência em provas como ENEM e vestibulares, unindo interpretação e estratégia.',
    theme: 'deep',
    icon: 'Target',
    estimatedSteps: 10,
    levels: [
      {
        title: 'Nível 1 — Proporcionalidade e Cotidiano',
        subtitle: 'A base interpretativa das provas modernas',
        landscapeName: 'Trilha da Proporção',
        modules: [
          {
            id: 'mv1',
            title: 'Razões e Finanças',
            contents: [
              makeNode('Razão, proporção e regra de três', 'Grandezas direta e inversamente proporcionais.', 1),
              makeNode('Porcentagem e matemática financeira', 'Acréscimos, descontos sucessivos, juros simples e compostos.', 2),
              makeNode('Escalas e unidades de medida', 'Conversões de comprimento, área, volume e mapas.', 2),
            ],
          },
        ],
      },
      {
        title: 'Nível 2 — Dados e Incerteza',
        subtitle: 'Lendo o mundo através de estatística e probabilidade',
        landscapeName: 'Observatório de Dados',
        modules: [
          {
            id: 'mv2',
            title: 'Contagem e Estatística',
            contents: [
              makeNode('Estatística descritiva', 'Média, mediana, moda, variância e leitura de gráficos.', 2),
              makeNode('Análise combinatória', 'Princípio multiplicativo, permutações, arranjos e combinações.', 3),
              makeNode('Probabilidade', 'Espaço amostral, eventos independentes e probabilidade condicional.', 3),
            ],
          },
        ],
      },
      {
        title: 'Nível 3 — Síntese Geométrica e Funcional',
        subtitle: 'Problemas integrados de alto rendimento',
        landscapeName: 'Cume da Síntese',
        modules: [
          {
            id: 'mv3',
            title: 'Aplicações Avançadas',
            contents: [
              makeNode('Funções aplicadas a problemas', 'Modelagem de lucro, trajetória e crescimento populacional.', 3),
              makeNode('Geometria métrica', 'Áreas compostas, semelhança de triângulos e volume de sólidos.', 3),
              makeNode('Progressões (PA e PG)', 'Termo geral e soma dos termos em sequências.', 3),
              makeNode('Trigonometria aplicada', 'Alturas inacessíveis e fenômenos periódicos.', 4),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'bio-vestibular',
    name: 'Biologia para Vestibulares',
    category: 'Ciências da Natureza',
    description:
      'Da célula aos ecossistemas, compreendendo a vida em suas múltiplas escalas de organização.',
    theme: 'sage',
    icon: 'Sprout',
    estimatedSteps: 9,
    levels: [
      {
        title: 'Nível 1 — A Vida em Escala Microscópica',
        subtitle: 'Fundamentos celulares e bioquímicos',
        landscapeName: 'Jardim Celular',
        modules: [
          {
            id: 'b1',
            title: 'Citologia e Bioquímica',
            contents: [
              makeNode('Bioquímica celular', 'Água, sais minerais, carboidratos, lipídios, proteínas e ácidos nucleicos.', 1),
              makeNode('Estrutura e fisiologia celular', 'Membrana plasmática, organelas e transportes celulares.', 2),
              makeNode('Metabolismo energético', 'Respiração celular, fermentação e fotossíntese.', 2),
            ],
          },
        ],
      },
      {
        title: 'Nível 2 — Hereditariedade e Evolução',
        subtitle: 'Como a informação biológica atravessa gerações',
        landscapeName: 'Bosque da Herança',
        modules: [
          {
            id: 'b2',
            title: 'Genética e Evolução',
            contents: [
              makeNode('Divisão celular', 'Mitose, meiose e ciclo celular.', 2),
              makeNode('Genética clássica e molecular', 'Leis de Mendel, heredogramas, DNA e síntese proteica.', 3),
              makeNode('Teorias evolutivas', 'Seleção natural, especiação e evidências da evolução.', 3),
            ],
          },
        ],
      },
      {
        title: 'Nível 3 — Sistemas e Ecologia',
        subtitle: 'O corpo humano e as relações com o planeta',
        landscapeName: 'Reserva da Biosfera',
        modules: [
          {
            id: 'b3',
            title: 'Fisiologia e Ecologia',
            contents: [
              makeNode('Fisiologia humana', 'Sistemas digestório, circulatório, respiratório, nervoso e endócrino.', 3),
              makeNode('Ecologia e cadeias tróficas', 'Fluxo de energia, ciclos biogeoquímicos e relações ecológicas.', 2),
              makeNode('Impactos ambientais e biotecnologia', 'Sustentabilidade, transgênicos e terapia gênica.', 3),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'physics-complete',
    name: 'Física do Básico ao Avançado',
    category: 'Ciências da Natureza',
    description:
      'Desvende as leis que regem o movimento, a energia, a luz e o eletromagnetismo com intuição e rigor.',
    theme: 'lavender',
    icon: 'Atom',
    estimatedSteps: 10,
    levels: [
      {
        title: 'Nível 1 — Mecânica',
        subtitle: 'O movimento e as forças que moldam o universo cotidiano',
        landscapeName: 'Planície do Movimento',
        modules: [
          {
            id: 'f1',
            title: 'Cinemática e Dinâmica',
            contents: [
              makeNode('Grandezas físicas e vetores', 'Sistema Internacional, notação e decomposição vetorial.', 1),
              makeNode('Cinemática escalar e vetorial', 'MRU, MRUV, queda livre e lançamentos.', 2),
              makeNode('Leis de Newton e forças', 'Inércia, princípio fundamental, atrito e plano inclinado.', 2),
              makeNode('Energia, trabalho e quantidade de movimento', 'Conservação de energia e colisões.', 3),
            ],
          },
        ],
      },
      {
        title: 'Nível 2 — Termologia e Ondas',
        subtitle: 'Calor, vibrações e a natureza da luz',
        landscapeName: 'Vale das Ondas',
        modules: [
          {
            id: 'f2',
            title: 'Calor, Óptica e Ondulatória',
            contents: [
              makeNode('Termometria e calorimetria', 'Escalas, calor sensível, latente e trocas de calor.', 2),
              makeNode('Termodinâmica', 'Leis da termodinâmica e máquinas térmicas.', 3),
              makeNode('Ondulatória e acústica', 'Frequência, comprimento de onda, interferência e efeito Doppler.', 3),
              makeNode('Óptica geométrica', 'Reflexão, refração, espelhos e lentes.', 3),
            ],
          },
        ],
      },
      {
        title: 'Nível 3 — Eletromagnetismo e Física Moderna',
        subtitle: 'Cargas, campos e os horizontes da física contemporânea',
        landscapeName: 'Aurora Eletromagnética',
        modules: [
          {
            id: 'f3',
            title: 'Eletricidade e Campo',
            contents: [
              makeNode('Eletrostática e eletrodinâmica', 'Carga, campo elétrico, leis de Ohm e circuitos.', 3),
              makeNode('Eletromagnetismo e introdução à Física Moderna', 'Campo magnético, indução e noções quânticas.', 4),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'chemistry-complete',
    name: 'Química Geral e Orgânica',
    category: 'Ciências da Natureza',
    description:
      'Explore a matéria, suas transformações, ligações e a arquitetura das moléculas orgânicas.',
    theme: 'gold',
    icon: 'FlaskConical',
    estimatedSteps: 9,
    levels: [
      {
        title: 'Nível 1 — Estrutura da Matéria',
        subtitle: 'Átomos, tabela periódica e ligações',
        landscapeName: 'Laboratório Atômico',
        modules: [
          {
            id: 'q1',
            title: 'Atomística e Ligações',
            contents: [
              makeNode('Modelos atômicos e tabela periódica', 'Distribuição eletrônica e propriedades periódicas.', 1),
              makeNode('Ligações químicas e geometria molecular', 'Iônica, covalente, metálica e forças intermoleculares.', 2),
              makeNode('Funções inorgânicas', 'Ácidos, bases, sais e óxidos.', 2),
            ],
          },
        ],
      },
      {
        title: 'Nível 2 — Transformações e Equilíbrio',
        subtitle: 'Quantidades, velocidades e energia nas reações',
        landscapeName: 'Jardim das Reações',
        modules: [
          {
            id: 'q2',
            title: 'Físico-Química',
            contents: [
              makeNode('Estequiometria e soluções', 'Mol, massa molar, pureza, rendimento e concentrações.', 2),
              makeNode('Termoquímica e cinética', 'Entalpia, lei de Hess e fatores de velocidade.', 3),
              makeNode('Equilíbrio químico e pH', 'Constante de equilíbrio, princípio de Le Chatelier e acidez.', 3),
            ],
          },
        ],
      },
      {
        title: 'Nível 3 — Química Orgânica',
        subtitle: 'A química do carbono e da vida',
        landscapeName: 'Arquitetura do Carbono',
        modules: [
          {
            id: 'q3',
            title: 'Cadeias e Reações Orgânicas',
            contents: [
              makeNode('Cadeias carbônicas e hidrocarbonetos', 'Classificação, hibridização e nomenclatura IUPAC.', 2),
              makeNode('Funções orgânicas e isomeria', 'Álcoois, aldeídos, cetonas, ácidos, ésteres e isomeria.', 3),
              makeNode('Reações orgânicas e polímeros', 'Substituição, adição, eliminação e macromoléculas.', 4),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'programming-craft',
    name: 'Programação',
    category: 'Tecnologia & Criação',
    description:
      'Da lógica fundamental ao design de sistemas elegantes, aprendendo a pensar e construir software com clareza.',
    theme: 'sky',
    icon: 'Code2',
    estimatedSteps: 10,
    levels: [
      {
        title: 'Nível 1 — Pensamento Computacional',
        subtitle: 'Os alicerces da lógica e da expressão em código',
        landscapeName: 'Oficina da Lógica',
        modules: [
          {
            id: 'p1',
            title: 'Fundamentos',
            contents: [
              makeNode('Algoritmos e variáveis', 'Tipos de dados, fluxo sequencial e decomposição de problemas.', 1),
              makeNode('Condicionais e laços de repetição', 'Tomada de decisão e iteração limpa.', 1),
              makeNode('Funções e modularização', 'Escopo, parâmetros, retorno e reutilização.', 2),
            ],
          },
        ],
      },
      {
        title: 'Nível 2 — Estruturas e Paradigmas',
        subtitle: 'Organizando dados e modelando o mundo',
        landscapeName: 'Biblioteca de Estruturas',
        modules: [
          {
            id: 'p2',
            title: 'Dados e Abstração',
            contents: [
              makeNode('Arrays, listas e dicionários', 'Manipulação eficiente de coleções e buscas.', 2),
              makeNode('Programação Orientada a Objetos', 'Classes, encapsulamento, composição e interfaces.', 3),
              makeNode('Algoritmos e complexidade', 'Recursão, ordenação e noções de Big-O.', 3),
            ],
          },
        ],
      },
      {
        title: 'Nível 3 — Construção de Aplicações',
        subtitle: 'Do código isolado a produtos completos',
        landscapeName: 'Estúdio de Arquitetura',
        modules: [
          {
            id: 'p3',
            title: 'Web, Dados e Qualidade',
            contents: [
              makeNode('HTML, CSS e interfaces reativas', 'Layout, acessibilidade e estado de interface.', 2),
              makeNode('APIs, assincronismo e persistência', 'Promises, HTTP, JSON e bancos de dados.', 3),
              makeNode('Testes automatizados e refatoração', 'Testes unitários, legibilidade e manutenção.', 3),
              makeNode('Arquitetura e publicação', 'Separação de responsabilidades e deploy.', 4),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'english-journey',
    name: 'Inglês',
    category: 'Idiomas & Comunicação',
    description:
      'Construa fluência natural com leitura, escuta, estrutura e expressão cotidiana sem pressão.',
    theme: 'rose',
    icon: 'Globe2',
    estimatedSteps: 8,
    levels: [
      {
        title: 'Nível 1 — Primeiras Conexões',
        subtitle: 'Vocabulário essencial e estruturas do presente',
        landscapeName: 'Praça das Primeiras Palavras',
        modules: [
          {
            id: 'e1',
            title: 'Comunicação Inicial',
            contents: [
              makeNode('Sons, pronomes e verb to be', 'Apresentações, pronúncia base e frases afirmativas e negativas.', 1),
              makeNode('Rotina e Simple Present', 'Hábitos diários, perguntas com do/does e vocabulário cotidiano.', 1),
              makeNode('Substantivos, artigos e preposições', 'In, on, at e construção de frases naturais.', 2),
            ],
          },
        ],
      },
      {
        title: 'Nível 2 — Tempo e Narrativa',
        subtitle: 'Contando histórias sobre o passado e o futuro',
        landscapeName: 'Café das Histórias',
        modules: [
          {
            id: 'e2',
            title: 'Tempos Verbais',
            contents: [
              makeNode('Passado simples e contínuo', 'Verbos regulares, irregulares e narrativas.', 2),
              makeNode('Futuro e verbos modais', 'Will, going to, can, should, must e nuances de polidez.', 2),
              makeNode('Present Perfect', 'Experiências de vida e ações conectadas ao presente.', 3),
            ],
          },
        ],
      },
      {
        title: 'Nível 3 — Fluência e Nuance',
        subtitle: 'Compreensão autêntica e expressão confiante',
        landscapeName: 'Horizonte da Fluência',
        modules: [
          {
            id: 'e3',
            title: 'Expressão Avançada',
            contents: [
              makeNode('Phrasal verbs e expressões idiomáticas', 'Uso contextual em conversas e textos reais.', 3),
              makeNode('Leitura crítica e escuta ativa', 'Artigos, podcasts e síntese de ideias em inglês.', 4),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'music-theory',
    name: 'Teoria Musical',
    category: 'Artes & Expressão',
    description:
      'Sinta e compreenda a arquitetura do som: ritmo, intervalos, escalas, acordes e harmonia.',
    theme: 'lavender',
    icon: 'Music',
    estimatedSteps: 8,
    levels: [
      {
        title: 'Nível 1 — O Pulso e as Notas',
        subtitle: 'Despertando o ouvido para o tempo e a altura',
        landscapeName: 'Sala do Compasso',
        modules: [
          {
            id: 'mu1',
            title: 'Elementos Básicos',
            contents: [
              makeNode('Propriedades do som e leitura rítmica', 'Pulso, figuras rítmicas e compassos simples.', 1),
              makeNode('Altura, pauta e claves', 'Notas musicais, clave de sol e clave de fá.', 1),
              makeNode('Tons, semitons e acidentes', 'Sustenidos, bemóis e percepção de distância sonora.', 1),
            ],
          },
        ],
      },
      {
        title: 'Nível 2 — Escalas e Acordes',
        subtitle: 'As cores da melodia e da harmonia',
        landscapeName: 'Ateliê das Escalas',
        modules: [
          {
            id: 'mu2',
            title: 'Construção Melódica e Harmônica',
            contents: [
              makeNode('Escalas maiores e menores', 'Estrutura intervalar e ciclo das quintas.', 2),
              makeNode('Intervalos musicais', 'Classificação justa, maior, menor, aumentada e diminuta.', 2),
              makeNode('Tríades e tétrades', 'Formação de acordes maiores, menores, diminutos e com sétima.', 3),
            ],
          },
        ],
      },
      {
        title: 'Nível 3 — Harmonia Funcional',
        subtitle: 'Entendendo tensão, repouso e progressões',
        landscapeName: 'Catedral Harmônica',
        modules: [
          {
            id: 'mu3',
            title: 'Linguagem Harmônica',
            contents: [
              makeNode('Campo harmônico e funções', 'Tônica, subdominante e dominante.', 3),
              makeNode('Cadências e análise de repertório', 'Progressões clássicas e populares na prática.', 4),
            ],
          },
        ],
      },
    ],
  },
  ...CONCURSO_TI_TRAILS,
];

export function instantiateTrailTemplate(
  template: PrebuiltTrailTemplate,
  customName?: string,
  customDescription?: string
): Discipline {
  return {
    id: uid('disc'),
    name: customName?.trim() || template.name,
    description: customDescription?.trim() || template.description,
    theme: template.theme,
    icon: template.icon,
    createdAt: new Date().toISOString(),
    templateId: template.id,
    levels: template.levels.map((lvl) => ({
      id: uid('lvl'),
      title: lvl.title,
      subtitle: lvl.subtitle,
      landscapeName: lvl.landscapeName,
      modules: lvl.modules.map((mod) => ({
        id: uid('mod'),
        title: mod.title,
        subtitle: mod.subtitle,
        contents: mod.contents.map((c) => ({
          ...c,
          id: uid('cnt'),
          checklist: defaultChecklist(),
          history: [],
        })),
      })),
    })),
  };
}

export function createStarterSeedDiscipline(): Discipline {
  const mathTemplate = PREBUILT_TRAILS[0];
  const disc = instantiateTrailTemplate(mathTemplate);
  const now = new Date();
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString();
  const yesterday = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString();

  // Marcar primeiros 2 conteúdos como concluídos e o 3º em andamento para demonstrar a jornada iluminada
  const lvl1Contents = disc.levels[0].modules[0].contents;
  lvl1Contents[0].status = 'concluido';
  lvl1Contents[0].checklist = lvl1Contents[0].checklist.map((i) => ({ ...i, done: true }));
  lvl1Contents[0].exercisesDone = 15;
  lvl1Contents[0].exercisesCorrect = 14;
  lvl1Contents[0].completedAt = twoDaysAgo;
  lvl1Contents[0].lastStudiedAt = twoDaysAgo;
  lvl1Contents[0].notes = 'Propriedades comutativa e distributiva facilitam muito o cálculo mental.';
  lvl1Contents[0].history = [
    {
      id: uid('hist'),
      date: twoDaysAgo,
      type: 'conclusao',
      summary: 'Conteúdo concluído com 14/15 acertos nos exercícios.',
      exercisesDone: 15,
      exercisesCorrect: 14,
    },
  ];

  lvl1Contents[1].status = 'concluido';
  lvl1Contents[1].checklist = lvl1Contents[1].checklist.map((i) => ({ ...i, done: true }));
  lvl1Contents[1].exercisesDone = 12;
  lvl1Contents[1].exercisesCorrect = 10;
  lvl1Contents[1].completedAt = yesterday;
  lvl1Contents[1].lastStudiedAt = yesterday;
  lvl1Contents[1].notes = 'MMC para somar denominadores diferentes; simplificar antes de multiplicar.';
  lvl1Contents[1].history = [
    {
      id: uid('hist'),
      date: yesterday,
      type: 'conclusao',
      summary: 'Concluído com 10/12 acertos.',
      exercisesDone: 12,
      exercisesCorrect: 10,
    },
  ];

  lvl1Contents[2].status = 'em_andamento';
  lvl1Contents[2].checklist[0].done = true;
  lvl1Contents[2].checklist[1].done = true;
  lvl1Contents[2].exercisesDone = 6;
  lvl1Contents[2].exercisesCorrect = 5;
  lvl1Contents[2].lastStudiedAt = now.toISOString();
  lvl1Contents[2].history = [
    {
      id: uid('hist'),
      date: now.toISOString(),
      type: 'inicio',
      summary: 'Exploração iniciada e primeiros exercícios registrados (5/6).',
      exercisesDone: 6,
      exercisesCorrect: 5,
    },
  ];

  return disc;
}

