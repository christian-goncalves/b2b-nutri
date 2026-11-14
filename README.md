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

Newsletter e contato estão desabilitados na interface. O adaptador do Google Sheets foi testado com gravação e leitura de dados fictícios em ambas as abas reais. Os formulários foram testados localmente pelo navegador até as respectivas abas reais, com dados fictícios. Resend não está integrado. Os links individuais da Hotmart e o conteúdo aprovado de privacidade e termos permanecem pendentes. Os depoimentos exibidos estão identificados como exemplos ilustrativos.

## Google Sheets dos formulários

O código em `web/lib/forms/` registra inscrições simples e contatos nas abas `Newsletter` e `Contato`. As APIs ficam desativadas por padrão; não habilite a coleta pública antes de concluir privacidade, proteção contra abuso, descadastro e supressão. Não há envio por e-mail.

Configure exclusivamente no servidor, em `web/.env.local` para desenvolvimento ou nas variáveis do ambiente de execução:

- `GOOGLE_SHEETS_ID`: identificador da planilha dedicada.
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: e-mail da conta de serviço autorizada na planilha.
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`: chave privada da conta de serviço, com quebras de linha ou `\n`.
- `FORMS_ALLOWED_ORIGIN`: origem exata permitida, incluindo protocolo e porta quando aplicável.
- `FORMS_ENABLED`: somente `true` habilita os endpoints; ausente ou qualquer outro valor os mantém indisponíveis.
- `FORMS_PUBLIC_TEST`: junto com `FORMS_ENABLED=true`, exibe os formulários públicos no build; ausente ou qualquer outro valor mantém a interface indisponível.

Para validar os formulários em desenvolvimento, com credenciais e abas de teste autorizadas, inicie o servidor vinculado somente ao próprio computador:

```bash
cd web
FORMS_LOCAL_TEST=true FORMS_ENABLED=true FORMS_ALLOWED_ORIGIN=http://127.0.0.1:3019 npm run dev -- --hostname 127.0.0.1 --port 3019
```

Acesse `http://127.0.0.1:3019`. Os formulários de teste aparecem apenas em desenvolvimento com `FORMS_LOCAL_TEST=true` e registram dados na planilha configurada. Use dados fictícios e não exponha esse servidor na rede. Uma tentativa com e-mail existente não cria outra inscrição.

A API Google Sheets deve estar habilitada e a planilha compartilhada com a conta de serviço. As abas precisam existir e ter os seguintes cabeçalhos exatos na primeira linha, nesta ordem:

- `Newsletter`: `email`, `consentimento`, `data_hora`, `origem`, `status`.
- `Contato`: `nome`, `email`, `assunto`, `mensagem`, `data_hora`.

As gravações usam `RAW`, sem interpretar entradas como fórmulas. O servidor confere os cabeçalhos antes de gravar. A consulta de e-mail evita duplicatas sequenciais e não reativa registros existentes; ela não é atômica e não impede duplicatas concorrentes. Uma falha de rede após uma gravação pode deixar o resultado indeterminado; verifique a planilha antes de repetir. Proteção distribuída contra abuso, fluxo de descadastro e supressão permanecem pendentes.

## Estrutura

- `web/`: aplicação Next.js, componentes, estilos, imagens e dados do catálogo.
- `design-system/`: demonstração visual, tokens e estilos de referência.
- `produtos/`: arquivos fonte dos e-books.
- `docs/roteiro.md`: especificação do produto e protocolo de checkpoints.
- `docs/decisoes-implementacao.md`: decisões confirmadas e pendências das integrações e amostras.

Para configurar o projeto e conduzir alterações, consulte [`AGENTS.md`](AGENTS.md). O `web/AGENTS.md` contém instruções específicas do Next.js.

CP - 04
CP - 05
