# Diagnóstico da altura do carrossel Fichas para consulta

## Objeto da investigação

Identificar por que a alternância entre as fichas desloca verticalmente a seção “Seleção da biblioteca” na home B2B Nutris.

## Contexto

O responsável observou o deslocamento nos estados de Minerais e Suplementação e quer preservar a redação dos três slides. Esta investigação registra o estado do checkout local antes de qualquer correção. O componente e o CSS examinados têm alterações locais ainda não registradas em commit.

## Evidências examinadas

- Quatro capturas enviadas nesta conversa: estados de Suplementação e Minerais e destaque do DevTools sobre `section.home-section.home-solution-material`.
- `web/components/home-solution-material.tsx:17-53, 56-86, 92-137`: conteúdo, estado ativo e estrutura dos slides.
- `web/styles/components.css:90, 746-775, 1011-1035, 1106-1126`: preenchimento da seção, título, posicionamento dos slides e grade responsiva.
- `web/app/page.tsx:160-162`: posição de “Seleção da biblioteca” após `HomeSolutionSections`.
- Página local `http://localhost:3000/`, medida com Playwright e Chrome em larguras de 1024, 900, 899 e 390 px, altura de viewport de 800 px e preferência por movimento reduzido. Em cada largura, a navegação usou o botão “Mostrar próximo material” para examinar os três estados.

## Estado observado

Os prints mostram o título de Minerais com uma linha a mais que o de Suplementação na largura apresentada. O destaque do DevTools informa 1024 × 531 px para a seção em um estado de Suplementação.

Na medição local em 1024 px, a altura da seção foi 589 px para Vitaminas, 558 px para Minerais e 531 px para Suplementação. O topo permaneceu em 4259 px; o início de “Seleção da biblioteca” coincidiu com o limite inferior da seção em cada estado. O título mediu 175 px nos dois primeiros slides e 116 px em Suplementação.

Em 900 px, as alturas medidas foram 616, 586 e 573 px, respectivamente. Em 899 px, Vitaminas mediu 758 px e os outros dois estados mediram 728 px. Em 390 px, Vitaminas mediu 704 px e os outros dois estados mediram 675 px. O início da seção seguinte acompanhou essas variações. Essas medidas são do servidor local e podem mudar com fonte, conteúdo ou viewport distintos.

## Análise

O componente mantém os três blocos de texto no DOM, mas o CSS posiciona absolutamente os slides inativos. Somente o slide ativo participa da altura normal de `.home-solution-material__copy-slides` (`web/styles/components.css:1019-1026`). O título usa blocos separados para `span` e `em`, tamanho fluido e largura máxima de 19 caracteres (`web/styles/components.css:746-768`); a descrição e os termos também ocupam altura conforme a quebra de linha.

A seção usa preenchimento vertical e não define altura estável (`web/styles/components.css:90, 1011-1017`). Em desktop, a grade centraliza verticalmente as colunas. Na medição de 1024 px, a coluna de texto mediu 425 px em Minerais e 398 px em Suplementação; o visual mediu 277 px nos dois estados. Assim, a diferença de altura da seção vem da coluna textual, enquanto a centralização também desloca o visual dentro dela. A diferença de altura do título contribui, mas o conjunto de título, descrição e termos determina o tamanho final.

Em larguras de até 899 px, a grade passa a uma coluna e coloca o visual antes do texto (`web/styles/components.css:1106-1114`). Nessa configuração, a variação da descrição e das demais linhas também altera a altura total. Em 390 px, o título mediu 72 px nos três estados medidos; portanto, o deslocamento de 29 px entre Vitaminas e os demais estados não pode ser atribuído ao título nessa largura.

## Hipóteses avaliadas

- A imagem do dispositivo altera a altura da seção: enfraquecida pela medição em 1024 px, na qual o visual manteve 277 px nos três slides.
- Somente a quebra do título provoca o deslocamento: parcialmente sustentada em 1024 px, mas insuficiente em 390 px, onde os títulos mediram a mesma altura e a seção ainda variou.

## Diagnóstico

A seção seguinte se desloca porque o slide textual ativo determina a altura da coluna de texto e a seção pai acompanha essa altura. A seção “Seleção da biblioteca” vem logo depois no fluxo da página e começa no limite inferior variável de “Fichas para consulta”. O título participa da variação em algumas larguras; as outras linhas de texto também participam, conforme a largura.

## Grau de certeza

Alto para o mecanismo no checkout local: CSS, estrutura do componente e medidas do DOM convergem. As capturas do responsável mostram o mesmo efeito visual na largura de 1024 px.

## Pontos ainda não comprovados

- A amplitude máxima do deslocamento em todas as larguras, escalas de fonte e configurações de acessibilidade não foi medida.
- O ambiente publicado não foi inspecionado nesta investigação.
