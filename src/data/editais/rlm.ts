import { buildTrailTemplateFromSyllabus } from './builder';

export const RLM_CONCURSO_TRAIL = buildTrailTemplateFromSyllabus({
  id: 'edital-ti-rlm',
  name: 'Raciocínio Lógico e Matemático (Edital TI)',
  category: 'Concurso · Analista de TI',
  description:
    'Os 18 tópicos de Raciocínio Lógico e Matemático do edital encadeados por pré-requisitos, da lógica à geometria e combinatória.',
  theme: 'sky',
  icon: 'Compass',
  levels: [
    {
      title: 'Nível 1 — Fundamentos, Conjuntos e Lógica',
      subtitle: 'Base numérica, teoria dos conjuntos e raciocínio lógico',
      landscapeName: 'Clareira da Lógica',
      modules: [
        {
          id: 'rlm-conjuntos',
          title: 'Conjuntos Numéricos e Operações',
          nodes: [
            {
              title: 'Conjuntos numéricos',
              description:
                'Naturais, inteiros, racionais, irracionais e reais: propriedades e representação.',
              difficulty: 1,
              editalRef: 'RLM · 11',
            },
            {
              title: 'Conjuntos: relações e operações',
              description:
                'Pertinência, inclusão, igualdade, união, interseção, diferença e diagramas de Venn.',
              difficulty: 1,
              editalRef: 'RLM · 16',
            },
          ],
        },
        {
          id: 'rlm-logica',
          title: 'Lógica Matemática e Sequências',
          nodes: [
            {
              title: 'Lógica matemática qualitativa',
              description:
                'Proposições, conectivos, tabelas-verdade, negações, equivalências e tautologias.',
              difficulty: 2,
              editalRef: 'RLM · 8',
            },
            {
              title: 'Lógica dedutiva, argumentativa e quantitativa',
              description:
                'Validade de argumentos, silogismos, quantificadores e associação lógica.',
              difficulty: 2,
              editalRef: 'RLM · 7',
            },
            {
              title: 'Sequências lógicas',
              description:
                'Padrões e regularidades envolvendo números, letras e figuras.',
              difficulty: 2,
              editalRef: 'RLM · 10',
            },
          ],
        },
      ],
    },
    {
      title: 'Nível 2 — Proporcionalidade e Álgebra Base',
      subtitle: 'Relações proporcionais, regressão e equações',
      landscapeName: 'Vale das Equações',
      modules: [
        {
          id: 'rlm-proporcao',
          title: 'Proporções e Estratégias de Resolução',
          nodes: [
            {
              title: 'Regra de três simples e composta',
              description:
                'Grandezas direta e inversamente proporcionais aplicadas a problemas.',
              difficulty: 1,
              editalRef: 'RLM · 9',
            },
            {
              title: 'Razões especiais',
              description:
                'Escala, velocidade média, densidade demográfica, porcentagem e taxas.',
              difficulty: 2,
              editalRef: 'RLM · 14',
            },
            {
              title: 'Princípio da Regressão ou Reversão',
              description:
                'Resolução de problemas de trás para frente invertendo operações passo a passo.',
              difficulty: 2,
              editalRef: 'RLM · 6',
            },
          ],
        },
        {
          id: 'rlm-eq-ineq',
          title: 'Equações e Inequações',
          nodes: [
            {
              title: 'Equações de 1º e 2º grau',
              description:
                'Isolamento de incógnitas, fórmula resolutiva, soma e produto e modelagem.',
              difficulty: 2,
              editalRef: 'RLM · 1',
            },
            {
              title: 'Inequações de 1º e 2º grau',
              description:
                'Estudo do sinal, intervalos reais e conjuntos-solução de desigualdades.',
              difficulty: 2,
              editalRef: 'RLM · 2',
            },
          ],
        },
      ],
    },
    {
      title: 'Nível 3 — Funções, Polinômios e Matrizes',
      subtitle: 'Modelos funcionais, progressões e álgebra linear',
      landscapeName: 'Mirante Funcional',
      modules: [
        {
          id: 'rlm-funcoes-prog',
          title: 'Funções e Progressões',
          nodes: [
            {
              title: 'Funções de 1º e 2º grau',
              description:
                'Gráficos, raízes, vértice, máximos/mínimos e interpretação de parâmetros.',
              difficulty: 2,
              editalRef: 'RLM · 3',
            },
            {
              title: 'Progressões aritmética e geométrica',
              description:
                'Termo geral, razão, soma dos termos e interpolação em PA e PG.',
              difficulty: 2,
              editalRef: 'RLM · 15',
            },
          ],
        },
        {
          id: 'rlm-alg-linear',
          title: 'Polinômios e Sistemas Lineares',
          nodes: [
            {
              title: 'Polinômios',
              description:
                'Operações, grau, raízes, divisão polinomial e teorema do resto.',
              difficulty: 3,
              editalRef: 'RLM · 13',
            },
            {
              title: 'Matrizes, determinantes e sistemas lineares',
              description:
                'Operações matriciais, cálculo de determinantes, escalonamento e classificação de sistemas.',
              difficulty: 3,
              editalRef: 'RLM · 12',
            },
          ],
        },
      ],
    },
    {
      title: 'Nível 4 — Geometria e Contagem',
      subtitle: 'Formas, medidas, coordenadas e probabilidade',
      landscapeName: 'Cume Geométrico',
      modules: [
        {
          id: 'rlm-geometria',
          title: 'Geometria e Trigonometria',
          nodes: [
            {
              title: 'Geometria plana e espacial',
              description:
                'Áreas, perímetros, semelhança, teorema de Pitágoras, volumes e áreas de sólidos.',
              difficulty: 3,
              editalRef: 'RLM · 17',
            },
            {
              title: 'Trigonometria',
              description:
                'Razões trigonométricas no triângulo retângulo, ciclo trigonométrico e leis dos senos/cossenos.',
              difficulty: 3,
              editalRef: 'RLM · 18',
            },
            {
              title: 'Geometria analítica',
              description:
                'Distância entre pontos, equação da reta, paralelismo, perpendicularismo e circunferência.',
              difficulty: 4,
              editalRef: 'RLM · 4',
            },
          ],
        },
        {
          id: 'rlm-contagem',
          title: 'Combinatória e Probabilidade',
          nodes: [
            {
              title: 'Análise combinatória e probabilidade',
              description:
                'Princípio fundamental da contagem, arranjos, permutações, combinações e probabilidade condicional.',
              difficulty: 3,
              editalRef: 'RLM · 5',
            },
          ],
        },
      ],
    },
  ],
});

