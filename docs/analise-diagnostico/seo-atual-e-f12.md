# Diagnóstico do SEO atual e visibilidade no F12

## Objeto da investigação

Identificar o que está implementado de SEO no checkout atual, comparar com a documentação localizada na raiz de `docs/` e verificar quais elementos aparecem no DevTools (F12) em uma página local.

## Contexto

O pedido foi analisar a documentação e o código sem implementar mudanças de SEO. A auditoria `docs/SEO-pesquisa.txt` é um snapshot anterior à implementação da biblioteca; `docs/especificacao-seo-aeo.md` instrui revalidar esse snapshot no commit atual e declara que o código prevalece para fatos técnicos.

## Evidências examinadas

- Documentação na raiz de `docs/`: `SEO-pesquisa.txt`, `especificacao-seo-aeo.md`, `plano-execucao-seo-aeo.md`, `roteiro.md` e `decisoes-implementacao.md`.
- `docs/SEO-pesquisa.txt:34-61, 83-93`: estado do SEO descrito no snapshot anterior e limites daquela auditoria.
- `docs/especificacao-seo-aeo.md:40-50, 109-118, 150-158, 167-173`: necessidade de revalidar o snapshot, requisitos e critérios de aceite.
- `docs/plano-execucao-seo-aeo.md:13-25`: tarefas e verificações previstas para biblioteca e SEO.
- `docs/roteiro.md:279-291, 381-390`: requisitos gerais de SEO e inclusão no CP-06.
- `docs/decisoes-implementacao.md:1-6`: escopo do documento de decisões, voltado a formulários, e-mail, amostras e privacidade; não contém decisão específica de SEO.
- `web/lib/seo.ts:3-20, 22-77`; `web/app/layout.tsx:16-44`.
- `web/app/robots.ts:4-12`; `web/app/sitemap.ts:7-25`.
- `web/components/structured-data.tsx:5-20`; `web/components/breadcrumbs.tsx:6-25`.
- `web/app/page.tsx:10-14`; `web/app/biblioteca/page.tsx:6-10`; `web/app/biblioteca/[slug]/page.tsx:13-35`; `web/app/biblioteca/artigos/[slug]/page.tsx:31-57, 75-94`; `web/app/ebooks/page.tsx:5-9`; `web/app/ebooks/[slug]/page.tsx:10-38`.
- `web/data/library/articles.ts:5-39`: cadastro local atual do artigo de vitamina B1.
- Respostas locais de `http://localhost:3000/biblioteca/artigos/vitamina-b1-sinais-deficiencia-fatores-risco`, `/biblioteca/micronutrientes`, `/robots.txt` e `/sitemap.xml`; busca no código por integrações de Analytics, Tag Manager e Search Console.

## Estado observado

- `docs/SEO-pesquisa.txt` afirma que sitemap, robots, canonical e Schema.org não foram encontrados. Porém, a especificação qualifica essa auditoria como snapshot anterior e exige revalidar o checkout atual (`docs/especificacao-seo-aeo.md:40-50, 167-170`).
- `docs/plano-execucao-seo-aeo.md` define metadados por rota, canonical, Open Graph, sitemap, robots, HTML semântico e dados estruturados como itens de implementação/verificação. O texto do plano não serve, sozinho, como prova de que cada item continua pendente (`:13-19`).
- `docs/decisoes-implementacao.md` registra decisões sobre outros assuntos do projeto, sem uma decisão específica de SEO.
- A aplicação gera título, descrição, canonical, robots, Open Graph e Twitter Card por uma função comum. A origem e a indexação variam conforme `VERCEL_ENV` (`web/lib/seo.ts:3-19, 33-77`). O layout define idioma `pt-BR`, metadados padrão, imagem social global e `metadataBase` (`web/app/layout.tsx:16-52`).
- Home, índice da biblioteca, categorias, artigos, catálogo e páginas de e-book possuem metadados específicos ou gerados a partir dos dados da rota. Artigos recebem metadados Open Graph do tipo `article`, datas e autoria (`web/app/page.tsx:10-14`; `web/app/biblioteca/page.tsx:6-10`; `web/app/biblioteca/[slug]/page.tsx:19-35`; `web/app/biblioteca/artigos/[slug]/page.tsx:37-57`; `web/app/ebooks/page.tsx:5-9`; `web/app/ebooks/[slug]/page.tsx:23-38`).
- Há `robots.txt` e sitemap gerados pelo Next. Fora de produção, o robots bloqueia `/` e o sitemap retorna vazio. Em produção, robots permite o site, bloqueia `/api/` e aponta para o sitemap; este inclui home, catálogo, e-books, biblioteca, categorias e artigos aprovados (`web/app/robots.ts:4-12`; `web/app/sitemap.ts:7-25`).
- A página de artigo produz JSON-LD `Article`; breadcrumbs produzem JSON-LD `BreadcrumbList` (`web/app/biblioteca/artigos/[slug]/page.tsx:75-94`; `web/components/structured-data.tsx:5-20`; `web/components/breadcrumbs.tsx:6-25`).
- As páginas têm HTML semântico e headings; o artigo atual apresenta um `h1` com o título e breadcrumbs. A rota estática é gerada para slugs aprovados (`web/app/biblioteca/artigos/[slug]/page.tsx:31-35, 108-139`).
- No HTML servido localmente para o artigo, o `<head>` contém título, descrição, `noindex, nofollow`, canonical apontando para localhost, tags Open Graph e Twitter. O corpo contém scripts JSON-LD `BreadcrumbList` e `Article`. `/robots.txt` local responde `Disallow: /`, e o sitemap local está vazio.
- A busca no código por identificadores e scripts de Google Analytics, Tag Manager, Search Console, Plausible, PostHog e Umami não encontrou integração correspondente.

## Análise

O documento `SEO-pesquisa.txt` não descreve o estado atual: ele documenta corretamente o checkout examinado naquele momento, mas foi superado por implementação posterior. A especificação reconhece explicitamente o limite temporal dessa auditoria e determina que o código atual prevaleça. O que consta como requisito no plano ou na especificação não deve ser confundido com código implementado.

O estado atual tem uma base técnica relevante: metadados por página, canonical, controle de indexação por ambiente, imagem social compartilhada, Twitter Cards, `robots.txt`, sitemap, HTML de servidor e JSON-LD para artigos e breadcrumbs. A implementação continua parcial: não foi encontrada mensuração por Analytics/Search Console/Tag Manager; não há schema `Product` observado nas páginas de e-book nem schema `Organization` independente; a imagem Open Graph é compartilhada em vez de personalizada por artigo; e o código no checkout não comprova o que está efetivamente servido no domínio de produção.

No F12, o navegador mostra a representação DOM da página. O `<head>` permite inspecionar título, descrição, canonical, robots, Open Graph e Twitter. Os scripts `application/ld+json` aparecem no DOM e contêm os dados estruturados. Esses elementos não precisam aparecer como texto visível na página. A rota `/robots.txt` e `/sitemap.xml` deve ser aberta diretamente ou inspecionada na aba Network.

O `noindex, nofollow` e o bloqueio total por `robots.txt` observados em `localhost` são o comportamento intencional para ambiente que não é produção, conforme o código. Isso não demonstra que o site de produção está indexável ou que o Google o indexou; essa conclusão exige inspeção do domínio/deploy e dos dados do Search Console.

## Diagnóstico

Parte substancial da infraestrutura técnica básica de SEO está implementada no código local, inclusive para a biblioteca e o artigo atual. A auditoria antiga na raiz de `docs/` deve ser lida como retrato histórico; a documentação de especificação e plano expressa requisitos, enquanto o código é a evidência do estado implementado. No F12 local, metadados e JSON-LD são visíveis no DOM, mas a indexação está deliberadamente desativada fora de produção.

## Grau de certeza

Alto para o código do checkout e para as respostas de `localhost` inspecionadas; não se estende ao HTML de produção, indexação efetiva, posicionamento ou resultados de busca.

## Pontos ainda não comprovados

- HTML, `robots.txt` e sitemap atualmente servidos no domínio de produção.
- Estado de indexação, cobertura, desempenho e tráfego no Google Search Console ou em outra ferramenta externa.
- Elegibilidade do JSON-LD para resultados enriquecidos; a presença do schema não garante exibição pelo mecanismo de busca.
