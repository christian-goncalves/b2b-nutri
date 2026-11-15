# Plano de validação dos formulários

**Escopo:** preparar e executar a validação isolada dos formulários de newsletter e contato no CP-05.

|                |                                                            |
| -------------- | ---------------------------------------------------------- |
| **Status**     | Plano para execução                                        |
| **Responsável** | Responsável do projeto e implementação técnica            |
| **Escopo**     | Validação, persistência, e-mail, duplicidade e antiabuso   |
| **Fora do escopo** | Publicação, campanhas e atividades do CP-06             |
| **Relacionados** | [roteiro](roteiro.md), [decisões](decisoes-implementacao.md), [README](../README.md) |
| **Público**    | Responsável do projeto e pessoa que implementará os testes |

---

## 1. Resumo

O CP-05 deve validar os formulários com adaptadores simulados e dados isolados. Os testes automatizados não podem enviar e-mails reais nem gravar na planilha de produção.

O responsável relatou o sucesso do fluxo normal na aplicação que identificou como produção. Os cenários de falha, duplicidade concorrente, idempotência, rate limit e honeypot ainda precisam de evidência. O checkpoint permanece aberto até que esses critérios sejam atendidos.

## 2. Evidências e comportamento atual

O código em `web/lib/forms/` valida campos, registra os dados no Google Sheets e envia e-mail pelo SMTP do Lark. O responsável relatou que a newsletter e o contato chegaram aos destinos esperados, que ambos foram gravados no Sheets e que a resposta ao contato usa o endereço do visitante.

O código normaliza o e-mail da newsletter e bloqueia uma repetição sequencial antes de gravar ou enviar outra boas-vindas. A leitura seguida de gravação não impede duplicatas concorrentes. O formulário de contato grava cada submissão sem chave de idempotência.

Os formulários locais usam as credenciais presentes no ambiente local. Com as credenciais atuais, uma submissão pode gravar na planilha e enviar e-mail reais. A equipe deve manter esses formulários sem submissões durante os testes automatizados.

O arquivo `web/tests/forms.test.cjs` já contém testes com dados e transporte Sheets simulados. O projeto não define comando de teste no `package.json`, e o arquivo depende de módulos compilados indicados por `FORMS_TEST_BUILD`. A primeira tarefa é tornar essa execução repetível e independente das credenciais locais.

## 3. Decisões do plano

> **Por que usar armazenamento atômico**
>
> **O que:** deduplicar inscrições concorrentes e tornar uma repetição técnica de contato idempotente usando estado compartilhado e atômico.
>
> **Por quê:** o Google Sheets não fornece uma operação atômica para a leitura de duplicidade seguida da gravação. O custo é escolher e manter um armazenamento compartilhado adicional.
>
> **Alternativa considerada:** manter apenas a consulta atual no Sheets. Ela cobre repetição sequencial, mas permite duas inscrições simultâneas.
>
> **Fallback:** bloquear o fechamento do CP-05 até a escolha e o teste do armazenamento.

> **Por que começar sem CAPTCHA**
>
> **O que:** exigir validação no servidor, honeypot e rate limit por origem de rede; revisar CAPTCHA somente se houver abuso observado.
>
> **Por quê:** CAPTCHA adiciona um serviço externo e uma etapa para visitantes. Honeypot e rate limit reduzem envios automatizados, mas ainda exigem monitoramento.
>
> **Alternativa considerada:** exigir CAPTCHA antes de abrir os formulários. Essa opção acrescenta fricção antes de haver evidência de abuso.
>
> **Fallback:** adicionar CAPTCHA se o rate limit e o honeypot não reduzirem o abuso.

## 4. Plano de execução

### 4.1. Isolar e tornar os testes executáveis

**Objetivo:** executar a suíte sem carregar `web/.env.local` nem acessar serviços externos.

**Arquivos previstos:** `web/package.json`, `web/tests/forms.test.cjs` e uma configuração de compilação temporária para os módulos testados.

**Mudança planejada:** compilar os módulos de formulário para uma pasta temporária e adicionar um script que execute `node --test`. Injetar adaptadores simulados de Sheets e SMTP no handler.

**Cenários:** verificar que os testes funcionam sem credenciais; bloquear chamadas de rede; confirmar que a pasta temporária não contém variáveis ou dados reais.

**Verificação prevista:** `npm run test:forms` e `npm run typecheck`, executados dentro de `web/` depois de implementar a infraestrutura de testes.

### 4.2. Validar entradas e proteção contra abuso

**Objetivo:** rejeitar dados inválidos antes de gravar no Sheets ou enviar e-mail.

**Arquivos previstos:** `web/lib/forms/submissions.ts`, `web/lib/forms/handler.ts` e os componentes dos formulários.

**Cenários de entrada:** testar campo obrigatório vazio, e-mail inválido, consentimento ausente, limites máximos, caracteres de controle, JSON inválido, tipo de conteúdo incorreto e corpo acima de 16 KiB. Testar também a normalização do e-mail e os limites exatos de cada campo.

**Honeypot:** incluir um campo não visível para visitantes e rejeitar a submissão se ele receber conteúdo. Confirmar que o servidor não chama Sheets nem SMTP nesse caso.

**Rate limit:** rejeitar a submissão acima do limite configurado para a mesma origem de rede. Confirmar a resposta de limite excedido e a ausência de gravação e envio. O responsável deve aprovar o limite e a janela antes da implementação.

**Origem e tamanho:** testar origem permitida e recusada, método de requisição e limite de corpo. A validação de origem não substitui o rate limit.

**Verificação prevista:** `npm run test:forms` e `npm run typecheck`, depois de implementar os cenários e a infraestrutura de testes.

### 4.3. Testar falhas de persistência e envio

**Objetivo:** preservar o resultado correto quando Sheets ou SMTP falharem.

**Arquivos previstos:** `web/lib/forms/handler.ts`, `web/lib/forms/sheets.ts`, `web/lib/forms/email.ts` e `web/tests/forms.test.cjs`.

**Sheets:** simular falha de autenticação, cabeçalhos incorretos, leitura indisponível, gravação recusada e resposta sem confirmação de linha. Em cada falha, confirmar que o handler não chama SMTP e não informa gravação concluída.

**SMTP:** confirmar a gravação simulada e então falhar o transporte. Verificar `emailSent: false`, a mensagem exibida ao visitante e a ausência de uma segunda gravação automática.

**Resposta ambígua:** simular timeout depois de o adaptador registrar a gravação. Verificar que o sistema não repete automaticamente o envio e orienta a equipe a consultar a planilha antes de repetir.

**Segurança de conteúdo:** submeter texto com tags HTML e prefixos de fórmula. Confirmar que a mensagem escapa HTML e a planilha grava com `RAW`.

**Verificação prevista:** `npm run test:forms` e `npm run typecheck`, depois da implementação dos adaptadores injetáveis.

### 4.4. Testar deduplicação concorrente e idempotência

**Arquivos previstos:** `web/lib/forms/submissions.ts`, `web/lib/forms/handler.ts`, novos adaptadores para o estado compartilhado e `web/tests/forms.test.cjs`.

**Newsletter:** submeter simultaneamente o mesmo e-mail em diferentes combinações de maiúsculas e espaços. O resultado deve conter uma única inscrição ativa e, no máximo, uma mensagem de boas-vindas.

**Inscrição existente:** repetir uma inscrição já ativa. O sistema deve manter uma linha e não enviar outra boas-vindas.

**Descadastro:** manter um registro mínimo de supressão após o pedido de descadastro. Uma inscrição repetida não deve reativar o endereço nem incluí-lo em novos envios.

**Contato repetido:** repetir a mesma solicitação com a mesma chave de idempotência. O sistema deve manter uma linha e uma notificação. Uma nova chave deve permitir uma nova mensagem legítima, mesmo que o conteúdo seja igual.

**Falha durante repetição:** se o registro for persistido, mas o SMTP falhar, repetir a mesma chave não deve criar outra linha. O sistema deve permitir recuperar ou tentar novamente a notificação sem duplicar o registro; a estratégia de recuperação será definida junto com o armazenamento atômico.

**Concorrência:** executar as mesmas solicitações por instâncias independentes do handler. A garantia não pode depender de memória local.

**Verificação prevista:** `npm run test:forms` com solicitações concorrentes e relógio controlado. O teste deve provar que apenas uma instância reivindica cada chave.

### 4.5. Verificar validade e retenção

**Arquivos previstos:** `web/lib/forms/submissions.ts`, a estrutura da aba `Contato` e um processo de limpeza a definir. Essa retenção exige uma decisão de ciclo de vida antes da implementação.

O single opt-in não usa token de confirmação, então não há token de inscrição a expirar. A newsletter permanece ativa até o pedido explícito de descadastro.

O projeto mantém a decisão de apagar ou anonimizar mensagens de contato 12 meses após a resolução. Esse prazo é distinto da validade da inscrição. A implementação atual não registra a data de resolução nem executa a limpeza; portanto, essa retenção precisa de uma tarefa separada e de um teste com relógio controlado antes de ser considerada atendida.

**Verificação prevista:** um teste com relógio controlado deve manter dados antes do prazo e apagar ou anonimizar mensagens depois de 12 meses da resolução.

### 4.6. Reunir evidências do CP-05

No relatório `CHECKPOINT CP-05`, apresentar objetivo, alterações e arquivos, comandos e resultados da suíte, critérios atendidos, falhas encontradas, pendências e próximas decisões. Registrar separadamente os testes manuais relatados pelo responsável e os testes reproduzidos pela suíte. Não criar um arquivo de checkpoint adicional sem necessidade; o roteiro define o relatório do checkpoint como a entrega de encerramento da etapa.

Não submeter os formulários locais com a configuração atual. Qualquer teste manual de integração deve usar uma planilha separada, caixa de e-mail isolada e autorização explícita antes do envio.

## 5. Critérios de aceite

- A suíte executa sem ler credenciais locais e sem rede externa.
- Entrada inválida, honeypot acionado e rate limit excedido não gravam dados nem enviam mensagens.
- Falha em Sheets não dispara SMTP.
- Falha em SMTP preserva uma única gravação e apresenta o estado correto ao visitante.
- Requisições concorrentes não duplicam uma inscrição nem enviam mais de uma boas-vindas.
- Repetições técnicas de contato com a mesma chave não criam outra linha nem outra notificação.
- Um pedido novo de contato pode repetir conteúdo anterior com uma chave diferente.
- O descadastro preserva supressão e impede reativação acidental antes de qualquer campanha.
- A retenção de contato de 12 meses tem implementação e teste próprios antes de ser declarada concluída.
- O CP-05 permanece aberto até que os critérios aplicáveis tenham evidência revisável.

## 6. Decisões pendentes antes da implementação

- O responsável aprova o limite e a janela do rate limit.
- A implementação propõe um armazenamento compartilhado que suporte deduplicação atômica, idempotência e rate limit.
- A equipe define como registrar a resolução de uma mensagem de contato para aplicar a retenção de 12 meses.

## 7. Limites do plano

Este plano não publica o site, não altera configuração de produção, não submete formulários e não inicia campanhas. A entrega dos testes automatizados comprova os comportamentos simulados; testes manuais isolados continuam necessários para confirmar a entrega nos provedores.
