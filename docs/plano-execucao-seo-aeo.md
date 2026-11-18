# Plano de execução SEO/AEO

Este plano organiza a evolução incremental da aplicação existente para incluir a biblioteca científica e conectar as vendas à Hotmart. `docs/especificacao-seo-aeo.md` é a referência funcional principal; `docs/roteiro.md` e `docs/decisoes-implementacao.md` continuam valendo para os checkpoints do projeto, os formulários, as amostras e as decisões anteriores.

A execução de cada etapa depende de autorização específica. Não serão criados checkpoints para esta iniciativa. O `CP-06` e seus critérios permanecem os definidos em `docs/roteiro.md`; concluir uma etapa deste plano não o aprova nem o encerra.

## 1. Ambiente

**Implementar:** manter `main` servindo a vitrine atual; configurar `develop` para Preview com acesso protegido ao desenvolvedor e à nutricionista; manter PDFs comerciais completos e rascunhos fora do Git e da publicação, liberando somente amostras autorizadas. Primeiro verificar em modo de leitura as configurações e permissões atuais do GitHub e da Vercel. Qualquer mudança nessas configurações exige autorização posterior.

**Verificar:** confirmar que `main` preserva a vitrine, que o Preview é negado a visitantes não autorizados e acessível às duas pessoas previstas, e que a lista de arquivos rastreados, preparados para commit e publicados não contém PDFs comerciais completos nem rascunhos. `noindex` não substitui proteção de acesso.

## 2. Biblioteca e SEO

**Implementar:** reutilizar a aplicação, os componentes e os estilos existentes. Criar `/biblioteca`, páginas para Comportamento alimentar, Micronutrientes, Suplementação e Prática clínica, e páginas de artigos Markdown/MDX com slugs estáveis. Relacionar artigos a e-books existentes quando houver pertinência editorial. Publicar somente versões aprovadas manualmente pela nutricionista, com referências verificáveis e dados de autoria, revisão e datas confirmados. Não automatizar a publicação a partir do Drive ou Sheets.

Completar o SEO técnico essencial sem duplicar o que já funciona: metadados por rota, canonical e Open Graph; sitemap e `robots.txt` coerentes com o ambiente, incluindo apenas páginas públicas aprovadas; HTML semântico, breadcrumbs e textos alternativos pertinentes. Usar dados estruturados somente quando sustentados pelo conteúdo. Não criar páginas de tags, CMS, banco de dados ou dependências sem necessidade demonstrada.

**Verificar:** testar rotas, slugs, links para artigos e e-books, exclusão de rascunhos das páginas e do sitemap, metadados e resposta 404. Revisar conteúdo aprovado, HTML renderizado, responsividade e acessibilidade; executar `npm run test:forms`, `npm run typecheck` e `npm run build` em `web/`. Confirmar que os fluxos existentes de formulários, Google Sheets e e-mail continuam cobertos pelos testes e inalterados.

## 3. Hotmart e publicação

**Implementar:** cadastrar apenas URLs oficiais fornecidas e conferidas; produto sem oferta ativa permanece sem botão de compra. Concluir a revisão editorial das páginas e dos artigos, aprovar as páginas legais e de privacidade com base nos dados e serviços reais, e definir eventual mensuração mínima de cliques e consentimento antes de ativá-la. Verificar a adequação comercial do plano de hospedagem vigente. Publicar biblioteca e vendas simultaneamente somente após os bloqueios editoriais, legais, de privacidade, Preview, hospedagem e Hotmart resolvidos e autorização expressa de publicação. A Hotmart permanece responsável pelo pagamento e entrega dos e-books.

**Verificar:** confirmar cada destino de checkout e o estado dos produtos sem URL; executar o build de produção e conferir as páginas públicas, canonicals, sitemap, acesso ao Preview e ausência de conteúdo restrito. Após autorização de publicação, confirmar a disponibilidade das rotas e dos links no domínio de produção. Não tratar clique como comprovação de venda.

## Bloqueios externos

Dependem de confirmação ou autorização fora do repositório: acesso e proteção do Preview no GitHub/Vercel; URLs e ofertas ativas da Hotmart; revisão e aprovação científica de cada versão; textos legais, privacidade e eventual consentimento de mensuração; e conformidade comercial da hospedagem. Nenhum bloqueio é considerado resolvido apenas por este plano.
