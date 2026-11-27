# Diagnóstico visual e estrutural do FAQ da home

## Objeto da investigação

Comparar a área de perguntas da home B2B Nutris, marcada em vermelho nas capturas do responsável, com o FAQ da Ser Bene. O título B2B marcado em verde é tratado como área já aprovada.

## Contexto

Os dois projetos estão em diretórios separados. O pedido é adaptar a apresentação das perguntas à identidade B2B, mantendo o conteúdo próprio, o vinho e o verde do título, e a família Inter nas perguntas e respostas. Esta análise registra o estado anterior a qualquer refatoração.

## Evidências examinadas

- Três capturas enviadas pelo responsável nesta conversa: comparação lado a lado em 778 px e 565 px e detalhes do controle fechado e aberto no DevTools.
- B2B `web/app/page.tsx:19-29,230-262`: cabeçalho compartilhado e cinco pares de pergunta e resposta em `details` e `summary`.
- B2B `web/styles/components.css:289-293,437-455,1149-1194` e `web/styles/tokens.css:5-9,19-38,67-69`: geometria, cores, tipografia e regras responsivas do FAQ.
- Ser Bene `src/components/sites/serbene/static-sections.tsx:910-1024`: estrutura e conteúdo do FAQ de referência.
- Ser Bene `src/app/globals.css:3-25,36-41,65-79,88-103,2117-2166`: tokens, tipografia, linhas e controle do acordeão.
- `docs/refatoracao/plano-refatoracao-home.md:82-99`: limite editorial para respostas verificáveis no FAQ B2B.

## Estado observado

O B2B já usa cinco elementos `details` independentes. O título da seção usa Playfair Display, vinho `#641D24` e verde `#6A6D5C` na segunda linha. As perguntas usam Playfair Display em 22 px, com redução para 19 px até 420 px; as respostas usam a cor de texto secundário `#665659` em 16 px. Cada item tem fundo claro, cantos de 24 px, sombra e intervalo de 12 px. O código não oculta o marcador nativo do `summary` nem define um controle visual próprio (`web/styles/components.css:437-455,1192-1194`).

Na Ser Bene, perguntas e respostas herdam Rubik. A pergunta tem `1.12rem`, peso 500, entrelinha 1,35, altura mínima de 72 px, preenchimento vertical de 16 px e distância de 18 px entre texto e controle. Cada `details` termina com borda pontilhada de 1,5 px; o primeiro também começa com essa borda. O `summary::after` desenha o controle: conteúdo `+`, caixa CSS de 38 × 38 px, borda de 1,5 px e raio de 50%. Quando `details` abre, o mesmo sinal gira 45 graus e passa a parecer um ×. Não há outro seletor ou botão no JSX para esse controle (`src/app/globals.css:2121-2166`; `src/components/sites/serbene/static-sections.tsx:920-928`).

Nas capturas, o B2B mostra cartões separados e um marcador triangular; a referência mostra divisórias pontilhadas e círculos com + ou ×. A seleção do DevTools informa 40 × 40 px para `summary::after` fechado e cerca de 56,57 × 56,57 px quando girado. Esses números são compatíveis com a caixa CSS de 38 px mais duas bordas de 1,5 px e com a caixa delimitadora de um quadrado de 40 px rotacionado 45 graus. Eles não indicam crescimento do controle ao abrir.

## Análise

A diferença da área vermelha está demonstrada pelas regras locais: o B2B agrupa perguntas em cards, enquanto a Ser Bene apresenta uma lista contínua. A seta visível no B2B corresponde ao marcador nativo que não foi removido no CSS. O círculo da referência é um pseudo-elemento do `summary`, não um elemento clicável separado. A interação continua pertencendo ao `summary` dentro de `details`.

O título principal B2B, marcado em verde, já segue o padrão cromático solicitado. A troca da tipografia mencionada pelo responsável se aplica às perguntas do FAQ e às respostas: hoje a pergunta usa Playfair, enquanto a resposta herda a fonte de corpo Inter. A referência usa Rubik por herança, mas não exige Rubik para reproduzir a estrutura e o ritmo visual no B2B.

A cor do círculo ainda não pode ser reduzida a uma regra única a partir do pedido: “círculo vinho” pode indicar contorno vinho ou preenchimento vinho. O pedido define o × verde; a cor do + fechado e o tratamento do fundo do controle não estão totalmente determinados. As capturas mostram o contorno e o sinal da referência, mas não resolvem essa escolha de identidade B2B.

## Diagnóstico

O FAQ B2B já possui a estrutura nativa de abertura e fechamento. A divergência visual vem das regras de card, da fonte editorial aplicada às perguntas e da ausência de regras que ocultem o marcador nativo e desenhem `summary::after`. Na referência, o × resulta da rotação de 45 graus do mesmo +. O tamanho aparente de 56,57 px no DevTools é a caixa delimitadora após a rotação, não um segundo tamanho CSS.

## Grau de certeza

Alto para estrutura, valores declarados no CSS, origem do controle e interpretação geométrica das medidas do DevTools. Médio para a intenção exata de cor do círculo e do +, que depende de uma decisão visual do responsável.

## Pontos ainda não comprovados

- O tratamento final do círculo B2B: contorno vinho ou preenchimento vinho, e a cor do + fechado.
- A manutenção do fundo zinco da seção após substituir os cards por linhas. As capturas delimitam o título e os itens, mas não fornecem uma instrução inequívoca sobre o fundo da seção.
- A equivalência visual em navegador B2B após a refatoração, que ainda não ocorreu.
