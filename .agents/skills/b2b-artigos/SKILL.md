---
name: b2b-artigos
description: "Cria ou revisa um artigo da biblioteca B2B Nutris a partir de um PDF, entregando um único arquivo Markdown limpo, sem ficha técnica ou campos de aprovação."
---

# B2B Nutris | Artigo simples a partir de PDF

## Objetivo

Produzir **um artigo por tema específico**, original, claro e útil para nutricionistas e estudantes de Nutrição. A entrega é **um único `.md` com texto editorial**, sem relatório, ficha de cadastro, formulário ou documentação adicional.

## Como trabalhar

1. Ler o PDF indicado. Se o tema não for fornecido, escolher um recorte específico e informar a escolha brevemente.
2. Escrever o artigo a partir do conteúdo efetivamente sustentado pelo PDF. Pode consultar fontes adicionais quando solicitado; distinguir informações externas das extraídas do PDF.
3. Usar extensão livre e subtítulos de acordo com o assunto. Evitar texto genérico, repetição de palavras-chave e cópia extensa do e-book.
4. Salvar **somente** em `editorial/rascunhos/<slug>.md`, na raiz do projeto. Confirmar com `git check-ignore` que o caminho está ignorado; caso não esteja, ajustar apenas a regra necessária em `.gitignore` antes de salvar. Nunca colocar o rascunho em `web/public/` nem fazer commit dele.
5. Informar apenas o caminho salvo e, se houver, **uma pendência científica realmente importante**. Não gerar relatórios de análise ou novas etapas.

## Conteúdo do Markdown

- `# Título` objetivo, ligado a uma dúvida ou tarefa clínica.
- `**Resumo:**` em um parágrafo curto.
- Resposta ou explicação direta no início.
- Desenvolvimento em seções `##`, com exemplos ou tabelas somente quando ajudarem.
- Conclusão breve, se fizer sentido.
- `## Referências`: citar o PDF-base (título e páginas utilizadas) e somente fontes externas realmente identificadas. Manter links verificáveis quando disponíveis. Não inventar estudos, URLs, DOI ou dados.

**Não acrescentar ao arquivo:** `Ficha para cadastro técnico`, status `APROVADO`, revisora, CRN, datas de revisão/publicação, versão, ID, slug listado em metadados, tags, categoria, comentários de processo, checklist ou bloco `Aprofunde o tema`.

O site **já exibe título, resumo, referências e card do e-book**. Esses elementos ficam no rascunho apenas onde ajudam a leitura; na integração, não devem aparecer duplicados. O card comercial é gerado pela aplicação, não pelo Markdown.

## Integração com a aplicação, somente quando solicitada

- Antes de integrar, ler `web/types/scientific-article.ts`, `web/data/library/articles.ts`, a rota de artigos e `docs/especificacao-seo-aeo.md`. Reaproveitar a estrutura existente.
- Extrair **automaticamente** título, resumo, slug (nome do arquivo), categoria, tags e e-book relacionado do texto, do tema e do PDF; não pedir ao usuário que preencha uma ficha.
- Separar o conteúdo exibido no corpo MDX dos campos que a página **já renderiza**: retirar do corpo o H1, o resumo, a seção de referências e o bloco comercial, quando esses elementos forem gerados pela rota. Mapear as referências ao formato existente sem inventá-las.
- Preencher IDs e outros campos internos conforme as convenções reais do código. Não inventar aprovação científica, revisora, CRN ou datas de revisão. Não mudar `editorialStatus` para `approved` sem confirmação efetiva.
- Não criar carregador novo, banco, painel, rota de rascunho ou outra arquitetura por padrão. Integrar no Preview ou publicar **apenas após autorização expressa** e respeitando as regras vigentes da aplicação.
- Se existir um impedimento real de publicação, explicar em **até duas frases** o que falta. Não gerar matriz, plano ou questionário.

## Regra central

**Um PDF → um tema → um artigo `.md` limpo.** Toda a ficha técnica fica por conta da integração feita pelo Codex, não do texto entregue ao editor.

## Exemplo de uso

`$b2b-artigos Crie um artigo sobre [tema] usando [PDF] e salve em editorial/rascunhos, sem publicar.`
