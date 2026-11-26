# Especificação e plano de CP-HOME-04: solução em três sessões

**Proposta para transformar a seção Benefícios em três sessões demonstrativas baseadas na estrutura da Ser Bene e no conteúdo verificado da B2B Nutris.**

| Campo | Definição |
| --- | --- |
| Status | Rascunho, aguardando aprovação final do responsável |
| Responsável | Responsável pelo projeto |
| Público | Responsável pelo projeto e pessoa implementadora |
| Escopo | Especificar conteúdo, estrutura, tipografia, cores, breakpoints e execução local de CP-HOME-04 |
| Fora de escopo | Alterar CP-HOME-03 ou CP-HOME-05, anunciar encontros ou cursos que não estejam comprovados, publicar ou fazer deploy |
| Relacionados | [Roteiro enxuto da home](../../roteiro-enxuto-home.md), [plano de refatoração da home](plano-refatoracao-home.md), [análise da transição para solução](../analise-diagnostico/narrativa-problema-transicao-solucao-home.md) |

## 1. Resumo

Propomos substituir a apresentação atual de Benefícios por três sessões consecutivas dentro de CP-HOME-04. Cada sessão seguirá a composição correspondente da Ser Bene, com texto e imagens próprios da B2B Nutris. As fontes e escalas tipográficas da B2B Nutris, bem como o vinho `#641D24` e o verde `#6A6D55`, permanecem como identidade visual.

| Sessão na referência | Estrutura adaptada para B2B Nutris | Conteúdo proposto |
| --- | --- | --- |
| Simples de usar | `AppDemo`: introdução, telefone, cards vinculados às telas | Três capturas reais da experiência B2B, alternadas a cada cinco segundos; três cards explicativos |
| Encontros ao vivo | `WeeklySchedule`: cabeçalho, grade de itens e nota serifada | Sessão B2B sobre aplicação na prática, com seis etapas do mapa *Da Escuta à Conduta* e nota sobre percurso flexível |
| Material didático e cursos | `CoursesSection`: telefone e bloco descritivo em duas colunas | Sessão B2B sobre consulta a materiais, com captura autorizada de uma ficha do *Guia Visual das Vitaminas* e texto factual |

Os nomes “Encontros ao vivo” e “Material didático e cursos” identificam as sessões de referência da Ser Bene nesta proposta. Não serão publicados como promessas da B2B Nutris sem confirmação de que esses serviços existem. A segunda sessão demonstrará aplicação na prática usando materiais locais verificados.

## 2. Contexto e evidências

CP-HOME-04 vem depois do bloco Problema e antes da seleção de e-books. O benefício aprovado tem três frentes: encontrar e organizar, consultar e lembrar, levar à prática. O inventário local encontrou catálogo e biblioteca de artigos, guias e fichas de referência, além de questionários e mapas de consulta. A análise local não encontrou oferta implementada de minicursos ou encontros com especialistas; ela não confirma o estado de produção. ([análise, linhas 22-24, 34-40](../analise-diagnostico/narrativa-problema-transicao-solucao-home.md))

O código atual renderiza um `SectionHeading` e três cards de texto simples em `web/app/page.tsx`; o componente de grade compartilhado `.book-grid` tem breakpoints próprios. A mudança proposta substitui somente o conteúdo e a apresentação de CP-HOME-04.

| Evidência | Localização |
| --- | --- |
| As três sessões da Ser Bene e sua ordem | [AppDemo, WeeklySchedule e CoursesSection](../../../serbene-copia/src/components/sites/serbene/app-demo.tsx), [grade ao vivo](../../../serbene-copia/src/components/sites/serbene/weekly-schedule.tsx), [cursos](../../../serbene-copia/src/components/sites/serbene/static-sections.tsx) |
| A grade de seis etapas e a nota sobre ordem flexível | Amostra autorizada `web/public/samples/pages/da-escuta-a-conduta/2.webp`; conteúdo de produto em `web/data/home-books.ts:87-102` |
| Descrição do Guia Visual das Vitaminas | `web/data/home-books.ts:109-124`; amostra autorizada em `web/public/samples/pages/guia-visual-das-vitaminas/3.webp` |
| Limite de afirmações sobre encontros e cursos | [Análise local, linha 38](../analise-diagnostico/narrativa-problema-transicao-solucao-home.md#L38) |

As amostras públicas autorizadas são a única fonte de páginas de material a exibir dentro do telefone. Não usar páginas de PDFs comerciais completos como assets públicos.

## 3. Proposta de estrutura

> **Por que esta estrutura**
>
> **O que:** compor Benefícios em três sessões inspiradas em `AppDemo`, `WeeklySchedule` e `CoursesSection`, adaptadas aos materiais B2B existentes.
>
> **Por quê:** conserva a leitura sequencial do roteiro aprovado e demonstra as três frentes por meio de conteúdo concreto. A composição sozinha não comprova adoção, resultados clínicos ou oferta de serviços ao vivo.
>
> **Alternativa considerada:** manter três cards simples. É mais barato e não exige imagens nem comportamento interativo, mas não entrega a estrutura visual solicitada.
>
> **Fallback:** manter a seção atual se as capturas autorizadas ou os textos de apoio não estiverem prontos na implementação.

### 3.1 Simples de usar

- Abrir a sessão com kicker, título serifado em duas linhas quando a redação permitir e descrição curta, seguindo a hierarquia de `AppDemo`.
- Em desktop, exibir o telefone e os três cards em duas colunas. Em mobile, empilhar telefone e um card ativo.
- Usar três capturas da interface B2B real: catálogo `/ebooks`, página de um material e visualização de amostra autorizada. A captura de amostra deve mostrar apenas conteúdo autorizado.
- Sincronizar os três cards com as telas. A troca automática ocorre a cada cinco segundos. Ativar a rotação quando a sessão estiver visível; interação manual seleciona a tela correspondente e suspende a rotação. Respeitar `prefers-reduced-motion`.
- Cada card tem uma linha kicker, título e descrição curta. A redação específica de cada card será confirmada na aprovação da composição.

### 3.2 Aplicação na prática

- Reproduzir a composição de `WeeklySchedule`: kicker, título, descrição, grade e uma nota serifada abaixo da grade.
- A grade terá seis etapas transcritas da amostra do mapa: Escuta qualificada; Anamnese e histórico clínico; Avaliação e análise; Diagnóstico nutricional; Plano e conduta; Acompanhamento e reavaliação.
- A nota informa que a consulta não precisa seguir sequência rígida e que risco ou necessidades específicas podem alterar a ordem de investigação e intervenção. A redação final deve corresponder à nota legível na amostra autorizada.
- Usar três colunas a partir do breakpoint de desktop e uma coluna em telas menores. A grade é uma demonstração de material, não um calendário nem uma agenda de atendimentos.
- O kicker “Encontros ao vivo” pertence ao exemplo Ser Bene. Não o usar como rótulo B2B nesta sessão enquanto não houver oferta comprovada de encontros.

### 3.3 Material didático e cursos

- Reproduzir a composição de `CoursesSection`: texto e telefone em duas colunas no desktop, em fluxo empilhado no mobile. O telefone mostra uma amostra autorizada do *Guia Visual das Vitaminas*.
- O bloco de texto mantém kicker, título, descrição, linha serifada com termos factuais sobre os conteúdos e um segundo parágrafo curto, conforme o arranjo tipográfico de referência.
- Usar apenas afirmações verificáveis na descrição do material, como funções, fontes alimentares, ingestão de referência, sinais associados à deficiência, interações e cuidados, conforme a ficha e os dados do catálogo.
- “Material didático e cursos” é o kicker da Ser Bene, não uma afirmação confirmada para B2B Nutris. A redação do kicker B2B fica sujeita à aprovação final; não afirmar que há cursos.

## 4. Tipografia, cores e breakpoints

Copiar a hierarquia e as proporções tipográficas da referência, aplicando as famílias e cores B2B Nutris. Os valores abaixo são os valores observados no CSS fonte, não novos tokens globais.

| Elemento | Ser Bene observado | Aplicação proposta na B2B Nutris |
| --- | --- | --- |
| Família sem serifa | Rubik, 18 px no mobile e 19 px a partir de 900 px | Inter, conforme `--font-body` |
| Títulos de sessão | Playfair Display, `clamp(32px, 7.4vw, 52px)`, linha 1.12 | Playfair Display, vinho `#641D24`; reproduzir escala fluida equivalente |
| Kicker | 12,8 px no mobile; 13,44 px a partir de 900 px; caixa alta e espaçamento ampliado | Inter semibold, caixa alta; verde `#6A6D55` ou vinho conforme contraste e hierarquia |
| Descrição principal | `1.14rem` (18,24 px), linha 1.62 | Inter, escala equivalente; cor de texto B2B `#665659` |
| Card: kicker/título/corpo | 13,44 px / 24 px / 16,64 px | Hierarquia equivalente, com Inter e Playfair conforme a função |
| Nota serifada | Playfair Display, `clamp(20.8px, 4.6vw, 27.2px)`, linha 1.4 | Playfair Display, vinho `#641D24`, com itálico verde `#6A6D55` quando houver ênfase |
| Linha serifada da terceira sessão | Playfair Display itálico, `clamp(23.2px, 5.4vw, 32px)` | Equivalente, usando vinho e verde B2B |

O DS global também declara oliva `#82845A` e texto complementar `#45492B`. A seção Problema já usa `#6A6D55` em seu título e ilustração. A proposta mantém esse verde específico como cor de ênfase da solução e não o substitui por outro tom. As famílias aprovadas são Inter e Playfair Display. (Fontes: `web/styles/tokens.css:5-10, 31-36, 65-80`; `web/styles/components.css:581-639`.)

| Largura CSS | Estado medido no B2B local atual | Referência Ser Bene | Direção proposta para CP-HOME-04 |
| --- | --- | --- | --- |
| 986 px | Problema em duas colunas; grade de cards atual em três colunas; sem overflow horizontal | Duas colunas na demonstração a partir de 900 px | Telefone e cards em duas colunas; grade da sessão 2 em três colunas |
| 900 px | Problema em duas colunas; grade de cards atual em duas colunas; sem overflow | Limite de desktop da referência: colunas e cards simultâneos | Usar `min-width: 900px` para desktop |
| 898 px | Media `max-width: 899px` ativa; problema em duas colunas; cards atuais em duas colunas; sem overflow | Mobile da referência: um card ativo | Uma coluna para composição; um card ativo na sessão 1 |
| 721 px | Media de 899 ativa; media de 720 inativa; sem overflow | Mobile | Composição empilhada |
| 720 px | Media de 720 ativa; Problema passa a uma coluna; sem overflow | Mobile | Composição empilhada |
| 499 px e 420 px | Breakpoints declarados para grade atual e ilustração do Problema; não medidos nesta sessão | Mobile | Fazer validação visual específica em 499/498, 420/419 e 390/320 px antes de aprovar a etapa |

Na implementação, a transição estrutural para desktop será em `900px`, seguindo a referência das sessões, e não em `980px`, breakpoint de três para duas colunas da grade genérica de livros B2B. Os breakpoints existentes de 899, 720, 499 e 420 px devem continuar restritos às regras atuais que já os usam.

As larguras observadas foram lidas no browser local em 986, 900, 898, 721 e 720 px. A janela do navegador reduziu 899 solicitado a 898 CSS px. A regra em 899 px está confirmada pela inspeção direta do CSS; o viewport abaixo de 420 px ainda requer medição na revisão visual de implementação.

## 5. Por que e custos

O benefício é mostrar as três frentes com amostras concretas e uma hierarquia consistente com a referência pedida. O custo inclui preparar três capturas atuais para o telefone, revisar descrições para precisão do catálogo, manter estado acessível na primeira sessão e validar três composições responsivas. Capturas da interface exigem atualização se as rotas ou amostras mudarem.

Não transferiremos da Ser Bene o texto comercial, agenda, calendário, nomes de profissionais, promessas de disponibilidade, duração de gravações, CTA de participação ou identidade cromática. Eles descrevem serviços da Ser Bene e não são fonte de ofertas B2B.

## 6. Plano de execução após aprovação

### Tarefa 1: preparar as capturas

- **Objetivo:** produzir três imagens da interface B2B para o telefone da primeira sessão e uma imagem autorizada para a terceira.
- **Arquivos:** assets em `web/public/images/home/solucao/`; fonte da amostra `web/public/samples/pages/guia-visual-das-vitaminas/3.webp`.
- **Entrega revisável:** imagens finais com dimensões preservadas, nomes descritivos e textos da captura legíveis na tela do telefone.
- **Conferência:** abrir cada imagem no browser e confirmar que as telas correspondem às rotas reais; nenhuma captura inclui conteúdo comercial completo.

### Tarefa 2: implementar a composição

- **Objetivo:** trocar os três cards genéricos por três sessões estruturadas com conteúdo verificado.
- **Arquivos:** `web/app/page.tsx`, novo `web/components/home-solution-sections.tsx`, `web/styles/components.css` e os assets preparados na tarefa 1.
- **Entrega revisável:** três seções com headings semânticos, cards e grid da sessão 2, telefone e copy da sessão 3, cores e fontes B2B.
- **Comportamento:** rotação de cinco segundos somente na primeira sessão, parada após interação manual, navegação por teclado e suporte a `prefers-reduced-motion`.
- **Conferência visual:** comparar em 1440, 986, 900, 899, 721, 720, 499, 420, 390 e 320 px; verificar fluxo, legibilidade, fontes carregadas e ausência de overflow horizontal.

### Tarefa 3: revisar evidência e limites

- **Objetivo:** confirmar que imagens, cópia e composição correspondem à proposta aprovada.
- **Arquivos:** código, imagens e esta especificação.
- **Entrega revisável:** captura da home nas larguras aprovadas e conferência das três sessões antes de encerrar CP-HOME-04.
- **Conferência:** comparar texto da sessão 2 e 3 com as fontes citadas; confirmar que não há oferta implícita de encontros ou cursos sem fonte; confirmar que a seleção de e-books em CP-HOME-05 permanece depois da solução.

Não se acrescentará dependência. Esta tarefa é uma revisão visual do preview local; não inclui deploy ou publicação.

## 7. Critérios de aceite

- A home apresenta três sessões em sequência entre Problema e E-books em destaque.
- A primeira sessão contém exatamente três cards vinculados a três capturas reais e alterna a tela do telefone no intervalo aprovado de cinco segundos.
- A segunda sessão mostra as seis etapas do mapa e uma nota serifada sobre a flexibilidade da sequência, sem se apresentar como calendário de encontros.
- A terceira sessão mantém a composição telefone mais texto e mostra somente amostra autorizada.
- Títulos, kicker, cards, nota serifada, copy e ordem visual seguem a hierarquia da Ser Bene, usando Inter, Playfair Display, vinho `#641D24` e verde `#6A6D55` na B2B Nutris.
- Em 900 px ou mais, as composições previstas em colunas aparecem lado a lado; abaixo de 900 px, empilham. Os cards da primeira sessão mostram somente o estado ativo em mobile e todos em desktop.
- A rotação respeita preferência por movimento reduzido e interação manual; controles operáveis por teclado têm foco visível e estado acessível.
- Não há afirmações de oferta de encontros ao vivo ou cursos sem confirmação, nem arquivos de PDFs comerciais completos em `public`.
- As larguras de validação visual não apresentam corte de texto, controles inacessíveis ou overflow horizontal.

## 8. Aprovação solicitada

Esta especificação incorpora a decisão de três sessões e o intervalo de cinco segundos já confirmados. A aprovação final solicitada é para a composição proposta, o uso do mapa de seis etapas, as capturas indicadas, a adaptação tipográfica e cromática e o breakpoint de 900 px. A redação final dos títulos e descrições será conferida antes da conclusão visual; qualquer afirmação não verificada permanece excluída.
