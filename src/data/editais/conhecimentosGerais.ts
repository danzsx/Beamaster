import { buildTrailTemplateFromSyllabus } from './builder';

export const CONHECIMENTOS_GERAIS_CONCURSO_TRAIL = buildTrailTemplateFromSyllabus({
  id: 'edital-ti-gerais',
  name: 'Conhecimentos Gerais (Edital TI)',
  category: 'Concurso · Analista de TI',
  description:
    'Tópicos de atualidades e vinculações históricas em níveis municipal, regional e nacional organizados por eixos temáticos.',
  theme: 'sage',
  icon: 'Globe',
  levels: [
    {
      title: 'Nível 1 — Eixos Temáticos e Contexto Histórico',
      subtitle: 'Articulação entre cenário municipal, regional e nacional',
      landscapeName: 'Observatório do Mundo',
      modules: [
        {
          id: 'cg-estado',
          title: 'Estado, Política e Segurança',
          nodes: [
            {
              title: 'Política',
              description:
                'Organização dos poderes, políticas públicas e conjuntura municipal, regional e nacional.',
              difficulty: 1,
              editalRef: 'CG · 1',
            },
            {
              title: 'Relações internacionais',
              description:
                'Geopolítica contemporânea, blocos econômicos, acordos e impactos no Brasil.',
              difficulty: 2,
              editalRef: 'CG · 1',
            },
            {
              title: 'Segurança',
              description:
                'Segurança pública, segurança cibernética e desafios institucionais contemporâneos.',
              difficulty: 2,
              editalRef: 'CG · 1',
            },
          ],
        },
        {
          id: 'cg-economia',
          title: 'Economia, Energia e Sustentabilidade',
          nodes: [
            {
              title: 'Economia',
              description:
                'Indicadores econômicos, finanças públicas, desenvolvimento regional e mercado de trabalho.',
              difficulty: 2,
              editalRef: 'CG · 1',
            },
            {
              title: 'Energia e desenvolvimento sustentável',
              description:
                'Matriz energética, transição ecológica, agenda ESG e políticas ambientais.',
              difficulty: 2,
              editalRef: 'CG · 1',
            },
            {
              title: 'Tecnologia',
              description:
                'Transformação digital, inteligência artificial, inovação e impactos socioeconômicos.',
              difficulty: 1,
              editalRef: 'CG · 1',
            },
          ],
        },
        {
          id: 'cg-sociedade',
          title: 'Sociedade, Educação e Cultura',
          nodes: [
            {
              title: 'Sociedade e educação',
              description:
                'Demografia, direitos sociais, inclusão digital e políticas educacionais no país.',
              difficulty: 1,
              editalRef: 'CG · 1',
            },
            {
              title: 'Artes e literatura',
              description:
                'Movimentos culturais, patrimônio histórico e expressões artísticas locais e nacionais.',
              difficulty: 2,
              editalRef: 'CG · 1',
            },
          ],
        },
      ],
    },
  ],
});

