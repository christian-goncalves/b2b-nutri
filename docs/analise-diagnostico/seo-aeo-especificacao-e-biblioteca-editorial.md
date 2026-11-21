# Diagnóstico da implementação de SEO, AEO e biblioteca editorial

## Objeto da investigação

Classificar o que o checkout atual implementa da especificação de SEO, AEO e biblioteca científica da B2B Nutris, identificar lacunas locais e separar os pontos que dependem de validação externa. A análise também avalia se as quatro skills registradas no projeto ajudam como referências complementares.

## Contexto

O responsável delimitou a investigação ao código e à especificação local. A arquitetura editorial da biblioteca e o fluxo de publicação fazem parte do escopo. A análise não revisa o mérito clínico dos artigos nem verifica o domínio de produção, o Google Search Console ou o desempenho orgânico.

`docs/especificacao-seo-aeo.md` define o objetivo comercial, o público e os requisitos funcionais. `docs/plano-execucao-seo-aeo.md` organiza a implementação da biblioteca e suas verificações. `docs/roteiro.md` inclui SEO no CP-06, que continua aberto. `docs/decisoes-implementacao.md` não registra decisões específicas de SEO.

O arquivo `docs/analise-diagnostico/seo-atual-e-f12.md` registra uma inspeção anterior do DOM local. Esta investigação tem escopo diferente: compara a especificação formal com a biblioteca editorial presente no checkout atual.

## Evidências examinadas

- `AGENTS.md:3-24`: hierarquia das fontes, uso do código para identificar o comportamento atual, checkpoints e limites para documentação.
- `docs/roteiro.md:279-297, 381-396`: requisitos gerais de SEO e status aberto do CP-06.
- `docs/decisoes-implementacao.md:1-6, 82-99`: escopo das decisões existentes e pendências que não alteram a especificação de SEO.
- `docs/especificacao-seo-aeo.md:11-15, 21-38, 54-118, 150-182`: público, objetivo, arquitetura editorial, requisitos técnicos, critérios de aceite e limites do escopo.
- `docs/plano-execucao-seo-aeo.md:3-5, 13-29`: escopo da etapa Biblioteca e SEO, verificações previstas e dependências externas.
- `docs/analise-skills-b2bnutris.md:1-12, 55-101, 133-181`: quatro skills citadas, síntese anterior e pergunta de descoberta ainda sem resposta naquele documento.
- `docs/analise-diagnostico/seo-atual-e-f12.md:1-5, 39-61`: diagnóstico anterior, limitado ao SEO no checkout e à inspeção de F12 local.
- `web/lib/seo.ts:3-77`, `web/app/layout.tsx:16-58`, `web/app/robots.ts:4-12` e `web/app/sitemap.ts:7-25`: origem do site, metadados, indexação por ambiente, robots e sitemap.
- `web/app/biblioteca/page.tsx:6-37`, `web/app/biblioteca/[slug]/page.tsx:13-110` e `web/app/biblioteca/artigos/[slug]/page.tsx:31-176`: índice da biblioteca, páginas de categoria e artigos.
- `web/app/biblioteca/page.tsx:14-26`, `web/app/biblioteca/[slug]/page.tsx:53-70`, `web/app/biblioteca/artigos/[slug]/page.tsx:109-145` e `web/components/breadcrumbs.tsx:6-25`: estrutura semântica, headings e breadcrumbs.
- `web/data/library/categories.ts:1-46`, `web/types/scientific-article.ts:4-35` e `web/data/library/articles.ts:1-12, 13-210, 213-258`: categorias, modelo editorial, registros, validação e filtro de artigos aprovados.
- `web/components/structured-data.tsx:5-20`, `web/components/breadcrumbs.tsx:6-25`, `web/components/library-article-card.tsx:20-40` e `web/components/site-header.tsx:4-29`: dados estruturados, navegação e cards.
- Sete arquivos Markdown em `editorial/publicados/`, com uma seção `Referências` em cada arquivo. Foram inspecionados os caminhos e os títulos dessas seções, sem avaliar a qualidade clínica das referências.
- `web/data/home-books.ts:25-133`: estado local dos seis campos `hotmartUrl`.
- `web/package.json:5-12` e `web/next.config.ts:1-16`: scripts disponíveis e suporte a Markdown/MDX.
- Busca no código de `web/` por Search Console, Google Analytics, Tag Manager, eventos de saída para Hotmart e diretivas específicas de crawlers de IA; a busca não encontrou correspondências.
- `git status --short --untracked-files=all`, `git ls-files editorial/publicados` e `git branch --show-current`: branch `develop`, alterações locais não commitadas, cinco arquivos Markdown publicados rastreados e dois não rastreados, além de alterações em `web/data/library/articles.ts` e na página de artigo.
- Skill `SEO Audit` em [GitHub](https://github.com/coreyhaines31/marketingskills/blob/main/skills/seo-audit/SKILL.md), `AI SEO` em [GitHub](https://github.com/coreyhaines31/marketingskills/blob/main/skills/ai-seo/SKILL.md), `Programmatic SEO` em [GitHub](https://github.com/coreyhaines31/marketingskills/blob/main/skills/programmatic-seo/SKILL.md) e `Copy Editing` em [GitHub](https://github.com/coreyhaines31/marketingskills/blob/main/skills/copy-editing/SKILL.md), consultadas em 2026-11-19. As buscas nas pastas globais e na pasta `.agents/skills/` do projeto não localizaram cópias instaladas dessas quatro skills.
- [Documentação do Google sobre recursos de IA na Busca](https://developers.google.com/search/docs/appearance/ai-features) e [documentação da OpenAI sobre crawlers](https://developers.openai.com/api/docs/bots), consultadas apenas para comparar as sugestões das skills com as regras externas sobre arquivos especiais e crawlers.

## Estado observado

- O checkout está no branch `develop`. Há alterações e arquivos não commitados no código editorial e nos artigos. Dos sete arquivos em `editorial/publicados/`, cinco estão rastreados e dois não rastreados pelo Git no estado examinado.
- `web/lib/seo.ts` gera canonical, robots, Open Graph e Twitter Card por rota. `web/app/layout.tsx` define `metadataBase`, idioma `pt-BR`, metadados globais e uma imagem social.
- `web/app/robots.ts` bloqueia o site fora de produção e libera o rastreamento geral em produção, com bloqueio de `/api/`. `web/app/sitemap.ts` retorna vazio fora de produção e, em produção, lista a home, o catálogo, os e-books, as quatro categorias e os artigos aprovados.
- A navegação principal contém `/biblioteca`. O índice apresenta quatro categorias; cada página de categoria tem introdução, artigos e e-books relacionados.
- A página de categoria e a página de artigo usam slugs estáticos. A página de artigo recebe slugs de `getApprovedArticles()` e retorna 404 para artigos ausentes do registro.
- O registro local contém sete artigos com estado `approved`, IDs, slugs, uma categoria principal, tags, produto principal, referências, versão e datas. Os sete arquivos de conteúdo estão em `editorial/publicados/` e contêm uma seção intitulada `Referências`; cinco são rastreados pelo Git e dois estão não rastreados no estado examinado.
- As páginas de artigo mostram título, resumo, autoria institucional, data de publicação e tags. O campo de revisora é opcional. Nenhum dos sete registros contém esse campo. O card da biblioteca mostra `updatedAt`; a página do artigo não mostra versão, data de revisão ou data de atualização no conteúdo visível.
- O JSON-LD de artigo inclui título, resumo, datas, autoria, versão e citações. Os breadcrumbs geram `BreadcrumbList`. Não foi encontrado JSON-LD independente de `Product` ou `Organization`.
- Um card de demonstração de micronutrientes aparece somente em ambiente de desenvolvimento quando a categoria não tem artigos. O card não pertence ao registro aprovado usado pelas rotas e pelo sitemap.
- Os seis produtos estão com `hotmartUrl: null`. As páginas de produto exibem o estado de link ainda não informado, conforme `web/app/ebooks/[slug]/page.tsx:93-100`.
- O código contém rotas para termos e privacidade com `noindex`. Essas páginas não aparecem no sitemap. As rotas de amostra também usam `noindex` e não aparecem no sitemap.
- O checkout local não contém integração de medição identificável por Search Console, Google Analytics, Tag Manager ou evento de clique na Hotmart.
- O código do repositório não comprova autenticação dos Previews, estado do deployment de produção, registro do Search Console, acesso real de crawlers ou indexação externa.

## Análise

O checkout contém a base técnica prevista para metadados e indexação. A função compartilhada centraliza canonicals e metadados por rota. `robots.ts` e `sitemap.ts` variam com `VERCEL_ENV`, e o sitemap obtém artigos somente do registro aprovado. Esses fatos atendem aos requisitos observáveis de metadados, robots e inclusão controlada no sitemap.

| Requisito da especificação | Estado no checkout | Evidência e limite |
|---|---|---|
| Metadados por rota, canonical, idioma e imagens sociais | Atendido no código | `web/lib/seo.ts:33-77`, `web/app/layout.tsx:16-58` e chamadas de metadados nas rotas. Não houve inspeção do HTML de produção. |
| Indexação por ambiente, robots e sitemap de conteúdo público aprovado | Atendido no código; configuração externa não verificada | `web/app/robots.ts:4-12` e `web/app/sitemap.ts:7-25`. A regra de robots não demonstra proteção de acesso ao Preview. |
| Índice, quatro categorias, artigos por slug e links para produtos | Atendido no código | `web/data/library/categories.ts:14-42`, rotas de biblioteca e artigos, e `web/app/biblioteca/artigos/[slug]/page.tsx:149-173`. |
| Gate editorial sem publicação automática de rascunhos | Atendido como mecanismo local | A página e o sitemap consultam `getApprovedArticles()`. A aprovação real pela nutricionista não pode ser confirmada apenas pelo valor `approved` no código. |
| Campos editoriais de autoria, referências, versão e datas | Atendidos no modelo; visibilidade pública parcial | O modelo e os registros contêm os campos requeridos. A página mostra autoria e publicação, mas não expõe `reviewedAt` nem revisora. `updatedAt` aparece no card. A versão não é exibida, mas a especificação não exige sua exibição pública. |
| Referências visíveis no conteúdo publicado | Presente estruturalmente; conteúdo não avaliado | Os sete arquivos MDX têm seção `Referências` e a página renderiza o corpo MDX. A análise não valida exatidão, relevância ou aprovação clínica das fontes. |
| HTML semântico, um `h1` e breadcrumbs | Presente no código | As páginas de índice, categoria e artigo usam `main` e um `h1`; artigos e categorias usam breadcrumbs com `nav`, lista ordenada e `BreadcrumbList`. O HTML renderizado não foi inspecionado. |
| Dados estruturados sustentados pela página | Atendido em parte | Há `Article` e `BreadcrumbList`. `Product` é candidato condicional na especificação e depende de dados comerciais comprovados; sua ausência não é classificada como requisito ausente. |
| Rastreamento, Search Console e mensuração de cliques | Não encontrado no código; estado externo não verificado | A especificação prevê Search Console e medição mínima. A busca estática no código não encontrou integrações; isso não informa se há configuração na conta externa. |
| Compra e atribuição comercial | Pendente de dados externos | Os artigos apontam para e-books locais, mas todos os `hotmartUrl` estão nulos. Não há evento de clique de saída encontrado no código. |
| Qualidade de execução, acessibilidade e desempenho | Não verificado nesta investigação | O plano prevê build, testes, revisão do HTML, responsividade e acessibilidade. Nenhum comando de teste, build ou medição foi executado neste diagnóstico. |

O registro `approvedArticles` restringe as rotas e o sitemap aos sete artigos presentes. Isso implementa um gate local simples e compatível com a regra de publicação manual. A marcação de aprovação e as datas registradas não constituem, por si só, prova de aprovação editorial externa.

Não classifico a ausência de versão visível como pendência: a especificação exige esse campo no modelo, mas não exige que apareça na página pública. Para visibilidade, a especificação cita autoria institucional, revisão científica real, data e fontes. A página mostra autoria e publicação, mas não mostra `reviewedAt` nem revisora; `updatedAt` aparece apenas nos cards. A revisora só deve aparecer se sua identidade e autorização forem confirmadas. Os campos locais `approved` e `reviewedAt`, sozinhos, não comprovam que houve aprovação científica real.

As skills têm utilidade desigual para este diagnóstico. `SEO Audit` oferece uma sequência de verificação de rastreamento, indexação e SEO técnico. `AI SEO` pode complementar a inspeção de rastreabilidade e conteúdo textual. A especificação do projeto continua sendo o critério para declarar algo faltante.

`Programmatic SEO` não se aplica à etapa atual, porque a especificação exclui geração massiva de artigos e páginas de tags. `Copy Editing` trata revisão de texto de marketing; essa atividade fica fora do escopo confirmado. Nenhuma das quatro skills está instalada nas pastas globais ou na pasta do projeto consultadas, embora as instruções públicas estejam disponíveis nos links examinados.

A skill `AI SEO` sugere arquivos e formatos específicos para agentes. A especificação B2B Nutris não os trata como requisito. A documentação atual do Google também afirma que arquivos de IA ou schema especial não são necessários para os recursos de IA da Busca. Portanto, a ausência de `llms.txt` não é uma lacuna deste projeto. Para ChatGPT, a documentação da OpenAI distingue `OAI-SearchBot` de `GPTBot`; o código local usa uma regra geral em produção, mas não prova acesso do crawler através da infraestrutura hospedada.

## Diagnóstico

A implementação local de SEO, AEO e biblioteca editorial está parcialmente concluída. O checkout já contém metadados por rota, canonicals, Open Graph, Twitter Cards, controle de indexação por ambiente, sitemap, quatro categorias, sete artigos e um registro manual de conteúdo aprovado. O fluxo local associa cada artigo a um e-book e mantém referências no conteúdo MDX.

A lacuna diretamente observável na apresentação pública é a falta de visibilidade da revisão científica e de sua data: a página mostra autoria e publicação, mas não `reviewedAt` nem revisora. A versão existe no modelo e no JSON-LD; sua ausência na interface não é uma lacuna comprovada frente à especificação. O código não comprova que os artigos marcados como aprovados receberam aprovação real. Dois dos sete arquivos MDX referenciados pelo registro não estão rastreados no Git no estado examinado.

A medição orgânica, a configuração do Search Console, a autenticação do Preview, a publicação em produção e o acesso real de crawlers permanecem fora do que o checkout pode comprovar. O CP-06 continua aberto segundo `docs/roteiro.md:381-396`. As quatro skills servem como referências complementares, com `SEO Audit` e `AI SEO` mais próximos deste diagnóstico; `Programmatic SEO` e `Copy Editing` não acrescentam critérios aplicáveis ao escopo confirmado.

## Grau de certeza

Alto para os recursos presentes e ausentes no código local examinado. Médio para a classificação geral frente à especificação, pois o build e as respostas locais não foram reproduzidos. Nenhuma conclusão sobre disponibilidade pública, indexação, tráfego ou citações por IA foi confirmada.

## Pontos ainda não comprovados

- Se os sete artigos receberam aprovação explícita da nutricionista e se as datas de revisão correspondem às versões publicadas.
- Se os arquivos MDX não rastreados serão incorporados ao commit que alimentará o Preview ou outro deployment.
- Qual branch e commit alimentam o domínio de produção e se o Preview exige autenticação para as pessoas previstas.
- Se Search Console, analytics ou medição de cliques foram configurados fora do código.
- Se Googlebot, OAI-SearchBot e outros crawlers conseguem acessar o conteúdo pelo hosting e pelas regras de rede.
- Se o HTML final, o sitemap, o robots, o build, os testes, a responsividade e a acessibilidade atendem em execução aos critérios do plano.
