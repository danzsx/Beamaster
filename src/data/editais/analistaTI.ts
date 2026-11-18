import { buildTrailTemplateFromSyllabus } from './builder';

export const ANALISTA_TI_ESPECIFICOS_TRAIL = buildTrailTemplateFromSyllabus({
  id: 'edital-ti-especificos',
  name: 'Analista de TI — Conhecimentos Específicos',
  category: 'Concurso · Analista de TI',
  description:
    'Os 7 eixos específicos do cargo de Analista de Tecnologia da Informação, espelhando exatamente a estrutura do edital.',
  theme: 'deep',
  icon: 'Cpu',
  levels: [
    {
      title: 'Nível 1 — Governança e Gestão de TI',
      subtitle: 'Estratégia, PDTI, serviços e agilidade',
      landscapeName: 'Torre de Governança',
      modules: [
        {
          id: 'ti-gov',
          title: 'Governança, Serviços e Projetos',
          nodes: [
            {
              title: 'Governança, gestão de TI e planejamento estratégico',
              description:
                'Alinhamento estratégico, COBIT, papéis de governança vs. gestão e indicadores.',
              difficulty: 2,
              editalRef: 'TI · 1.1',
            },
            {
              title: 'Plano Diretor de Tecnologia da Informação (PDTI)',
              description:
                'Elaboração, inventário de necessidades, metas, ações e acompanhamento no setor público.',
              difficulty: 2,
              editalRef: 'TI · 1.2',
            },
            {
              title: 'Gestão de serviços de TI (ITSM)',
              description:
                'ITIL: gestão de incidentes, problemas, mudanças e acordos de nível de serviço (SLA).',
              difficulty: 2,
              editalRef: 'TI · 1.3',
            },
            {
              title: 'Gestão de projetos e métodos ágeis',
              description:
                'Ciclo de projetos, Scrum (papéis, eventos, artefatos) e Kanban (fluxo, WIP, métricas).',
              difficulty: 2,
              editalRef: 'TI · 1.4',
            },
          ],
        },
      ],
    },
    {
      title: 'Nível 2 — Infraestrutura e Sistemas Operacionais',
      subtitle: 'Hardware, virtualização, nuvem, SOs e continuidade',
      landscapeName: 'Forja de Infraestrutura',
      modules: [
        {
          id: 'ti-infra',
          title: 'Servidores, Nuvem e Administração',
          nodes: [
            {
              title: 'Arquitetura de computadores e servidores',
              description:
                'CPU, memória, barramentos, E/S, servidores físicos e virtuais.',
              difficulty: 2,
              editalRef: 'TI · 2.1',
            },
            {
              title: 'Virtualização e computação em nuvem',
              description:
                'Hypervisors, contêineres, modelos IaaS/PaaS/SaaS e nuvem pública, privada e híbrida.',
              difficulty: 2,
              editalRef: 'TI · 2.2',
            },
            {
              title: 'Sistemas operacionais Windows e Linux',
              description:
                'Administração, usuários/permissões, processos, sistema de arquivos e serviços essenciais.',
              difficulty: 3,
              editalRef: 'TI · 2.3',
            },
            {
              title: 'Armazenamento, disponibilidade e backup',
              description:
                'RAID, SAN/NAS, desempenho, estratégias de backup (completo, incremental, diferencial) e recuperação.',
              difficulty: 3,
              editalRef: 'TI · 2.4',
            },
          ],
        },
      ],
    },
    {
      title: 'Nível 3 — Redes de Computadores',
      subtitle: 'Arquitetura, endereçamento, serviços e monitoramento',
      landscapeName: 'Malha Conectada',
      modules: [
        {
          id: 'ti-redes',
          title: 'Protocolos, Endereçamento e Serviços',
          nodes: [
            {
              title: 'Modelos OSI e TCP/IP',
              description:
                'Camadas, encapsulamento, PDUs e principais protocolos de cada camada.',
              difficulty: 2,
              editalRef: 'TI · 3.1',
            },
            {
              title: 'IPv4, IPv6, sub-redes e roteamento',
              description:
                'Cálculo de máscaras/CIDR, endereçamento IPv6, tabelas de roteamento e protocolos.',
              difficulty: 3,
              editalRef: 'TI · 3.2',
            },
            {
              title: 'LAN, WLAN e WAN',
              description:
                'Ethernet, VLANs, padrões Wi-Fi (IEEE 802.11), VPNs e enlaces de longa distância.',
              difficulty: 2,
              editalRef: 'TI · 3.3',
            },
            {
              title: 'DNS, DHCP, HTTP/HTTPS e serviços de rede',
              description:
                'Resolução de nomes, concessão dinâmica de IP, métodos HTTP, TLS e portas padrão.',
              difficulty: 2,
              editalRef: 'TI · 3.4',
            },
            {
              title: 'Equipamentos e monitoramento de redes',
              description:
                'Switches, roteadores, access points, SNMP, Syslog e ferramentas de diagnóstico.',
              difficulty: 3,
              editalRef: 'TI · 3.5',
            },
          ],
        },
      ],
    },
    {
      title: 'Nível 4 — Desenvolvimento e Bancos de Dados',
      subtitle: 'Engenharia de software, POO, APIs e SQL',
      landscapeName: 'Oficina de Sistemas',
      modules: [
        {
          id: 'ti-dev-bd',
          title: 'Engenharia de Software e Dados',
          nodes: [
            {
              title: 'Engenharia de software e requisitos',
              description:
                'Levantamento, análise, especificação e validação de requisitos funcionais e não funcionais.',
              difficulty: 2,
              editalRef: 'TI · 4.1',
            },
            {
              title: 'Ciclo de vida, modelagem, testes e manutenção',
              description:
                'UML, níveis e tipos de testes, implantação, manutenção e documentação.',
              difficulty: 2,
              editalRef: 'TI · 4.2',
            },
            {
              title: 'POO, APIs e integração entre sistemas',
              description:
                'Encapsulamento, herança, polimorfismo, REST/JSON, mensageria e padrões de integração.',
              difficulty: 3,
              editalRef: 'TI · 4.3',
            },
            {
              title: 'Bancos de dados relacionais e SQL',
              description:
                'Modelagem ER, normalização, consultas SQL (DDL/DML), transações ACID, integridade e índices.',
              difficulty: 3,
              editalRef: 'TI · 4.4',
            },
          ],
        },
      ],
    },
    {
      title: 'Nível 5 — Segurança da Informação',
      subtitle: 'Princípios, identidade, criptografia e defesa',
      landscapeName: 'Bastião Digital',
      modules: [
        {
          id: 'ti-seg',
          title: 'Fundamentos, Criptografia e Defesa',
          nodes: [
            {
              title: 'Princípios da segurança da informação',
              description:
                'Confidencialidade, integridade, disponibilidade, autenticidade e não repúdio.',
              difficulty: 1,
              editalRef: 'TI · 5.1',
            },
            {
              title: 'Gestão de identidades e controle de acesso',
              description:
                'IAM, RBAC/ABAC, menor privilégio, MFA e federação de identidades.',
              difficulty: 2,
              editalRef: 'TI · 5.2',
            },
            {
              title: 'Criptografia, certificados digitais e autenticação',
              description:
                'Chave simétrica e assimétrica, funções hash, assinatura digital, ICP-Brasil e PKI.',
              difficulty: 3,
              editalRef: 'TI · 5.3',
            },
            {
              title: 'Vulnerabilidades, ameaças e incidentes',
              description:
                'Malwares, engenharia social, OWASP Top 10, CVEs e tratamento de incidentes.',
              difficulty: 3,
              editalRef: 'TI · 5.4',
            },
            {
              title: 'Firewall, endpoints, logs e continuidade',
              description:
                'Filtragem de pacotes/WAF, EDR, SIEM, planos de continuidade de negócios (PCN) e DRP.',
              difficulty: 3,
              editalRef: 'TI · 5.5',
            },
          ],
        },
      ],
    },
    {
      title: 'Nível 6 — Contratações de TI na Administração Pública',
      subtitle: 'Planejamento, artefatos, fiscalização e Lei 14.133/2021',
      landscapeName: 'Ágora das Contratações',
      modules: [
        {
          id: 'ti-contratacoes',
          title: 'Ciclo de Contratações Públicas de TI',
          nodes: [
            {
              title: 'Planejamento das contratações de tecnologia',
              description:
                'Alinhamento ao PDTI, PCA, análise de riscos e fase preparatória.',
              difficulty: 3,
              editalRef: 'TI · 6.1',
            },
            {
              title: 'ETP, Termo de Referência e especificação técnica',
              description:
                'Estudo Técnico Preliminar, definição do objeto, critérios de aceitação e pesquisa de preços.',
              difficulty: 3,
              editalRef: 'TI · 6.2',
            },
            {
              title: 'Gestão e fiscalização de contratos de TI',
              description:
                'Papéis do gestor e fiscais (técnico e administrativo), ordens de serviço, medição e sanções.',
              difficulty: 3,
              editalRef: 'TI · 6.3',
            },
            {
              title: 'Lei Federal nº 14.133/2021 aplicada à TI',
              description:
                'Modalidades, critérios de julgamento, dispensa/inexigibilidade e regras específicas de tecnologia.',
              difficulty: 4,
              editalRef: 'TI · 6.4',
            },
          ],
        },
      ],
    },
    {
      title: 'Nível 7 — Proteção de Dados e Governo Digital',
      subtitle: 'LGPD, LAI e Governo Digital no Poder Público',
      landscapeName: 'Horizonte Cidadão',
      modules: [
        {
          id: 'ti-leis-digitais',
          title: 'Legislação Digital e Governança de Dados',
          nodes: [
            {
              title: 'Lei Federal nº 13.709/2018 — LGPD',
              description:
                'Princípios, bases legais, direitos dos titulares, agentes de tratamento e sanções.',
              difficulty: 3,
              editalRef: 'TI · 7.1',
            },
            {
              title: 'Dados pessoais pelo Poder Público e governança',
              description:
                'Capítulo IV da LGPD, compartilhamento de dados, encarregado (DPO) e segurança de dados.',
              difficulty: 3,
              editalRef: 'TI · 7.2',
            },
            {
              title: 'Lei Federal nº 12.527/2011 — LAI',
              description:
                'Transparência ativa e passiva, prazos de resposta, classificação da informação e sigilo.',
              difficulty: 2,
              editalRef: 'TI · 7.3',
            },
            {
              title: 'Lei Federal nº 14.129/2021 — Governo Digital',
              description:
                'Princípios, prestação digital de serviços, interoperabilidade, dados abertos e identidade digital.',
              difficulty: 3,
              editalRef: 'TI · 7.4',
            },
          ],
        },
      ],
    },
  ],
});

