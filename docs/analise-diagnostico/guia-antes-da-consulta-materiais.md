# Diagnóstico dos materiais de Antes da Consulta

## Objeto da investigação

Identificar o estado do PDF “Antes da Consulta”, da amostra pública, da capa cadastrada e do artigo editorial relacionado, para esclarecer como o material aparece hoje no projeto.

## Contexto

O PDF indicado existe em `ebooks/00 - Antes da Consulta.pdf`. O caminho `docs/ebooks` não está presente nesta cópia local.

A investigação diferencia o PDF-fonte, a amostra pública, a imagem de capa, o cadastro de e-books e o artigo publicado. Não avalia disponibilidade em produção.

O responsável esclareceu que quer incluir o guia como o sétimo material do catálogo, com amostra de cinco páginas e obtenção do PDF completo mediante e-mail. A amostra deve usar a capa V2 como página 1 e as páginas 2 a 5 do PDF-fonte como páginas internas, sem alterar a proporção de cada página. O fluxo de captura e entrega por e-mail foi explicitamente confirmado como pendente.

O responsável confirmou a ordem da coleção Mente Clínica: “O Olhar Comportamental na Consulta Nutricional” é o Volume 01 e “Por trás do comportamento alimentar” é o Volume 02. As pastas V2 atuais registram esses volumes nos nomes `01-o-olhar-comportamental-na-consulta-nutricional-vol1` e `02-por-tras-do-comportamento-alimentar-v2`.

## Evidências examinadas

- `ebooks/00 - Antes da Consulta.pdf`: 15 páginas, página de 1440 × 810 pontos. A capa visível apresenta “ANTES DA CONSULTA” e identifica o material como gratuito para nutricionistas. O metadado interno do PDF diz “Cópia de Da Escuta à Conduta”.
- `web/data/home-books.ts:1-144`: seis registros de e-book. Nenhum tem o título ou slug de “Antes da Consulta”.
- `web/types/home-book.ts:3-20`: `coverCollection` é um campo distinto de `category` e aceita “Prática Clínica”.
- `web/app/ebooks/page.tsx:1-23` e `web/data/home-books.ts:146-157`: o catálogo recebe os registros com `published: true`; as categorias são derivadas desses registros.
- `web/app/ebooks/[slug]/page.tsx:91-100`: a página do produto mostra compra Hotmart quando existe URL; sem URL, mostra uma mensagem de link de compra pendente. A amostra aparece quando `getAuthorizedSamplePath` retorna um caminho.
- `web/lib/sample-pdf.ts:5-14`: a amostra só aparece quando o PDF separado está autorizado, presente em `web/public/samples` e acompanhado pelas cinco páginas renderizadas.
- `web/components/home-hero-interaction.tsx:30-33,42-76`: o botão “Quero receber meu e-book” abre o modal da home e monta `GuideCaptureForm`; o próprio modal informa que a prévia não envia nem registra a solicitação.
- `web/components/guide-capture-form.tsx:12-39,53-88`: o formulário do modal valida o formato do e-mail no navegador e mostra estado de prévia; não chama uma API nem envia ou registra dados.
- `web/app/api/newsletter/route.ts:1-3`, `web/lib/forms/handler.ts:76-120` e `web/components/local-test-forms.tsx:51-88`: há um fluxo distinto de inscrição de newsletter que chama `/api/newsletter`, persiste o cadastro e tenta enviar uma mensagem de boas-vindas. A chamada e o contrato desse fluxo não são usados pelo `GuideCaptureForm`.
- `web/data/home-books.ts:148-155` e `web/app/page.tsx:56-70`: a seleção de e-books na home usa uma lista fixa de slugs, separada da listagem do catálogo.
- `web/data/home-books.ts:57-74`: “Da Escuta à Conduta” tem `category: "Raciocínio clínico"` e `coverCollection: "Prática Clínica"`.
- `web/data/library/categories.ts:1-45`: a biblioteca editorial tem a categoria “Prática clínica”, cujo texto inclui escuta, raciocínio clínico e condutas.
- `web/data/library/articles.ts:203-227`: o artigo de pré-atendimento está aprovado localmente, pertence a `pratica-clinica` e aponta “Da Escuta à Conduta” como produto principal. O PDF “Antes da Consulta” aparece como referência científica.
- `editorial/publicados/pratica-clinica/2026-11-19-como-usar-respostas-de-pre-atendimento-para-preparar-a-consulta-nutricional.md`: contém o artigo sobre respostas de pré-atendimento. A pasta `editorial/pendentes/pratica-clinica/` não contém arquivos.
- `web/public/images/books/`: há seis capas, correspondentes aos seis registros de `home-books.ts`; não há uma imagem de “Antes da Consulta”. As capas existentes têm dimensões entre 1200 × 675 e 1200 × 849 px.
- `docs/_public/capas-v2/`: há sete arquivos de capa, numerados de 00 a 06. As duas pastas da coleção Mente Clínica correspondem aos volumes confirmados pelo responsável. A capa do guia está em `00-antes-da-consulta/Capa editorial Antes da Consulta.png`.
- `web/public/samples/`: há seis PDFs, todos com cinco páginas; nenhum arquivo corresponde a “Antes da Consulta”.
- `amostras-revisao/`: há seis PDFs de cinco páginas, com os mesmos nomes, tamanhos e hashes dos arquivos em `web/public/samples/`; nenhum corresponde a “Antes da Consulta”.
- `docs/decisoes-implementacao.md:35-37,63-72,90`: a decisão posterior registra aprovação visual de seis amostras de cinco páginas. A seção de estado conhecido ainda diz que os arquivos de amostra precisam ser preparados e revisados.

## Estado observado

O projeto contém o PDF-fonte completo de “Antes da Consulta”, com 15 páginas. O caminho em `docs/ebooks` não contém uma cópia ou versão reduzida; ele aponta para o arquivo em `ebooks`.

O catálogo local contém seis e-books, seis capas e seis amostras de cinco páginas. As cópias de revisão têm os mesmos seis arquivos. “Antes da Consulta” não aparece nesses registros nem nos diretórios de capas e amostras inspecionados.

O artigo sobre pré-atendimento está integrado à biblioteca editorial local em “Prática clínica”. Ele cita o PDF-fonte, mas seu produto principal está registrado como “Da Escuta à Conduta”.

O modelo diferencia a categoria do e-book de sua coleção de capa. “Prática Clínica” existe nos dois contextos relevantes: como `coverCollection` de “Da Escuta à Conduta” e como categoria da biblioteca editorial.

O modelo atual não contém campos para marcar um e-book como gratuito nem para solicitar o PDF completo por e-mail. A página de produto assume compra Hotmart quando `hotmartUrl` existe e exibe uma mensagem de link pendente quando não existe. O formulário mostrado no modal da home valida o endereço localmente, mas não o transmite. Embora exista uma API para newsletter, o código inspecionado não a conecta ao modal nem a identifica como mecanismo de entrega do guia; o responsável confirmou que esse fluxo específico ainda não existe e permanece pendente.

## Análise

A ausência da coleção no cadastro apontada anteriormente decorre de “Antes da Consulta” não ter registro em `home-books.ts`. O artigo publicado não cria esse registro, pois pertence à biblioteca editorial e mantém uma relação separada com o produto principal.

A ideia de classificar o guia em “Prática Clínica” é coerente com o conteúdo observado e com a categoria editorial já usada pelo artigo de pré-atendimento. Como coleção de capa, “Prática Clínica” também é um valor existente e já usado por um e-book relacionado ao raciocínio clínico. Essa adequação é uma inferência de classificação, não um cadastro atual do guia.

A existência de seis amostras públicas pode explicar a impressão de que a amostra está no projeto. Os arquivos encontrados pertencem aos seis e-books cadastrados; nenhum corresponde ao PDF de “Antes da Consulta”. A pasta Capas V2 já contém sua capa final, mas isso não cria a amostra PDF nem as cinco imagens que o leitor exige.

A amostra visual e a obtenção do material completo são fluxos distintos no código atual. A amostra exige um PDF separado de cinco páginas e imagens de página próprias. O botão da home abre um modal de prévia que não submete dados. A API de newsletter é um fluxo separado e não realiza a entrega do PDF. Conforme esclarecimento do responsável, a captura e a entrega por e-mail do guia ainda não existem e ficam pendentes.

## Hipóteses avaliadas

- **Amostra de “Antes da Consulta” já existe em `web/public/samples/`:** não sustentada pela listagem e pela inspeção dos seis PDFs presentes.
- **A API de newsletter é o fluxo existente de entrega do guia:** descartada pelo código e pelo esclarecimento do responsável; o cadastro do guia por e-mail permanece pendente.
- **O artigo publicado substitui o cadastro do e-book ou sua capa:** descartada pelo modelo de dados, que separa registros da biblioteca e registros `HomeBook`.
- **“Prática Clínica” é uma classificação possível para o guia:** sustentada como inferência pelo conteúdo do PDF, pela definição da categoria editorial e pelo uso existente no campo de coleção de capa.
- **O metadado “Cópia de Da Escuta à Conduta” identifica o conteúdo real do PDF:** enfraquecida pela capa visível e pelo texto extraído, que identificam “Antes da Consulta”. A origem do metadado não foi determinada.

## Diagnóstico

O PDF completo e a capa V2 de “Antes da Consulta” existem, assim como um artigo publicado localmente que o referencia. O projeto ainda não contém a amostra pública nem um registro `HomeBook` para o guia. O modal de captura da home é apenas uma prévia local; a API real de newsletter é separada e não é chamada por esse modal nem entrega o PDF. Portanto, o fluxo de captura e entrega do guia por e-mail permanece pendente. O responsável confirmou que o guia deve aparecer no catálogo e que sua amostra deve conter a capa V2 e as páginas 2 a 5 do PDF-fonte.

## Grau de certeza

Alto para a presença e a ausência dos arquivos e registros descritos: foram inspecionados o PDF, os diretórios, o cadastro do catálogo, as categorias e a entrada editorial. Médio para a adequação semântica de “Prática Clínica”, que é uma inferência de classificação.

## Pontos ainda não comprovados

- O fluxo de captura e entrega por e-mail ainda não foi implementado; sua definição e implementação permanecem pendentes.
- Se os arquivos e registros locais correspondem ao conteúdo atualmente publicado em produção.
