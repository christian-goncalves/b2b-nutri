# Diagnóstico do Redis Upstash nos formulários

## Objeto da investigação

Explicar o serviço Upstash Redis, seu uso no B2B Nutris e a razão para sua inclusão.

## Contexto

O projeto executa os formulários em Route Handlers Next.js, com persistência principal no Google Sheets. A instrução do projeto proíbe usar memória temporária como fonte de estado para concorrência, idempotência ou limite de envios.

## Evidências examinadas

- Página Upstash aberta pelo responsável: `b2b-nutri-cp05-test`, plano Free, AWS em São Paulo (`sa-east-1`). A tela consultada é Settings; nenhum token foi aberto nem copiado.
- Captura da tela de variáveis da Vercel enviada pelo responsável nesta conversa: `UPSTASH_REDIS_REST_URL` e `UPSTASH_REDIS_REST_TOKEN` aparecem cadastradas no ambiente Production do projeto `b2b-nutris`. Os valores estão mascarados. `FORMS_ENABLED` também aparece, mas seu valor não é legível.
- Consulta somente leitura ao projeto `b2b-nutris` pela integração Vercel: confirmou as variáveis `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` e `FORMS_ENABLED` com destino `production`. A integração não retornou o valor da variável REST secreta.
- `web/lib/forms/shared-kv.ts:14-18, 21-33, 35-80`: lê as variáveis REST no servidor e implementa operações Redis para reivindicar estado, concluir ou liberar uma chave, registrar supressão e contar envios.
- `web/lib/forms/handler.ts:22-48, 65-80`: exige `FORMS_ENABLED=true`, aplica limite de cinco envios por IP em 15 minutos e usa uma chave por e-mail para newsletter ou uma chave de idempotência para contato.
- `web/app/api/newsletter/unsubscribe/route.ts:1-22`: usa o armazenamento Upstash para registrar supressão de newsletter.
- `web/.env.example:10-12`: define `UPSTASH_REDIS_REST_URL` e `UPSTASH_REDIS_REST_TOKEN` como configuração do servidor.
- `docs/roteiro.md:372-377` e `docs/decisoes-implementacao.md:94-98`: requerem armazenamento compartilhado e registram a validação anterior do CP-05, além de pendências relacionadas a privacidade e descadastro.
- Documentação oficial: [Upstash Redis REST API](https://upstash.com/docs/redis/features/restapi), que descreve acesso HTTP adequado a funções serverless.

## Estado observado

O aplicativo chama a API REST do Upstash por HTTP e envia o token Bearer no servidor. As chaves são derivadas por SHA-256. Scripts Lua fazem a reivindicação de estado e a contagem de limite como operações Redis. A base visível no console se chama `b2b-nutri-cp05-test` e aparece no plano Free, na região AWS de São Paulo. A tela e a consulta de leitura da Vercel confirmam que as duas variáveis de conexão estão configuradas para Production, com valores protegidos.

## Análise

As funções serverless podem tratar requisições em instâncias distintas. Estado guardado apenas na memória de uma instância não coordena com as outras. O Redis fornece estado comum e operações atômicas para que duas requisições concorrentes não reivindiquem a mesma inscrição ou solicitação, e para que o limite por IP seja contado em conjunto. O código também guarda estado de supressão de newsletter. Esse serviço complementa o Sheets: Redis coordena estado operacional; Sheets mantém os registros de formulário.

## Diagnóstico

Upstash é o provedor hospedado de Redis previsto para os formulários em produção. Foi incluído para armazenar e coordenar estado entre execuções serverless: deduplicar inscrições concorrentes, tornar repetições de contato idempotentes, preservar a supressão de endereços e aplicar limite de cinco envios por IP a cada 15 minutos. A captura confirma que as variáveis REST estão cadastradas em Production. O responsável esclareceu que a base `b2b-nutri-cp05-test` será a base de produção.

## Grau de certeza

Alto sobre a finalidade e o comportamento implementados no código, e sobre a presença das variáveis no ambiente Production conforme a captura e a consulta à Vercel. Alto sobre o nome, plano e região mostrados no console. Não foi possível correlacionar a URL protegida da Vercel com o identificador da base; a indicação de que essa base será usada em produção vem do responsável.

## Pontos ainda não comprovados

- O valor protegido de `UPSTASH_REDIS_REST_URL` não foi disponibilizado pela integração; não foi possível comparar o host com a base `b2b-nutri-cp05-test`.
- A página Settings não foi usada para executar comandos nem testar conexão.
- A consulta confirma que `FORMS_ENABLED` está cadastrada para Production, mas não revela seu valor; não comprova que os formulários estejam habilitados.
