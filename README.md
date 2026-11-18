# Be a Master

Aplicação desktop/web em **React + TypeScript + Tailwind CSS** (com suporte a **Electron**) para organizar estudos por trilhas de aprendizagem, acompanhar progresso, desempenho em exercícios, revisões e desbloquear cartas colecionáveis.

## Funcionalidades

- **Trilhas de Aprendizagem:** Visualização em níveis, módulos e nós de conteúdo com acompanhamento de status (`Não iniciado`, `Em andamento`, `Revisão`, `Concluído`) e filtro rápido na trilha.
- **Editais Modulares:** Estrutura declarativa em `src/data/editais/` (incluindo o edital completo de **Analista de TI**: Língua Portuguesa, Raciocínio Lógico e Matemático, Conhecimentos Gerais e Conhecimentos Específicos) com referência direta aos itens do edital (`editalRef`).
- **Catálogo de Disciplinas:** Filtro por categoria, pré-visualização da estrutura antes de iniciar e criação de trilhas personalizadas.
- **Revisões & Evolução:** Registro de histórico de estudos, notas, dificuldades e métricas de domínio.
- **Coleção:** Cartas e conquistas desbloqueadas conforme o avanço nas trilhas.

## Como executar

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento (web)
npm run dev

# Verificar tipos e gerar build de produção
npm run build

# Rodar com Electron
npm run electron:dev
```
