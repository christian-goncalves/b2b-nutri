# Diagnóstico das imagens do hero “Antes da Consulta”

## Objeto da investigação

Identificar as duas imagens exibidas ao lado de “Soluções para Nutricionistas”, como são compostas e o que o material “Antes da Consulta” permite afirmar visualmente.

## Contexto

O hero da home apresenta o guia gratuito ao lado de um botão “Quero meu e-book”. O pedido considera manter o corte e a inclinação atuais ou usar dois celulares como na referência local da Ser Bene. Esta análise descreve o estado do checkout local, sem verificar a página publicada.

## Evidências examinadas

- `web/app/page.tsx:39-75`: texto, figura e caminhos das duas imagens do hero.
- `web/styles/components.css:165-185,554,587-589`: dimensões relativas, inclinação, sobreposição e máscara da figura.
- `web/public/images/home-guide-poster-front.png` e `web/public/images/home-guide-poster-back.png`: imagens atuais, inspecionadas visualmente.
- `web/public/images/books/00-antes-da-consulta.png`: capa cadastrada no catálogo, inspecionada visualmente.
- `web/data/home-books.ts:1-35`: título, descrição, destaques, gratuidade e amostra do guia.
- `ebooks/00 - Antes da Consulta.pdf`: 15 páginas segundo `pdfinfo`; texto extraído com `pdftotext` e primeira página renderizada e inspecionada.
- `web/components/home-hero-interaction.tsx:37-91`: botão, texto de apoio e estado da prévia de captura.
- `web/styles/components.css:852-864` e `web/components/home-library-articles.tsx:10-42`: moldura de celular usada em outra seção da B2B.
- `serbene-copia/src/components/sites/serbene/static-sections.tsx:74-115` e `serbene-copia/src/app/globals.css:411-440,716-738`: estrutura e inclinação dos dois celulares da referência local.

## Estado observado

O hero B2B carrega `home-guide-poster-back.png` atrás e `home-guide-poster-front.png` à frente. Cada arquivo é um cartaz vertical completo: contém texto de campanha, um celular representado dentro da própria imagem, páginas ilustradas e um botão gráfico “BAIXE GRÁTIS”. A imagem da frente é descrita no código como arte temporária. O CSS gira o cartaz de trás em 4 graus e o da frente em menos 2 graus, sobrepõe ambos e aplica uma máscara gradual na parte inferior do conjunto.

A capa cadastrada do guia é uma imagem horizontal distinta dos cartazes. A primeira página do PDF também tem composição horizontal e traz o título “Antes da Consulta”, o subtítulo “Questionário de pré-atendimento e guia de preparação para nutricionistas” e a delimitação de que o pré-atendimento não deve virar uma consulta antecipada.

O PDF contém questionário, orientação para organizar respostas antes da consulta e instruções para criar um formulário no Google Forms. O texto afirma que as respostas são um ponto de partida para perguntas melhores. Também afirma que o questionário não substitui a anamnese e não define condutas antecipadamente.

O botão real do hero abre uma janela de prévia. A própria janela informa que ainda não envia nem registra a solicitação. A B2B já usa uma moldura de celular construída com HTML e CSS em outras seções. Na cópia local da Ser Bene, dois elementos `figure.fone` recebem telas separadas e inclinações próprias.

## Análise

A diferença visual entre o hero B2B e a referência não depende apenas da escolha das imagens. Na B2B, a rotação atua sobre dois cartazes completos; os celulares, páginas e botões fazem parte dos pixels dos cartazes. Na Ser Bene, a moldura e a tela são elementos separados. Portanto, o código atual do hero preserva a posição e o corte dos cartazes ao trocar os arquivos, mas não permite trocar somente a tela dos celulares desenhados neles.

O conteúdo do guia sustenta uma mensagem específica: reunir informações iniciais, reconhecer o que precisa ser aprofundado e chegar à consulta com perguntas preparadas. A promessa ampla de resolver a organização de todo o conhecimento da nutricionista não está demonstrada pelo guia isoladamente. Os botões “BAIXE GRÁTIS” dentro dos cartazes também representam uma ação diferente da prévia local aberta pelo botão real.

## Hipóteses avaliadas

- **As duas imagens são telas intercambiáveis dentro de celulares do hero:** descartada pelo JSX e pelo conteúdo visual dos arquivos. São dois cartazes completos.
- **A B2B já dispõe de moldura de celular em código:** confirmada em outras seções, mas essa moldura não é usada no hero atual.
- **O guia promete preparar a consulta a partir de respostas preliminares:** sustentada pelo PDF e pelo cadastro local. A preparação não equivale a diagnóstico, conduta pronta ou substituição da anamnese.

## Diagnóstico

As duas imagens procuradas são `web/public/images/home-guide-poster-front.png` e `web/public/images/home-guide-poster-back.png`. O hero atual sobrepõe e inclina dois cartazes fechados. Para exibir duas telas independentes dentro de celulares, seria necessária uma composição distinta da figura atual, embora o projeto já tenha código de moldura de celular em outras seções. O guia fornece uma proposta visual verificável em torno de preparar perguntas a partir de informações iniciais, com limites clínicos explícitos.

## Grau de certeza

Alto para os arquivos, a composição do hero e o conteúdo do PDF, verificados no código e nos artefatos locais. A reação comercial do público a qualquer imagem ainda não foi medida.

## Pontos ainda não comprovados

- Qual composição visual o responsável prefere para o hero.
- Se a página publicada corresponde ao checkout local examinado.
- Se uma nova imagem melhora compreensão ou conversão; isso exigiria avaliação com visitantes ou dados de uso.
