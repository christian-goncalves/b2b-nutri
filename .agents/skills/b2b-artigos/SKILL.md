---
name: b2b-artigos
description: "Cria ou revisa um artigo científico da B2B Nutris a partir de um PDF e salva o Markdown na pasta da categoria editorial identificada."
---

# B2B Nutris | Criação de artigo

## Objetivo

Produzir um artigo por execução, original, claro e útil para nutricionistas e estudantes de Nutrição. A entrega é um único arquivo Markdown com o texto editorial, sem ficha de cadastro ou documentação de processo.

## Entrada e fonte

1. Use o PDF e o tema indicados pelo usuário. Se o tema não for fornecido, escolha um recorte específico sustentado pelo material e informe a escolha brevemente.
2. Arquivos dentro de `ebooks/` são fontes editoriais validadas pelo responsável. Consulte o conteúdo relevante e cite o título e as páginas usadas. Não trate essa validação como evidência de afirmações que o PDF não sustenta.
3. Consulte fontes científicas adicionais quando solicitado ou quando forem necessárias para sustentar o tema. Diferencie o que vem do PDF do que vem de fontes externas; não invente estudos, dados, URLs ou DOI.
4. Preserve limites das evidências, contexto clínico e cautelas do material. Evite texto genérico, repetição de palavras-chave e cópia extensa do e-book.

## Categoria e destino

Escolha uma única categoria principal entre as pastas existentes:

- `editorial/comportamento-alimentar/`
- `editorial/micronutrientes/`
- `editorial/suplementacao/`
- `editorial/pratica-clinica/`

Classifique pelo foco principal do artigo, não apenas pela categoria do PDF de origem. Se houver dúvida real entre duas ou mais categorias, pergunte antes de salvar. Salve o arquivo diretamente na pasta escolhida como `editorial/<categoria>/<slug>.md`.

A presença de um artigo nessa pasta representa sua aprovação editorial para o fluxo local da B2B Nutris. Não acrescente um estado ou bloco de aprovação ao Markdown. Não salve em `editorial/rascunhos/`, `editorial/artigos-criados/`, `web/` ou `web/public/`. Não altere `.gitignore` para acomodar o artigo e não faça commit.

## Estrutura do Markdown

- `# Título` objetivo, ligado a uma dúvida ou tarefa clínica.
- `**Resumo:**` em um parágrafo curto.
- Resposta ou explicação direta no início.
- Desenvolvimento em seções `##`, com exemplos ou tabelas somente quando ajudarem.
- Conclusão breve, se fizer sentido.
- `## Referências` com o PDF-base, título e páginas utilizadas, e fontes externas efetivamente consultadas. Manter links verificáveis quando disponíveis.

Não acrescentar ficha técnica, status, revisora, CRN, datas, versão, ID, slug em metadados, tags, categoria, comentários de processo, checklist ou bloco `Aprofunde o tema`. A categoria é indicada pela pasta, não por um campo no corpo.

O título, o resumo e as referências podem permanecer no Markdown para leitura editorial. A integração com a aplicação deve conferir o que a rota já renderiza e não duplicar elementos. Hoje a rota remove do corpo o H1 e o parágrafo iniciado por `Resumo:`; as referências continuam como conteúdo visível do artigo e também precisam ser mapeadas para os metadados estruturados.

## Saída

Salve somente o arquivo Markdown na pasta da categoria. Ao terminar, informe o caminho salvo e, se houver, uma pendência científica realmente importante. Não cadastre o artigo na aplicação; essa é a função da skill `b2b-publicar-artigo` quando solicitada.

## Exemplo de uso

`$b2b-artigos Crie um artigo sobre [tema] usando [PDF] e classifique-o na pasta editorial adequada.`
