---
name: b2b-criar-artigo
description: "Cria ou revisa um artigo científico da B2B Nutris a partir de um PDF, confere temas já cobertos em pendentes e publicados, e salva o Markdown em editorial/pendentes/<categoria>/."
---

# B2B Nutris | Criar artigo

## Objetivo

Produzir um artigo por execução, original, claro e útil para nutricionistas e estudantes de Nutrição. A entrega é um único arquivo Markdown com o texto editorial, sem ficha de cadastro ou documentação de processo.

## Entrada e fonte

1. Use o PDF e o tema indicados pelo usuário. Se o tema não for fornecido, escolha um recorte específico sustentado pelo material e informe a escolha brevemente.
2. Arquivos dentro de `ebooks/` são fontes editoriais validadas pelo responsável. Consulte o conteúdo relevante e cite o título e as páginas usadas. Não trate essa validação como evidência de afirmações que o PDF não sustenta.
3. Consulte fontes científicas adicionais quando solicitado ou quando forem necessárias para sustentar o tema. Diferencie o que vem do PDF do que vem de fontes externas; não invente estudos, dados, URLs ou DOI.
4. Preserve limites das evidências, contexto clínico e cautelas do material. Evite texto genérico, repetição de palavras-chave e cópia extensa do e-book.

Antes de escolher o recorte e redigir, leia os artigos Markdown existentes em `editorial/pendentes/` e `editorial/publicados/`, percorrendo as categorias. Compare títulos, resumos, foco clínico e conteúdo relevante para identificar temas já cobertos. Se o usuário não indicar tema, escolha no PDF um recorte específico que acrescente cobertura ao conjunto. Se o usuário indicar um tema já coberto, explique a sobreposição e pergunte se deseja um ângulo distinto ou se quer prosseguir mesmo assim. Um mesmo PDF pode sustentar artigos diferentes quando o recorte acrescenta conteúdo próprio.

## Categoria e destino

Escolha automaticamente uma única categoria principal pelo foco do artigo, entre as pastas existentes:

- `editorial/pendentes/comportamento-alimentar/`
- `editorial/pendentes/micronutrientes/`
- `editorial/pendentes/suplementacao/`
- `editorial/pendentes/pratica-clinica/`

Classifique pelo foco principal do artigo, não apenas pela categoria do PDF de origem. Se houver dúvida real entre duas ou mais categorias e a leitura do artigo não resolver, pergunte antes de salvar. Salve o arquivo Markdown final diretamente em `editorial/pendentes/<categoria>/<slug>.md`, mantendo a subpasta correspondente entre `comportamento-alimentar`, `micronutrientes`, `suplementacao` e `pratica-clinica`. Esta pasta reúne artigos concluídos pela skill e aguardando a integração da skill `b2b-publicar-artigo` à biblioteca.

Não acrescente estado ou bloco de aprovação ao Markdown. Não salve em `editorial/publicados/`, em outros caminhos de `editorial/`, em `web/` ou em `web/public/`. Não altere `.gitignore` e não faça commit.

## Estrutura do Markdown

- `# Título` objetivo, ligado a uma dúvida ou tarefa clínica.
- `**Resumo:**` em um parágrafo curto.
- Resposta ou explicação direta no início.
- Desenvolvimento em seções `##`, com exemplos ou tabelas somente quando ajudarem.
- Conclusão breve, se fizer sentido.
- `## Referências` com o PDF-base, título e páginas utilizadas, e fontes externas efetivamente consultadas. Manter links verificáveis quando disponíveis.

### Compatibilidade e leitura em telas estreitas

- Use recursos Markdown suportados pela configuração atual do parser da aplicação. Antes de usar sintaxe além do Markdown básico, confira `web/next.config.ts` e as dependências relevantes em `web/package.json`; a extensão `.md` ou `.mdx`, por si só, não comprova suporte a uma extensão Markdown.
- Use tabelas somente quando facilitarem uma comparação. Confirme que a sintaxe será convertida em tabela pelo parser e que o conteúdo continua legível em tela estreita, considerando os estilos existentes.
- Se o suporte ou a leitura não puderem ser confirmados, organize a informação em seções, listas ou parágrafos curtos, preservando o sentido, os limites e as afirmações científicas.
- Esta skill produz o Markdown. Não altere o parser, a configuração, as dependências ou os estilos da aplicação para acomodar um artigo.

Não acrescentar ficha técnica, status, revisora, CRN, datas, versão, ID, slug em metadados, tags, categoria, comentários de processo, checklist ou bloco `Aprofunde o tema`. A categoria é indicada pela pasta, não por um campo no corpo.

O título, o resumo e as referências podem permanecer no Markdown para leitura editorial. A integração com a aplicação deve conferir o que a rota já renderiza e não duplicar elementos. Hoje a rota remove do corpo o H1 e o parágrafo iniciado por `Resumo:`; as referências continuam como conteúdo visível do artigo e também precisam ser mapeadas para os metadados estruturados.

## Saída

Salve somente o arquivo Markdown na pasta da categoria. Ao terminar, informe o caminho salvo e, se houver, uma pendência científica realmente importante. Não cadastre o artigo na aplicação; essa é a função da skill `b2b-publicar-artigo` quando solicitada.

## Exemplo de uso

`$b2b-criar-artigo Crie um artigo sobre [tema] usando [PDF] e salve em pendentes, na categoria editorial adequada.`
