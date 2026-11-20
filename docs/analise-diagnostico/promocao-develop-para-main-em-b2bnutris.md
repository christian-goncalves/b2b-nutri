# Diagnóstico da promoção de develop para main e da publicação em b2bnutris.com

## Objeto da investigação

Determinar o estado atual das branches, do deployment associado a b2bnutris.com e das condições técnicas que impedem a publicação pública do conteúdo mais recente.

## Contexto

O responsável quer que b2bnutris.com seja o único endereço público e não exija login. A intenção é usar develop como origem de uma única pull request para esta publicação, removê-la depois e manter main como única branch permanente. Para mudanças futuras, o responsável aceita branches temporárias que abram pull requests para main.

O responsável confirmou a aprovação dos sete artigos pela nutricionista e declarou 2026-11-19 como data de revisão, inclusive para o artigo de vitamina B1. O Search Console, analytics e medição de cliques não foram configurados, segundo o responsável.

Esta investigação registra o estado atual. Não inclui commit, envio de branches, abertura ou merge de pull request, exclusão de branch, alteração de configuração, deployment ou revisão do mérito clínico dos artigos.

## Evidências examinadas

- AGENTS.md:3-24, docs/roteiro.md:381-396 e docs/plano-execucao-seo-aeo.md:3-29: hierarquia das fontes, critérios do CP-06, configuração prevista para branches e dependências de publicação.
- Estado Git local em 2026-11-19: branch atual, referências locais e remotas, comparação de origin/main com origin/develop, histórico e git status --short --branch --untracked-files=all.
- Comparação do GitHub para christian-goncalves/b2b-nutri, base main e head develop: status diverged, quatro commits à frente em develop e um commit exclusivo em main.
- Regras ativas do GitHub obtidas por leitura de repos/christian-goncalves/b2b-nutri/rulesets/27566628: regras pull_request, deletion e non_fast_forward; zero aprovações obrigatórias; merge, squash e rebase permitidos.
- Vercel, leitura de aliases, deployments, domínio do projeto e dados da conexão Git: alias atual de b2bnutris.com, deployment READY, origem Git, deployments anteriores de develop marcados como production e domínios associados ao projeto.
- Requisições HTTP anônimas a https://b2bnutris.com/, https://b2bnutris.com/robots.txt e https://b2bnutris.com/sitemap.xml, seguindo redirecionamentos sem autenticação.
- Diagnóstico anterior docs/analise-diagnostico/branches-main-develop-e-artigos-na-pratica-clinica.md, que registra um estado anterior da associação do domínio.
- web/data/library/articles.ts:3-12, 14-44, 47-67 e registros seguintes: sete artigos registrados como aprovados, seus imports e suas datas.
- Estado local das mudanças em web/app/biblioteca/artigos/[slug]/page.tsx, web/app/globals.css, web/data/library/articles.ts e arquivos MDX em editorial/artigos-criados/ e editorial/publicados/.
- Validações locais executadas na inspeção anterior deste checkout: npm run test:forms, npm run typecheck e npm run build passaram. O build gerou 38 páginas estáticas.
- Declarações do responsável sobre aprovação editorial, data desejada da revisão da vitamina B1, ausência de Search Console e analytics e intenção de publicação pública sem login.

## Estado observado

- O checkout está em develop, no commit a6b68992339e4df7ec6ad4796f838e53b8cd26d8. A referência local main aponta para 1e338a331947ba9a73838b026abe36beca2b2341, enquanto origin/main aponta para fe6cde92dd5d60cc93a947e9dd33e2041c96ebc4. A branch local main está dois commits atrás de origin/main.
- origin/develop aponta para a6b68992339e4df7ec6ad4796f838e53b8cd26d8. A comparação remota classifica main e develop como divergentes. Develop contém quatro commits que não estão em main; main contém um commit de merge que não está em develop.
- O commit fe6cde9 é um merge de pull request em main. A regra ativa Protect production main exige pull request e bloqueia atualização não fast-forward. A regra não exige aprovação de outro revisor.
- O status local apresenta mudanças sem commit. Entre as mudanças relacionadas ao site estão a transferência de dois artigos de editorial/artigos-criados/ para editorial/publicados/, ajustes em web/data/library/articles.ts, web/app/biblioteca/artigos/[slug]/page.tsx e web/app/globals.css. Também há alterações em skills, incluindo .agents/skills/seo-audit/ e skills-lock.json, documentos, INBOX.md e outros arquivos fora do site.
- O registro local contém sete artigos com editorialStatus "approved". Seis têm reviewedAt 2026-11-19. O artigo de vitamina B1 tem reviewedAt 2026-11-18 em web/data/library/articles.ts:40, embora o responsável tenha declarado 2026-11-19 como a data correta para essa revisão.
- A consulta exata do alias b2bnutris.com resolve atualmente para o deployment dpl_FF7FLowpPzj5MN61NcX7e4XAePLB, READY, criado de main no commit fe6cde92dd5d60cc93a947e9dd33e2041c96ebc4.
- O deployment mais recente de develop, no commit a6b6899, é Preview. O histórico da Vercel também contém dois deployments anteriores de develop no commit a63eebc com target production. A consulta atual do alias específico de b2bnutris.com continua resolvendo para o deployment de main.
- A lista de domínios personalizados verificados do projeto contém b2bnutris.com. O projeto também apresenta hostnames de deployment da Vercel, incluindo um alias de develop. A configuração explícita da branch padrão de produção não apareceu na resposta da API consultada.
- O projeto da Vercel informa proteção SSO para deployments. Sem autenticação, as três requisições ao domínio terminaram em vercel.com/login e receberam HTML de login com status HTTP 200. O conteúdo do site, o robots real e o sitemap real não foram entregues a essas requisições.
- O código local gera robots e sitemap para produção em web/app/robots.ts:4-12 e web/app/sitemap.ts:7-25. O acesso HTTP bloqueado impede confirmar essas respostas na origem pública.
- O CP-06 continua marcado como aberto em docs/roteiro.md:381-396. O plano SEO/AEO mantém dependências de publicação editorial, legais, privacidade, Preview, hospedagem e Hotmart em docs/plano-execucao-seo-aeo.md:21-29.

## Análise

O deployment atualmente associado ao domínio personalizado vem de main, mas o código mais recente de develop ainda não está em main. A diferença remota é de quatro commits de develop e um merge commit exclusivo de main. A branch local main também não está sincronizada com origin/main, então o nome da branch local, sozinho, não representa o estado atual da produção.

O padrão de trabalho desejado é compatível com a proteção atual de main se uma branch de origem abrir a pull request. A regra não exige que develop permaneça como branch de longo prazo. A regra também não permite atualizar main diretamente por push.

O checkout contém mudanças locais necessárias à versão editorial, mas elas ainda não fazem parte de origin/develop. O status inclui arquivos alheios à aplicação. Portanto, o conjunto local inteiro não equivale a um candidato de publicação definido. As validações anteriores demonstram que um build local passou naquele estado; elas não demonstram que o domínio público entrega o conteúdo.

Há uma diferença entre a declaração editorial e os metadados: o responsável define 2026-11-19 como data de revisão da vitamina B1, enquanto o registro do artigo ainda contém 2026-11-18. Esta análise aceita a declaração do responsável como a data pretendida e registra o código como divergente.

A associação do alias do domínio e o acesso público são propriedades separadas. O alias atual aponta para main, mas o SSO impede acesso anônimo. Como robots.txt e sitemap.xml também terminam na tela de login, Googlebot e outros clientes sem sessão não conseguem ler esses recursos pelo caminho consultado. O código local de robots e sitemap não altera esse bloqueio externo.

## Hipóteses avaliadas

- A hipótese de que b2bnutris.com esteja atualmente associado a develop é enfraquecida pela consulta específica do alias, que resolve para main no commit fe6cde9. Os deployments antigos de develop marcados como production mostram histórico de deployments, mas não substituem a consulta do alias atual.
- A hipótese de que a integração do código em main, por si só, torne o domínio público é descartada. A resposta anônima termina em login e o projeto informa proteção SSO.
- A hipótese de que os commits locais já estejam disponíveis na Preview é descartada pelo estado Git: as alterações listadas ainda não têm commit e o último Preview consultado corresponde ao SHA a6b6899.

## Diagnóstico

O projeto ainda não está no estado público pretendido. O alias atual de b2bnutris.com resolve para main no commit fe6cde9; os quatro commits exclusivos de develop e as mudanças locais relevantes não estão todos integrados em main. A regra atual do GitHub exige pull request para alterar main.

Mesmo depois da integração do conteúdo, o domínio não atenderá à intenção pública enquanto o acesso anônimo continuar redirecionando para o login da Vercel. Esse bloqueio também impede a leitura pública de robots.txt e sitemap.xml.

O estado editorial tem uma divergência de data: a vitamina B1 está registrada como revisada em 2026-11-18, enquanto a data confirmada pelo responsável é 2026-11-19. A confirmação de aprovação dos sete artigos é uma declaração do responsável; a marcação local como approved não é prova independente dessa aprovação.

## Grau de certeza

Alto para os ponteiros Git consultados, a regra ativa de pull request, o alias atual de b2bnutris.com, o redirecionamento anônimo para login e a divergência da data no registro local. Médio para o comportamento futuro da branch de produção, porque a resposta da Vercel não expôs o campo de configuração productionBranch e nenhuma pull request ou publicação foi executada.

## Pontos ainda não comprovados

- Se uma pull request de develop para main está livre de conflitos. Nenhuma pull request foi criada nem foi testada sua mesclagem.
- Qual branch está explicitamente configurada como productionBranch no projeto Vercel. A consulta direta do alias mostra main como deployment atual do domínio.
- Qual versão do conteúdo um visitante autenticado vê em b2bnutris.com. A verificação anônima encontrou a proteção SSO antes do HTML do site.
- Se Googlebot, OAI-SearchBot e outros crawlers conseguem acessar o conteúdo depois de uma eventual mudança de acesso.
- Se Search Console, analytics ou medição de cliques estão configurados em contas externas. O responsável declarou que não estão.
- Se os demais critérios ainda abertos do CP-06 e as dependências de Hotmart, textos legais, privacidade e hospedagem foram concluídos.
