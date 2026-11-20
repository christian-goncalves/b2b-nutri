# Diagnóstico da tabela Markdown no artigo sobre queixa alimentar

## Objeto da investigação

Determinar por que a tabela do artigo “Como transformar a queixa alimentar do paciente em perguntas de investigação clínica” não se adapta à tela e identificar lacunas nas skills de criação e publicação de artigos.

## Contexto

O artigo está cadastrado na biblioteca local e usa uma tabela Markdown com três colunas para relacionar queixas, pontos de investigação e perguntas clínicas. A rota indicada foi aberta em uma janela estreita para comparar o conteúdo-fonte com a apresentação da aplicação.

## Evidências examinadas

- `.agents/skills/b2b-artigos/SKILL.md:32-43` define a estrutura do Markdown e permite tabelas quando ajudarem, sem descrever compatibilidade com o renderizador ou comportamento em telas estreitas.
- `.agents/skills/b2b-publicar-artigo/SKILL.md:57-66` exige preservar o texto e validar a rota, o card e os metadados. A validação menciona que o artigo deve renderizar, mas não define como verificar a conversão de tabelas ou a apresentação responsiva.
- `editorial/artigos-criados/2026-11-19-como-transformar-a-queixa-alimentar-do-paciente-em-perguntas-de-investigacao-clinica.md:11-17` contém uma tabela Markdown de três colunas, com cabeçalho e linha separadora.
- `web/next.config.ts:6` configura `@next/mdx` com a extensão `.md` e `.mdx`, sem configurar plugins Remark. `web/package.json:14-24` não declara `remark-gfm`.
- `web/app/biblioteca/artigos/[slug]/page.tsx:23-29, 143-145` passa o conteúdo MDX à página e substitui os componentes de parágrafo e título, sem transformação específica para tabelas.
- `web/app/globals.css:367-369` limita a largura de elementos `table` e permite rolagem horizontal quando necessário.
- Rota local `http://localhost:3000/biblioteca/artigos/como-transformar-queixa-alimentar-em-perguntas-investigacao-clinica`, observada em 2026-11-19. A captura `.playwright-mcp/page-2026-11-19T16-01-16-363Z.png` mostra a sintaxe da tabela como texto corrido, incluindo barras verticais e separadores.
- A árvore de acessibilidade da mesma rota representa todo o conteúdo da tabela em um único elemento `paragraph`; não há elementos `table`, `tr`, `th` ou `td` nessa seção.

## Estado observado

O Markdown contém uma tabela com três colunas. Na rota local, a seção aparece como um parágrafo de texto que mantém os caracteres `|` e `---`. O navegador não apresenta essa seção como tabela HTML.

O CSS prevê rolagem horizontal para tabelas. A seção observada não corresponde a um elemento `table`, então essa regra não se aplica.

As skills locais consultadas permitem tabelas no artigo e exigem validação da rota, mas não especificam uma checagem de compatibilidade entre a sintaxe Markdown usada e os recursos habilitados no renderizador. Também não encontrei nelas uma exigência explícita de validar o artigo em tela estreita.

## Análise

A origem contém sintaxe de tabela do GitHub Flavored Markdown. A configuração MDX observada não habilita plugins Remark, e a aplicação local converte a seção em parágrafo, como mostram a árvore da página e a captura. Essa correlação identifica a etapa de parsing como a falha técnica imediata.

A regra CSS de responsividade da tabela só pode atuar após a conversão do Markdown em elemento HTML `table`. Como a conversão não ocorre, a regra não corrige nem causa a apresentação observada.

A skill de criação permite usar uma tabela quando ela ajuda. A skill de publicação preserva o Markdown e considera suficiente confirmar que a página renderiza, sem critérios para detectar uma tabela que chegou à tela como texto literal. Essa lacuna deixa passar a incompatibilidade entre a sintaxe produzida e a configuração efetiva do renderizador.

## Hipóteses avaliadas

- **A tabela excede a largura da tela e é cortada:** enfraquecida como explicação da falha observada. O navegador não recebe um elemento `table`; os separadores aparecem como texto.
- **O Markdown não contém a estrutura de tabela:** descartada. O arquivo tem cabeçalho, separador e três colunas nas linhas examinadas.
- **A skill de publicação converteu ou reescreveu a tabela incorretamente:** não sustentada. A regra da skill determina preservar o conteúdo, e a rota recebe os caracteres da tabela como texto. A evidência aponta para o parsing MDX.
- **A skill exige explicitamente adaptar o Markdown à tela:** não confirmada nas versões locais examinadas. Elas não trazem essa regra de forma explícita.

## Diagnóstico

A tabela não se adapta à tela porque o renderizador local não converte a sintaxe de tabela usada no Markdown em HTML semântico. A página exibe o texto-fonte da tabela como parágrafo, fora do alcance das regras CSS destinadas a tabelas.

As skills não são a causa técnica direta. A lacuna nelas é não exigir compatibilidade entre os recursos de Markdown do artigo e o parsing configurado, nem uma validação responsiva que identifique quando um bloco aparece como texto literal. A alegação de que a skill atual já manda adaptar o Markdown à tela não corresponde ao conteúdo local consultado.

## Grau de certeza

Alto quanto à causa da apresentação na rota local: a captura, a árvore da página, o conteúdo do Markdown e a configuração MDX são consistentes. Alto quanto à ausência das regras mencionadas nas duas skills examinadas. O diagnóstico se limita à instância local observada.

## Pontos ainda não comprovados

- Não foi verificada a rota de Produção nem outro deployment.
- Não foi avaliada uma alternativa editorial para exibir essa tabela em telas estreitas, como rolagem horizontal ou organização em blocos.
- Não foram examinados outros artigos ou outros recursos GFM para determinar se a mesma incompatibilidade afeta mais conteúdo.
