# Decisões de implementação

**Projeto:** B2B Nutris  
**Propósito:** registrar decisões sobre formulários, e-mail, amostras de e-books e privacidade.

Este registro complementa [roteiro.md](roteiro.md). Onde uma decisão abaixo divergir do roteiro, vale a decisão explícita mais recente do responsável pelo projeto. Os requisitos, as implementações e as validações relatadas aparecem em seções distintas.

## Decisão posterior sobre confirmação de contato (2026-11-16)

- Depois de registrar uma mensagem de contato e enviar a notificação à equipe, enviar uma confirmação ao endereço informado pelo visitante.
- A confirmação deve informar que a solicitação foi recebida e que a equipe entrará em contato o mais breve possível com uma resposta.
- Usar `contato@b2bnutris.com` como remetente e permitir resposta à caixa pública.
- Se a notificação à equipe falhar, não enviar a confirmação ao visitante. Se apenas a confirmação falhar, preservar o registro e a notificação já enviada, informar essa falha na resposta da API e orientar o visitante a não reenviar o formulário.
- Esta decisão posterior substitui a decisão anterior de não responder automaticamente ao visitante.

## Atualização do canal de e-mail (2026-11-15)

- Usar o Lark Mail como serviço de envio da aplicação, via SMTP. Esta decisão substitui o Resend como transporte dos formulários.
- Usar `contato@b2bnutris.com` como caixa pública para notificações do contato e `newsletter@b2bnutris.com` como remetente de boas-vindas. `newsletter@` é alias da caixa pública `contato@`.
- Notificações do formulário de contato devem chegar a `contato@b2bnutris.com`, com o e-mail informado pelo visitante no campo de resposta.
- A aplicação deve registrar cada submissão no Google Sheets antes de tentar o envio. Se o registro for confirmado e o e-mail falhar, informar que o registro foi salvo e que o formulário não deve ser reenviado.
- O responsável configurou e ativou o serviço SMTP da caixa pública do Lark. Usar `contato@b2bnutris.com` como usuário SMTP e guardar `LARK_SMTP_USER` e `LARK_SMTP_PASSWORD` somente no ambiente servidor.
- `LARK_CONTACT_FROM`, `CONTACT_NOTIFICATION_TO` e `LARK_NEWSLETTER_FROM` definem os remetentes e destino; os valores esperados estão em `web/.env.example` e não são secretos.
- O descadastro automatizado e a lista de supressão continuam pendentes; não iniciar campanhas de newsletter até concluí-los.

## Validação relatada do fluxo de e-mail (2026-11-15)

- O responsável relatou que a inscrição de newsletter gravou na aba `Newsletter` e entregou a mensagem de boas-vindas.
- O responsável relatou que o formulário de contato gravou na aba `Contato` e entregou a notificação à caixa pública do Lark.
- O responsável confirmou que a resposta à notificação de contato aponta para o e-mail informado no formulário.
- O link de descadastro abriu uma mensagem para a equipe, que chegou à caixa pública. A aplicação ainda não transforma esse pedido em supressão automática.
- Esses resultados vieram de testes manuais relatados pelo responsável. O estado atual das variáveis e do ambiente de produção não foi inspecionado neste repositório.
- O CP-05 permanece aberto. O plano em [plano-validacao-cp-05.md](plano-validacao-cp-05.md) define os testes restantes de falha, duplicidade, idempotência e proteção contra abuso.

## Decisão posterior sobre as amostras (2026-11-14)

O responsável aprovou visualmente as seis amostras de cinco páginas e dispensou a revisão de tags e ordem de leitura dos PDFs para sua disponibilização. O leitor deve permitir a leitura visual e a navegação pelas páginas. Esta decisão substitui a exigência de revisão de tags descrita abaixo; os demais requisitos de conteúdo e autorização permanecem aplicáveis.

## Decisões confirmadas

### Newsletter

- Persistir os dados em uma planilha Google Sheets dedicada, na aba `Newsletter`.
- Usar inscrição simples (single opt-in). A inscrição fica ativa após o envio do formulário, sem etapa de confirmação por e-mail.
- Exibir uma caixa de consentimento explícita e inicialmente desmarcada.
- Registrar endereço, consentimento, data/hora e origem da inscrição.
- Enviar uma mensagem de boas-vindas. A decisão anterior pelo Resend foi substituída pela atualização do canal de e-mail no início deste documento.
- Incluir link de descadastro. Preservar o estado mínimo de supressão após o descadastro para impedir reativação e novos envios acidentais.
- Manter a inscrição ativa até um pedido explícito de descadastro. Não usar expiração automática da inscrição.
- Usar `newsletter@b2bnutris.com` como remetente aprovado.

Esta decisão substitui especificamente o double opt-in descrito em `roteiro.md`. Os demais requisitos de segurança, validação e proteção contra abuso continuam aplicáveis.

### Formulário de contato

- Persistir os dados na mesma planilha dedicada, em uma aba separada chamada `Contato`.
- Coletar nome, e-mail, assunto e mensagem.
- Notificar a equipe pelo Lark Mail e mostrar o resultado do envio no próprio site.
- Impedir o processamento repetido da mesma solicitação por uma chave de idempotência, sem bloquear uma nova mensagem enviada intencionalmente.
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

- A Hostinger continua sendo o provedor DNS do domínio. O Lark Mail é o serviço escolhido para a caixa pública e para o envio SMTP dos formulários.
- Registros DNS do Resend podem permanecer no domínio, mas o fluxo atual dos formulários usa Lark SMTP.
- O responsável relatou gravações no Google Sheets e entregas de e-mail nos testes manuais. A leitura direta das variáveis de produção e do estado atual do provedor não foi feita nesta revisão.
- O tratamento automatizado de descadastro e a supressão permanecem pendentes. Não iniciar campanhas antes de implementar e validar esses controles.
- O plano do CP-05 cobre falhas, deduplicação concorrente da newsletter, idempotência de contato e proteção contra abuso. O token de confirmação com expiração descrito no roteiro antigo não se aplica ao single opt-in.
- Mensagens de contato devem ser apagadas ou anonimizadas 12 meses após a resolução do assunto. Esse prazo é distinto da validade da inscrição da newsletter.
- Os arquivos de amostra separados ainda precisam ser preparados e revisados. Os links Hotmart também dependem dos endereços fornecidos para cada produto.

## Próximas dependências para implementação

1. Executar o plano de validação dos formulários antes de fechar o CP-05.
2. Definir e implementar armazenamento atômico para deduplicação concorrente e idempotência.
3. Definir o limite e a janela do rate limit e implementar armazenamento compartilhado para esse controle.
4. Implementar o fluxo de descadastro e a lista de supressão antes de campanhas.
5. Preparar os seis PDFs de amostra de cinco páginas e revisar acessibilidade de cada arquivo.

