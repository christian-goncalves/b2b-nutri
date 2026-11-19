# B2B Nutris — Especificação funcional e técnica de SEO, AEO e biblioteca científica

**Versão:** 1.0  
**Data:** 17/11/2026  
**Status:** especificação aprovada em nível de descoberta; **não autoriza implementação**  
**Uso:** referência de produto para análise do repositório e planejamento executivo pelo Codex  
**Escopo:** evolução incremental da aplicação existente, sem reconstrução do site

## 1. Objetivo e regras de interpretação

Construir uma base técnica para descoberta orgânica (SEO e mecanismos de busca com IA), uma biblioteca científica pública de artigos e os caminhos comerciais para venda de e-books, com checkout e entrega de PDFs realizados pela Hotmart. O objetivo comercial prioritário é **vender e-books**. O público é composto, com igual prioridade, por **nutricionistas formados e estudantes de Nutrição**.

Esta especificação define **o resultado esperado**, não assume que todos os componentes devam ser criados do zero. Antes de planejar qualquer trabalho, o Codex deve confrontar cada requisito com o código presente e classificá-lo como **existente/atendido**, **parcial**, **ausente** ou **não verificável sem acesso externo**, indicando evidências (arquivos, linhas e observações). Recursos existentes e adequados devem ser preservados. Em caso de divergência, registrar a diferença e propor a menor mudança possível; **não decidir sozinho novas funcionalidades**.

**Princípios:** simplicidade, reaproveitamento do Next.js e do design system, segurança dos rascunhos, aprovação científica explícita, boa experiência de leitura, indexação controlada e associação útil dos artigos aos produtos. SEO/AEO não implica garantia de posição, tráfego ou citação por IA.

## 2. Decisões já tomadas — não rediscutir sem impedimento comprovado

| Tema | Decisão |
|---|---|
| Público | Nutricionistas formados e estudantes, com a mesma prioridade. |
| Objetivo | Aquisição orgânica qualificada para impulsionar vendas dos e-books via Hotmart. |
| Conteúdo | Biblioteca híbrida, com artigos educativos e de aplicação clínica a partir de **múltiplas coleções**. |
| Fontes | Usar e-books da B2B Nutris como base editorial, verificando e citando fontes científicas primárias/adequadas em cada artigo. |
| Autoria | Autoria institucional **B2B Nutris**; revisão científica identificada da nutricionista, quando efetivamente realizada e autorizada. |
| Formato | Estrutura editorial flexível por assunto, com metadados e elementos técnicos padronizados. |
| Classificação | **Uma categoria principal por artigo + múltiplas tags**. Essa decisão substitui a alternativa anterior de múltiplas categorias. |
| Categorias iniciais | Comportamento alimentar; Micronutrientes; Suplementação; Prática clínica. |
| Categorias no site | Páginas temáticas com introdução útil, listagem de artigos e e-books relacionados (não somente filtros). |
| Relacionamento comercial | Um e-book principal escolhido manualmente; materiais complementares podem ser sugeridos automaticamente por relevância, sem excesso de promoções. |
| Edição e aprovação | Google Drive para documentos, Google Sheets como planilha central; nutricionista marca aprovação diretamente no Sheets; desenvolvedor controla a publicação. |
| Publicação técnica | Artigos aprovados incorporados ao Next.js como arquivos locais Markdown/MDX, versionados no Git. **Sem integração automática com Drive nesta fase.** |
| Infraestrutura | Repositório GitHub conectado à Vercel; domínio/DNS na Hostinger; planejar `main` (produção) e `develop` (homologação). |
| Privacidade | Repositório **privado é o estado desejado** (a mudança ainda não foi executada). Preview protegido para o desenvolvedor e a nutricionista. |
| Produção durante desenvolvimento | Manter a vitrine atual pública, sem abrir a biblioteca nem as compras até o lançamento. |
| Comercialização | Hotmart como checkout e entrega dos PDFs para download. Sem sistema próprio de pagamento ou acesso do comprador. |
| Lançamento | Biblioteca pública e compras habilitadas **simultaneamente**, após testes e aprovações. |
| Custos | Vercel Hobby mantido por ora; adequação do plano ao uso comercial é **pendência a decidir antes do lançamento**, não bloquear o planejamento agora. |

## 3. Estado inicial conhecido (hipóteses a reconfirmar)

Fonte técnica: arquivo de auditoria `SEO-pesquisa.txt`, realizado sobre um checkout local, sem verificação de produção. O Codex **deve revalidar** os achados no commit atual:

- Aplicação Next.js **16.4.6**, App Router, React **19.2.3**, TypeScript, npm; CSS próprio e design system existente.
- Produtos em `web/data/home-books.ts`, com tipos em `web/types/home-book.ts`; catálogo, detalhes por slug, amostras e links internos já existentes.
- Metadados básicos de título/descrição e Open Graph parcial presentes; HTML inicial com componentes de servidor e páginas de produto estáticas.
- Não foram encontrados no checkout anterior: sitemap, `robots.txt`, canonicals, Schema.org, analytics, rotas da biblioteca e fluxo de artigos.
- Seis produtos estavam com `hotmartUrl: null`; sem compra ativa. A vitrine atual inclui seção da autora ainda incompleta, textos de formulários em teste, depoimentos ilustrativos e páginas institucionais provisórias. Verificar o estado atual e tratar pendências de credibilidade/conformidade antes do lançamento.

Não tratar “não encontrado” como prova de inexistência em produção. Confirmar serviços externos somente com evidências disponíveis ou marcar como pendência. Não acessar segredos nem imprimir variáveis sensíveis.

## 4. Escopo funcional mínimo

### 4.1 Biblioteca e navegação

- Adicionar entrada **Biblioteca** à navegação principal, mantendo o catálogo de e-books e a identidade visual existentes.
- Página índice, sugerida `/biblioteca`, com apresentação da proposta editorial e acesso às quatro categorias.
- Uma página pública para cada categoria inicial, sugeridas:
  - `/biblioteca/comportamento-alimentar`
  - `/biblioteca/micronutrientes`
  - `/biblioteca/suplementacao`
  - `/biblioteca/pratica-clinica`
- Categorias devem conter texto introdutório original e útil, navegação para artigos da categoria e, quando pertinente, materiais relacionados. Não criar páginas genéricas apenas para capturar palavras-chave.
- Página de artigo com URL estável independente de categoria, sugerida `/biblioteca/artigos/[slug]`.
- Uma categoria principal determina sua seção; tags organizam assuntos e relacionamentos, **sem geração automática de páginas indexáveis de tags** no MVP.
- Exibir links internos úteis para artigos e produtos, sem dependência exclusiva de filtros executados no cliente.
- Busca interna avançada, filtros complexos, comentários e perfis de leitores **não são requisitos da primeira versão**.

### 4.2 Estrutura dos artigos

O corpo é flexível (seções variam conforme o tema), mas cada artigo publicado deve ter no mínimo:

| Campo lógico | Regra |
|---|---|
| `id` | Identificador estável para conciliar planilha e arquivo publicado. |
| `slug` | Único e persistente, sem mudar quando categoria ou título editorial mudarem. |
| `title` / `summary` | Título público e resumo claro; títulos de SEO e descrições podem ter campos próprios quando necessário. |
| `primaryCategory` | Exatamente uma das quatro categorias válidas. |
| `tags` | Lista de assuntos complementares, normalizados. |
| `primaryProductSlug` | Referência ao e-book principal existente, quando houver associação editorial legítima. |
| `relatedProductSlugs` | Lista opcional de materiais secundários; regras simples para evitar irrelevâncias. |
| `editorialAuthor` | B2B Nutris. |
| `reviewer` | Nome público, qualificação e CRN da nutricionista **apenas se confirmados e autorizados**. |
| `scientificReferences` | Referências identificáveis e verificáveis; preferir documento/URL/DOI quando houver. |
| `version` | Identificador da versão do conteúdo validado. |
| `reviewedAt` | Data da aprovação científica da versão exata. |
| `publishedAt` / `updatedAt` | Datas de publicação/atualização pública, fiéis ao histórico real. |
| `editorialStatus` | Estado controlado; a aplicação deve incluir apenas conteúdo apto ao canal correspondente. |

**Não inventar autoria, CRN, revisão, datas, referências, depoimentos ou evidências clínicas.** O conteúdo deve distinguir fatos, limites das evidências e orientação clínica contextualizada. Como área de saúde, requer revisão humana antes da divulgação.

### 4.3 Modelo visual e conteúdo

- Reaproveitar tipografia, cores, componentes, espaçamento e responsividade existentes.
- Estrutura editorial flexível: o artigo sobre ferritina pode destacar exames; o de comportamento alimentar pode destacar investigação clínica. Não impor sumário fixo a todos.
- Componentes opcionais reutilizáveis: bloco de destaque, tabela acessível, referência, observação clínica, artigo relacionado e chamada discreta para e-book.
- Páginas devem ter conteúdo principal textual no HTML renderizado, não apenas imagens das páginas dos PDFs ou conteúdo carregado exclusivamente no cliente.
- Não transcrever o e-book integralmente no artigo: o artigo responde a uma intenção de busca real e preserva o valor do produto pago.

### 4.4 Fluxo editorial Drive + Sheets

- **Google Drive**: pastas organizadas por categoria/assunto ou outra convenção simples; cada artigo tem um documento editável que a nutricionista pode revisar no Docs ou baixar, corrigir e devolver.
- **Google Sheets**: uma planilha central, uma linha por artigo, com no mínimo `id`, título, categoria, tags, link do documento, e-book principal, estado, versão, revisora, data de aprovação e endereço publicado.
- Estados previstos: `Rascunho` → `Aguardando revisão` → `Em revisão` → (`Ajustes solicitados` → nova revisão) → `Aprovado` → `Pronto para publicação` → `Publicado`.
- **A nutricionista altera para `Aprovado`** quando validar explicitamente a versão. O desenvolvedor verifica a correspondência da versão, incorpora e publica; editar o estado na planilha **não publica automaticamente**.
- Alteração científica após a aprovação exige **nova versão e nova aprovação**. Correções técnicas sem efeito sobre conteúdo devem ser rastreáveis.
- Não exigir que a nutricionista tenha GitHub, Codex ou VS Code. Não criar agora painel próprio, CMS, banco relacional ou conexão automática Drive → site.

### 4.5 SEO técnico, AEO e credibilidade

- Auditar e completar, **sem duplicar**, metadados por rota: títulos, descrições, canonicals, idioma, Open Graph e imagens sociais adequadas.
- Sitemap deve listar somente URLs públicas, canônicas e aptas à indexação; artigos pendentes, páginas privadas, páginas de teste e URLs inexistentes não devem aparecer.
- `robots.txt`, controles `noindex`, redirecionamentos e respostas 404 devem ser coerentes com ambiente e estágio de publicação.
- Utilizar HTML semântico, um `h1` claro por página, hierarquia de headings, breadcrumbs, imagens com textos alternativos relevantes, performance e acessibilidade.
- Dados estruturados JSON-LD **somente quando suportados por conteúdo verdadeiro da página**. Candidatos: `Organization`, `BreadcrumbList`, `Article` para artigos e `Product` quando houver dados comerciais comprovados. Evitar reviews, ratings, preços e ofertas fictícios.
- Dar visibilidade a autoria institucional, revisão científica real, data, fontes e eventual página pública de qualificações profissionais aprovada.
- Para mecanismos de IA, priorizar conteúdo rastreável, respostas claras, evidências e contexto. Verificar políticas de crawlers caso aplicável; **não tratar `llms.txt`, FAQ schema ou qualquer arquivo específico como requisito ou garantia de citações**.
- Cadastrar/verificar Search Console quando cabível e definir medição mínima de descobertas, visitas às páginas de produto e cliques no checkout. Acompanhamento de vendas efetivas depende de relatório/recursos da Hotmart, não apenas do clique.

### 4.6 Produtos, checkout e entrega

- Preservar o catálogo, páginas individuais e amostras já existentes.
- Cada produto deve possuir estado comercial simples e link de checkout oficial centralizado, sem URL inventada.
- Enquanto não houver Hotmart ativa, não exibir botão funcional que prometa compra; o estado na interface deve ser verdadeiro.
- Depois do cadastro das ofertas, o botão da página de produto direcionará ao checkout oficial correspondente.
- A Hotmart tratará pagamento e disponibilização/download do PDF. **Nenhum PDF completo vendido deve ser hospedado publicamente no projeto.**
- Preparar identificação dos cliques de saída e parâmetros de atribuição compatíveis com a documentação atual da Hotmart, sem armazenar dados pessoais desnecessários. Relatórios de vendas e origem serão reconciliados posteriormente.
- **Fora de escopo:** carrinho próprio, login de comprador, webhooks e sincronização de pedidos, painel de clientes, API Hotmart, área de membros própria.

### 4.7 Ambientes, confidencialidade e lançamento

- Projeto hospedado na **Vercel**; GitHub integrado ao deploy; DNS/domínio administrados pela **Hostinger**.
- `main`: produção, mantendo **a vitrine existente** durante o desenvolvimento. Não liberar biblioteca nem links de compra antes do lançamento.
- `develop`: ambiente de Preview com código da nova biblioteca e suas funcionalidades; deve ter **controle real de acesso** para desenvolvedor e nutricionista (conferir capacidades/limites atuais do plano da Vercel).
- Repositório **privado é intenção aprovada**, mas antes de alterá-lo auditar implicações no fluxo atual, permissões e deploy. O código não deve conter segredos; privacidade do Git não substitui controle de acesso ao Preview.
- Somente documentos aprovados podem ser incorporados ao Git e ao Preview. Rascunhos e correções em andamento ficam no Drive/Sheets.
- Não promover mudanças para `main` automaticamente ao concluir uma fase. O lançamento exige autorização expressa do responsável e checklist concluído.
- Plano **Hobby** permanece durante o projeto; verificação e decisão sobre conformidade do uso comercial são um **gate externo obrigatório antes da venda**, sem assumir plano gratuito comercialmente adequado.

## 5. Requisitos não funcionais e qualidade

- Reaproveitar a aplicação Next.js, o design system e a modelagem de produtos, realizando mudanças incrementais.
- Evitar serviços e dependências extras sem justificativa técnica comprovada.
- SEO seguro por ambiente, URL canônica e indexação restrita a páginas públicas aprovadas.
- Conteúdo profissional revisado, sem referências inventadas e com histórico de versões.
- Acessibilidade básica, páginas responsivas, títulos e descrições coerentes, links acessíveis e sem erros de navegação.
- Privacidade: não inserir credenciais em Git ou no conteúdo; não usar documentos de revisão com acesso público irrestrito; revisar páginas legais e eventuais consentimentos de analytics antes do lançamento.
- Observabilidade mínima: build/validação, links, eventos de clique e acompanhamento básico pós-lançamento; sem prometer resultados de SEO.

## 6. Critérios de aceite de produto (não confundidos com tarefas)

1. O visitante navega no índice da biblioteca, nas quatro categorias e em artigos aprovados, por URLs estáveis e links reais.
2. O artigo aparece sob uma categoria principal e tags; mudanças de categoria não quebram sua URL canônica.
3. Cada artigo publicado mostra referências, autoria institucional, revisora aprovada (quando confirmada), versão e datas reais.
4. Um artigo não aprovado **não** aparece no domínio público, sitemap ou listagens públicas; o processo não publica automaticamente a partir da planilha.
5. Cada artigo possui um e-book principal definido editorialmente e, quando pertinente, materiais secundários relevantes; todos os links levam a produtos reais.
6. Conteúdo, título, descrição e elementos essenciais estão no HTML renderizado e podem ser validados sem depender de interações de cliente.
7. Metadados, sitemap, robots, canonicals e JSON-LD propostos correspondem às páginas existentes e ao ambiente correto.
8. A vitrine em `main` permanece preservada até a decisão de lançamento; `develop` não é acessível anonimamente por link de Preview.
9. Produto sem link Hotmart não oferece compra ativa. Produto habilitado aponta ao checkout oficial testado e ao PDF entregue pela Hotmart.
10. Publicação e venda somente após verificação editorial, técnica, comercial, legal e da política do plano de hospedagem.

## 7. Fora de escopo e adiamentos conscientes

Não implementar no MVP: CMS headless, banco de dados próprio, autenticação desenvolvida no Next.js para revisores/compradores, painel editorial no site, sincronização automática com Drive/Sheets, geração massiva/programática de artigos, páginas de tags, busca sofisticada, comentários, venda nativa, área de membros, CRM, automações de e-mail ou webhooks Hotmart. Qualquer ampliação depende de demanda real e nova aprovação.

## 8. Fontes e hierarquia de evidência

- **Decisões de produto:** entrevista de descoberta B2B Nutris consolidada até 17/11/2026. Em caso de escolhas revertidas, prevalece a decisão **mais recente**, explicitada na seção 2.
- **Auditoria da aplicação:** `SEO-pesquisa.txt` (snapshot, não prova de produção). O repositório atual prevalece sobre a auditoria para fatos técnicos.
- **Materiais-base da marca:** PDFs enviados neste projeto: `00 - Antes da consulta` (material gratuito), `01 - Por trás do comportamento alimentar`, `02 - O olhar comportamental na consulta nutricional`, `03 - Da Escuta à Conduta`, `04 - Guia visual das vitaminas`, `05 - Minerais`, `06 - Suplementação`. O material gratuito não deve ser automaticamente tratado como um dos seis e-books pagos.
- **Fontes científicas dos artigos:** referências verificáveis por artigo, conferidas pela nutricionista; PDFs internos são ponto de partida, não substituem citação direta e verificação da evidência.
- **Documentação externa:** requisitos atuais de Next.js, Vercel, Google e Hotmart precisam de conferência no momento do plano/implementação, especialmente restrições de planos e recursos.

## 9. Instruções de uso para o Codex

1. Ler esta especificação integralmente.
2. Inspecionar código, scripts, documentação e infraestrutura configurada no repositório, **sem alterar nada** na fase de planejamento.
3. Criar matriz requisito × evidência × estado × lacuna × menor ação necessária.
4. Atualizar `docs/plano-execucao-seo-aeo.md` a partir do pré-plano, com tarefas concretas, dependências, testes, checkpoints e gates de aprovação.
5. Não supor credenciais, acessos, links Hotmart ou autorizações da nutricionista.
6. Não executar alterações, commits, pushes, deploys, instalações, mudanças em GitHub/Vercel/Hostinger ou criação de artigos até autorização explícita por fase.
