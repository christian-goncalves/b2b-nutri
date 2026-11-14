# Instruções para agentes

## Antes de trabalhar

- Leia `docs/roteiro.md` e `docs/decisoes-implementacao.md`. Consulte os arquivos relevantes em `design-system/` antes de alterar a interface.
- Use o código como fonte do comportamento atual. Trate requisitos ainda não implementados como pendentes.
- Quando uma decisão explícita divergir do roteiro, siga `docs/decisoes-implementacao.md` no ponto específico do conflito.

## Alterações e checkpoints

- Siga o protocolo de checkpoints em `docs/roteiro.md`. Não reabra etapas concluídas. Pare ao final da etapa atual e aguarde `APROVADO CP-XX` antes de avançar.
- Preserve o Design System e a estrutura existente. Não adicione dependências ou tecnologias sem necessidade demonstrada.
- Antes de alterar código em `web/`, siga `web/AGENTS.md` e consulte a documentação local correspondente à versão instalada do Next.js.

## Segurança e conteúdo

- Mantenha credenciais no servidor. Não exponha valores de `.env.local` em arquivos, logs ou respostas.
- Não publique PDFs comerciais completos. O leitor público pode usar apenas arquivos de amostra autorizados e separados.
- Não envie e-mails reais, altere serviços externos nem publique mudanças sem autorização explícita.
- Em código e documentação, diferencie o que está implementado, o que foi validado externamente e o que continua pendente.

## Documentação

Carregue a skill `technical-writing` para produzir ou revisar texto técnico do repositório e a skill específica do tipo de documento. Mantenha os documentos concisos e baseados em fontes verificáveis.
