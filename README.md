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

Newsletter e contato estão desabilitados. Google Sheets e Resend ainda não estão integrados. Os seis produtos não têm links Hotmart nem arquivos de amostra cadastrados. Privacidade e termos aguardam conteúdo aprovado. Os depoimentos exibidos estão identificados como exemplos ilustrativos.

## Estrutura

- `web/`: aplicação Next.js, componentes, estilos, imagens e dados do catálogo.
- `design-system/`: demonstração visual, tokens e estilos de referência.
- `produtos/`: arquivos fonte dos e-books.
- `docs/roteiro.md`: especificação do produto e protocolo de checkpoints.
- `docs/decisoes-implementacao.md`: decisões confirmadas e pendências das integrações e amostras.

Para configurar o projeto e conduzir alterações, consulte [`AGENTS.md`](AGENTS.md). O `web/AGENTS.md` contém instruções específicas do Next.js.

CP - 04
CP - 05
