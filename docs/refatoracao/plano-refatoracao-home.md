# Plano executivo para refatorar a home

Plano técnico para reorganizar `web/app/page.tsx` conforme a estrutura comercial aprovada pela skill `landing-page-design`, com reaproveitamento da interface e dos componentes existentes.

| Campo | Definição |
| --- | --- |
| Status | Proposta para revisão e aprovação antes da implementação |
| Público | Responsável pelo projeto e agente que implementar as etapas |
| Escopo | Composição da home, links de catálogo, estilos locais e validação visual |
| Fora de escopo | Redesign, integração de e-mail, alteração de flags globais, mudanças no catálogo e nas páginas individuais |
| Referências | [skill landing-page-design](../../.agents/skills/landing-page-design/SKILL.md), [roteiro](../roteiro.md), [decisões de implementação](../decisoes-implementacao.md) |

## 1. Resumo executivo

A home atual repete os seis produtos em três composições: o hero rotativo, os destaques e o catálogo. A proposta remove a apresentação rotativa e a grade completa da home, mantendo três cards que levam ao catálogo `/ebooks`. O catálogo, os seis produtos, suas páginas individuais, suas amostras e seus dados comerciais continuam no fluxo existente.

A nova composição segue esta ordem: hero, credibilidade compacta, problema, benefícios, três e-books, convite à Biblioteca, sobre Bianca, depoimentos autênticos quando autorizados, perguntas frequentes e chamada final para o guia. A composição reutiliza `BookCard`, `SectionHeading`, os estilos de seção e os tokens atuais. A proposta não altera os tokens do Design System nem cria dependências.

O CTA do guia depende da definição e implementação futura de captação, verificação de endereço e entrega do PDF. Esta tarefa de planejamento não autoriza essa integração. A home não deve renderizar formulário, CTA ou promessa de entrega enquanto o fluxo não estiver operacional.

## 2. Base técnica verificada

Os fatos abaixo vêm do código atual. A ordem proposta e as etapas são recomendações para aprovação.

| Evidência no repositório | Consequência para o plano |
| --- | --- |
| `web/app/page.tsx:21-40` renderiza o slider e os destaques; `web/app/page.tsx:88-105` renderiza novamente todos os produtos. | A home deixa de exibir o slider de produtos e a grade completa. A grade de três cards passa a ser a única vitrine de produtos na home. |
| `web/data/home-books.ts:9-138` contém seis produtos; `:140-143` deriva slider, destaques, catálogo e categorias das flags. Os seis registros têm `featuredInSlider` e `featuredOnHome` ativos. | A seleção de três produtos para a home terá uma lista própria de slugs. Não se alteram `featuredInSlider`, `featuredOnHome` nem `published`. |
| `web/components/book-card.tsx:5-22` já exibe capa, categoria, título, descrição e link para a página individual. | O componente será reutilizado com uma opção explícita para direcionar os cards da home a `/ebooks`. O destino padrão continuará sendo a página individual, preservando catálogo e páginas de produto. |
| `web/components/section-heading.tsx:1-22` fornece cabeçalho de seção; `web/styles/tokens.css` e `web/styles/components.css` definem fontes, cores, superfícies, grids e botões. | As novas seções usam esses componentes e tokens. A implementação não corrige automaticamente diferenças entre tokens e superfícies atuais. |
| `web/app/page.tsx:42-77` reúne sobre a autora e newsletter; `:79-86` mostra estado vazio de lançamento; `:107-131` renderiza depoimentos demonstrativos; `:133-164` exibe contato indisponível. | Sobre a autora permanece com conteúdo factual disponível. Newsletter, lançamento vazio, depoimentos demonstrativos e formulário de contato saem da composição conforme os gates e decisões descritos abaixo. |
| `web/app/ebooks/page.tsx`, `web/app/ebooks/[slug]/page.tsx`, `web/components/ebook-catalog.tsx` e `web/data/home-books.ts` alimentam o catálogo e os produtos. | Essas rotas e dados ficam fora das alterações. A implementação verifica que continuam acessíveis e completos. |
| `web/public/images/books/` contém as seis capas e `web/public/images/logo.png` contém a marca. `web/public/images/testimonials/` contém fundos demonstrativos. | Reutilizar as capas pelo `BookCard`. Não usar os fundos de depoimentos demonstrativos nem adicionar assets. O hero pode usar a marca existente se a composição atual comportar o asset sem competir com a oferta. |
| Não há referência a `Antes da Consulta` em `web/data/home-books.ts` nem arquivo correspondente entre os assets de `web/public/`. | A presença, autorização e localização do PDF gratuito precisam ser confirmadas antes de ativar qualquer CTA de entrega. |

## 3. Mapeamento da composição atual

| Seção atual | Tratamento previsto | Resultado na home |
| --- | --- | --- |
| Cabeçalho global | Manter | Cabeçalho e menu móvel permanecem em `web/app/layout.tsx`, `web/components/site-header.tsx` e `web/components/mobile-menu.tsx`. A navegação preserva `/ebooks`, `/biblioteca`, `/#sobre` e `/#contato`, com o destino de contato sujeito à decisão da seção 7. |
| Hero com `HomeHeroSlider` | Substituir a composição, sem apagar o componente | Hero estático com o texto comercial aprovado, a proposta da marca e CTA secundário para `/ebooks`. Renderizar o CTA do guia apenas depois que o fluxo estiver operacional e aprovado. Preservar o fundo creme e a linguagem de espaçamento atual. Não usar mockup anterior ou foto não fornecida. |
| E-books em destaque | Reutilizar, reduzir de seis para três e reposicionar | Três `BookCard` após benefícios. Todos levam a `/ebooks`, conforme a estrutura aprovada. A lista dos três slugs exige aprovação. |
| Sobre a autora com newsletter | Reposicionar e simplificar | Seção “Sobre Bianca” depois do convite à Biblioteca. Preservar a estrutura visual vinho e o conteúdo apenas quando houver biografia, formação e fotografia reais aprovadas. Retirar a newsletter da home; ela não é a oferta do guia. |
| Próximo lançamento | Remover da composição | Não exibir o bloco vazio “Nenhum lançamento foi anunciado”. Dados de lançamento em `home-books.ts` permanecem intactos. |
| Catálogo completo | Remover da composição da home | Os seis produtos permanecem em `/ebooks`, com categorias, filtros e páginas individuais existentes. |
| Depoimentos demonstrativos | Remover da composição | Não renderizar nomes, textos, avatares ou estrelas ilustrativas. Só considerar o retorno da seção com relatos autênticos e autorização de uso. |
| Contato com formulário indisponível | Remover da composição conforme decisão de navegação | Não mostrar campos desabilitados que pareçam canal ativo. Preservar a navegação global e o fragmento `/#contato` até aprovar o destino do link. |
| Rodapé | Manter | Preservar links institucionais e conteúdo atual. Ajustar `id="contato"` ou seu destino somente após resolver a decisão descrita na seção 7. |

## 4. Estrutura proposta com base no briefing aprovado

| Ordem | Seção | Implementação prevista |
| --- | --- | --- |
| 1 | Hero | Aplicar o texto já aprovado na skill: “Sua prática nutricional merece conhecimento organizado e ferramentas à mão.” Usar o complemento: “Guias, materiais de referência e recursos práticos para facilitar o estudo, a consulta e a organização dos atendimentos. Um acervo desenvolvido pela B2B Nutris com a experiência profissional da nutricionista Bianca.” O CTA secundário aponta para `/ebooks`. Não renderizar CTA nem mensagem de entrega do guia antes da operação e aprovação do fluxo. |
| 2 | Credibilidade compacta | Usar somente autoria institucional e processo editorial que possam ser sustentados pelo conteúdo aprovado e pelo código. Não incluir métricas, qualificações, parcerias ou selos sem fonte confirmada. |
| 3 | Problema | Usar o texto aprovado: “Você estudou para cuidar de pessoas, não para perder tempo procurando informações.” |
| 4 | Benefícios | Apresentar os três benefícios aprovados: “Encontre o que precisa, com mais facilidade”; “Leve o conhecimento para a prática”; “Construa sua própria biblioteca de referência”. Reusar a tipografia e os componentes de superfície existentes. |
| 5 | E-books em destaque | Renderizar três `BookCard` escolhidos de `home-books.ts`. Os cards levam a `/ebooks`; o catálogo continua levando às páginas individuais. |
| 6 | Biblioteca | Convite breve para `/biblioteca`. Links para artigos só entram quando o artigo estiver publicado ou aprovado para a rota pública. Não criar conteúdo novo nesta etapa. |
| 7 | Sobre Bianca | Reaproveitar o bloco visual atual. Completar biografia, formação e fotografia apenas com material fornecido e aprovado. Até lá, manter uma apresentação factual curta ou estado vazio sem inventar credenciais. |
| 8 | Depoimentos | Omitir enquanto só houver conteúdo demonstrativo. Reintroduzir apenas com depoimentos autênticos e autorização documentada. |
| 9 | Perguntas frequentes | Usar respostas verificáveis sobre público, formato digital, uso e compra. Só responder sobre disponibilidade e entrega do guia depois que o fluxo estiver confirmado. Implementar com HTML semântico nativo, como `<details>` e `<summary>`. |
| 10 | CTA final | Renderizar o convite ao guia apenas quando a captação e a entrega estiverem implementadas e aprovadas. Explicar o fluxo perto da captação; não criar uma seção grande apenas para descrever etapas. |

Os textos do hero, problema e benefícios são transcritos da skill local. As demais respostas dependem de fatos já presentes no catálogo e das decisões listadas na seção 7.

## 5. Arquivos previstos

| Arquivo | Alteração prevista | Motivo e limite |
| --- | --- | --- |
| `web/app/page.tsx` | Reorganizar as seções conforme a seção 4; retirar imports e renderização do slider, newsletter, catálogo integral, depoimentos demonstrativos e contato indisponível; usar a composição estática do hero e a lista aprovada de três produtos. | É o ponto de composição da home atual. Manter seus metadados, links e componentes globais. Não adicionar formulário de guia ou integração. |
| `web/components/book-card.tsx` | Acrescentar propriedade opcional de destino, mantendo `/ebooks/[slug]` como padrão; passar `/ebooks` apenas para os três cards da home. | A estrutura aprovada pede cards que levem ao catálogo, enquanto o componente atual aponta para a página individual. O padrão atual preserva catálogo e páginas de produto. |
| `web/data/home-books.ts` | Definir uma seleção explícita e separada de três slugs para a vitrine da home, depois da aprovação dos títulos. Não mudar as flags existentes. | Evita usar as flags globais como atalho e mantém a seleção da home independente dos critérios do slider ou do catálogo. |
| `web/styles/components.css` | Ajustar somente os estilos necessários à nova composição, usando os tokens e padrões existentes: hero estático, credibilidade, problema, benefícios, Biblioteca e FAQ. | As regras atuais de seções e grids estão neste arquivo. Não mudar fontes, cores, breakpoints gerais ou tokens sem necessidade demonstrada. |
| `web/app/globals.css` | Alterar apenas regras de override da home se a composição final exigir, mantendo os estilos compartilhados e as regras de responsividade pertinentes. | O arquivo contém ajustes sobrepostos para hero e cards. Não apagar estilos do `HomeHeroSlider` enquanto o componente for mantido no código. |
| `web/components/site-footer.tsx` | Alterar somente se a decisão aprovar mover `#contato` ao rodapé ou mudar o destino do link. | Mantém o fragmento global funcional sem exibir um formulário indisponível. Não inventar endereço ou canal novo. |

`web/components/home-hero-slider.tsx`, `web/data/home-testimonials.ts`, `web/components/ebook-catalog.tsx`, `web/app/ebooks/page.tsx`, `web/app/ebooks/[slug]/page.tsx`, as rotas de amostras e os arquivos em `web/public/images/` não precisam de alteração nesta refatoração. O slider e os dados demonstrativos podem continuar no repositório sem aparecer na home.

## 6. Etapas de execução

Cada etapa termina com revisão dos critérios e pausa para `APROVADO CP-XX`, seguindo `docs/roteiro.md`. A aprovação do plano não autoriza integração de e-mail, publicação ou alteração fora dos arquivos indicados.

### Etapa 1: Resolver as entradas de conteúdo e navegação

**Arquivos de implementação:** nenhum. As aprovações ficam registradas antes de iniciar o código.

**Ações:** confirmar os três slugs para a home; obter biografia, formação e fotografia aprovadas ou decidir manter o estado factual reduzido; confirmar respostas de FAQ; definir o destino de `/#contato`; confirmar autorização e localização do PDF `Antes da Consulta` e aprovar em outra etapa o fluxo de captação e entrega.

**Critérios de conclusão:** há uma decisão explícita para cada item aplicável da seção 7; não há texto, imagem, depoimento ou destino comercial pendente tratado como existente.

**Checkpoint:** `CP-01` desta refatoração. A etapa não reabre nem substitui os checkpoints gerais já concluídos do projeto.

### Etapa 2: Montar a nova composição e reduzir a repetição

**Arquivos:** `web/app/page.tsx`, `web/data/home-books.ts`, `web/components/book-card.tsx`.

**Ações:** substituir o hero rotativo por hero estático; incluir as seções aprovadas na ordem da seção 4; retirar a grade completa da home; criar seleção local dos três slugs aprovados sem mexer nas flags; configurar os cards da home para `href="/ebooks"` sem mudar o destino padrão do componente.

**Critérios de conclusão:** a home mostra apenas três cards de e-book; os três apontam a `/ebooks`; as flags globais têm os mesmos valores; os seis produtos continuam na lista usada por `/ebooks`; os cards do catálogo continuam apontando a cada página de produto.

**Checkpoint:** `CP-02` desta refatoração.

### Etapa 3: Aplicar a estrutura visual existente

**Arquivos:** `web/styles/components.css`, `web/app/globals.css`; `web/components/site-footer.tsx` somente se necessário para o fragmento aprovado.

**Ações:** ajustar os estilos da nova composição com superfícies, tipografia, botões, espaçamento e cores já existentes; reaproveitar o fundo creme do hero e as capas reais; implementar FAQ sem dependência nova; remover da home os estados de lançamento, newsletter comercial, contato inativo e depoimentos de demonstração. Preservar breakpoints e estilos compartilhados que ainda tenham uso.

**Critérios de conclusão:** tokens de `web/styles/tokens.css` permanecem inalterados; não entram mockups anteriores nem assets novos; não há rolagem horizontal em 425 px; foco de teclado e contraste dos componentes existentes continuam visíveis; `/#sobre` e o destino aprovado de `/#contato` levam a elementos existentes.

**Checkpoint:** `CP-03` desta refatoração.

### Etapa 4: Validar a home e as rotas preservadas

**Arquivos verificados:** home, componentes alterados, `/ebooks`, páginas individuais e amostras; sem alteração adicional salvo correção dentro do escopo das etapas anteriores.

**Ações:** revisar a renderização em desktop, tablet e largura móvel próxima de 425 px; conferir a ordem dos títulos, destinos dos links, FAQ por teclado, estados vazios e ausência de promessa de entrega do guia; executar os comandos locais de `web/package.json`: `npm run typecheck` e `npm run build` em `web/`.

**Critérios de conclusão:** build e verificação de tipos passam; as seis entradas continuam em `/ebooks`; cada card do catálogo mantém seu destino individual; páginas de produto e amostra continuam acessíveis; a home segue a ordem aprovada; não há CTA ativo para fluxo ainda indisponível. Evidências de produção, entrega de e-mail ou conversão não fazem parte desta validação local.

**Checkpoint:** `CP-04` desta refatoração. Depois deste ponto, a execução para até nova autorização para qualquer trabalho adicional, incluindo captação do guia ou publicação.

## 7. Aprovações e dependências antes da implementação

| Ponto | Decisão necessária | Efeito se permanecer pendente |
| --- | --- | --- |
| Seleção de três e-books | Aprovar três slugs entre os seis produtos existentes. | A etapa 2 não altera a lista própria da home. As flags globais permanecem intactas. |
| Guia gratuito `Antes da Consulta` | Confirmar PDF correto, localização e autorização de distribuição; decidir em iniciativa autorizada separadamente como captar e verificar o e-mail, entregar o PDF, registrar consentimento opcional de marketing e tratar privacidade. | Nenhum formulário, botão ativo ou promessa de recebimento aparece na home. A integração não pertence a este plano de implementação visual. |
| Newsletter atual | Retirar o painel da composição da home. Preservar rotas, API, dados e regras próprias da newsletter. | A newsletter não substitui a captação do guia. Nenhum endpoint ou integração de e-mail muda neste trabalho. |
| Biografia, formação e fotografia | Fornecer e aprovar os dados e a imagem de Bianca que podem ser publicados. | A seção Sobre mantém apenas conteúdo factual já aprovado, sem completar o placeholder com texto presumido. |
| Depoimentos | Fornecer relatos reais e autorização de uso, caso queira manter a seção. | A seção fica fora da home; dados e fundos demonstrativos não são publicados. |
| FAQ | Aprovar respostas factuais sobre público, formato, utilização, compra e guia gratuito. | O FAQ pode ser implementado depois que as respostas forem confirmadas; não inventar política de compra, formato ou entrega. |
| Destino `/#contato` | Aprovar se o fragmento aponta a um bloco compacto no rodapé ou se a navegação atual deve apontar a outra rota existente. | Não remover o link global nem deixar um fragmento quebrado ao retirar o formulário de contato da home. |
| Credibilidade editorial | Confirmar quais afirmações sobre autoria e processo editorial têm fonte e aprovação para uso comercial. | A seção fica limitada à autoria institucional e ao texto já aprovado na skill. |

## 8. Limites da proposta

Este documento planeja somente a composição da home. Não autoriza refatorar o catálogo, alterar páginas individuais, modificar produtos ou suas flags, atualizar o Design System, instalar dependências, criar imagens, implementar formulários, conectar serviços de e-mail, enviar mensagens, alterar páginas legais, publicar ou fazer deploy.

O documento distingue o estado do código, as propostas de alteração e as dependências que ainda precisam de aprovação. Os critérios das etapas descrevem verificações futuras; nenhum teste visual ou de código foi executado como parte da produção deste plano.
