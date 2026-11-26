# Faixas visuais na transição entre Biblioteca e autora

## Objeto da investigação

Investigar a faixa vinho abaixo do botão “Explorar a biblioteca” e as duas divisões visuais marcadas no degradê de saída da seção Biblioteca B2B Nutris. A análise descreve o estado do código antes de qualquer ajuste de altura ou cor.

## Contexto

A home renderiza `HomeLibraryArticles` imediatamente antes da seção “Conheça a autora” em `web/app/page.tsx:202-204`. O botão encerra o conteúdo de `HomeLibraryArticles` em `web/components/home-library-articles.tsx:72-76`. O usuário marcou uma divisão no início do degradê e outra dentro dele, além de pedir redução da faixa vinho sólida abaixo do botão.

## Evidências examinadas

- Captura enviada pelo usuário nesta conversa, com duas linhas verdes sobre a transição em largura indicada de 1440 px.
- `web/styles/components.css:1205-1229`: fundo, padding inferior e pseudo-elemento do degradê da Biblioteca.
- `web/styles/components.css:1388-1407`: botão, fundo da autora e regra responsiva até 899 px.
- `web/styles/tokens.css:5-7`: valores do vinho e do creme.
- `web/components/home-library-articles.tsx:72-76` e `web/app/page.tsx:202-204`: ordem dos elementos e seções.

## Estado observado

No CSS para larguras a partir de 900 px, a Biblioteca tem `padding-bottom: 330px`. O pseudo-elemento `::after` ocupa os últimos 220 px da seção. A diferença deixa 110 px de fundo vinho uniforme entre a parte inferior do botão e o início do degradê. O botão tem altura mínima de 60 px, que não corresponde à altura dessa faixa (`web/styles/components.css:1208,1217-1227,1388-1397`).

Até 899 px, o padding inferior é 245 px e o degradê mede 160 px. A faixa vinho uniforme mede, portanto, 85 px nessa faixa responsiva (`web/styles/components.css:1404-1406`).

O degradê é um único pseudo-elemento. Seus pontos de cor são vinho em 0%, `#A16369` em 33,333%, `#E6CED0` em 66,667% e creme em 100%. No desktop, os pontos intermediários ficam a aproximadamente 73 e 147 px do início do degradê. O código não cria elementos separados para as regiões marcadas no print (`web/styles/components.css:1217-1229`).

## Análise

A primeira marca verde coincide visualmente com a passagem da faixa vinho uniforme para o degradê. As duas áreas usam vinho `#641D24` nesse encontro, mas a cor passa a variar somente depois dele. Essa mudança no ritmo da cor permite perceber uma divisão sem existir borda (`web/styles/components.css:1210-1227`).

A segunda marca está dentro do degradê. Os pontos intermediários da regra mudam a taxa de variação entre as cores. Isso pode produzir uma faixa perceptiva, mesmo com interpolação contínua. A captura não fornece coordenadas CSS suficientes para associar a marca a um ponto intermediário específico.

No fim da Biblioteca, o degradê chega ao mesmo creme `#FDF9F5` usado como fundo da seção da autora. As regras examinadas não definem borda entre as duas seções (`web/styles/components.css:1227,1400`; `web/styles/tokens.css:7`).

## Hipóteses avaliadas

- **Borda real ou elemento separador:** não sustentada pelo JSX e pelas regras CSS examinadas. O gradiente é um pseudo-elemento único.
- **Contraste causado pela progressão tonal:** sustentado pela faixa uniforme anterior ao degradê e pelos pontos intermediários de cor. A posição exata da segunda faixa percebida continua indeterminada pela captura.

## Diagnóstico

A faixa sólida abaixo do botão mede 110 px no desktop e 85 px até 899 px. O valor de 60 px citado pelo usuário corresponde à altura mínima do botão, não à faixa abaixo dele. As duas “linhas” marcadas são divisões visuais na passagem do vinho uniforme para um degradê com pontos intermediários; não há linhas ou bordas independentes identificadas no código.

## Grau de certeza

**Alto** para a estrutura CSS, as alturas derivadas das regras e a ausência de borda explícita. **Médio** para a associação da segunda marca à mudança de ritmo do degradê, pois a captura não localiza essa marca em coordenadas CSS exatas.

## Pontos ainda não comprovados

O código e a captura não permitem determinar o pixel exato em que o usuário percebe a segunda divisão. A investigação não mede a intensidade perceptiva da faixa em outros monitores ou escalas de exibição.
