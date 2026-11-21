# Branches main e develop e artigos na Prática clínica

## Objeto da investigação

Determinar se a publicação dos artigos foi mergeada em `main`, identificar qual branch alimenta o domínio de Produção e explicar por que `/biblioteca/pratica-clinica` aparece sem artigos.

## Contexto

O commit `a63eebc` foi enviado para `develop`. Depois, houve um deployment de Produção iniciado a partir desse mesmo commit. A dúvida é se isso também alterou a branch `main` e se a categoria Prática clínica deveria listar os artigos.

## Evidências examinadas

- Referências Git locais e remotas em 2026-11-19: `origin/main` aponta para `fe6cde92dd5d60cc93a947e9dd33e2041c96ebc4`; `origin/develop` aponta para `a63eebc042a235dd9e52baf583994079307cf5fb`. O histórico mostra `fe6cde9` como merge de `0144d6d` em `main`, enquanto `a63eebc` é o topo de `develop`.
- `git rev-list --left-right --count origin/main...origin/develop`: existem um commit exclusivo em `main` e dois commits exclusivos em `develop`; as árvores das duas referências remotas são diferentes.
- `web/data/library/articles.ts:7-64`: há dois artigos aprovados no registro, Vitamina B1 com categoria principal `micronutrientes` e o artigo sobre queixa alimentar com categoria principal `comportamento-alimentar`.
- `web/data/library/articles.ts:109-111`: a consulta de artigos filtra pelo valor exato da categoria principal.
- `web/app/biblioteca/[slug]/page.tsx:43, 72-92`: a página mostra os artigos dessa consulta ou, se ela estiver vazia, exibe a mensagem de ausência de artigos aprovados. Os três cards de demonstração são exclusivos de desenvolvimento e da categoria Micronutrientes.
- `web/data/library/categories.ts:37-41`: Prática clínica é uma categoria válida, mas não há indicação de artigo cadastrado nela.
- HTML e cabeçalhos HTTP consultados em `https://b2b-nutris-git-develop-christian-goncalves-projects.vercel.app/biblioteca/pratica-clinica` e `https://b2bnutris.com/biblioteca/pratica-clinica`: ambas as respostas foram HTTP 200 e continham a mensagem de estado vazio.
- Metadados da Vercel para o deployment atual `dpl_FrZwo7rJ9miYoXqkCoPA8NfTZuPu`: estado `READY`, alvo `production`, branch de origem `develop`, SHA `a63eebc042a235dd9e52baf583994079307cf5fb` e aliases incluindo `b2bnutris.com`.
- Metadados da Vercel para o deployment de Produção anterior consultado, `dpl_FF7FLowpPzj5MN61NcX7e4XAePLB`: branch de origem `main`, SHA `fe6cde92dd5d60cc93a947e9dd33e2041c96ebc4`.
- `docs/plano-execucao-seo-aeo.md:9-15, 23-25`: descreve a intenção de manter `main` servindo a vitrine e `develop` em Preview, e condiciona publicação simultânea à resolução dos bloqueios e à autorização explícita.

## Estado observado

`origin/main` continua em `fe6cde9`, enquanto `origin/develop` está em `a63eebc`. O commit que cadastra os artigos está em `develop`; a árvore de `main` não contém o arquivo de registro `web/data/library/articles.ts` nem a página de categoria implementada em `web/app/biblioteca/[slug]/page.tsx`.

Apesar disso, o deployment de Produção atual foi criado a partir de `develop` e associa `b2bnutris.com` a esse deployment. O deployment de Produção consultado anteriormente foi construído a partir de `main`.

Na aplicação de `develop`, dois artigos estão aprovados. Nenhum tem `pratica-clinica` como categoria principal. Por isso, tanto a URL de Preview quanto o domínio de Produção exibem a categoria Prática clínica sem cards de artigos. O estado vazio é uma resposta normal da rota, não um erro HTTP.

## Análise

O merge de `0144d6d` em `main` não inclui os commits posteriores `7c0947d` e `a63eebc`, que estão somente em `develop`. Portanto, a funcionalidade recente dos artigos não foi mergeada em `main`.

O deployment é independente da posição da branch: a Vercel pode associar um deployment construído de `develop` ao alvo de Produção e aos aliases do domínio público. Os metadados confirmam que isso ocorreu. Assim, a branch `main` permanece no estado anterior, mas o conteúdo servido em `b2bnutris.com` passou a vir do commit de `develop`.

A ausência de artigos em `/biblioteca/pratica-clinica` decorre do cadastro atual: os dois registros aprovados pertencem a Micronutrientes e Comportamento alimentar. A filtragem por categoria principal não os inclui em Prática clínica.

## Diagnóstico

Não, a publicação dos artigos não foi mergeada em `main`. `main` continua em `fe6cde9` e `develop` contém `a63eebc`. Porém, o deployment atual de Produção foi construído de `develop` e está associado a `b2bnutris.com`, então o domínio público pode mostrar o conteúdo de `develop` mesmo sem merge em `main`.

A branch `main` não precisa ser revertida para recuperar o estado Git anterior: ela não avançou para `a63eebc`. A alteração observada em Produção é a seleção do deployment e dos aliases na Vercel, diferente de um merge ou revert de branch.

A página `/biblioteca/pratica-clinica` fica sem artigos porque nenhum dos dois artigos aprovados tem essa categoria principal. As rotas de artigos estão cadastradas sob Micronutrientes e Comportamento alimentar.

## Grau de certeza

Alto. As referências Git remotas, os metadados dos deployments, o cadastro de artigos, a regra de filtragem e as respostas HTTP das duas URLs foram consultados diretamente.

## Pontos ainda não comprovados

- Não foi verificado o conteúdo da tela de Deployments no navegador; o estado da Vercel foi lido pelos metadados da API e as páginas foram consultadas por HTTP.
- Não foi feita uma comparação visual ou de conteúdo integral entre a versão anterior de Produção e a atual; a identificação da versão anterior se limita aos metadados do deployment `dpl_FF7FLowpPzj5MN61NcX7e4XAePLB`.
