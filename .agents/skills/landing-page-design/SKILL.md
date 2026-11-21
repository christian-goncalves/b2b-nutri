---
name: landing-page-design
description: "Orientar a evolução incremental da experiência comercial da B2B Nutris. Usar ao analisar, planejar ou implementar mudanças na home, catálogo de e-books, páginas de produtos e chamadas comerciais da biblioteca. Priorizar código, componentes, assets e identidade visual existentes; clareza de proposta de valor, CTA, confiança, responsividade e conteúdo verificável. Não implica redesign nem integração externa."
---

# Landing Page Design — B2B Nutris

## Missão e alcance

Melhorar clareza comercial, navegação e conversão da **B2B Nutris**, sem reconstruir a interface existente. Esta skill atende à home, ao catálogo `/ebooks`, às páginas `/ebooks/[slug]` e às chamadas comerciais da `/biblioteca` e dos artigos. **Cada rota mantém sua finalidade:** home apresenta a marca e capta interesse; catálogo facilita descoberta; produto informa e conduz à compra; biblioteca informa e favorece leitura e descoberta orgânica.

Esta é a própria skill `landing-page-design` adaptada ao repositório. **Não criar outra skill nem exigir a execução da `frontend-design`.** Consultar outras referências apenas quando a tarefa realmente exigir e o usuário autorizar.

O site está em **desenvolvimento/preview**, sem publicação pública nesta fase. É permitido planejar e, quando autorizado, implementar interfaces antes da integração operacional, distinguindo claramente estados visuais de funcionalidades reais. Não publicar ou fazer deploy sem autorização específica.

## Fontes de verdade e prioridades

1. Pedido atual do usuário, decisões expressamente aprovadas e restrições de escopo, respeitadas as instruções de maior prioridade.
2. Código e assets **reais e atuais** do repositório; examinar os arquivos antes de sugerir alterações.
3. Conteúdo comercial/editorial aprovado e diagnóstico técnico validado pelo usuário.
4. Princípios desta skill como apoio, **não como fórmulas obrigatórias**.

Em caso de conflito entre uma regra genérica de landing page e o projeto existente, **não redesenhar por reflexo**: explicar o conflito e propor a menor mudança capaz de atender ao objetivo. Os mockups de conversas anteriores **não são referência visual nem requisito de implementação**.

## Fluxo de trabalho

**1. Diagnosticar:** antes de propor alterações, localizar a rota, os componentes usados, os dados, assets, estilos, estados reais dos formulários e comportamento responsivo. Mapear o que existe, o que se repete e o que está incompleto. Não inferir que uma funcionalidade existe apenas porque há uma interface para ela.

**2. Planejar:** associar cada mudança ao componente/arquivo existente e classificá-la como *manter*, *ajustar texto*, *reordenar*, *reduzir redundância*, *reutilizar* ou *adicionar o mínimo necessário*. Informar dependências, lacunas de conteúdo e riscos de regressão.

**3. Executar somente quando solicitado:** uma auditoria ou pedido de planejamento é **somente leitura**. Não modificar arquivos, instalar dependências, gerar imagens, executar deploy ou acionar serviços externos sem autorização explícita. Se a implementação for autorizada, manter o trabalho restrito ao escopo aprovado.

**4. Verificar:** conferir links, estados, acessibilidade e responsividade; executar os testes locais já existentes quando cabível. Validar a home visualmente em preview **independentemente** da integração de e-mail; testar confirmação e entrega somente quando operacionais. Informar claramente o que foi validado e o que não pôde ser verificado.

## Preservação técnica e visual

- Reaproveitar `SectionHeading`, `BookCard`, estilos de botões, grids, superfícies e outros componentes existentes antes de criar novos.
- Manter cabeçalho, menu móvel, rodapé e rotas globais. Não eliminar catálogo, filtros, produtos relacionados, prévias, artigos ou navegação já funcional.
- Inspecionar `web/app/page.tsx`, `web/app/layout.tsx`, `web/data/home-books.ts`, `web/styles/tokens.css`, `web/styles/components.css` e o diretório de assets conforme a tarefa; confirmar caminhos atuais em vez de pressupô-los.
- Preservar **Inter** (corpo/interface), **Playfair Display** (títulos) e a linguagem visual existente: vinho, rosa, coral, oliva, amarelo de CTA, creme e zinco. Não substituir por uma estética de template SaaS.
- Há diferença documentada entre o creme do Design System (`#FAF3EA`) e o usado pela aplicação (`#FDF9F5`). **Não corrigir tokens ou paleta automaticamente**; apresentar a divergência e aguardar decisão.
- Reutilizar capas, imagens e grafismos reais. Não substituir a identidade por ilustrações geradas, fotos de banco ou imagens fictícias da Bianca.
- O `HomeHeroSlider` pode permanecer implementado mesmo que deixe de ser exibido no hero. Não apagar componentes apenas porque saíram de uma composição.
- Validar especialmente desktop e largura móvel de aproximadamente **425 px**, sem exigir mudança de breakpoints que já funcionem.

## Estrutura aprovada para a home

Usar esta ordem como **briefing comercial**, não como licença para reconstruir o layout. Preservar o aspecto atual e adaptar seções com mudanças pontuais.

1. **Hero:** proposta de valor da marca, CTA principal do guia gratuito e CTA secundário para `/ebooks`. Reutilizar a composição visual atual na medida do possível, sem forçar carrossel de produtos a competir com a oferta. Não usar foto fictícia.
2. **Credibilidade compacta:** autoria e processo editorial somente quando verificáveis; referências e organização dos materiais, sem métricas inventadas.
3. **Problema:** mostrar a perda de tempo causada por informações dispersas.
4. **Benefícios:** facilidade de encontrar informações, aplicação na prática e construção de biblioteca de referência.
5. **Três e-books em destaque:** seleção aprovada: **Da Escuta à Conduta**, **O Olhar Comportamental na Consulta Nutricional** e **Guia Visual das Vitaminas**. Manter cada `BookCard` apontando à sua página individual e incluir botão separado **“Explorar todos os e-books”** para `/ebooks`. Não replicar os seis produtos nem alterar flags globais como atalho.
6. **Biblioteca:** convite breve e links apenas para artigos publicados ou aprovados.
7. **Sobre Bianca:** preservar a estrutura existente e usar o texto factual aprovado abaixo e a fotografia real fornecida, sem inventar credenciais nem substituir a pessoa por imagem fictícia.
8. **Depoimentos:** **não publicar** exemplos demonstrativos; exibir a seção somente com depoimentos autênticos e autorizados.
9. **Perguntas frequentes:** respostas objetivas e verificadas sobre público, formato digital, utilização, compra e guia gratuito; não prometer condições não implementadas.
10. **Contato:** preservar o fragmento `/#contato`; exibir **“WhatsApp: em breve”** e **“Instagram: em breve”** sem links ativos.
11. **CTA final:** reforçar o convite para receber gratuitamente o guia.

O fluxo de três passos do guia (*informar e-mail → confirmar endereço → receber PDF*) deve ser explicado perto da captação, **não obrigatoriamente em uma seção grande**. Remover da home repetições de produtos e a seção de “próximo lançamento” sem anúncio quando a refatoração estiver autorizada. Formulários de contato indisponíveis não devem parecer ativos.

### Textos comerciais já aprovados

- **Hero:** “Sua prática nutricional merece conhecimento organizado e ferramentas à mão.”
- **Complemento:** “Guias, materiais de referência e recursos práticos para facilitar o estudo, a consulta e a organização dos atendimentos. Um acervo desenvolvido pela B2B Nutris com a experiência profissional da nutricionista Bianca.”
- **CTA principal:** “Receba gratuitamente o guia Antes da Consulta”.
- **CTA secundário:** “Explorar e-books”.
- **Problema:** “Você estudou para cuidar de pessoas, não para perder tempo procurando informações.”
- **Benefícios:** “Encontre o que precisa, com mais facilidade”; “Leve o conhecimento para a prática”; “Construa sua própria biblioteca de referência”.

Usar essa redação como base sem reescrevê-la por padrões genéricos de contagem de palavras. Ajustes de texto precisam respeitar a intenção aprovada.

### Texto aprovado para a seção Sobre Bianca

**Título:** Conheça Bianca Gonçalves

**Texto:** “Bianca Gonçalves é nutricionista clínica (CRN-3 89451/P), formada pela Universidade Paulista (UNIP) e pós-graduada em Neurociência e Comportamento Alimentar pela PUC Campinas. Possui formação em Mindful Eating e atua em atendimentos particulares on-line, considerando a alimentação, o comportamento, o sono e as emoções em sua prática.”

**Fonte factual:** `docs/curriculo-bianca/Curriculo_Bianca_Goncalves.pdf`. **Fotografia real editada:** usar, quando disponibilizada no repositório, `web/public/images/bianca/bianca-home.png` (sem legenda, com fundo transparente). Adaptar apenas enquadramento e apresentação ao layout existente; não gerar substituta nem presumir que o arquivo já foi copiado.

## Oferta gratuita e comércio

- **Antes da Consulta** é um PDF gratuito de 15 páginas, voltado ao pré-atendimento nutricional. O original foi disponibilizado na pasta `ebooks/` da raiz do projeto, que não equivale a um asset público da aplicação. Confirmar sua presença no checkout atual antes da integração. **Para a oferta visual em preview, basta a capa; não é necessário criar amostra nem página individual.** Não publicar download direto por padrão.
- Fluxo comercial **planejado, ainda sujeito à implementação técnica**: cadastrar e-mail, verificar endereço e enviar o PDF automaticamente. A interface da captação pode ser construída em preview com formulário, validação e estados de teste identificados, mas não pode simular envio, confirmação ou entrega como reais. O CTA pode ser apresentado visualmente sem prometer operação ainda indisponível. Consentimento para marketing é separado da verificação do e-mail.
- Não integrar provedores de e-mail, alterar formulários, criar endpoints, armazenar contatos ou iniciar disparos por iniciativa própria.
- Os e-books pagos são promovidos no site; compra e entrega utilizam **Hotmart** conforme os vínculos efetivamente configurados. Não inventar preços, URLs de checkout, descontos ou disponibilidade.
- Se o PDF gratuito tiver metadados internos incorretos, registrar o problema; não editar o documento sem solicitação.

## Boas práticas de conversão sem exageros

- Comunicar rapidamente **para quem é**, **que benefício entrega** e **qual a próxima ação**. Um CTA principal por contexto; ações secundárias sem competição visual.
- Preservar linguagem clara para nutricionistas, evitando superlativos, promessas de resultados clínicos ou comerciais e apelos artificiais de urgência.
- Usar prova de confiança **factual**, nunca inventar clientes, depoimentos, estrelas, selos, títulos profissionais, estatísticas ou parcerias.
- Formulários curtos, rótulos claros, estados de erro/sucesso reais e compatíveis com a integração disponível.
- Mobile: conteúdo legível, botões tocáveis, foco visível, sem rolagem horizontal, imagens responsivas e respeito a movimento reduzido.
- Atenção a peso das imagens, hierarquia de títulos, semântica, contraste e estabilidade de layout; **não impor limites numéricos arbitrários** sem medição.
- FAQ e elementos persuasivos precisam reduzir dúvidas reais, não servir de preenchimento de página.

## Restrições operacionais

- **Não usar nem instalar** `belt`, Inference, CLI de geração de imagens ou ferramentas externas por orientação desta skill. Nenhum serviço pago ou pesquisa externa é pré-requisito.
- Não usar os mockups anteriores para reconstruir a aparência da B2B Nutris.
- Não criar uma terceira skill para governar esta; alterações devem ocorrer no `landing-page-design` local quando solicitadas.
- Não executar mudanças fora da rota/escopo autorizado nem alterar arquivos do design system sem justificativa e aprovação.

## Formato de resposta ao Codex

Em **diagnóstico/planejamento**, responder de forma concisa: estado atual, mapeamento das mudanças mínimas por arquivo/componente, informações ainda não verificadas e proposta de execução. **Parar antes de editar.**

Em **implementação autorizada**, entregar: arquivos modificados, comportamento alterado, funcionalidades preservadas, testes realizados e eventuais pendências. Não confundir “não testado” com “funcionando”.
