# Diagnóstico da seção Problema da home

## Objeto da investigação

Comparar a posição, a tipografia, as cores e os espaçamentos da seção Problema da home B2B Nutris com a seção de problema da Ser Bene, usando o código local e as capturas fornecidas como evidência.

## Contexto

A investigação trata somente do checkout B2B Nutris em `/home/cg/Documentos/01-DEV/PROJETOS/b2b-nutri`. O projeto Ser Bene permanece separado e serve como referência pública. Este documento registra o estado observado antes da implementação local do CP-HOME-03; as decisões posteriores e o status do checkpoint estão em `roteiro-enxuto-home.md`.

## Evidências examinadas

- `web/app/page.tsx:56-150`: sequência atual da hero, credibilidade, e-books em destaque, apresentação “Conhecimento organizado para a prática nutricional” e seção Problema.
- `web/app/page.tsx:107-147`: estrutura e redação atuais de Problema, incluindo eyebrow, título, introdução, quatro itens, parágrafo de fechamento e ilustração.
- `web/styles/components.css:572-623`: cor, tipografia, tamanhos, entrelinha e espaçamentos declarados para o conteúdo textual de Problema.
- `web/styles/components.css:130-145`: destaque cromático usado pela hero.
- `design-system/tokens.css:63-67`: cores e famílias tipográficas globais atuais.
- Capturas enviadas pelo responsável nesta conversa, com a home B2B em 764 px e 425 px e trechos de comparação com a Ser Bene.
- Página pública [Ser Bene](https://serbene.com/), inspecionada com Playwright em 1440 × 1200 px e 425 × 940 px.

## Estado observado

Na home B2B, a seção de credibilidade vem logo após a hero (`web/app/page.tsx:56-75`). Depois dela aparecem E-books em destaque (`77-93`) e “Conhecimento organizado para a prática nutricional” (`95-105`); Problema está em seguida (`107-150`). Assim, Problema não está imediatamente abaixo da faixa de credibilidade.

O título B2B usa Playfair Display, cor vinho `#641D24`, tamanho fluido entre 34 px e 52 px e entrelinha de 1,08. A segunda linha usa `var(--color-complement-text)`, cujo valor atual em `design-system/tokens.css:63` é `#45492B`. A hero, por sua vez, define `#6A6D55` localmente para o destaque em `.home-hero__highlight--light-20` (`web/styles/components.css:141`). Portanto, as duas áreas não usam o mesmo tom de verde.

A introdução B2B herda Inter e o tamanho-base de 16 px, com entrelinha 1,65. O contêiner de texto é uma grade com distância uniforme de 16 px entre seus filhos. Os itens da lista têm entrelinha 1,5 e preenchimento vertical de 12 px. O fechamento é uma única cor vinho, Playfair Display e tamanho fluido entre 20 px e 26 px, também separado dos itens anteriores pela distância uniforme da grade.

Na Ser Bene, o título `h2.rv` usa Playfair Display. Em 1440 px, mede 52 px com entrelinha 58,24 px; em 425 px, 32 px com entrelinha 35,84 px. Sua introdução usa Rubik: 19 px/31,35 px em desktop e 18 px/29,7 px em mobile, começando 20 px depois do título. Os itens da lista usam 17,28 px/28,512 px e preenchimento vertical de 16 px. O fechamento usa 32,8 px/41,328 px em desktop e 23,2 px/29,232 px em mobile, com 30 px de espaço acima. O título e o fechamento dividem suas frases entre a cor principal verde-azulada e um trecho laranja em itálico.

## Análise

A diferença de posição está confirmada no JSX: dois blocos se interpõem entre credibilidade e Problema. A expressão “abaixo de credibilidade” pode significar somente vir depois dela ou ficar imediatamente adjacente; a ordem atual permite identificar a lacuna, mas não resolve sozinha o destino dos blocos intermediários.

Na tipografia, o tamanho máximo do título B2B coincide com o tamanho desktop da referência, mas a entrelinha B2B é menor: 56,16 px a 52 px, contra 58,24 px. Em 425 px, a regra B2B resulta em 34 px/36,72 px, enquanto a referência mede 32 px/35,84 px. As famílias do título coincidem; a introdução não: B2B usa Inter e a Ser Bene usa Rubik. A diferença da introdução inclui tamanho e entrelinha, além da família.

Os espaçamentos também diferem. A B2B aplica 16 px uniformemente entre eyebrow, título, introdução, lista e fechamento. A referência define separações próprias para introdução, lista e fechamento, além de maior preenchimento vertical em cada item. O fechamento B2B tem tamanho menor que o da referência nas duas larguras medidas e não possui a divisão de cor visível no fechamento da Ser Bene.

O verde solicitado pelo responsável, `#6A6D55`, já aparece na hero, enquanto o título da seção usa `#45492B`. O CSS confirma a inconsistência observada nas capturas. O fechamento B2B está integralmente em vinho no código, portanto ainda não apresenta a divisão cromática solicitada para as duas partes da frase.

## Hipóteses avaliadas

- **O título da seção Problema reutiliza a cor verde da hero:** descartada pelo CSS. A seção usa o token `#45492B`; a hero usa `#6A6D55` em uma classe específica.
- **A seção Problema está diretamente após credibilidade:** descartada pela ordem do JSX; há dois blocos entre elas.
- **O título B2B diverge em todos os tamanhos da referência:** parcialmente sustentada. O limite superior desktop é igual, mas a entrelinha é menor; em 425 px, o título B2B é 2 px maior.
- **O fechamento B2B já está dividido entre vinho e verde claro:** descartada pelo JSX e CSS examinados; o parágrafo tem uma única cor definida.

## Diagnóstico

As observações do responsável sobre a ordem da seção, a diferença de verde, a escala e o ritmo tipográfico, e a ausência de uma divisão de cor no fechamento são compatíveis com o código local. Há paridade parcial entre os títulos em desktop quanto ao tamanho máximo e à família, mas não quanto à entrelinha. Em mobile, o título B2B é maior na largura de 425 px. Introdução, lista e fechamento também seguem métricas e espaçamentos diferentes dos da referência.

## Grau de certeza

Alto para a ordem do JSX, tokens, famílias, valores CSS declarados e medidas computadas da página Ser Bene nas duas larguras inspecionadas. As capturas do responsável reforçam a comparação visual. Não foi obtida nesta rodada uma medição computada do DOM B2B em navegador; os valores B2B descritos acima derivam do CSS local.

## Pontos ainda não comprovados

- Se “abaixo de credibilidade” significa posição imediatamente seguinte e se os e-books em destaque devem vir antes ou depois de Problema.
<!-- Resposta: os e-books em destaque devem vir depois do problema -->
- Quais dos cinco motivos de ícone em duas cores o responsável prefere para substituir ou acompanhar o ponto atual dos itens.
<!-- Aqui eu preciso, cara, de cinco ideias de formas pra gente fazer um ícone ali. É só isso. Talvez possa ser manter esse balãozinho que ele fez ali, copia esse SVG dele, copia todo esse código e só aplica minhas duas cores. Pronto, só isso. Ou pode deixar um círculo mesmo e copia o código pra aplicar as cores e esse gradiente de cores ali. -->
- Qual redação final e divisão em duas cores serão usadas no parágrafo de fechamento.
<!-- DIVISÃO: A divisão das cores mantém o padrão da Hero [#641d24, #6a6d55], tá? Eu já mandei as duas cores aí pra você. É o vinho acima e o verde abaixo, conforme os valores enviados.
Sobre o texto podemos definir juntos aí. Vamos trocar as cores primeiro e o texto a gente define depois, beleza? As cores e tudo mais que precisa.
-->
