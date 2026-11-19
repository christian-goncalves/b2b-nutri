---
name: b2b-publicar-artigo
description: "Cadastra localmente um artigo aprovado na biblioteca científica B2B Nutris, gera seu card e página de leitura, e arquiva o Markdown após validação."
---

# B2B Nutris | Publicação local de artigo

## Objetivo e limites

Integrar um artigo editorial por execução à biblioteca científica local, gerando a página `/biblioteca/artigos/[slug]` e o card da categoria principal. A publicação desta skill significa cadastro e validação na aplicação local. Não fazer commit, push, merge, deploy, publicação em `main` nem alteração em serviços externos sem pedido explícito e autorização compatível.

O usuário deve indicar um único arquivo pelo caminho ou nome. Se não indicar o artigo ou indicar mais de um, pergunte qual arquivo processar. Não escolher outro artigo por conta própria.

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

- O arquivo indicado deve estar em uma das pastas de categoria em `editorial/`. A pasta existente `editorial/artigos-criados/` guarda artigos já integrados localmente.
- A presença do artigo em uma pasta de categoria representa aprovação editorial conforme a regra definida pelo responsável. Não exija uma segunda confirmação de aprovação.
- Para um artigo já em `editorial/artigos-criados/`, localize o cadastro correspondente e preserve a categoria principal já registrada. Se não houver cadastro que permita determinar a categoria, pergunte.
- Uma categoria principal por artigo. Para um arquivo em pasta de categoria, use a categoria correspondente e confira se o slug consta em `web/data/library/categories.ts`. Se a categoria não puder ser identificada ou houver conflito real, pergunte antes de editar.
- Arquivos em `ebooks/` são fontes editoriais validadas pelo responsável. Para `primaryProductSlug` e `relatedProductSlugs`, associe apenas produtos existentes e publicados em `web/data/home-books.ts`. Use o conteúdo do artigo e as referências para escolher o e-book principal. Se não houver vínculo editorial defensável ou houver mais de uma escolha igualmente plausível, pergunte somente esse vínculo. Não transforme o arquivo `00 - Antes da consulta` em produto se não existir como produto cadastrado.

## Metadados

Preserve os metadados existentes e siga o tipo e o validador atuais. Não invente dados pessoais ou científicos.

- Extraia do Markdown título, resumo e referências. Gere `id` e slug pelas convenções atuais, usando como slug o nome do arquivo e preservando URLs estáveis em atualizações.
- Gere tags relevantes a partir do conteúdo, sem repetição artificial de palavras-chave. Derive `seoTitle` e `seoDescription` do título e resumo quando forem úteis; os dois campos são opcionais no tipo.
- Use `editorialAuthor: "B2B Nutris"` e `editorialStatus: "approved"` para o artigo vindo de uma pasta de categoria.
- No primeiro cadastro, use versão `"1"`; defina `reviewedAt` como a data local atual de aprovação, e `publishedAt` e `updatedAt` como a data em que a página entrar na aplicação local. Datas devem usar `YYYY-MM-DD`.
- Em atualização, preserve `publishedAt` e a versão se houver apenas ajuste técnico, formatação ou correção sem efeito científico. Em mudança de conteúdo científico, incremente a versão inteira em uma unidade, atualize `reviewedAt` e `updatedAt` para a data local atual. Atualize `updatedAt` quando mudar conteúdo público ou metadados públicos.
- Preencha `reviewer` somente quando nome, qualificação ou CRN estiverem explicitamente presentes e autorizados. Não invente revisora, CRN ou qualificação.
- `primaryProductSlug` precisa apontar para um e-book cadastrado, pois o validador atual exige um produto principal válido. `relatedProductSlugs` pode ficar vazio. Cada referência estruturada precisa de `title` e `citation`; inclua URL apenas quando ela existir e for verificável.
- Pergunte apenas por campos obrigatórios ausentes ou ambiguidades que não possam ser resolvidas a partir do arquivo, do conteúdo validado em `ebooks/` e do código atual. Não pergunte datas, versão inicial, autoria institucional, categoria que já esteja indicada pela pasta ou aprovação que decorra da pasta.

## Nome do arquivo em Artigos Criados

Ao arquivar um artigo pela primeira vez, nomeie o Markdown como `<publishedAt>-<titulo-normalizado>.md`. Use a data `publishedAt` registrada no artigo, no formato `YYYY-MM-DD`, seguida pelo título completo normalizado em minúsculas, sem acentos e com palavras separadas por hífens. Remova pontuação que não faça parte das palavras. Exemplo: `2026-11-18-vitamina-b1-sinais-de-deficiencia-e-como-investigar-fatores-de-risco-nutricional.md`.

O prefixo representa a primeira data de publicação local do artigo, não a data de aprovação nem o dia em que o arquivo foi movido. Se estiver normalizando o nome de um artigo que já foi arquivado, use o `publishedAt` preservado no registry. Mantenha `id` e `slug` públicos existentes; o prefixo e o título do arquivo não definem a URL.

Depois do primeiro arquivamento, preserve o nome completo do arquivo em futuras revisões. Não altere o prefixo de data nem o segmento do título quando o texto, o título público ou outras datas forem atualizados.

## Integração e preservação do texto

1. Leia o Markdown integralmente. Preserve suas afirmações, limites, exemplos e referências. Não reescreva o conteúdo científico como parte da integração.
2. Mapeie `# Título` e `**Resumo:**` aos campos próprios do artigo. A rota atual oculta o H1 e o parágrafo iniciado por `Resumo:` no corpo exibido.
3. Mantenha `## Referências` no Markdown: a rota atual exibe o conteúdo MDX e usa `scientificReferences` para dados estruturados. Também mapeie as mesmas referências para o formato tipado, sem duplicar uma seção visível criada pela aplicação.
4. Cadastre o artigo em `web/data/library/articles.ts`, usando import MDX de arquivo local, categoria, e-book e metadados reais. Preserve os outros artigos e a ordem existente, salvo necessidade técnica comprovada.
5. Confirme que `editorialStatus` é `approved`, que a categoria vem do cadastro e que a rota individual e o card usam o mesmo slug. A página da categoria deve obter o card por `primaryCategory`.
6. Antes de mover o Markdown, execute a verificação local necessária para a aplicação e abra ou valide a rota do artigo e a categoria. Confirme que o artigo renderiza, o card aponta para a rota correta, a categoria e os metadados estão coerentes e não há erro de importação. Não afirmar validação visual sem observá-la.
7. Somente depois da validação local, mova o mesmo arquivo Markdown, sem alterar seu conteúdo, para `editorial/artigos-criados/<publishedAt>-<titulo-normalizado>.md`, seguindo a regra de nome acima. Atualize o import no registry para apontar para o arquivo arquivado e repita a validação técnica que a mudança de caminho exige.
8. Se a validação falhar, não mova o arquivo. Corrija apenas o problema da integração, preservando o texto; se o impedimento exigir decisão editorial, pare e explique o ponto exato.

Não registre o artigo em um CMS ou planilha. Não inclua PDFs comerciais completos em `web/public/`; o artigo é texto Markdown/MDX local. Não remova, renomeie ou altere outros artigos.

## Relato ao concluir

Informe o título, a categoria, o caminho local da página, o card e o arquivo em `editorial/artigos-criados/`. Descreva quais verificações locais foram executadas e seus resultados. Deixe explícito que cadastro local não comprova deploy nem disponibilidade pública. Se algo falhar ou ficar pendente, informe isso sem declarar a publicação concluída.

## Exemplo de uso

`$b2b-publicar-artigo Integre localmente editorial/micronutrientes/ferritina-e-ferro.md na biblioteca, valide a página e arquive o Markdown ao concluir.`
