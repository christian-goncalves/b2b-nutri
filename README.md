# B2B Nutris

Site Next.js de apresentação e catálogo de e-books. Este guia cobre a aplicação em `web/` e os comandos de desenvolvimento disponíveis.

## Desenvolvimento local

```bash
cd web
npm ci
npm run dev
```

Use `npm run typecheck` e `npm run build` para verificar os tipos e gerar a aplicação. `npm run start` inicia a versão compilada.

## Estado atual

A aplicação contém a página inicial, o catálogo e páginas individuais para seis e-books. Os dados do catálogo ficam em `web/data/home-books.ts`.

Newsletter e contato registram dados no Google Sheets e usam o Lark Mail para envio. O responsável relatou testes bem-sucedidos do fluxo normal na aplicação identificada como produção: a inscrição recebeu boas-vindas, a mensagem de contato chegou à caixa pública e a resposta aponta para o e-mail informado. Esses resultados foram relatados pelo responsável e não foram verificados diretamente no ambiente de produção neste repositório.

Em desenvolvimento, `FORMS_LOCAL_TEST=true` mostra os formulários; o envio também exige `FORMS_ENABLED=true`. A interface pública depende de `FORMS_PUBLIC_TEST=true` e `FORMS_ENABLED=true`. O CP-05 continua aberto para validar falhas, duplicidade concorrente, idempotência e limites de abuso. Supressão de descadastro e retenção de dados também permanecem pendentes antes de campanhas. Consulte o [plano de validação do CP-05](docs/plano-validacao-cp-05.md). Os links individuais da Hotmart e o conteúdo aprovado de privacidade e termos permanecem pendentes. Os depoimentos exibidos estão identificados como exemplos ilustrativos.

## Formulários e e-mail

O código em `web/lib/forms/` registra inscrições simples e contatos nas abas `Newsletter` e `Contato`. Depois de confirmar a gravação no Sheets, a aplicação envia a mensagem pelo SMTP do Lark. A newsletter envia boas-vindas ao endereço cadastrado. O contato encaminha a notificação para `CONTACT_NOTIFICATION_TO`, cujo padrão é `contato@b2bnutris.com`, e usa o e-mail do visitante como endereço de resposta.

Configure exclusivamente no servidor, em `web/.env.local` para desenvolvimento ou nas variáveis do ambiente de execução:

- `GOOGLE_SHEETS_ID`: identificador da planilha dedicada.
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: e-mail da conta de serviço autorizada na planilha.
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`: chave privada da conta de serviço, com quebras de linha ou `\n`.
- `FORMS_ALLOWED_ORIGIN`: origem exata permitida, incluindo protocolo e porta quando aplicável.
- `FORMS_ENABLED`: somente `true` habilita os endpoints; ausente ou qualquer outro valor os mantém indisponíveis.
- `FORMS_PUBLIC_TEST`: junto com `FORMS_ENABLED=true`, exibe os formulários públicos no build; ausente ou qualquer outro valor mantém a interface indisponível.
- `FORMS_LOCAL_TEST`: em desenvolvimento, exibe formulários de teste e permite requisições de loopback.
- `LARK_SMTP_USER` e `LARK_SMTP_PASSWORD`: credenciais SMTP do servidor Lark. Nunca exponha a senha ao navegador.
- `LARK_CONTACT_FROM`, `LARK_NEWSLETTER_FROM` e `CONTACT_NOTIFICATION_TO`: remetentes e destino das mensagens. O código define padrões para remetentes e destino.

O formulário local usa as credenciais presentes em `web/.env.local`. Se elas apontarem para a planilha real ou para uma caixa real, cada envio grava dados e envia e-mail de verdade. Não use o formulário local para validar falhas ou duplicidade sem isolar Sheets e SMTP.

Use adaptadores simulados para os testes automatizados. Para qualquer verificação manual de integração, prepare uma planilha e uma caixa de teste separadas antes de enviar formulários. Siga o plano de validação do CP-05.

O adaptador Google Sheets exige que a API esteja habilitada e que a planilha seja compartilhada com a conta de serviço. As abas precisam existir e ter os seguintes cabeçalhos exatos na primeira linha, nesta ordem:

- `Newsletter`: `email`, `consentimento`, `data_hora`, `origem`, `status`.
- `Contato`: `nome`, `email`, `assunto`, `mensagem`, `data_hora`.

As gravações usam `RAW`, sem interpretar entradas como fórmulas. O servidor confere os cabeçalhos antes de gravar. A consulta de e-mail evita duplicatas sequenciais da newsletter e não reativa inscrições existentes; ela não impede duplicatas concorrentes. A idempotência do contato e a proteção contra abuso ainda precisam de implementação e validação. Uma falha de rede após uma gravação pode deixar o resultado indeterminado; verifique a planilha antes de repetir.

O link de descadastro abre uma mensagem para a equipe. A aplicação ainda não registra automaticamente a supressão. Não inicie campanhas antes de implementar e validar esse fluxo e a retenção mínima de endereços descadastrados.

## Estrutura

- `web/`: aplicação Next.js, componentes, estilos, imagens e dados do catálogo.
- `design-system/`: demonstração visual, tokens e estilos de referência.
- `produtos/`: arquivos fonte dos e-books.
- `docs/roteiro.md`: especificação do produto e protocolo de checkpoints.
- `docs/decisoes-implementacao.md`: decisões confirmadas e pendências das integrações e amostras.
- `docs/plano-validacao-cp-05.md`: plano de execução e critérios dos testes dos formulários.

Para configurar o projeto e conduzir alterações, consulte [`AGENTS.md`](AGENTS.md). O `web/AGENTS.md` contém instruções específicas do Next.js.

CP - 04
CP - 05
