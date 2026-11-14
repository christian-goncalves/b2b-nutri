# Decisões de implementação

**Projeto:** B2B Nutris  
**Atualizado:** 2026-11-13  
**Propósito:** registrar decisões tomadas na conversa sobre formulários, e-mail, amostras de e-books e privacidade.

Este registro complementa [roteiro.md](roteiro.md). Onde uma decisão abaixo divergir do roteiro, vale a decisão explícita mais recente do responsável pelo projeto. Este documento registra requisitos; não significa que as funcionalidades já foram implementadas ou que integrações foram validadas em produção.

## Decisões confirmadas

### Newsletter

- Persistir os dados em uma planilha Google Sheets dedicada, na aba `Newsletter`.
- Usar inscrição simples (single opt-in). A inscrição fica ativa após o envio do formulário, sem etapa de confirmação por e-mail.
- Exibir uma caixa de consentimento explícita e inicialmente desmarcada.
- Registrar endereço, consentimento, data/hora e origem da inscrição.
- Enviar uma mensagem de boas-vindas pelo Resend.
- Incluir link de descadastro. Preservar o estado mínimo de supressão após o descadastro para impedir reativação e novos envios acidentais.
- Usar `newsletter@b2bnutris.com` como remetente aprovado.

Esta decisão substitui especificamente o double opt-in descrito em `roteiro.md`. Os demais requisitos de segurança, validação e proteção contra abuso continuam aplicáveis.

### Formulário de contato

- Persistir os dados na mesma planilha dedicada, em uma aba separada chamada `Contato`.
- Coletar nome, e-mail, assunto e mensagem.
- Notificar a equipe pelo Resend e mostrar o resultado do envio no próprio site.
- Não enviar resposta automática ao visitante nesta etapa.
- Usar o mesmo canal público para pedidos de privacidade e mensagens de contato, quando esse canal estiver definido.

### E-books e amostras PDF

- Preparar amostras para os seis e-books.
- Servir um arquivo de amostra separado contendo somente as páginas 1 a 5. A capa conta como página quando fizer parte dessas páginas.
- Não carregar o PDF comercial completo no visualizador público.
- Usar o botão `VISUALIZAR AMOSTRA GRÁTIS`.
- Abrir o leitor em uma página própria, responsiva e acessível, com navegação pelas páginas, indicação da página atual e controles utilizáveis por teclado.
- Não oferecer botão de download no leitor.
- Revisar tags e ordem de leitura de cada PDF. Manter a amostra daquele título indisponível até a revisão ou até haver alternativa acessível.
- A limitação protege o restante do e-book; não impede cópia ou captura das cinco páginas exibidas.

### Privacidade e qualidade

- Adotar WCAG 2.2 nível AA como critério de qualidade para a interface e o leitor.
- Tratar a controladora como pessoa física. O nome legal foi informado pelo responsável, mas dados pessoais de identificação não devem ser reproduzidos neste documento nem publicados sem necessidade.
- Manter a inscrição enquanto estiver ativa. Após o descadastro, guardar apenas o registro mínimo necessário para evitar novos envios.
- Excluir ou anonimizar mensagens de contato 12 meses após a resolução do assunto, como prazo operacional inicial sujeito à revisão.
- Preparar um resumo técnico de privacidade baseado nos dados e serviços efetivamente usados. O texto final, o canal público para solicitações e o link da política precisam estar definidos antes da publicação dos formulários.

## Estado conhecido e pendências

- O domínio `b2bnutris.com` está na Hostinger e foi adicionado ao Resend. A configuração DNS foi iniciada pelo responsável.
- O responsável informou que o DKIM (`resend._domainkey`) e o CNAME `send` já estavam aceitos e que o CNAME `rsend` continuava em verificação. A validação completa do domínio no Resend ainda não foi confirmada neste registro. A propagação DNS não impede o trabalho de implementação que não dependa do envio real.
- O responsável escolheu usar Resend para envio e não contratar uma caixa postal da Hostinger neste início.
- O Resend será usado como serviço de envio. Ainda falta definir e configurar como a equipe receberá respostas e pedidos de privacidade. Um endereço de remetente no Resend, por si só, não estabelece uma caixa de entrada.
- `contato@b2bnutris.com` é uma sugestão de endereço, não uma caixa de entrada confirmada.
- O destino Google Sheets, suas credenciais, as variáveis do ambiente de produção e o endereço de notificação ainda precisam ser configurados e validados.
- Os arquivos de amostra separados ainda precisam ser preparados e revisados. Os links Hotmart também dependem dos endereços fornecidos para cada produto.

## Próximas dependências para implementação

1. Escolher/configurar o canal de recebimento da equipe e confirmar o endereço público de contato e privacidade.
2. Criar ou indicar a planilha Google Sheets e as abas `Newsletter` e `Contato`; configurar acesso de serviço apenas no servidor.
3. Configurar as credenciais e remetentes do Resend no ambiente de produção e concluir a verificação de DNS.
4. Preparar os seis PDFs de amostra de cinco páginas e revisar acessibilidade de cada arquivo.
5. Implementar e validar os fluxos dentro dos checkpoints definidos em `roteiro.md`.

