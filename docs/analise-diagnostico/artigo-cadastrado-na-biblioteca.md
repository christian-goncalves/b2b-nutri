# Artigo cadastrado na biblioteca

## Objeto da investigação

Identificar qual dos três artigos editoriais existentes está cadastrado na biblioteca científica da aplicação.

## Contexto

Há três arquivos Markdown em pastas de categoria. O usuário observou um artigo apresentado pela aplicação e pediu para identificar a origem.

## Evidências examinadas

- `editorial/comportamento-alimentar/como-transformar-queixa-alimentar-em-perguntas-investigacao-clinica.md:1` contém o artigo sobre transformar queixas alimentares em perguntas clínicas.
- `editorial/micronutrientes/vitamina-b1-sinais-deficiencia-fatores-risco.md:1` contém o artigo sobre sinais de deficiência de vitamina B1.
- `editorial/suplementacao/creatina-quando-considerar-suplementacao.md:1` contém o artigo sobre creatina.
- `web/data/library/articles.ts:3, 6-12, 38` importa e cadastra somente o artigo de vitamina B1, com o conteúdo do arquivo em `editorial/micronutrientes/`.
- `web/data/library/articles.ts:75-86` retorna artigos aprovados e filtra por categoria principal.
- `web/app/biblioteca/[slug]/page.tsx:43, 72-78` lista os artigos cadastrados e usa cards demonstrativos apenas quando Micronutrientes não tem artigos cadastrados.
- `editorial/artigos-criados/` não contém arquivos Markdown.

## Estado observado

O registro da aplicação tem um artigo: “Vitamina B1: sinais de deficiência e como investigar fatores de risco nutricional”. Seu conteúdo vem de `editorial/micronutrientes/vitamina-b1-sinais-deficiencia-fatores-risco.md` e sua categoria principal é Micronutrientes.

Os arquivos sobre comportamento alimentar e creatina permanecem apenas nas respectivas pastas editoriais. O artigo de vitamina B1 também permanece na pasta de categoria; ainda não foi movido para `editorial/artigos-criados/`.

## Análise

O import do Markdown e o campo `title` no único registro coincidem com o arquivo de vitamina B1. A página de categoria obtém seus cards desse registro. Como há um artigo em Micronutrientes, a condição que exibe os três cards demonstrativos dessa categoria não se aplica.

## Diagnóstico

O artigo adaptado e cadastrado na aplicação é o de vitamina B1. Os artigos sobre comportamento alimentar e creatina não estão no registro da biblioteca.

## Grau de certeza

Alto para o cadastro no código local, pois o registro importa diretamente o Markdown de vitamina B1. A tela do navegador não foi inspecionada nesta verificação.

## Pontos ainda não comprovados

O estado de uma instância local aberta no navegador ou de qualquer deploy externo não foi verificado.
