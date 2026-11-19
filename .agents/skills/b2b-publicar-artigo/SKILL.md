---
name: b2b-publicar-artigo
description: "Busca artigos em editorial/pendentes/<categoria>/, integra um artigo aprovado à biblioteca B2B Nutris, valida a página e o card, e move o Markdown para editorial/publicados/<categoria>/."
---

# B2B Nutris | Publicação de artigo na biblioteca

## Objetivo e limites

Integrar artigos editoriais à biblioteca científica da aplicação, gerando a página `/biblioteca/artigos/[slug]` e o card da categoria principal de cada artigo. Processar um artigo por vez e validar cada um antes de avançar ao próximo. Nesta etapa, “publicar” significa incorporar o artigo à página e à biblioteca no código do checkout atual. Um deploy posterior é independente desta etapa. Não fazer commit, push, merge, deploy, publicação em `main` nem alteração em serviços externos sem pedido explícito e autorização compatível.

Quando o usuário pedir explicitamente todos os artigos pendentes, inventarie uma vez os arquivos Markdown das quatro categorias de `editorial/pendentes/` e processe essa lista completa, em ordem lexicográfica de caminho, um arquivo por vez. Termine todas as etapas e verificações de um artigo antes de começar o próximo, sem solicitar aprovação intermediária do usuário. Não inclua arquivos que apareçam na pasta depois do inventário inicial.

Quando o usuário não indicar um artigo nem pedir explicitamente todos, procure Markdown nas quatro categorias de `editorial/pendentes/`. Se houver exatamente um arquivo, selecione-o. Se houver mais de um, liste os caminhos e pergunte qual processar. Se não houver nenhum, informe que não há artigo pendente. Quando o usuário indicar um caminho ou nome, confirme que corresponde a um arquivo em `editorial/pendentes/`; não escolha outro arquivo por conta própria.

Em um lote, se um artigo não puder ser processado por uma ambiguidade obrigatória ou falhar em uma validação individual, mantenha-o em `editorial/pendentes/`, registre o motivo e continue com os próximos artigos que possam ser processados independentemente. Não interrompa o lote por falha isolada. Interrompa-o somente quando um bloqueio compartilhado impedir a integração ou a validação confiável dos artigos restantes. Ao final, relate os artigos concluídos e os que permaneceram pendentes, com o motivo de cada falha.

## Leitura obrigatória antes da integração

No repositório B2B Nutris, confira o estado Git e preserve todas as alterações existentes. Leia:

- `AGENTS.md` e as instruções aplicáveis em `web/AGENTS.md` antes de editar qualquer arquivo de `web/`.
- `docs/roteiro.md` e `docs/decisoes-implementacao.md`, respeitando os checkpoints ativos.
- `web/types/scientific-article.ts`.
- `web/data/library/articles.ts` e `web/data/home-books.ts`.
- `web/data/library/categories.ts`.
- `web/app/biblioteca/artigos/[slug]/page.tsx` e a página da categoria principal.
- `docs/especificacao-seo-aeo.md`.

Consulte a documentação local do Next.js instalado antes de modificar código da aplicação. Reutilize o modelo, a rota, os cards e o Design System existentes. Não crie outra rota, modelo de dados, banco, CMS ou sistema editorial.

## Estado editorial e origem

- O artigo de entrada deve estar em uma destas pastas: `editorial/pendentes/comportamento-alimentar/`, `editorial/pendentes/micronutrientes/`, `editorial/pendentes/suplementacao/` ou `editorial/pendentes/pratica-clinica/`.
- A categoria principal vem da subpasta e deve corresponder a uma categoria em `web/data/library/categories.ts`. Se a categoria não puder ser identificada ou houver conflito real, pergunte antes de editar.
- Antes de integrar, confira `editorial/publicados/` e `web/data/library/articles.ts` para verificar se o artigo já foi publicado ou cadastrado. Não crie um segundo registro para o mesmo artigo. Para atualizar um artigo existente, preserve o `id`, o slug público, a categoria principal e as datas aplicáveis.
- Arquivos em `ebooks/` são fontes editoriais validadas pelo responsável. Para `primaryProductSlug` e `relatedProductSlugs`, associe apenas produtos existentes e publicados em `web/data/home-books.ts`. Use o conteúdo do artigo e as referências para escolher o e-book principal. Se não houver vínculo editorial defensável ou houver mais de uma escolha igualmente plausível, pergunte somente esse vínculo. Não transforme o arquivo `00 - Antes da consulta` em produto se não existir como produto cadastrado.

## Metadados

Preserve os metadados existentes e siga o tipo e o validador atuais. Não invente dados pessoais ou científicos.

- Extraia do Markdown título, resumo e referências. Gere `id` e slug pelas convenções atuais, usando como slug o nome do arquivo e preservando URLs estáveis em atualizações.
- Gere tags relevantes a partir do conteúdo, sem repetição artificial de palavras-chave. Derive `seoTitle` e `seoDescription` do título e resumo quando forem úteis; os dois campos são opcionais no tipo.
- Use `editorialAuthor: "B2B Nutris"` e `editorialStatus: "approved"` para o artigo vindo de `editorial/pendentes/<categoria>/`, que é a fila de artigos finalizados para publicação.
- No primeiro cadastro, use versão `"1"`; defina `reviewedAt` como a data local atual de aprovação, e `publishedAt` e `updatedAt` como a data em que a página entrar na biblioteca da aplicação. Datas devem usar `YYYY-MM-DD`.
- Em atualização, preserve `publishedAt` e a versão se houver apenas ajuste técnico, formatação ou correção sem efeito científico. Em mudança de conteúdo científico, incremente a versão inteira em uma unidade, atualize `reviewedAt` e `updatedAt` para a data local atual. Atualize `updatedAt` quando mudar conteúdo público ou metadados públicos.
- Preencha `reviewer` somente quando nome, qualificação ou CRN estiverem explicitamente presentes e autorizados. Não invente revisora, CRN ou qualificação.
- `primaryProductSlug` precisa apontar para um e-book cadastrado, pois o validador atual exige um produto principal válido. `relatedProductSlugs` pode ficar vazio. Cada referência estruturada precisa de `title` e `citation`; inclua URL apenas quando ela existir e for verificável.
- Pergunte apenas por campos obrigatórios ausentes ou ambiguidades que não possam ser resolvidas a partir do arquivo, do conteúdo validado em `ebooks/` e do código atual. Não pergunte datas, versão inicial, autoria institucional, categoria que já esteja indicada pela pasta ou aprovação que decorra da presença do artigo em `editorial/pendentes/`.

## Nome do arquivo em Publicados

Ao publicar um artigo pela primeira vez, mova o Markdown para a mesma categoria em `editorial/publicados/` e nomeie-o como `<publishedAt>-<titulo-normalizado>.md`. Use a data `publishedAt` registrada no artigo, no formato `YYYY-MM-DD`, seguida pelo título completo normalizado em minúsculas, sem acentos e com palavras separadas por hífens. Remova pontuação que não faça parte das palavras. Exemplo: `2026-11-18-vitamina-b1-sinais-de-deficiencia-e-como-investigar-fatores-de-risco-nutricional.md`.

O prefixo representa a primeira data em que o artigo entrou na biblioteca da aplicação, não a data de aprovação nem o dia em que o arquivo foi movido. Se estiver normalizando o nome de um artigo que já foi publicado, use o `publishedAt` preservado no registry. Mantenha `id` e `slug` públicos existentes; o prefixo e o título do arquivo não definem a URL.

Depois da primeira publicação, preserve o caminho, o prefixo de data e o segmento do título em futuras revisões. Não renomeie o arquivo quando o texto, o título público ou outras datas forem atualizados.

## Integração e preservação do texto

1. Leia o Markdown integralmente. Preserve suas afirmações, limites, exemplos e referências. Não reescreva o conteúdo científico como parte da integração.
2. Mapeie `# Título` e `**Resumo:**` aos campos próprios do artigo. A rota atual oculta o H1 e o parágrafo iniciado por `Resumo:` no corpo exibido.
3. Mantenha `## Referências` no Markdown: a rota atual exibe o conteúdo MDX e usa `scientificReferences` para dados estruturados. Também mapeie as mesmas referências para o formato tipado, sem duplicar uma seção visível criada pela aplicação.
4. Cadastre o artigo em `web/data/library/articles.ts`, usando import MDX de arquivo local, categoria, e-book e metadados reais. Preserve os outros artigos e a ordem existente, salvo necessidade técnica comprovada.
5. Confirme que `editorialStatus` é `approved`, que a categoria vem do cadastro e que a rota individual e o card usam o mesmo slug. A página da categoria deve obter o card por `primaryCategory`.
6. Antes de mover o Markdown, execute a verificação local necessária para a aplicação e abra ou valide a rota do artigo e a categoria. Confira se cada recurso Markdown usado no arquivo aparece com a estrutura visual correspondente, sem sintaxe Markdown literal. Para tabelas, confirme que a página gerou elementos de tabela com cabeçalhos e células. Observe a rota em uma largura estreita e em desktop; registre as larguras verificadas. Em telas estreitas, confirme que o conteúdo continua acessível e que não há rolagem horizontal na página inteira, salvo quando o próprio componente oferecer uma área de rolagem. Confirme também que o card aponta para a rota correta, a categoria e os metadados estão coerentes e não há erro de importação. Abrir a rota ou confirmar que o artigo não gerou erro de importação não basta para declarar validação visual.
7. Somente depois de a rota e o card passarem a validação local, mova o mesmo Markdown, sem alterar seu conteúdo, de `editorial/pendentes/<categoria>/` para `editorial/publicados/<mesma-categoria>/<publishedAt>-<titulo-normalizado>.md`. Atualize o import no registry para o caminho final e repita a validação da rota e do card. Essa etapa incorpora o artigo à aplicação do checkout atual; um deploy posterior é independente desta skill.
8. Se qualquer validação falhar, mantenha o arquivo em `editorial/pendentes/<categoria>/`, não declare a publicação concluída e registre o ponto que falhou. Se a validação final falhar depois da mudança para `editorial/publicados/`, mova o arquivo de volta para o caminho pendente original e restaure o import do registry para esse caminho. Se a causa exigir alterar conteúdo editorial, encerre a integração e deixe o arquivo pendente para revisão editorial. Corrija apenas falhas de integração que não exijam alterar o conteúdo editorial.

Em um lote, considere concluído o checkpoint de cada artigo somente depois de repetir e aprovar a validação da rota e do card após mover o Markdown para `editorial/publicados/`. Só então avance ao próximo arquivo da lista. Esse checkpoint é interno ao processamento e não exige confirmação do usuário. Se falhar, aplique a regra de falha isolada acima e continue apenas se os artigos seguintes puderem ser validados com confiança.

Não registre o artigo em um CMS ou planilha. Não inclua PDFs comerciais completos em `web/public/`; o artigo é texto Markdown/MDX local. Não remova, renomeie ou altere outros artigos.

## Relato ao concluir

Para um artigo, informe o título, a categoria, o caminho da página, o card e o arquivo em `editorial/publicados/<categoria>/`. Em um lote, informe esses dados para cada artigo concluído e liste separadamente os que continuam em `editorial/pendentes/<categoria>/` com o motivo. Descreva as verificações locais executadas e seus resultados. Não declare que houve deploy.

## Exemplo de uso

`$b2b-publicar-artigo Publique o artigo pendente sobre ferritina na biblioteca. Valide a página e o card, renomeie pelo publishedAt e mova o Markdown para publicados.`

`$b2b-publicar-artigo Publique todos os artigos pendentes na biblioteca, um por vez, concluindo a validação da página e do card de cada artigo antes de avançar ao próximo.`
