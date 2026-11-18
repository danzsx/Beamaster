import { buildTrailTemplateFromSyllabus } from './builder';

export const PORTUGUES_CONCURSO_TRAIL = buildTrailTemplateFromSyllabus({
  id: 'edital-ti-portugues',
  name: 'Língua Portuguesa (Edital TI)',
  category: 'Concurso · Analista de TI',
  description:
    'Todo o conteúdo de Língua Portuguesa do edital organizado da base normativa à interpretação e estilística textual.',
  theme: 'lavender',
  icon: 'BookOpen',
  levels: [
    {
      title: 'Nível 1 — Base Normativa e Léxico',
      subtitle: 'Ortografia, acentuação e sentido das palavras',
      landscapeName: 'Clareira das Palavras',
      modules: [
        {
          id: 'pt-base',
          title: 'Ortografia, Acentuação e Significação',
          nodes: [
            {
              title: 'Ortografia oficial',
              description:
                'Emprego de letras, hífen, homônimos, parônimos e Novo Acordo Ortográfico.',
              difficulty: 1,
              editalRef: 'Port · 2',
            },
            {
              title: 'Acentuação gráfica',
              description:
                'Regras gerais das oxítonas, paroxítonas, proparoxítonas, hiatos e acento diferencial.',
              difficulty: 1,
              editalRef: 'Port · 3',
            },
            {
              title: 'Significação das palavras, denotação e conotação',
              description:
                'Sinonímia, antonímia, polissemia, sentido literal (denotativo) e figurado (conotativo).',
              difficulty: 1,
              editalRef: 'Port · 1',
            },
          ],
        },
      ],
    },
    {
      title: 'Nível 2 — Morfossintaxe e Mecânica',
      subtitle: 'Estrutura da frase, relações entre termos e norma culta',
      landscapeName: 'Vale da Sintaxe',
      modules: [
        {
          id: 'pt-classes-sintaxe',
          title: 'Classes de Palavras e Estrutura Sintática',
          nodes: [
            {
              title: 'Emprego das classes de palavras',
              description:
                'Substantivos, adjetivos, pronomes, verbos, advérbios, preposições e conjunções em contexto.',
              difficulty: 2,
              editalRef: 'Port · 1',
            },
            {
              title: 'Sintaxe da oração e do período',
              description:
                'Termos essenciais, integrantes e acessórios; coordenação e subordinação.',
              difficulty: 3,
              editalRef: 'Port · 1',
            },
            {
              title: 'Pontuação',
              description:
                'Uso da vírgula, ponto e vírgula, dois-pontos e travessão conforme a estrutura sintática.',
              difficulty: 2,
              editalRef: 'Port · 1',
            },
          ],
        },
        {
          id: 'pt-concordancia-regencia',
          title: 'Concordância, Regência e Crase',
          nodes: [
            {
              title: 'Concordância verbal e nominal',
              description:
                'Casos gerais e especiais de concordância do verbo com o sujeito e dos nomes entre si.',
              difficulty: 3,
              editalRef: 'Port · 1',
            },
            {
              title: 'Regência verbal e nominal',
              description:
                'Transitividade verbal, preposições exigidas e mudança de sentido conforme a regência.',
              difficulty: 3,
              editalRef: 'Port · 1',
            },
            {
              title: 'Estudo da crase',
              description:
                'Fusão da preposição "a" com o artigo ou pronome; casos obrigatórios, facultativos e proibidos.',
              difficulty: 3,
              editalRef: 'Port · 1',
            },
          ],
        },
      ],
    },
    {
      title: 'Nível 3 — Texto, Sentido e Estilo',
      subtitle: 'Leitura crítica, organização textual e recursos expressivos',
      landscapeName: 'Mirante da Interpretação',
      modules: [
        {
          id: 'pt-texto',
          title: 'Compreensão, Coesão e Estilística',
          nodes: [
            {
              title: 'Compreensão e interpretação de textos',
              description:
                'Ideia central, inferências, pressupostos, subentendidos e posicionamento do autor.',
              difficulty: 2,
              editalRef: 'Port · 1',
            },
            {
              title: 'Coesão e coerência',
              description:
                'Mecanismos referenciais e sequenciais, conectivos e progressão lógica do texto.',
              difficulty: 2,
              editalRef: 'Port · 1',
            },
            {
              title: 'Tipologia e gênero textual',
              description:
                'Narração, descrição, dissertação, injunção e características dos principais gêneros.',
              difficulty: 2,
              editalRef: 'Port · 1',
            },
            {
              title: 'Semântica, estilística e figuras',
              description:
                'Relações de sentido, efeitos expressivos e principais figuras de linguagem e de estilo.',
              difficulty: 3,
              editalRef: 'Port · 1',
            },
          ],
        },
      ],
    },
  ],
});

