# Diagnóstico do roteamento dos formulários

## Objeto da investigação

Determinar se as submissões de newsletter e contato são enviadas ao Google Sheets, ao Lark Mail ou ao Slack.

## Contexto

O responsável relata que os formulários em produção registram submissões no Google Sheets. A caixa pública `contato@b2bnutris.com` e o alias `newsletter@b2bnutris.com` foram criados no Lark. O responsável também mostrou dois e-mails de teste enviados manualmente pelo Gmail e recebidos na caixa pública.

## Evidências examinadas

- `web/lib/forms/handler.ts:4-44`: valida a submissão, chama `persist` com o adaptador `Sheets` e retorna sucesso; não há chamada de envio de e-mail nesse fluxo.
- `web/lib/forms/sheets.ts:20-64`: autentica na API Google Sheets e acrescenta uma linha à aba indicada.
- `web/lib/forms/submissions.ts:17-33`: escolhe as abas `Newsletter` ou `Contato` e persiste os dados.
- `web/app/api/newsletter/route.ts:1-3` e `web/app/api/contato/route.ts:1-3`: ambas as rotas delegam ao mesmo manipulador.
- `docs/decisoes-implementacao.md:15-33`: registra como decisões futuras o envio de boas-vindas e as notificações da equipe pelo Resend; o próprio documento ressalva que decisões não comprovam implementação.
- Busca textual por integrações de e-mail e Slack em `web/app` e `web/lib`: não encontrou chamadas a Resend, SMTP, outros serviços de e-mail ou Slack.
- Captura de tela apresentada nesta conversa: mostra os testes manuais “teste de contato” e “teste newsletter” na caixa pública do Lark.

## Estado observado

O fluxo implementado nas rotas envia os dados para o Google Sheets. O código examinado não envia as submissões por e-mail nem para o Slack. Os e-mails vistos no Lark foram enviados manualmente pelo Gmail, não pelo formulário da aplicação.

## Análise

As duas rotas chamam `handleSubmission`, que valida e persiste os dados no adaptador Google Sheets. Não existe, nesse fluxo, etapa que encaminhe o registro para uma caixa postal ou para o Slack. A configuração de DNS e a existência da caixa pública no Lark habilitam o serviço de e-mail, mas não conectam o formulário à caixa.

## Diagnóstico

Ao preencher os formulários, a aplicação registra os dados no Sheets. Eles não chegam automaticamente ao Lark Mail nem ao Slack. O recebimento manual dos dois testes no Lark confirma a caixa e o alias, mas não confirma integração da aplicação com e-mail.

## Grau de certeza

Alto para o comportamento do código examinado. O destino no ambiente de produção foi relatado pelo responsável; as variáveis de produção não foram consultadas nesta investigação.

## Pontos ainda não comprovados

- Se o ambiente de produção atual tem os formulários habilitados e continua persistindo submissões, além do relato do responsável.
- Se há uma automação externa, fora do código examinado, que encaminhe linhas do Sheets ao Lark ou ao Slack.
