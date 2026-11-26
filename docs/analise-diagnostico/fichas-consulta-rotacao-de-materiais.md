# Diagnóstico da sessão Fichas para consulta

## Objeto da investigação

Determinar se a sessão “Fichas para consulta” da home alterna atualmente entre diferentes materiais e registrar o conteúdo local disponível para os temas Minerais e Suplementação.

## Contexto

A captura enviada nesta conversa mostra o texto sobre o Guia Visual das Vitaminas e uma página desse guia dentro de uma moldura de dispositivo. O responsável descreveu a sessão como estática e pediu a inspeção dos PDFs Minerais e Guia de Suplementação para preparar alternativas de conteúdo.

## Evidências examinadas

- `web/components/home-solution-sections.tsx:78-115`: marcação da sessão, textos, imagem e composição atual.
- `web/styles/components.css:969-1024, 1061-1065`: grade da sessão e mudança de ordem no layout estreito.
- `ebooks/05 - Minerais.pdf`: PDF-fonte de 48 páginas; leitura textual integral com `pdftotext -layout` e inspeção visual da amostra de ferro.
- `ebooks/06 - Guia de Suplementação Na Prática Clínica.pdf`: PDF-fonte de 37 páginas; leitura textual integral com `pdftotext -layout` e inspeção visual da amostra de creatina.
- `web/public/samples/pages/minerais/3.webp` e `web/public/samples/pages/suplementacao-clinica/3.webp`: imagens públicas existentes das fichas de avaliação do ferro e de creatina.
- `web/public/samples/minerais.pdf` e `web/public/samples/suplementacao-clinica.pdf`: amostras públicas separadas, cada uma com cinco páginas.
- Captura da sessão enviada pelo responsável nesta conversa.

## Estado observado

O JSX contém um único eyebrow, “Fichas para consulta”, um título sobre vitaminas, uma descrição do Guia Visual das Vitaminas e um subtítulo com três termos. Há uma única imagem, cujo caminho é `/samples/pages/guia-visual-das-vitaminas/3.webp`. Não há, nesse componente, estado de slide, temporizador ou controles de navegação.

Em telas estreitas, o CSS coloca a imagem antes do bloco de texto. O código examinado não contém botões de anterior ou próxima.

O PDF Minerais apresenta fichas sobre ferro, magnésio, zinco e outros minerais, incluindo funções, fontes alimentares, ingestão de referência, avaliação laboratorial, interações e cuidados. O PDF Guia de Suplementação apresenta temas como creatina, ômega-3, whey protein, psyllium, cafeína, probióticos e outros, com evidências e limitações, avaliação, administração e monitoramento. Existem amostras PDF separadas e imagens WebP públicas para ambos os materiais.

## Análise

O componente renderiza conteúdo diretamente como texto e imagem únicos, sem mecanismo de alternância. Isso confirma tecnicamente o estado estático descrito pelo responsável. As imagens de amostra existentes correspondem a conteúdos específicos dos PDFs: a de Minerais mostra avaliação do ferro; a de Suplementação mostra uma ficha de creatina.

## Diagnóstico

A sessão é estática no código local: exibe somente o Guia Visual das Vitaminas porque texto e imagem estão fixos no JSX, sem estado ou controles de navegação. O repositório também contém PDFs-fonte e amostras/imagens públicas de Minerais e Suplementação, que fornecem conteúdo verificável para preparar textos e imagens candidatos.

## Grau de certeza

Alto quanto à ausência de alternância e controles no componente examinado, pois o JSX mostra um único conteúdo e não inclui estado ou temporizador. Alto quanto à presença das amostras públicas e aos temas visíveis nas imagens e nos PDFs locais.

## Pontos ainda não comprovados

- A captura não foi reproduzida em navegador nesta investigação; o diagnóstico do comportamento atual se baseia no código local e na captura fornecida.
- A aprovação do responsável para a redação final, a imagem definitiva de cada tema e as regras de navegação ainda não foi registrada.
