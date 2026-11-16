# B2B NUTRIS
## Prompt mestre de implementação
**Especificação técnica · Plano executivo · Checkpoints · Validação**

### 1. Papel do agente

Atue como engenheiro de software sênior, arquiteto de aplicações Next.js e responsável pela migração técnica do projeto B2B Nutris.

Sua missão é transformar uma demonstração HTML/CSS já aprovada em uma aplicação funcional, responsiva e preparada para publicação na Vercel.

Trabalhe com autonomia técnica, mas respeite integralmente os requisitos deste documento.

**Regra central:** execute o projeto por fases e interrompa obrigatoriamente o trabalho em cada checkpoint para obter aprovação explícita do usuário.

Não interprete a autorização para executar o projeto como autorização para ultrapassar checkpoints.

### 2. Contexto e diretórios

O projeto está localizado em:

`/home/cg/Documentos/01-DEV/PROJETOS/b2b-nutri`

Estrutura esperada:

- `design-system/`: demonstração HTML, tokens CSS, componentes CSS e documentação visual.
- `produtos/`: materiais reais, e-books e capas.
- `logo.png`: identidade visual da marca.
- `AGENTS.md`: instruções existentes do projeto.
- `README.md`: documentação existente.
- `web/`: aplicação Next.js a ser criada.

Antes de qualquer alteração:

1. Inspecione a estrutura real dos diretórios.
2. Leia `AGENTS.md` e os documentos relevantes.
3. Identifique os arquivos existentes, sem presumir seus nomes ou conteúdos.
4. Localize a demonstração HTML e os arquivos CSS.
5. Inspecione os materiais reais de `produtos/`.
6. Verifique se `web/` já existe e se contém arquivos importantes.
7. Apresente um diagnóstico inicial.

Não exclua, sobrescreva ou mova arquivos originais sem autorização.

### 3. Objetivo do produto

A B2B Nutris será uma plataforma de exposição e comercialização de e-books digitais, especialmente materiais relacionados à nutrição.

O site terá identidade editorial, apresentação institucional, catálogo organizado e páginas individuais de produtos.

A compra ocorrerá exclusivamente na Hotmart.

Não implementar carrinho, checkout próprio, processamento de pagamentos ou painel administrativo.

### 4. Stack e arquitetura

Utilize:

- Next.js com App Router.
- TypeScript em modo estrito.
- React.
- CSS tradicional, preservando os tokens e estilos existentes.
- Componentes reutilizáveis.
- Arquivos TypeScript locais para os dados do catálogo.
- Route Handlers do Next.js para as APIs.
- Google Sheets API para persistência dos formulários.
- Lark Mail via SMTP para envio de e-mails dos formulários.
- Vercel como ambiente de publicação.

Não introduza Tailwind, CMS, Prisma, Supabase ou bibliotecas adicionais sem necessidade demonstrada.

Prefira recursos nativos do framework.

Mantenha as integrações externas isoladas em módulos próprios.

### 5. Design System obrigatório

Preserve o Design System B2B Nutris v1.2.

Referências:

- Cor principal: `#641D24`
- Creme: `#FAF3EA`
- Rosa: `#EABAB7`
- Coral: `#EF7053`
- Oliva: `#82845A`
- Amarelo CTA: `#F2C14E`
- Zinc: `#F4F4F5`
- Branco: `#FFFFFF`
- Borda: `#E4E4E7`
- Rosa derivado: `#F0D2D0`

Tipografia:

- Inter para interface e corpo.
- Playfair Display para títulos editoriais.

Preserve os tokens existentes de tipografia, espaçamento, raios e componentes, conferindo seus valores diretamente nos arquivos originais.

Os botões de ação principal devem utilizar o amarelo aprovado e texto em caixa alta.

**Não redesenhe a interface.**

A demonstração HTML existente é a referência visual principal. O objetivo é migrá-la fielmente para React, não produzir outra interpretação estética.

### 6. Estrutura funcional

#### Home

Preserve a ordem e o tratamento visual das seções:

1. Cabeçalho e hero slider, fundo creme.
2. E-books em destaque, fundo zinc.
3. Sobre a autora, fundo vinho.
4. Newsletter integrada à seção da autora em card creme.
5. Próximo lançamento, fundo zinc.
6. Catálogo de e-books, gradiente creme/rosa.
7. Depoimentos, fundo branco.
8. Contato, fundo zinc.
9. Rodapé, fundo vinho.

Não invente depoimentos, biografias, informações científicas ou produtos.

Componentes que dependam de conteúdo indisponível devem ter estados vazios adequados, sem publicar dados fictícios.

#### Slider principal

- Conteúdo derivado dos dados locais dos e-books.
- Seleção por propriedade de destaque.
- Rotação automática, inicialmente a cada 6 segundos.
- Setas e indicadores.
- Pausa durante interação.
- Suporte a gestos no celular.
- Navegação por teclado.
- Respeito a `prefers-reduced-motion`.
- Funcionamento adequado com zero, um ou vários slides.

#### Biblioteca

Rota: `/ebooks`

- Categorias simples.
- Opção para visualizar todos os livros.
- Categorias derivadas dos dados locais.
- Sem pesquisa textual nesta versão.
- Sem filtros avançados.
- Cards reutilizáveis.

Responsividade dos grids:

- Acima de 980px: três colunas.
- De 500px a 980px: duas colunas.
- Abaixo de 500px: uma coluna.

#### Páginas individuais

Rota: `/ebooks/[slug]`

Cada página deverá apresentar, conforme os dados disponíveis:

- Capa real.
- Título.
- Categoria.
- Descrição.
- Informações e benefícios comprovadamente presentes no material.
- Público-alvo, quando identificado.
- Botão de compra na Hotmart.
- Botão de visualização da amostra PDF, quando disponível.
- Materiais relacionados.
- Metadados para SEO.

Gerar as rotas a partir dos dados locais.

Links da Hotmart devem ser cadastrados individualmente. Não inventar URLs.

#### Visualizador de PDF

- Exibir apenas PDFs de amostra autorizados.
- Carregar sob demanda.
- Permitir navegação entre páginas.
- Ser responsivo e acessível.
- Não disponibilizar os PDFs comerciais completos na pasta pública.
- Ocultar o botão de amostra quando o arquivo não existir.

Não gerar automaticamente uma amostra a partir de um PDF completo sem autorização.

### 7. Administração dos e-books

Os e-books serão administrados diretamente em arquivos do projeto.

Defina um modelo TypeScript tipado que permita cadastrar:

- Identificador.
- Slug.
- Título.
- Descrição curta.
- Descrição completa.
- Categoria.
- Caminho da capa.
- Caminho da amostra PDF.
- URL da Hotmart.
- Estado de publicação.
- Destaque no slider.
- Destaque na home.
- Informações opcionais de lançamento.
- Metadados de SEO.

Inspecione a pasta `produtos/` e associe corretamente capas e materiais.

Use os materiais reais encontrados. Não crie produtos fictícios.

Caso haja ambiguidade na associação entre uma capa e um PDF, registre a dúvida e solicite confirmação.

O catálogo deve funcionar mesmo com apenas um produto publicado.

### 8. Navegação

Menu principal:

- INÍCIO: `/`
- E-BOOKS: `/ebooks`
- SOBRE A AUTORA: `/#sobre`
- CONTATO: `/#contato`

Implementar menu responsivo e acessível.

O rodapé deverá conter os links institucionais e páginas de privacidade e termos, com textos a serem revisados pelo responsável antes da publicação.

### 9. Newsletter e formulários

Implementar API própria utilizando Route Handlers.

#### Newsletter

Persistência no Google Sheets.

Envio de boas-vindas pelo Lark Mail depois do cadastro simples.

Usar single opt-in, conforme a decisão registrada em `docs/decisoes-implementacao.md`. A inscrição fica ativa após o envio do formulário e não expira automaticamente. O token e a expiração do fluxo double opt-in não se aplicam.

Registrar origem da inscrição e, quando aplicável, o identificador do próximo lançamento.

Impedir inscrições duplicadas da newsletter, inclusive em requisições concorrentes. Projetar o tratamento considerando que a leitura seguida de gravação no Google Sheets não é atômica.

Marcar a inscrição como ativa depois de validar e persistir o formulário com consentimento.

#### Contato

Campos mínimos:

- Nome.
- E-mail.
- Assunto.
- Mensagem.

Fluxo:

1. Validar dados no servidor.
2. Aplicar proteção contra spam.
3. Registrar a mensagem no Google Sheets.
4. Enviar notificação pelo Lark Mail.
5. Retornar resultado consistente ao usuário.

Tratar separadamente falhas de persistência e falhas de envio. Usar uma chave de idempotência para que uma repetição técnica da mesma solicitação de contato não gere outra linha ou notificação.

#### Segurança

- Credenciais apenas no servidor.
- Variáveis de ambiente.
- Validação de entrada.
- Limites de tamanho.
- Proteção contra abuso e spam.
- Não expor tokens ou credenciais em logs.
- Proteção contra injeção de fórmulas no Google Sheets.
- Política de privacidade e consentimento explícito.
- Não expor publicamente a planilha de contatos.

Não utilizar armazenamento temporário em memória como fonte definitiva de inscrições, idempotência ou rate limit.

### 10. SEO, acessibilidade e desempenho

Implementar:

- Metadados por página.
- Open Graph.
- Sitemap.
- Robots.
- URLs amigáveis.
- HTML semântico.
- Imagens otimizadas.
- Estados de carregamento e erro.
- Navegação por teclado.
- Indicadores visíveis de foco.
- Respeito às preferências de movimento.
- Layout responsivo.
- Carregamento sob demanda de recursos pesados.

Não adicionar animações que prejudiquem a experiência ou alterem o design aprovado.

### 11. Estrutura de código

Organize a aplicação por responsabilidade, contemplando:

- `app/`: rotas, layouts e endpoints.
- `components/`: componentes reutilizáveis.
- `data/`: catálogo e categorias.
- `lib/`: integrações e utilitários.
- `types/`: modelos TypeScript.
- `styles/`: tokens e estilos.
- `public/`: imagens e PDFs de amostra autorizados.

A organização exata poderá ser ajustada durante a fase de arquitetura, desde que seja documentada e aprovada.

### 12. Plano executivo e checkpoints

**CP-01: Auditoria e especificação**

Entregas:
- Inventário dos arquivos existentes.
- Identificação dos produtos reais.
- Avaliação do Design System.
- Arquitetura proposta.
- Árvore de diretórios.
- Dependências.
- Riscos e pendências.

Não modificar o projeto nesta fase, salvo autorização explícita.

**CP-02: Fundação da aplicação**

Entregas:
- Next.js configurado em `web/`.
- TypeScript.
- Estilos globais e tokens.
- Fontes.
- Layout principal.
- Componentes básicos.
- Scripts de desenvolvimento e validação.

Validar build e fidelidade dos elementos básicos.

**CP-03: Migração da home**

Entregas:
- Todas as seções aprovadas.
- Slider funcional.
- Responsividade.
- Navegação.
- Fidelidade visual ao HTML original.

Produzir evidências visuais em resoluções desktop, tablet e mobile.

**CP-04: Catálogo e produtos**

Entregas:
- Cadastro dos materiais reais.
- Categorias.
- Biblioteca.
- Rotas individuais.
- Links da Hotmart. ## ainda não possuo
- Visualizador de amostras PDF autorizadas.
- Estados vazios e conteúdo pendente.

Validar cada produto e suas associações.

**CP-05: APIs e integrações**

Entregas:
- Integração com Google Sheets.
- Integração de envio pelo Lark Mail via SMTP, conforme decisão mais recente em `docs/decisoes-implementacao.md`.
- Newsletter com single opt-in, conforme decisão registrada em `docs/decisoes-implementacao.md`.
- Formulário de contato.
- Validação no servidor, honeypot funcional, limite de tamanho e origem, e rate limit com armazenamento compartilhado.
- Idempotência por solicitação no contato e deduplicação concorrente da newsletter.
- Testes isolados de falha, duplicidade, idempotência e validação. O token de confirmação com expiração foi substituído pelo single opt-in. A retenção de mensagens de contato por 12 meses após resolução é requisito separado de privacidade.
- Seguir o [plano de validação do CP-05](plano-validacao-cp-05.md) e anexar as evidências ao checkpoint.

**Validação registrada em 2026-11-15:** o responsável declarou o CP-05 aprovado após revisar os resultados de 12 testes automatizados, a verificação de tipos, o preflight de Upstash e Google Sheets, a integração sintética e a confirmação manual de entrega das mensagens de boas-vindas e contato. O checkpoint está validado por decisão do responsável. Os cenários do plano sem evidência reproduzida continuam identificados como lacunas de teste; esta aprovação não os registra como executados.

Caso faltem credenciais, implementar a estrutura testável com adaptadores simulados, documentar as variáveis necessárias e aguardar configuração. Nunca simular sucesso de uma integração real.

**CP-06: Qualidade e publicação**

Entregas:
- Revisão de acessibilidade.
- SEO.
- Testes automatizados.
- Testes responsivos.
- Verificação de segurança.
- Build de produção.
- Documentação.
- Checklist de configuração da Vercel.

Não realizar publicação efetiva sem autorização explícita.

### 13. Protocolo obrigatório de checkpoints

Ao concluir cada fase, apresente:

**CHECKPOINT CP-XX**

1. Objetivo da fase.
2. Resumo das alterações.
3. Arquivos criados ou modificados.
4. Evidências e resultados dos testes.
5. Critérios de aceite atendidos.
6. Problemas identificados.
7. Pendências e decisões necessárias.
8. Próxima fase planejada.

Finalize a resposta com:

**STATUS: AGUARDANDO APROVAÇÃO DO CP-XX**

Interrompa a execução.

Somente avance quando receber aprovação explícita, por exemplo:

`APROVADO CP-02`

Se receber uma solicitação de correção, trabalhe exclusivamente na fase atual e apresente novamente o checkpoint.

Não interprete silêncio, mensagens ambíguas ou sucesso dos testes como aprovação.

### 14. Critérios gerais de aceite

O projeto somente estará concluído quando:

- A identidade visual aprovada estiver preservada.
- A aplicação funcionar nas resoluções definidas.
- Os produtos reais estiverem corretamente cadastrados.
- As rotas individuais funcionarem.
- Os links de compra forem válidos e fornecidos pelo responsável.
- Nenhum PDF comercial completo estiver exposto publicamente.
- Os formulários estiverem operacionais e testados.
- O single opt-in registrar a inscrição e enviar uma mensagem de boas-vindas.
- As credenciais estiverem protegidas.
- Os testes e o build de produção passarem.
- A documentação permitir manutenção futura.
- Todos os checkpoints tiverem aprovação.

Itens dependentes de conteúdo, credenciais ou autorização externa deverão ser explicitamente classificados como pendentes. Não os apresente como concluídos.

### 15. Instrução de início

Inicie exclusivamente pelo **CP-01: Auditoria e especificação**.

Leia os arquivos existentes, identifique os materiais reais, proponha a arquitetura e apresente o plano executivo detalhado.

Não instale dependências, não crie a aplicação e não modifique arquivos nesta primeira etapa.

Aguarde minha aprovação antes de iniciar o CP-02.
