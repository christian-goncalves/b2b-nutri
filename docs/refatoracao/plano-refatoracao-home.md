# Plano executivo para refatorar a home

Plano para reorganizar a home da B2B Nutris em preview, preservando a interface existente e separando a captação visual do guia de sua futura integração operacional.

| Campo | Definição |
| --- | --- |
| Status | Planejamento consolidado; implementação não iniciada |
| Público | Responsável pelo projeto e futura pessoa implementadora |
| Escopo | Composição da home, destaque de três e-books, apresentação profissional, canais em breve, FAQ e interface de captação do guia |
| Fora de escopo | Redesign, mudança de produtos ou flags globais, alteração de `BookCard`, decisão ou instalação de provedor de e-mail, publicação e deploy |
| Referências | [skill landing-page-design](../../.agents/skills/landing-page-design/SKILL.md), [roteiro](../roteiro.md), [decisões de implementação](../decisoes-implementacao.md), currículo de Bianca em `../curriculo-bianca/Curriculo_Bianca_Goncalves.pdf` |

## 1. Resumo executivo

A proposta mantém a estrutura comercial da skill `landing-page-design` e adapta a home atual sem redesenhar a identidade. A página apresentará o guia gratuito Antes da Consulta como oferta principal, incluindo uma interface de captação em preview. A interface explicará as etapas de informar o e-mail, confirmar o endereço e receber o material. A confirmação e a entrega só serão tratadas como concluídas depois da integração e de testes reais.

A vitrine exibirá `Da Escuta à Conduta`, `O Olhar Comportamental na Consulta Nutricional` e `Guia Visual das Vitaminas`. Cada `BookCard` manterá o destino individual já implementado; um CTA separado, “Explorar todos os e-books”, levará a `/ebooks`. Não alterar `BookCard` nem as flags globais dos produtos.

A apresentação de Bianca será objetiva e baseada no currículo indicado, com uso provisório da fotografia real fornecida e adaptação de recorte ao layout atual. WhatsApp e Instagram aparecerão como “em breve”, sem links. Depoimentos permanecerão fora da composição até haver avaliações reais e autorização de uso.

## 2. Decisões aprovadas e limites

| Tema | Decisão aprovada para o plano |
| --- | --- |
| E-books em destaque | Usar os três títulos nomeados no resumo. Os cards apontam para suas páginas individuais. Um botão independente “Explorar todos os e-books” aponta para `/ebooks`. |
| Componente e dados dos produtos | Preservar `BookCard`, os destinos que já usa e as flags globais em `web/data/home-books.ts`. A seleção da home será explícita e independente dessas flags. |
| Sobre Bianca | Usar o currículo existente como fonte factual. Base para a apresentação: nutricionista formada pela UNIP, pós-graduada em Neurociência e Comportamento Alimentar pela PUC Campinas, com atuação em consultas particulares on-line e formação em Mindful Eating. Usar provisoriamente a fotografia real fornecida, adaptando apenas recorte e enquadramento ao espaço visual atual. Não criar identidade, imagem ou credenciais. |
| Contato | Exibir WhatsApp e Instagram identificados como “em breve”. Não criar links, perfis, números ou URLs. Manter o fragmento `/#contato` ligado à seção. |
| Depoimentos | Omitir a seção e seus exemplos até que existam avaliações reais e autorização de uso. |
| Guia gratuito | Manter Antes da Consulta como principal oferta de captação. Planejar formulário, validação, carregamento, erro e sucesso visual, além da explicação das três etapas. Separar essa interface do envio e da verificação reais do e-mail. |
| Visual e conteúdo | Preservar componentes, tokens, assets existentes, tipografia, estilos e funcionalidades. Não usar mockups anteriores. Basear FAQ em informações verificáveis e marcar respostas dependentes de confirmação. |
| Preview e publicação | Desenvolver e validar a interface no preview é permitido pelo plano. A decisão de publicar permanece futura e separada. |

## 3. Base técnica e conteúdo verificados

O estado abaixo foi conferido no código e nos documentos existentes. As mudanças e critérios nas seções seguintes são propostas futuras, não trabalho implementado.

| Fonte | Estado observado | Consequência para o plano |
| --- | --- | --- |
| `web/app/page.tsx` | A home renderiza `HomeHeroSlider`, os destaques derivados das flags, a seção Sobre com placeholder de foto e biografia, newsletter, bloco de lançamento vazio, os seis produtos, exemplos de depoimento e formulário de contato condicionado a flags de ambiente. | Reorganizar apenas a composição da home. Retirar da apresentação os elementos vazios ou demonstrativos conforme as decisões desta proposta. Preservar newsletter e formulário de contato existentes fora de seu uso na home, salvo decisão separada. |
| `web/data/home-books.ts` | Existem seis produtos. Os seis têm `featuredInSlider`, `featuredOnHome` e `published` ativos. Os títulos e slugs incluem os três materiais aprovados. | Criar uma seleção explícita da vitrine da home sem mudar `featuredInSlider`, `featuredOnHome` ou `published`; manter os seis produtos no catálogo. |
| `web/components/book-card.tsx` | Cada card usa o slug do produto como destino, levando a `/ebooks/[slug]`. | Reutilizar o componente sem alteração. A home usa seus cards com o destino individual existente. |
| `web/app/ebooks/[slug]/page.tsx` e dados dos produtos | As páginas mostram descrições e público por produto, amostras autorizadas quando disponíveis e informam que o link de compra Hotmart ainda não foi fornecido quando `hotmartUrl` é nulo. | FAQ pode usar descrições, público e amostras verificados. Não afirmar que links de compra ou condições de entrega estão ativos. |
| Currículo `docs/curriculo-bianca/Curriculo_Bianca_Goncalves.pdf` | Informa graduação em Nutrição pela UNIP (2015), pós-graduação concluída em Neurociência e Comportamento Alimentar pela PUC Campinas (2026), formação profissional em Mindful Eating (2025) e atuação autônoma em consultas nutricionais on-line desde aproximadamente 2024. | Redigir a apresentação usando somente os fatos necessários a uma síntese profissional. Não incluir telefone, e-mail ou outros dados de contato presentes no currículo sem decisão específica. |
| `web/public/images/` e `web/public/samples/` | Há capas, marca e amostras dos e-books. Não foi localizado ali arquivo da fotografia de Bianca nem do PDF Antes da Consulta. | Usar a foto real fornecida quando seu arquivo estiver disponível para a implementação. Confirmar localização e autorização do PDF gratuito antes de integrar entrega. Não gerar ou substituir assets. |
| Navegação global | Cabeçalho e rodapé apontam para `/#contato`; a home atual usa esse `id`. | Preservar o fragmento e apresentar os canais aprovados na seção correspondente, sem destinos externos. |
| Formulários atuais | A home possui formulários de teste para newsletter e contato. As rotas e integrações desses formulários pertencem a esses dois casos. | Não reaproveitar a newsletter como captação do guia nem inferir que suas integrações enviem ou verifiquem o material gratuito. |

## 4. Composição planejada

Manter a ordem comercial aprovada pela skill, ajustando a composição existente com mudanças pontuais.

| Ordem | Seção | Conteúdo e comportamento previstos |
| --- | --- | --- |
| 1 | Hero e oferta do guia | Usar o texto comercial aprovado na skill. Apresentar o Antes da Consulta como principal oferta e incluir a interface de captação quando a etapa própria estiver aprovada. Manter “Explorar e-books” como ação secundária para `/ebooks`. Não declarar envio ou confirmação concluídos sem resposta real da integração. |
| 2 | Credibilidade compacta | Informar autoria e organização editorial somente com fatos confirmados. Não adicionar métricas, selos, parcerias ou afirmações sem fonte. |
| 3 | Problema | Usar a mensagem aprovada: “Você estudou para cuidar de pessoas, não para perder tempo procurando informações.” |
| 4 | Benefícios | Usar os três benefícios aprovados: “Encontre o que precisa, com mais facilidade”; “Leve o conhecimento para a prática”; “Construa sua própria biblioteca de referência”. |
| 5 | E-books em destaque | Exibir os três títulos aprovados em `BookCard`. Cada card mantém o link individual. Incluir um botão independente “Explorar todos os e-books” para `/ebooks`. |
| 6 | Biblioteca | Manter convite breve para `/biblioteca`. Incluir links a artigos somente se publicados ou aprovados para a rota pública. |
| 7 | Sobre Bianca | Reaproveitar o layout existente. Escrever síntese profissional a partir do currículo e adaptar a fotografia real fornecida ao espaço atual, sem alterar a identidade visual. |
| 8 | Depoimentos | Não renderizar a seção enquanto não houver avaliações reais e autorizadas. |
| 9 | FAQ | Responder dúvidas com conteúdo verificável dos produtos e do projeto. Marcar no plano as respostas que aguardam confirmação; não exibir essas afirmações como fatos confirmados. |
| 10 | Canais de contato | Preservar `id="contato"`. Mostrar WhatsApp e Instagram como “em breve”, sem links ativos ou dados inventados. |
| 11 | Chamada final do guia | Reforçar a oferta principal e apresentar o formulário ou atalho para ele. Explicar junto à captação as etapas de informar e-mail, confirmar endereço e receber o material. |

Os textos de hero, problema, benefícios e CTAs já estão na skill local. A implementação deve reproduzir a redação aprovada, salvo ajuste autorizado pelo responsável.

## 5. Interface de captação e integração operacional

O formulário do guia pode ser construído e revisado em preview antes da definição da integração. A interface deve deixar claro o que ocorre em cada etapa, sem tratar um estado visual de sucesso como evidência de e-mail entregue ou endereço confirmado.

| Parte | Planejamento | Limite de evidência |
| --- | --- | --- |
| Entrada | Campo de e-mail com rótulo e validação de formato; mensagens acessíveis para valor inválido; botão com estado de envio. A política de consentimento para marketing não deve ser presumida como parte da verificação do guia. | Validação de interface não prova cadastro persistido. Política de consentimento e privacidade permanece dependente de decisão. |
| Carregamento | Exibir estado ocupado enquanto a solicitação estiver em andamento, impedindo duplicação acidental e mantendo feedback acessível. | A animação ou o estado local não prova que uma solicitação chegou ao servidor. |
| Erro | Exibir resposta clara para entrada inválida, falha de rede ou resposta de erro da integração; permitir correção ou nova tentativa conforme o erro recebido. | Falhas simuladas para revisar a interface devem ser identificadas como simulação de teste. |
| Sucesso | Apresentar confirmação da etapa correspondente somente após resposta compatível com o contrato real. A cópia deve distinguir pedido de confirmação enviado, endereço confirmado e material entregue. | Um fixture ou mock pode verificar a apresentação visual, mas não pode ser relatado como confirmação real nem entrega real. |
| Etapas explicativas | Mostrar: 1. informar o e-mail; 2. confirmar o endereço; 3. receber o material. Usar linguagem de fluxo planejado até que cada etapa opere e seja validada. | O texto explicativo, isoladamente, não prova que e-mail de confirmação ou PDF foi enviado. |
| Integração operacional | Definir em trabalho autorizado separado o provedor, contrato de API, mecanismo de confirmação, entrega do PDF, persistência, privacidade, consentimento e tratamento de falhas. | Este plano não escolhe, instala ou configura provedor. A integração só será considerada funcional após testes reais do fluxo completo. |

## 6. FAQ e informações pendentes

Planejar FAQ sem transformar lacunas do catálogo em promessas. Na implementação, incluir as respostas verificáveis e omitir ou marcar claramente as demais até confirmação do responsável.

| Dúvida possível | Informação disponível | Tratamento planejado |
| --- | --- | --- |
| Para quem são os materiais? | O catálogo informa público por produto, incluindo profissionais de nutrição e estudantes em alguns casos. | Responder com formulação geral que respeite as diferenças entre materiais; incluir público específico somente quando corresponder ao produto citado. |
| O que há em cada e-book? | Descrições, destaques e público estão em `web/data/home-books.ts` e nas páginas individuais. | Resumir conteúdo a partir desses dados, sem extrapolar promessas clínicas. |
| É possível consultar uma amostra? | Os dados identificam amostras autorizadas e as páginas oferecem sua visualização. | Informar a disponibilidade conforme o produto. Não generalizar se a autorização ou o arquivo deixar de existir. |
| Como comprar? | A compra do catálogo é direcionada à Hotmart, mas os seis `hotmartUrl` estão nulos e as páginas indicam que os links individuais ainda não foram informados. | Tratar links e disponibilidade comercial como pendência; não afirmar que a compra pode ser concluída. |
| Como recebo o guia gratuito? | O fluxo aprovado prevê informar e-mail, confirmar endereço e receber o material; a interface e integração ainda serão implementadas. | Apresentar as três etapas como fluxo planejado. Não afirmar envio, confirmação ou prazo antes da validação operacional. |
| Como falar com a equipe? | O responsável aprovou WhatsApp e Instagram como canais “em breve”, sem fornecer destinos. | Mostrar somente o status “em breve”, sem link ou identificador de perfil. |

Permanecem pendentes de confirmação antes de publicar respostas específicas: condições de compra e entrega dos e-books, prazo e formato de recebimento do guia, política de privacidade e consentimento para a captação, e disponibilidade do PDF gratuito com sua autorização de distribuição. Não incluir essas informações como políticas definidas.

## 7. Arquivos previstos

Os caminhos abaixo descrevem escopo futuro. Nenhum deles será alterado ao revisar este plano.

| Arquivo | Alteração futura prevista | Limite |
| --- | --- | --- |
| `web/app/page.tsx` | Reordenar a composição, selecionar a vitrine, incluir CTA separado para `/ebooks`, seções aprovadas, FAQ, canais “em breve” e pontos de entrada para a captação. | Manter metadados, cabeçalho, rodapé e rotas globais. Retirar da composição os seis cards repetidos, lançamento vazio e depoimentos de exemplo. |
| `web/data/home-books.ts` | Criar uma lista de seleção explícita para os três slugs da vitrine, independente das flags globais. | Não mudar registros, dados comerciais ou flags `featuredInSlider`, `featuredOnHome` e `published`. |
| `web/components/book-card.tsx` | Sem alteração prevista. | Seus links continuam levando a `/ebooks/[slug]` tanto na home quanto no catálogo. |
| `web/components/guide-capture-form.tsx` | Criar componente da interface do guia, se a composição não comportar o formulário diretamente. Incluir validação, submissão, carregamento, erro e apresentação de sucesso condicionada a resposta. | Não implementar envio fictício ou reutilizar a inscrição de newsletter como se fosse o fluxo do guia. |
| `web/styles/components.css` e `web/app/globals.css` | Ajustar apenas regras necessárias às novas seções e estados do formulário, reutilizando tokens, estilos e breakpoints atuais. | Não alterar tokens ou estilos compartilhados sem necessidade demonstrada. Preservar regras úteis ao slider e a outras páginas. |
| `web/public/images/` | Disponibilizar a fotografia real fornecida, após confirmar o arquivo de origem e o caminho apropriado. | Não gerar imagem, não trocar a identidade e não incorporar a fotografia ao repositório antes de estar disponível e autorizada. |
| `web/app/api/` e `web/lib/` | Poderão receber rota e módulos próprios para confirmação e entrega do guia, depois da definição técnica e autorização para implementar a integração. | Não fixar nomes ou provedor antes de decisão técnica. Não reaproveitar endpoint de newsletter por conveniência. |

`web/components/home-hero-slider.tsx`, `web/components/ebook-catalog.tsx`, `web/app/ebooks/`, páginas individuais, rotas de amostras, `web/styles/tokens.css`, `web/app/layout.tsx`, cabeçalho, rodapé e Design System permanecem sem alteração prevista, salvo necessidade demonstrada e autorização dentro de checkpoint. Não usar os arquivos de fundos demonstrativos como referência visual.

## 8. Etapas, critérios e checkpoints

As etapas abaixo pertencem a esta refatoração da home e não reabrem checkpoints gerais já registrados em `docs/roteiro.md`. A aprovação deste plano não autoriza iniciar código. Em futura execução, trabalhar uma etapa por vez, apresentar seu checkpoint e aguardar `APROVADO CP-XX` antes de avançar. Não publicar nem fazer deploy sem decisão posterior explícita.

### Etapa 1: Conteúdo e composição da home, CP-01

**Arquivos previstos:** `web/app/page.tsx`, `web/data/home-books.ts`; `web/components/site-footer.tsx` somente se uma mudança interna de composição for indispensável para preservar `/#contato`.

**Ações:** reorganizar as seções conforme a seção 4; usar os três produtos aprovados; manter os links individuais dos `BookCard`; criar CTA separado para `/ebooks`; construir a apresentação factual de Bianca com base no currículo; apresentar canais sem links; omitir depoimentos; manter a oferta do guia na posição principal.

**Critérios de conclusão:** a home segue a ordem aprovada; há somente três cards de produto e cada um abre sua página individual; o CTA independente abre `/ebooks`; flags e comportamento padrão de `BookCard` não mudaram; não há depoimentos ilustrativos; a seção de contato preserva `/#contato` e não cria destinos; a apresentação usa somente fatos do currículo e o arquivo de fotografia real fornecido, quando disponível.

**Dependências:** disponibilizar o arquivo da fotografia para a implementação. Se ele ainda não estiver no checkout, manter o espaço atual de foto sem inventar ou gerar substituto, e registrar a etapa como pendente quanto à imagem.

### Etapa 2: FAQ e interface de captação em preview, CP-02

**Arquivos previstos:** `web/app/page.tsx`, `web/components/guide-capture-form.tsx` se necessário e estilos locais em `web/styles/components.css` ou `web/app/globals.css`.

**Ações:** implementar FAQ sem dependência nova, respostas verificáveis e estados pendentes claramente marcados; montar o formulário do guia com validação, carregamento, erro e apresentação de sucesso; expor junto à captação as etapas informar e-mail, confirmar endereço e receber o material. Testes futuros da interface poderão usar respostas controladas, identificadas como simulação.

**Critérios de conclusão:** campos têm rótulos e mensagens acessíveis; e-mail inválido não avança; estados de carregamento, erro e sucesso podem ser revisados; a interface não apresenta fixture como envio real; o texto não afirma confirmação ou entrega concluída sem resposta operacional; respostas de FAQ sem fonte ou confirmação estão omitidas ou explicitamente identificadas como pendentes.

**Dependências:** confirmação de localização e autorização de distribuição do PDF Antes da Consulta para tornar possível planejar a integração. O formulário visual pode ser implementado em preview antes dessa confirmação, sem prometer entrega funcional.

### Etapa 3: Definição técnica da integração, CP-03

**Arquivos previstos:** nenhum arquivo de integração será escolhido antes desta etapa. Depois de decisão técnica e autorização, poderão ser definidos módulos em `web/app/api/` e `web/lib/`, além de configuração de ambiente necessária.

**Ações:** em trabalho futuro autorizado, definir provedor, persistência, endpoint, token e expiração de confirmação, conteúdo dos e-mails, entrega do PDF, consentimento, privacidade, retentativas, duplicidade e tratamento de falhas. Especificar respostas que correspondem a solicitação recebida, endereço confirmado e material efetivamente entregue.

**Critérios de conclusão:** há uma decisão técnica aprovada para cada item operacional; o contrato da interface não confunde confirmação solicitada, endereço confirmado e arquivo entregue; segredos permanecem no servidor; nenhum provedor é instalado ou configurado sem autorização explícita.

**Dependências:** decisão e autorização específicas para a integração, localização e autorização do PDF, e confirmação das regras de privacidade e consentimento. Esta definição não está incluída na atualização atual do plano.

### Etapa 4: Implementar a integração autorizada, CP-04

**Arquivos previstos:** arquivos definidos e aprovados no CP-03, mais os módulos de interface necessários. O conjunto exato depende da decisão técnica.

**Ações:** implementar envio e confirmação do e-mail e entrega do guia conforme o contrato aprovado; ligar os estados da interface às respostas reais; preservar as rotas e integrações existentes de newsletter e contato.

**Critérios de conclusão:** erros, duplicidades e retentativas têm resultado definido; a API não declara sucesso antes de concluir a operação correspondente; o sistema não envia o material antes da confirmação do endereço, se esse for o contrato aprovado; nenhum fluxo de newsletter é alterado incidentalmente.

**Dependências:** CP-03 aprovado, configuração de servidor autorizada, PDF correto e autorizado, e condições de privacidade definidas.

### Etapa 5: Validação em preview, CP-05

**Arquivos verificados:** home e componentes modificados, catálogo e páginas individuais, amostras autorizadas, configuração relevante do formulário e integração aprovada.

**Ações:** revisar composição e links; testar navegação por teclado, estados e mensagens do formulário; revisar renderização em desktop, tablet e cerca de 425 px; executar verificação de tipos e build conforme os comandos existentes em `web/package.json`; verificar a integração operacional com endereços de teste controlados e comprovar confirmação e recebimento do material.

**Critérios de conclusão:** a composição preserva identidade, tokens e comportamento do catálogo; testes de interface com mocks são relatados como validação visual/contratual, separados de testes operacionais; só registrar confirmação e entrega do guia como concluídas depois de receber evidência real do fluxo completo; nenhum resultado local é apresentado como prova de produção.

**Dependências:** etapas anteriores aprovadas e integração disponível no preview. Publicação permanece fora deste checkpoint e depende de decisão posterior.

## 9. Pendências e riscos de escopo

| Pendência | Situação e tratamento |
| --- | --- |
| Fotografia real de Bianca | O código não contém uma fotografia em `web/public/images/`. A fotografia fornecida poderá ser usada provisoriamente, mas o arquivo precisa estar disponível no checkout para implementação. Usar recorte adaptado ao layout atual. |
| PDF Antes da Consulta | Não localizado entre os assets públicos examinados. Confirmar arquivo e autorização de distribuição antes da entrega operacional. |
| Provedor e mecanismo de confirmação | Não definidos para a captação deste guia. Não herdar automaticamente o transporte de newsletter ou contato. Definir somente em etapa autorizada posterior. |
| FAQ comercial | Links Hotmart estão ausentes nos seis produtos. Condições de compra e entrega do guia ainda precisam de confirmação; manter as respostas limitadas a fatos disponíveis. |
| Privacidade e consentimento | Definir regras aplicáveis à coleta do e-mail e distinguir confirmação de endereço de consentimento para marketing antes da integração. |
| Depoimentos | Não há material real autorizado no escopo atual. Manter fora da home. |

## 10. Preservação e limites

Esta proposta orienta uma refatoração incremental da home. Ela não autoriza alterar outras rotas, o catálogo, páginas individuais, dados comerciais, flags, `BookCard`, newsletter, APIs existentes, identidade visual, tokens, arquivos de imagem ou documentos. Não autoriza instalar dependências, escolher ou instalar provedores, enviar e-mails, publicar ou fazer deploy.

Antes de qualquer mudança futura em `web/`, a pessoa implementadora deverá seguir `web/AGENTS.md` e consultar a documentação local da versão instalada do Next.js. A implementação deve reutilizar componentes, assets e estilos atuais, sem mockups anteriores, e manter explícita a diferença entre interface revisada em preview e integração operacional validada.

O documento consolida decisões já aprovadas, descreve o estado de código verificado e mantém identificadas as dependências ainda abertas. Nenhuma etapa de implementação foi iniciada por esta revisão.
