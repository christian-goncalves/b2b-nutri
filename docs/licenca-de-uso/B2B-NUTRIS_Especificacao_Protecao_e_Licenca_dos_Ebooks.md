# B2B Nutris | Especificação de proteção e licença de uso dos e-books

**Status:** diretrizes definidas; validação técnica e redação jurídica pendentes
**Versão:** 1.0
**Data:** 18/11/2026
**Finalidade:** servir como roteiro de configuração da entrega e proteção dos PDFs comercializados pela B2B Nutris.

## 1. Objetivo

Proteger os e-books contra compartilhamento indevido, reprodução não autorizada e revenda, **sem impedir seu uso legítimo por nutricionistas**. A proteção deve permitir impressão, consulta profissional e compartilhamento pontual de páginas originais.

**Princípio:** desestimular a distribuição irregular e facilitar a identificação da origem de cópias compartilhadas. Nenhuma proteção técnica garante impedir integralmente a cópia ou reconstrução do conteúdo.

## 2. Modelo de venda e entrega

- **Site B2B Nutris:** apresenta os produtos e direciona para a compra.
- **Hotmart:** responsável pelo checkout e pela entrega dos e-books pagos, conforme a configuração da oferta.
- **Arquivos completos:** não devem ser disponibilizados publicamente no site, em rotas abertas ou em repositórios públicos.
- **Material gratuito:** o PDF *Antes da Consulta* tem finalidade diferente e deverá receber uma decisão própria de distribuição; não presumir as mesmas restrições dos produtos pagos.

## 3. Regras de uso já aprovadas

**Licença individual:** cada compra concede à profissional compradora uma licença de uso pessoal. A licença não é compartilhada com colegas ou com toda a equipe de uma clínica.

**Permitido:**

- Ler e consultar o e-book no exercício profissional e para estudo.
- Imprimir páginas para uso próprio e durante atendimentos.
- Mostrar, entregar impressas ou enviar digitalmente páginas específicas aos próprios pacientes, no contexto do atendimento.
- Mostrar e distribuir páginas específicas a participantes de aulas, cursos e palestras, mantendo o material original e seus créditos.
- Publicar **páginas isoladas** em redes sociais para fins educativos ou de divulgação profissional, preservando a identificação da B2B Nutris e a marca d'água.

**Não permitido:**

- Compartilhar o e-book completo com terceiros, mesmo gratuitamente.
- Disponibilizar o arquivo integral para equipes, colegas, grupos, comunidades ou bibliotecas de arquivos.
- Copiar textos ou adaptar fichas para compor materiais próprios, novos produtos ou documentos redistribuídos; o conteúdo é licenciado como **referência**, sem autorização para modificações e reaproveitamento editorial.
- Remover ou ocultar créditos, identificação da B2B Nutris ou marca d'água da compradora.
- Revender, sublicenciar ou oferecer o e-book ou suas páginas como produto próprio.
- Publicar em redes sociais sequências de páginas ou publicações acumuladas que, em conjunto, reproduzam partes substanciais do e-book. **Somente páginas isoladas são autorizadas para redes sociais.**
- Usar o compartilhamento de páginas com pacientes ou participantes como forma indireta de distribuir o livro integral.

**Interpretação importante:** a autorização para compartilhar páginas **originais e específicas** com pacientes ou participantes é uma exceção de uso profissional. Ela não autoriza produzir versões editadas, montar apostilas derivadas ou reconstruir o conteúdo completo.

## 4. Proteção técnica desejada

**Estratégia prioritária:** avaliar e configurar o **DRM Social da Hotmart** para adicionar uma marca d'água individualizada às cópias entregues aos compradores.

Configuração-alvo:

- **Marca d'água por comprador:** ativada, preservada nas páginas impressas e compartilhadas.
- **Impressão:** permitida.
- **Leitura do PDF:** permitida nos meios usuais de acesso do comprador.
- **Edição/modificação do arquivo:** restringir quando a plataforma oferecer opção compatível.
- **Cópia de texto e extração de páginas:** validar o comportamento real antes de decidir se algum bloqueio deve ficar ativo. A proteção não pode inviabilizar os compartilhamentos autorizados.

**Dados na marca d'água:** a decisão é identificar a compradora inclusive em páginas compartilhadas com pacientes e participantes. **Ainda não foram definidos quais dados aparecerão** (nome, e-mail, identificador de compra etc.). Preferir a menor exposição possível de dados pessoais que ainda permita identificação; verificar como a Hotmart aplica essa identificação e informar a compradora antes da aquisição.

## 5. Validações obrigatórias na Hotmart

Antes de publicar os e-books pagos:

1. Confirmar, na interface e na documentação atual da Hotmart, quais opções de DRM Social estão disponíveis para o tipo de produto e arquivo comercializado.
2. Verificar se é possível **ativar a marca d'água mantendo a impressão liberada**.
3. Fazer uma compra de teste autorizada e baixar o arquivo exatamente como o comprador o recebe.
4. Conferir a marca d'água em todas as páginas, inclusive em páginas impressas e páginas extraídas/compartilhadas.
5. Testar a leitura e impressão em leitores de PDF comuns; restrições podem se comportar de modo diferente conforme o aplicativo.
6. Verificar se o comprador consegue compartilhar uma página específica sem precisar distribuir o arquivo completo. Caso a configuração impeça esse uso, avaliar uma alternativa compatível, sem presumir que o DRM resolve essa necessidade sozinho.
7. Conferir informações exibidas ao comprador sobre identificação, permissões, limites e acesso ao material.

**Critério de aceite:** a compradora recebe um PDF identificado, pode ler e imprimir legitimamente, e consegue utilizar páginas específicas nas situações autorizadas. Qualquer restrição incompatível com essas funcionalidades exige revisão da configuração antes do lançamento.

## 6. Licença resumida para apresentar ao comprador (rascunho)

> **Licença de uso individual.** Este material é destinado ao uso da profissional compradora como referência para estudo e prática profissional. É permitida a impressão e a utilização de páginas originais em atendimentos, assim como o envio de páginas específicas a pacientes e sua apresentação ou distribuição pontual em atividades educacionais. Em redes sociais, é permitida apenas a publicação de páginas isoladas, com os créditos e a identificação preservados. É proibido distribuir o e-book integralmente, compartilhar a licença com outros profissionais, modificar ou reaproveitar o conteúdo para criar materiais próprios, remover a identificação do arquivo ou revender o conteúdo. O arquivo pode conter marca d'água individualizada para identificação da compra.

**Atenção:** este é um texto operacional inicial, **não a versão jurídica definitiva** dos termos de licença. Antes da publicação, revisar a redação final, especialmente em relação à legislação aplicável, ao tratamento de dados pessoais e à compatibilidade com os termos da Hotmart.

## 7. Próximos passos de implementação

- [ ] Validar as configurações reais do DRM Social da Hotmart.
- [ ] Definir quais dados da compradora aparecerão na marca d'água e como serão informados previamente.
- [ ] Testar download, impressão, compartilhamento de página e persistência da marca d'água.
- [ ] Consolidar a licença de uso na página de produto/condições da oferta, sem prometer bloqueio absoluto contra pirataria.
- [ ] Revisar juridicamente a licença e os avisos de privacidade antes da publicação.
- [ ] Confirmar que os PDFs pagos completos permanecem fora das áreas públicas do site.
- [ ] Registrar a configuração aprovada para replicá-la nos seis e-books comerciais.

## 8. Fora do escopo nesta etapa

Não desenvolver um sistema próprio de DRM, login de leitura, aplicativo de e-books ou controle técnico de distribuição de cada página. Primeiro aproveitar o que a plataforma de entrega efetivamente oferece e validar a experiência do comprador.

---

**Decisão central:** **proteger a autoria e a distribuição comercial sem prejudicar o uso clínico e educacional legítimo dos materiais.**
