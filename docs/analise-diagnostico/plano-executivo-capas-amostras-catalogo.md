# Plano executivo para capas, amostras e catálogo

Proposta para consolidar os sete materiais e registrar uma referência única para capas e amostras.

| Campo | Definição |
| --- | --- |
| Status | Pronto para execução autônoma por etapas |
| Responsável | Christian Gonçalves, responsável pelo projeto |
| Público | Responsável pelo projeto e pessoa implementadora |
| Escopo | Integrar as sete capas V2, criar a amostra de cinco páginas de Antes da Consulta, incluir o guia no catálogo, padronizar nomes dos PDFs completos e reorganizar `docs/_public` |
| Fora do escopo | Implementar captura e entrega do guia por e-mail, reaproveitar a API de newsletter, publicar ou fazer deploy, excluir os PDFs-fonte completos |
| Relacionados | [Diagnóstico dos materiais](guia-antes-da-consulta-materiais.md), [README atual de _public](../_public/README.md), [decisões de implementação](../decisoes-implementacao.md), [roteiro do projeto](../roteiro.md) |

---

## 1. Resumo executivo

Consolidar as capas finais em `web/public/images/books/`, usar cada capa V2 também como página 1 da respectiva amostra, criar a amostra de Antes da Consulta com a capa e as páginas 2 a 5 do PDF-fonte, e cadastrar o guia como o sétimo material publicado do catálogo. Em seguida, retirar de `docs/_public` os atalhos de Capas V1 e PDFs completos e a pasta temporária Capas V2, mantendo o atalho de amostras e documentando a estrutura no README.

O fluxo de captura e entrega do PDF completo de Antes da Consulta continua pendente. Este plano não usa a API de newsletter para esse fim e não cria um botão de download sem destino funcional. A página do material pode exibir a amostra; o CTA “Baixar grátis” fica para uma etapa posterior, quando o fluxo real estiver definido e implementado.

O plano é para execução local no repositório. Não autoriza publicação, deploy nem mudanças em serviços externos.

## 2. Objetivo e limites

### Objetivos

- Usar a sequência `00` a `06` para associar cada PDF-fonte à capa V2 correspondente.
- Fazer o catálogo, a página do material e a primeira página da amostra usarem a mesma capa final.
- Incluir Antes da Consulta no catálogo com uma amostra de cinco páginas, sem expor o PDF completo na pasta pública.
- Padronizar os nomes dos sete PDFs completos como `NN - <título impresso na capa V2>.pdf`, preservando as palavras e a grafia do título da capa.
- Simplificar `docs/_public` para que o README explique onde estão as capas de referência, os PDFs de amostra e as amostras visuais.

### Não objetivos

- Implementar ou simular a solicitação, confirmação ou entrega do PDF completo por e-mail.
- Mudar newsletter, contato, credenciais, configurações externas ou política de privacidade.
- Alterar o conteúdo editorial dos PDFs, as páginas internas ou as pastas estáveis usadas pelo leitor de amostras.
- Publicar o guia em produção ou fazer deploy.

## 3. Base verificada

| Fonte | Estado observado | Consequência para o plano |
| --- | --- | --- |
| `docs/_public/capas-v2/` | Há sete capas finais, numeradas de `00` a `06`. As pastas de `01` e `02` identificam O Olhar como volume 01 e Por trás como volume 02. | Usar esses arquivos como entrada da migração e manter a ordem confirmada. |
| `web/public/images/books/` | O catálogo importa seis capas antigas por caminhos estáveis. | Substituir o conteúdo dessas seis imagens pelas capas V2 correspondentes, preservando os nomes de importação atuais; acrescentar a capa do guia. |
| `web/public/samples/` e `web/public/samples/pages/` | Há seis PDFs de amostra e seis pastas com cinco WebPs. O visualizador exibe as imagens WebP e exige o PDF separado mais as cinco imagens. | Manter o contrato atual do leitor e criar PDF e cinco WebPs para o guia. |
| `ebooks/00 - Antes da Consulta.pdf` | O PDF-fonte completo tem 15 páginas. A página 1 é a capa original e as páginas 2 a 5 são as páginas internas pedidas para a amostra. | A amostra pública usa a capa V2 como página 1 e somente as páginas 2 a 5 do original. |
| `web/data/home-books.ts`, `web/types/home-book.ts` | O catálogo tem seis produtos publicados. As categorias são derivadas desses registros. | Adicionar o guia ao registro local sem alterar sua inclusão nas vitrines da home, a menos que isso seja pedido separadamente. |
| `web/app/ebooks/[slug]/page.tsx` e `web/app/ebooks/[slug]/amostra/page.tsx` | A página de produto mostra compra Hotmart quando há URL, texto pendente quando não há, e botão de amostra quando os arquivos estão autorizados. O leitor mostra cinco imagens e não oferece download. | Representar o guia como material gratuito sem exibir aviso de compra Hotmart; habilitar a visualização da amostra quando os cinco arquivos estiverem presentes. |
| `web/components/home-hero-interaction.tsx` e `web/components/guide-capture-form.tsx` | O modal da home é uma prévia que valida o endereço localmente. Não envia nem registra a solicitação. A API de newsletter não é chamada por esse modal. | Manter captura e entrega por e-mail fora desta execução. |
| `docs/_public/README.md` | O README atual lista dimensões e proporções de PDFs, com descrições que não representam a estrutura de capas e amostras. | Substituir a lista por um mapa conciso dos diretórios e links simbólicos mantidos após a reorganização. |
| Árvore de trabalho | Há alterações existentes em `web/app/page.tsx`, `web/data/home-books.ts`, `web/types/home-book.ts`, `web/next-env.d.ts`, `web/public/images/logo.png` e diretórios não rastreados. | Reinspecionar `git status` e diffs antes da execução; integrar sem reverter ou incluir alterações alheias. |

## 4. Decisões propostas

> **Por que e o que: uma referência canônica de capas**
>
> **O que:** manter as capas finais do catálogo em `web/public/images/books/` e remover `docs/_public/capas-v2/` apenas depois de conferir as sete cópias.
>
> **Por quê:** o site já importa capas desse diretório. A primeira página WebP de cada amostra será uma cópia derivada da capa canônica, necessária ao visualizador. Assim, Capas V2 deixa de ser um segundo arquivo de referência, e o atalho de amostras continua servindo para consulta rápida.
>
> **Alternativa considerada:** manter Capas V2 como arquivo histórico permanente. Isso preservaria versões anteriores, mas manteria as duas pastas de capa que o responsável quer remover e não é necessário para o site.
>
> **Custo:** a origem das capas deixará de ser uma pasta V2 separada. O README e a cópia revisada em `web/public/images/books/` passam a ser o ponto de referência.

> **Por que e o que: nomes de arquivo numerados**
>
> **O que:** nomear cada capa no diretório do site como `NN-<slug do título impresso>.png`, sem espaços, e cada PDF completo como `NN - <título impresso na capa V2>.pdf`.
>
> **Por quê:** o número e o título permitem encontrar a capa ou o PDF correspondente usando a mesma sequência. O padrão preserva os nomes das capas como você indicou e atualiza os imports para os caminhos novos.
>
> **Alternativa considerada:** manter os nomes atuais das seis imagens e dos PDFs. Isso reduziria mudanças de caminho, mas deixaria a sequência visual diferente do padrão que você quer usar para localizar os materiais.
>
> **Custo:** os imports em `web/data/home-books.ts` e as referências textuais aos PDFs precisam ser atualizados junto com os arquivos.

> **Por que e o que: amostra limitada a cinco páginas**
>
> **O que:** gerar uma amostra PDF separada com a capa V2 na página 1 e as páginas 2 a 5 do PDF-fonte nas páginas seguintes, além das cinco imagens WebP que o leitor atual exige.
>
> **Por quê:** corresponde ao formato já usado pelo catálogo e à sequência indicada pelo responsável. As páginas internas mantêm suas proporções originais, mesmo que sejam diferentes da proporção da capa.
>
> **Alternativa considerada:** mostrar o PDF completo no leitor. Isso contrariaria o limite de amostra autorizado e tornaria público o material integral.
>
> **Custo:** o PDF público de amostra contém somente cinco páginas e não oferece download no leitor atual.

> **Por que e o que: manter o download por e-mail pendente**
>
> **O que:** deixar o guia sem botão funcional “Baixar grátis” até existir um fluxo real de captura e entrega definido e validado.
>
> **Por quê:** o modal atual é uma prévia local e a API de newsletter tem outra finalidade. Apontar o CTA a qualquer um deles apresentaria um comportamento que não existe.
>
> **Alternativa considerada:** reutilizar a newsletter para receber pedidos do guia. Isso misturaria finalidades e não entregaria o PDF.
>
> **Custo:** o guia poderá ser listado e sua amostra poderá ser visualizada antes de a obtenção do PDF completo estar disponível.

## 5. Plano de execução

### Etapa 1: conferir o mapa de fontes e preservar o estado atual

**Objetivo:** confirmar a associação de cada capa V2 ao PDF completo e identificar referências que dependem dos nomes atuais.

**Arquivos e diretórios:** `docs/_public/capas-v2/`, `ebooks/`, `web/public/images/books/`, `web/public/samples/`, `web/public/samples/pages/`, `web/data/home-books.ts`, `web/types/home-book.ts` e resultados de busca no repositório.

**Alteração:** nenhuma. Registrar os nomes impressos nas sete capas, os nomes atuais dos PDFs, dimensões e pastas estáveis das amostras. Confirmar visualmente a correspondência dos volumes 01 e 02. Reexaminar as alterações existentes nos arquivos que serão tocados.

**Critérios de aceite:** há uma correspondência única entre números `00` a `06`, PDFs completos e capas V2; os volumes 01 e 02 seguem a ordem confirmada; as alterações pré-existentes estão identificadas e preservadas.

**Verificação:** `git status --short`; `find docs/_public/capas-v2 -maxdepth 2 -type f`; `find ebooks -maxdepth 1 -type f -name '*.pdf'`; `rg -n 'ebooks/.*\.pdf' web editorial docs --glob '!*.pdf'`.

**Checkpoint ETAPA-01:** validar o mapa de associação e identificar os diffs preexistentes. Não alterar arquivos nesta etapa. Registrar a conferência e avançar automaticamente se todos os critérios passarem.

### Etapa 2: integrar as sete capas e preparar a amostra do guia

**Objetivo:** colocar as capas V2 no diretório consumido pelo site e preparar os arquivos públicos de amostra de Antes da Consulta.

**Arquivos e diretórios:** capas em `docs/_public/capas-v2/`; sete capas finais `web/public/images/books/NN-<slug-do-titulo>.png`; PDF completo em `ebooks/`; novo `web/public/samples/antes-da-consulta.pdf`; nova pasta `web/public/samples/pages/antes-da-consulta/` com `1.webp` a `5.webp`.

**Alteração:** copiar as sete capas V2 para `web/public/images/books/` com nomes no padrão numerado definido na seção 4, sem espaços e baseados nos títulos visíveis. Atualizar os imports em `web/data/home-books.ts`. Criar um PDF separado de exatamente cinco páginas. Usar a capa V2 como página 1 e as páginas 2 a 5 do original como páginas 2 a 5. Renderizar as cinco páginas em WebP, preservando a proporção de cada página. Não copiar o PDF completo para `web/public/`.

**Critérios de aceite:** as sete capas do catálogo e a página 1 de cada amostra correspondem visualmente; a amostra do guia contém exatamente cinco páginas; a capa permanece em 4:3 e as páginas internas permanecem em 16:9; nenhum PDF comercial completo foi copiado para a área pública.

**Verificação:** `pdfinfo web/public/samples/antes-da-consulta.pdf`; `pdfinfo -f 1 -l 5 -box web/public/samples/antes-da-consulta.pdf`; conferir a existência de `1.webp` a `5.webp`; abrir as cinco imagens e comparar a página 1 à capa canônica. Para cada PDF público, confirmar cinco páginas.

**Checkpoint ETAPA-02:** validar os sete arquivos de capa no destino, a amostra de cinco páginas e as verificações visuais e dimensionais. Registrar a conferência e avançar automaticamente se todos os critérios passarem.

### Etapa 3: padronizar nomes dos PDFs completos e referências

**Objetivo:** aplicar a regra numérica e o título impresso nas capas V2 aos nomes dos sete PDFs-fonte.

**Arquivos e diretórios:** sete PDFs em `ebooks/`; referências existentes em `web/data/library/articles.ts`, artigos em `editorial/publicados/` e documentos que ainda apontam para os nomes antigos, identificados na etapa 1.

**Alteração:** renomear cada PDF completo para `NN - <título exato da capa V2>.pdf`. Para os materiais Mente Clínica, usar `01 - O Olhar Comportamental na Consulta Nutricional.pdf` e `02 - Por trás do comportamento alimentar.pdf`. Atualizar somente referências de arquivo que passarem a apontar para nomes inexistentes. Manter conteúdo, páginas, slugs e estrutura dos PDFs.

**Critérios de aceite:** os sete arquivos completos continuam no diretório privado `ebooks/`; cada nome começa com o número correspondente à capa; as referências internas pesquisadas apontam para os nomes novos; `docs/_public/ebooks` continua sendo apenas um atalho removível, não o local dos arquivos-fonte.

**Verificação:** listar `ebooks/*.pdf`; executar `rg -n 'ebooks/.*\.pdf' web editorial docs --glob '!*.pdf'`; confirmar que cada caminho citado existe e que nenhum PDF completo foi adicionado a `web/public/`.

**Checkpoint ETAPA-03:** validar a tabela de nomes antigos e novos, as referências atualizadas e confirmar que nenhum PDF-fonte foi para `web/public/`. Registrar a conferência e avançar automaticamente se todos os critérios passarem.

### Etapa 4: cadastrar Antes da Consulta no catálogo

**Objetivo:** tornar o guia o sétimo material publicado e oferecer a visualização da amostra.

**Arquivos:** `web/types/home-book.ts`, `web/data/home-books.ts`, `web/app/ebooks/[slug]/page.tsx` e, somente se necessário para a regra existente de exposição, `web/app/ebooks/page.tsx`.

**Alteração:** adicionar os dados do guia usando título, categoria, coleção e informações extraídas do PDF e da capa. Marcar o item como publicado para aparecer em `/ebooks`, sem incluí-lo automaticamente no slider ou nos destaques da home. Configurar `samplePdf` para `/samples/antes-da-consulta.pdf`. Tratar o guia como material gratuito sem mostrar mensagem de compra Hotmart pendente. Exibir “VISUALIZAR AMOSTRA GRÁTIS” quando os arquivos autorizados existirem. Não criar ou ligar o CTA de download completo nesta etapa.

**Critérios de aceite:** `/ebooks` lista sete materiais; o cartão do guia leva à página de detalhe; a página mostra a capa correta e abre o leitor de cinco páginas; as páginas internas não incluem a página 1 original; não aparece aviso de compra Hotmart para o guia; os outros seis produtos mantêm comportamento e dados atuais.

**Verificação:** `cd web && npm run typecheck`; `cd web && npm run build`; conferir localmente `/ebooks`, `/ebooks/<slug-do-guia>` e `/ebooks/<slug-do-guia>/amostra` em desktop e celular.

**Checkpoint ETAPA-04:** validar os arquivos alterados, confirmar sete itens no catálogo e abrir as rotas locais previstas. Registrar a conferência e avançar automaticamente se todos os critérios passarem.

### Etapa 5: simplificar `docs/_public` e atualizar o README

**Objetivo:** deixar em `docs/_public` apenas o atalho rápido das páginas de amostra e a explicação de onde vivem os arquivos ativos.

**Arquivos e diretórios:** `docs/_public/README.md`, links simbólicos `docs/_public/capas-v1` e `docs/_public/ebooks`, diretório `docs/_public/capas-v2` e link `docs/_public/amostras-ebooks`.

**Alteração:** atualizar o README para identificar `web/public/images/books/` como diretório de capas do site, `web/public/samples/` como PDFs separados de amostra, `web/public/samples/pages/` como imagens usadas pelo leitor, `ebooks/` como fonte dos PDFs completos e `amostras-ebooks` como atalho visual. Remover o atalho `capas-v1`, o atalho `ebooks` e a pasta `capas-v2` somente após validar cópias e referências. Manter `amostras-ebooks` apontando para `web/public/samples/pages/`. Remover do README as dimensões antigas que não descrevem corretamente os arquivos.

**Critérios de aceite:** os arquivos-fonte permanecem em `ebooks/`; os PDFs públicos continuam restritos às amostras autorizadas; o único atalho em `docs/_public` é `amostras-ebooks`; o README corresponde à árvore final e não aponta para arquivos removidos.

**Verificação:** `find docs/_public -maxdepth 2 -printf '%y %p -> %l\n'`; `readlink docs/_public/amostras-ebooks`; conferir os caminhos listados no README.

**Checkpoint ETAPA-05:** validar a árvore final de `docs/_public`, o README atualizado e a presença dos arquivos-fonte. Registrar a conferência. Esta é a última etapa deste plano.

## 6. Validação final e parada

Concluir a execução local depois de verificar os critérios das etapas 1 a 5. Em cada checkpoint, a pessoa implementadora confere as evidências, corrige os problemas dentro da etapa e só avança quando os critérios passam. Não pedir aprovação manual entre etapas. Se um critério continuar falhando, uma fonte estiver ambígua, houver risco de perda de trabalho, ou surgir um conflito com um checkpoint concluído no roteiro, parar e relatar o bloqueio. A revisão cobre a quantidade e correspondência dos arquivos, dimensões e páginas das amostras, referências dos PDFs completos, catálogo de sete itens e navegação até a amostra. Não fazer deploy nem alterar serviços externos.

Este trabalho incide principalmente sobre catálogo e amostras, relacionados ao CP-04 do [roteiro](../roteiro.md). Antes da execução, verificar o estado atual dos checkpoints e seguir as instruções de `AGENTS.md`: não reabrir nem alterar etapa concluída. Para esta tarefa, o responsável autorizou a validação autônoma dos checkpoints ETAPA-01 a ETAPA-05, sem aprovação manual entre eles. Se o estado do roteiro revelar um bloqueio externo a essa autorização, parar e reportar. O CP-05 não será alterado para implementar entrega do guia.

## 7. Pendências fora deste plano

- Definir e implementar o fluxo real para solicitar o PDF completo por e-mail, incluindo persistência, envio, tratamento de falhas e destino seguro do arquivo.
- Ligar o CTA “Baixar grátis” ao fluxo acima somente quando ele existir e estiver validado.
- Rever futuramente se o guia deve entrar no slider ou nos destaques da home.
- Publicar mudanças somente com autorização específica.

## 8. Custos e riscos residuais

- Depois da remoção de Capas V2 em `docs/_public`, essa pasta deixa de servir como arquivo de versões. Os arquivos finais continuam no diretório de capas usado pelo site.
- As imagens da amostra duplicam a apresentação das páginas do PDF para o leitor atual. Alterar o PDF de amostra depois exige regenerar as cinco imagens correspondentes.
- A etapa de renomear PDFs completos exige atualizar citações e referências locais. Uma referência esquecida pode quebrar documentos ou dificultar localizar a fonte.
- O guia poderá ser conhecido e a amostra poderá ser visualizada antes de existir um botão funcional para obter o material completo.

---

Os fatos desta proposta vêm dos caminhos listados na seção 3 e do diagnóstico relacionado. As etapas e critérios estão prontos para execução, mas ainda não foram aplicados.

## 9. Prompt para executar em uma nova janela

Copie o texto abaixo para a nova janela. Ele contém o contexto, as fontes e as regras para executar todas as etapas em sequência, com validação própria em cada checkpoint e sem esperar aprovação intermediária.

```text
Quero executar por completo o plano [plano-executivo-capas-amostras-catalogo.md](/home/cg/Documentos/01-DEV/PROJETOS/b2b-nutri/docs/analise-diagnostico/plano-executivo-capas-amostras-catalogo.md), nesta mesma cópia local do projeto.

Antes de começar, leia o AGENTS.md da raiz, web/AGENTS.md, docs/roteiro.md, docs/decisoes-implementacao.md, o diagnóstico relacionado e o plano completo. Para qualquer alteração em web/, leia também a documentação local da versão instalada do Next.js, conforme web/AGENTS.md.

Reinspecione o estado atual do Git e os arquivos citados no plano. Preserve todas as alterações preexistentes. Não reverta, não formate em massa, não faça git add, não publique nem faça deploy.

Execute as ETAPAS 1 a 5 em ordem. Em cada etapa, cumpra os critérios de aceite e execute as verificações listadas. Trate os checkpoints como validações internas: compare as evidências com os critérios, corrija falhas dentro do escopo da etapa e avance automaticamente quando todos passarem. Não me peça frases de aprovação e não espere resposta entre etapas. Comunique o progresso de forma breve ao final de cada etapa e continue.

Se uma validação continuar falhando, houver divergência que exija uma decisão nova, risco de perda de trabalho, falta de ferramenta, ou conflito que não possa ser resolvido respeitando os arquivos de instrução, pare e explique o bloqueio. Não avance com validação incompleta nem invente conteúdo ou nomes.

Mantenha o fluxo de captura e entrega do guia por e-mail fora deste trabalho. Não conecte a API de newsletter ao guia e não crie um botão “Baixar grátis” sem destino funcional. Não exponha o PDF completo em web/public. Não altere os slugs das pastas de páginas de amostra. Não apague Capas V1, Capas V2 ou atalhos de PDFs antes de concluir as validações e chegar à ETAPA-05.

Siga docs/roteiro.md sem reabrir nem alterar etapas concluídas. Os checkpoints ETAPA-01 a ETAPA-05 deste plano são validações internas desta tarefa. Não solicite aprovação manual entre elas. Se o roteiro impedir uma mudança por causa de checkpoint concluído ou aberto, pare e relate a restrição. A autorização deste pedido cobre apenas as alterações locais descritas no plano, nunca publicação ou deploy.

Ao terminar, entregue um resumo do que mudou, os caminhos finais, os resultados das verificações, qualquer item não concluído e a confirmação de que não houve publicação ou deploy.
```
