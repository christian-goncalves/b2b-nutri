# Proposta técnica: integração do guia Antes da Consulta

**Contrato proposto para solicitar, confirmar e entregar o guia em fluxo isolado.**

| Campo | Definição |
| --- | --- |
| Status | Proposta para revisão do responsável |
| Público | Responsável pelo produto e pessoa implementadora |
| Objetivo | Aprovar uma arquitetura e um contrato verificáveis para a futura integração |
| Escopo | Provedor de e-mail, persistência, endpoints, estados, segurança, mensagens e dados do guia |
| Fora de escopo | Implementação, configuração externa, envio de e-mail, publicação ou entrega operacional do PDF |
| Referências | [Plano da home](plano-refatoracao-home.md), [roteiro](../roteiro.md), [decisões de implementação](../decisoes-implementacao.md) |

## 1. Resumo da proposta

Recomendo uma rota e um módulo próprios para o guia, um banco relacional transacional dedicado ao fluxo e uma caixa de saída persistente para as mensagens. O Lark Mail pode transportar as mensagens por SMTP com remetente próprio do guia, sujeito à aprovação do responsável. Essa arquitetura mantém os dados, tokens, reenvios e entregas do guia fora das abas e regras de newsletter e contato.

A proposta define como padrão uma confirmação explícita por token antes de enfileirar a entrega do material. Verificar o endereço serve somente para entregar o guia. A inscrição de marketing permanece independente, opcional e sujeita a uma política ainda não aprovada. A localização e a autorização de distribuição do PDF continuam pendentes, portanto nenhuma entrega está operacional.

## 2. Base verificada

Os itens da tabela descrevem código e documentos existentes. As seções seguintes são decisões propostas, não funcionalidades implementadas.

| Evidência | Estado observado | Consequência |
| --- | --- | --- |
| [`web/components/guide-capture-form.tsx`](../../web/components/guide-capture-form.tsx) | A interface valida o formato do e-mail no navegador e apresenta estados identificados como simulação. | O componente não envia solicitações nem comprova endereço ou entrega. |
| [`web/app/api/newsletter/route.ts`](../../web/app/api/newsletter/route.ts) e [`web/app/api/contato/route.ts`](../../web/app/api/contato/route.ts) | As rotas chamam o manipulador compartilhado dos dois formulários. | O guia precisa de rota própria e não deve entrar no discriminador newsletter/contato. |
| [`web/lib/forms/handler.ts`](../../web/lib/forms/handler.ts) | O manipulador aplica origem permitida, limite de corpo, validação, limite por IP, reivindicação atômica em armazenamento compartilhado, gravação no Sheets e envio de e-mail. | Há mecanismos reutilizáveis como referência, mas o contrato e o armazenamento atuais não representam estados de confirmação e entrega do guia. |
| [`web/lib/forms/submissions.ts`](../../web/lib/forms/submissions.ts) e [`web/lib/forms/sheets.ts`](../../web/lib/forms/sheets.ts) | Newsletter e contato usam as abas `Newsletter` e `Contato`; a escrita usa append e espera uma linha atualizada. | Não existe persistência própria do guia. A proposta não grava dados do guia nessas abas. |
| [`web/lib/forms/shared-kv.ts`](../../web/lib/forms/shared-kv.ts) | Upstash guarda reivindicações, supressão e contadores de limite com operações Lua. | O módulo atual coordena estado operacional dos formulários, sem modelo durável de confirmação ou caixa de saída do guia. |
| [`web/lib/forms/email.ts`](../../web/lib/forms/email.ts) e [`web/.env.example`](../../web/.env.example) | Lark SMTP envia boas-vindas da newsletter e notificações de contato. Os remetentes existentes são definidos para esses dois usos. | O guia requer conteúdo e remetente aprovados próprios. As decisões existentes não aprovam esse uso. |
| [`docs/decisoes-implementacao.md`](../decisoes-implementacao.md) | Newsletter usa inscrição simples e consentimento explícito. Contato tem fluxo de confirmação decidido em separado. | Essas regras pertencem aos casos existentes e não definem consentimento ou confirmação do guia. |
| [`plano-refatoracao-home.md`](plano-refatoracao-home.md) | O plano registra a interface de prévia e deixa provedor, privacidade e PDF como dependências da integração. | Este documento propõe o contrato técnico; não fecha as pendências do conteúdo ou da política. |

## 3. Arquitetura proposta

### 3.1 Isolamento e componentes

Criar os componentes `web/app/api/guia/solicitacoes/route.ts`, `web/app/api/guia/reenvio/route.ts`, `web/app/api/guia/confirmacao/route.ts` e módulos próprios sob `web/lib/guide/`. Os nomes são propostas para revisão. O fluxo não importa o manipulador de formulários, o adaptador Sheets ou os modelos de newsletter e contato.

Usar um banco relacional gerenciado, com tabela própria `guide_requests` e tabela `guide_outbox`. Uma transação grava ou atualiza a solicitação, o resumo do token e o evento de envio. Uma restrição única sobre `guide_id` e e-mail normalizado impede solicitações concorrentes duplicadas. O banco é a fonte de verdade do estado do guia.

Usar o Lark Mail via SMTP como opção recomendada de transporte, com módulo e modelos de mensagem próprios. A conta e o remetente do guia precisam de confirmação do responsável. A senha SMTP fica somente no ambiente servidor. O envio não é feito dentro da transação: um consumidor da caixa de saída tenta enviar e registra o resultado sem perder a solicitação.

> **Por que e o que: persistência do fluxo**
>
> **O que:** usar banco relacional transacional dedicado e caixa de saída persistente para solicitações, tokens e mensagens do guia.
>
> **Por que:** confirmação, uso único, idempotência e enfileiramento precisam atualizar estado relacionado sob concorrência. O código de Sheets observado faz append, enquanto Upstash coordena chaves separadas; esses adaptadores não oferecem uma transação conjunta para esse fluxo.
>
> **Alternativas consideradas:** uma aba `Guia` no Google Sheets reaproveitaria a credencial já usada e seria simples de inspecionar, mas deixaria a coordenação distribuída entre Sheets e Redis. Usar Redis como armazenamento principal reduziria componentes, mas exigiria comprovar política de durabilidade, cópia e retenção antes de guardar o registro operacional como fonte de verdade.
>
> **Custo:** será necessário selecionar e configurar um serviço de banco, provisionar credenciais e implementar manutenção e cópias. Nenhum banco está selecionado ou configurado por esta proposta.

A arquitetura conserva funções separadas: o banco guarda estado durável; a caixa de saída registra trabalho pendente; o serviço SMTP transporta mensagens; a interface mostra somente o estado confirmado pela API. Nenhum endpoint expõe o PDF antes de a solicitação atingir o estado confirmado.

### 3.2 Provedores e persistência

| Opção | Uso considerado | Vantagem | Limite para o guia |
| --- | --- | --- | --- |
| Lark Mail via SMTP | Transporte de solicitação, confirmação e entrega | O projeto já tem um transporte SMTP em uso. | O uso atual cobre newsletter e contato. Conta, remetente, mensagens e autorização do guia ainda precisam de aprovação. SMTP não comprova leitura na caixa do destinatário. |
| Google Sheets | Registro durável em uma planilha exclusiva ou aba `Guia` | Reaproveita a integração de planilhas já existente e permite revisão manual das linhas. | A escrita observada usa append. Tokens, transições concorrentes e caixa de saída exigiriam coordenação adicional em outro armazenamento. |
| Upstash Redis | Limites, trava e coordenação atômica | O repositório já usa operações Lua para reivindicação e rate limit. | O módulo atual não é o registro durável do guia e não implementa o ciclo de token, consentimento ou entrega. |
| Banco relacional dedicado | Fonte única dos estados e caixa de saída | Pode agrupar deduplicação e transições relacionadas em transações. | Acrescenta fornecedor, credenciais, migração, custo e operação. O responsável precisa aprovar o serviço e suas condições. |

**Recomendação:** banco relacional dedicado como persistência; Lark SMTP como candidato de transporte, com remetente próprio e confirmação explícita antes de configuração. Google Sheets e Upstash não recebem registros deste fluxo na proposta. Essa decisão evita acoplar o guia às abas de newsletter e contato, mas ainda requer selecionar o fornecedor do banco e aprovar o uso do Lark.

## 4. Contrato HTTP e estados

### 4.1 Solicitação e reenvio

`POST /api/guia/solicitacoes` aceita `application/json` com `email`, cabeçalho `Idempotency-Key` e, somente se a política aprovar coleta de marketing, um campo separado `marketingConsent`. O campo `website` pode servir de honeypot e deve permanecer vazio. A API rejeita campos desconhecidos, exige e-mail texto com até 254 caracteres, remove espaços laterais, normaliza para minúsculas e rejeita espaços internos, controles e formato inválido. Ela confirma a origem permitida, limita o corpo a 4 KiB e aplica proteção contra abuso antes de persistir a solicitação. A validação do navegador melhora a interação; a API continua sendo a autoridade.

Resposta `202 Accepted` usa corpo genérico: `{"ok":true,"status":"confirmation_pending"}`. A mesma resposta cobre endereço novo, endereço já pendente e reenvio bloqueado por intervalo, evitando revelar se um endereço está cadastrado. A resposta significa solicitação registrada ou já existente, nunca confirmação nem entrega.

`POST /api/guia/reenvio` recebe `email` e exige `Idempotency-Key`. A operação gera novo token e invalida o anterior, respeita o intervalo mínimo e os limites aprovados, e retorna o mesmo `202` genérico para endereço conhecido ou desconhecido. Repetir a mesma chave não cria outro token. A interface orienta a pessoa a verificar a caixa de entrada e o spam sem afirmar que uma mensagem chegou.

### 4.2 Confirmação e entrega

A mensagem contém link com token no fragmento da URL, por exemplo `/guia/confirmar#token=...`. `GET` abre uma página de revisão sem enviar o fragmento ao servidor nem consumir o token; isso evita que a prévia automática de links confirme o endereço. A página remove o fragmento do histórico após lê-lo e envia o token por `POST /api/guia/confirmacao` após ação explícita da pessoa. O corpo contém `token`. A página usa `Cache-Control: no-store`, `Referrer-Policy: no-referrer` e não carrega recursos de terceiros.

A API calcula o resumo criptográfico do token e, em uma transação, verifica validade e uso, marca o endereço confirmado, consome o token e cria um item de entrega na caixa de saída. Resposta `200` com `{"ok":true,"status":"confirmed","delivery":"queued"}` confirma o endereço e o enfileiramento. Não confirma o envio ou recebimento do PDF.

| HTTP | Condição |
| --- | --- |
| `200` | Confirmação concluída ou repetição idempotente da confirmação. |
| `202` | Solicitação ou reenvio recebido, com resposta genérica que não revela se o endereço está cadastrado. |
| `400` | Corpo, e-mail, chave de idempotência ou token inválido ou desconhecido. |
| `403` | Origem não permitida. |
| `405` | Método incorreto. |
| `409` | Chave de idempotência repetida com corpo diferente. |
| `410` | Token expirado. |
| `413` | Corpo maior que 4 KiB. |
| `415` | Conteúdo diferente de JSON. |
| `429` | Limite excedido, com cabeçalho `Retry-After`. |
| `503` | Falha temporária de persistência. |

As respostas não incluem e-mail, token, existência de cadastro ou detalhes internos. A confirmação repetida retorna o estado atual sem criar outro envio.

O consumidor da caixa de saída envia o material apenas para uma solicitação confirmada. O estado `sent_to_transport` só é gravado após aceitação do SMTP. Ele representa aceitação pelo transporte, não recebimento ou leitura pelo destinatário. A interface e a documentação não chamam esse resultado de entrega comprovada.

### 4.3 Estados e campos

| Estado | Significado | Transição permitida |
| --- | --- | --- |
| `confirmation_pending` | Solicitação persistida, endereço ainda sem confirmação. | Confirmação válida, expiração, cancelamento ou reenvio. |
| `confirmed` | Token consumido e endereço confirmado. | Criação atômica do evento de entrega. |
| `delivery_queued` | Evento de envio persistido na caixa de saída. | Envio aceito, falha retentável ou falha que exige análise. |
| `sent_to_transport` | O SMTP aceitou a mensagem de entrega. | Estado final do envio conhecido. |
| `delivery_retry` | Falha transitória conhecida; há nova tentativa programada. | Retorno a `delivery_queued` ou encaminhamento para análise após limite. |
| `delivery_review` | Resultado SMTP ambíguo ou limite de tentativas atingido. | Revisão e ação autorizada do operador. |
| `expired` | O prazo de confirmação terminou sem uso válido do token. | Nova solicitação. |
| `revoked` | Solicitação cancelada conforme política definida. | Nova solicitação, se permitida. |

`guide_requests` guarda `request_id`, `guide_id`, e-mail normalizado, estado, `created_at`, `updated_at`, `confirmed_at`, `token_hash`, `token_expires_at`, `token_used_at`, contador e instante do último reenvio. `guide_outbox` guarda `event_id`, `request_id`, tipo de mensagem, chave de deduplicação, estado, número de tentativas, próxima tentativa, identificador SMTP quando disponível e datas de criação e conclusão. Para permitir retentativa do e-mail de confirmação sem guardar token em claro, o item de confirmação contém `token_ciphertext` protegido por criptografia autenticada AES-256-GCM com chave exclusiva do servidor. Apagar o ciphertext após aceitação SMTP ou expiração do token. O material de entrega é referenciado por identificador interno aprovado, sem embutir arquivo ou URL pública no registro.

Se o responsável aprovar marketing, guardar consentimento em campos separados: `marketing_consent`, `marketing_consent_at`, `consent_copy_version` e `consent_source`. A confirmação do endereço nunca preenche esses campos. A solicitação e entrega do guia funcionam sem consentimento de marketing.

## 5. Token, duplicidade e falhas

Gerar token com 32 bytes aleatórios criptograficamente seguros e codificação URL-safe. Persistir somente SHA-256 do token em `guide_requests`; o ciphertext temporário na caixa de saída usa chave exclusiva do servidor. O prazo proposto é 24 horas. O prazo final e a regra de reenvio requerem aprovação. O banco marca `token_used_at` na mesma transação que confirma o endereço; tokens expirados, usados ou substituídos não podem confirmar novamente.

Cada solicitação exige `Idempotency-Key` com identificador aleatório de 16 a 100 caracteres e vincula a chave a um hash do corpo normalizado. A mesma chave e o mesmo conteúdo retornam o estado já registrado. A mesma chave com conteúdo diferente retorna `409`. A restrição única por guia e e-mail normalizado cobre tentativas simultâneas com chaves diferentes. Endereços já confirmados recebem resposta genérica e não provocam nova entrega automática; reenvio do material exige uma política separada.

Aplicar rate limit compartilhado por endereço e IP com janelas e limites configuráveis, além de honeypot e verificação de origem. O exemplo atual usa um limite de cinco requisições por IP em quinze minutos para os formulários existentes; a proposta não transfere esse valor ao guia. Valores, bloqueio progressivo e retenção dos identificadores de abuso aguardam decisão do responsável.

Falhas antes do commit retornam `503` e não enviam e-mail. Falha após o commit conserva a solicitação e deixa a caixa de saída elegível a retentativa. Repetir somente erros transitórios identificados e limitar tentativas. Se o SMTP terminar em timeout após possivelmente aceitar a mensagem, marcar `delivery_review`; não reenviar automaticamente, pois SMTP não oferece confirmação de recebimento nem chave transacional compartilhada com o banco. Registrar logs com `request_id`, etapa e classe do erro, sem token, e-mail ou conteúdo da mensagem.

## 6. Mensagens e remetentes

| Mensagem | Conteúdo proposto | Remetente proposto |
| --- | --- | --- |
| Solicitação de confirmação | Assunto: “Confirme seu e-mail para receber o guia Antes da Consulta”. Informar que o pedido foi recebido, que a pessoa deve confirmar o endereço pelo botão/link e que o material só será enviado depois dessa ação. Incluir validade aprovada e alternativa para solicitar novo link. | `B2B Nutris <guia@b2bnutris.com>`, pendente de aprovação e configuração. |
| Entrega do material | Assunto: “Seu guia Antes da Consulta”. Agradecer a confirmação e incluir o PDF autorizado como anexo ou link de acesso definido após localizar o arquivo. Não inserir publicidade ou inscrição automática em newsletter. | Mesmo remetente dedicado, sujeito à aprovação. |

A pessoa responsável aprova texto final, remetente, endereço de resposta e apresentação do nome da marca. O envio de confirmação não contém conteúdo promocional nem altera consentimento.

## 7. Privacidade, retenção e configuração

Coletar somente e-mail, estado da solicitação, datas técnicas de solicitação/confirmação, resumo do token e eventos necessários para controlar o envio. Não persistir o token em claro, conteúdo de mensagem de marketing, endereço IP bruto ou dados de newsletter no registro do guia. O IP pode ser transformado em chave temporária para rate limit; prazo e método de descarte precisam de aprovação.

O prazo para apagar ou anonimizar solicitações pendentes, confirmações concluídas, falhas e comprovantes de consentimento está **pendente de decisão do responsável**. O aviso de privacidade, canal para direitos, base e finalidade do tratamento e eventual compartilhamento com provedores também estão **pendentes de validação**. A equipe responsável por privacidade confirma essas regras antes de coleta real.

A futura implementação manteria no servidor as credenciais `GUIDE_DATABASE_URL`, `GUIDE_SMTP_USER`, `GUIDE_SMTP_PASSWORD` e `GUIDE_TOKEN_ENCRYPTION_KEY`, além da origem permitida e qualquer segredo de sessão aprovado. Não colocar tokens, credenciais ou URL assinada do material em código cliente, logs ou planilhas abertas. Os nomes são propostas de configuração, não variáveis criadas ou configuradas.

## 8. Decisões pendentes e critérios de aprovação

| Decisão pendente | Responsável por confirmar | Proposta para revisão |
| --- | --- | --- |
| Fornecedor e condições do banco relacional | Responsável pelo projeto | Banco gerenciado dedicado, com transações, cópias e acesso apenas pelo servidor. |
| Autorização do Lark para o guia, caixa SMTP e remetente | Responsável pelo projeto | Lark SMTP com remetente `guia@b2bnutris.com` e credenciais próprias ou aprovadas para esse uso. |
| Localização, versão e autorização de distribuição do PDF | Responsável pelo conteúdo | Nenhum arquivo ou link será configurado até a confirmação. |
| Prazo do token, intervalo e limite de reenvio, janelas de rate limit | Responsável pelo produto e privacidade | Token com validade proposta de 24 horas; demais valores definidos antes da implementação. |
| Consentimento opcional para marketing e texto da caixa | Responsável pelo produto e privacidade | Consentimento separado, desmarcado por padrão, sem condicionar o envio do guia; ainda não coletar. |
| Aviso de privacidade, finalidade, base, direitos e compartilhamentos | Responsável por privacidade | Aprovar texto e operação antes de habilitar captação real. |
| Retenção, anonimização e descarte de logs e registros | Responsável por privacidade | Definir prazo por estado, incluindo solicitações não confirmadas e falhas. |
| Conteúdo final, remetente, resposta e domínio autenticado | Responsável pelo produto | Revisar as duas mensagens e autorizar o remetente do guia. |
| Reentrega após endereço confirmado e recuperação de falha ambígua | Responsável pelo produto e operação | Definir fluxo manual, limites e evidência exigida para reenviar. |

## Registro de aprovação

Nenhuma aprovação desta proposta foi registrada. A revisão aprova ou altera estas propostas antes do CP-04. A confirmação do PDF, das políticas e dos remetentes é condição de implementação operacional. Este documento não configura serviços nem aprova a distribuição do material.
