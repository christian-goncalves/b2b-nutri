# Uso dos PDFs na criação editorial

## Objeto da investigação

Identificar quais PDFs atualmente em `ebooks/` têm vínculo comprovável com os três artigos de `editorial/artigos-criados/`, examinar o grau de inferência previsto pela skill `b2b-artigos` e determinar se o mesmo PDF pode sustentar artigos em execuções diferentes.

## Contexto

A investigação considera “uso confirmado” quando o artigo cita diretamente o PDF e as páginas utilizadas, corroboradas pelo conteúdo dessas páginas. Sem esse vínculo, semelhança temática é registrada apenas como possível relação. O histórico local foi consultado, mas PDFs ignorados pelo Git não permitem reconstituir versões ou usos anteriores.

## Evidências examinadas

- `.agents/skills/b2b-artigos/SKILL.md:8-17, 19-30, 32-54`: a skill exige um artigo por execução; usa o tema informado ou escolhe um recorte específico sustentado pelo material; pede referência ao PDF e às páginas; admite fontes científicas externas quando solicitadas ou necessárias; determina destino em uma pasta de categoria e exclui `editorial/artigos-criados/`.
- `editorial/artigos-criados/2026-11-18-vitamina-b1-sinais-de-deficiencia-e-como-investigar-fatores-de-risco-nutricional.md:9-11, 21-23, 32-36`: conteúdo e referências do artigo sobre tiamina.
- `editorial/artigos-criados/2026-11-19-como-transformar-a-queixa-alimentar-do-paciente-em-perguntas-de-investigacao-clinica.md:5-9, 37-51`: conteúdo e referência do artigo sobre investigação de queixas alimentares.
- `editorial/artigos-criados/2026-11-19-creatina-quando-considerar-a-suplementacao-e-quais-cuidados-avaliar-na-pratica-nutricional.md:9-17, 21-29, 35-40`: conteúdo e referências do artigo sobre creatina.
- Os sete PDFs de `ebooks/`, examinados com `pdfinfo` e extração de texto: `00 - Antes da consulta - B2Bnutris.pdf` (15 páginas), `01 - Por trás do comportamento alimentar.pdf` (11), `02 - O olhar comportamental na consulta nutricional.pdf` (11), `03 - Da Escuta  Conduta B2B.pdf` (12), `04 - Guia visual das vitaminas B2B.pdf` (31), `05 - MineraisB2Bnutris.pdf` (48) e `06 - SuplementaoB2Bnutris.pdf` (37).
- Páginas 3-4 de `ebooks/04 - Guia visual das vitaminas B2B.pdf`, que contêm a ficha e a aplicação clínica da vitamina B1, inclusive tiamina, medicamentos e avaliação.
- Páginas 4-10 de `ebooks/02 - O olhar comportamental na consulta nutricional.pdf`, que contêm perguntas para transformar relatos, investigação de contexto e um caso clínico fictício.
- Páginas 3-4 de `ebooks/06 - SuplementaoB2Bnutris.pdf`, que contêm a seção de creatina, estratégias de uso, avaliação, monitoramento e cautelas.
- `editorial/comportamento-alimentar/00 - Antes da consulta - B2Bnutris.pdf` e `ebooks/00 - Antes da consulta - B2Bnutris.pdf`: os dois arquivos têm o mesmo SHA-256, portanto são cópias idênticas.
- `.gitignore:26-34` ignora PDFs, incluindo os PDFs de `ebooks/`. `git status` e `git log --all` mostram dois artigos rastreados no histórico local e o artigo de creatina como arquivo não rastreado no estado examinado. O histórico não contém versões dos PDFs.
- `web/data/home-books.ts:9-31, 32-53, 54-73, 75-95, 97-115, 117-130` cadastra seis e-books publicados no catálogo local; o PDF `00 - Antes da consulta` não é um dos seis registros desse catálogo. Esse cadastro foi usado somente para distinguir catálogo de arquivos-fonte.
- `web/data/library/articles.ts:3-5, 8-12, 43-45, 62-68` importa os três arquivos para o registro local de artigos aprovados.
- `docs/analise-diagnostico/artigo-cadastrado-na-biblioteca.md` registra um estado anterior da biblioteca. Ele não corresponde ao estado atual de `web/data/library/articles.ts`, que importa os três artigos no checkout examinado.

## Estado observado

Os três artigos têm referências diretas a três PDFs diferentes:

| Artigo encontrado em `editorial/artigos-criados/` | PDF citado no artigo | Correspondência no PDF | Classificação |
|---|---|---|---|
| Vitamina B1 e fatores de risco | `04 - Guia visual das vitaminas B2B.pdf`, páginas 3-4 | As páginas contêm a ficha de tiamina e informações clínicas usadas no texto. | Uso confirmado |
| Queixa alimentar e perguntas clínicas | `02 - O olhar comportamental na consulta nutricional.pdf`, páginas 4-10 | As páginas contêm os relatos, perguntas e caso fictício usados no artigo. | Uso confirmado |
| Creatina e cuidados na prática nutricional | `06 - SuplementaoB2Bnutris.pdf`, páginas 3-4 | As páginas contêm a seção de creatina, doses descritas e cautelas citadas. | Uso confirmado |

Quatro PDFs não têm artigo correspondente entre os três arquivos examinados:

| PDF em `ebooks/` | Estado da evidência |
|---|---|
| `00 - Antes da consulta - B2Bnutris.pdf` | Nenhum dos três artigos o cita. Há cópia idêntica em `editorial/comportamento-alimentar/`, mas ela também não aparece como fonte citada. |
| `01 - Por trás do comportamento alimentar.pdf` | Nenhum artigo o cita. Há possível proximidade temática com o artigo de queixas, mas a referência explícita desse artigo aponta para o volume 01, arquivo `02`. |
| `03 - Da Escuta  Conduta B2B.pdf` | Nenhum artigo o cita. Seu tema de raciocínio clínico pode se relacionar ao artigo de queixas, mas não há evidência de que tenha sido usado. |
| `05 - MineraisB2Bnutris.pdf` | Nenhum artigo o cita. O PDF contém várias fichas e tópicos minerais, mas não há artigo sobre minerais no conjunto de três arquivos. |

Assim, a conclusão sobre os arquivos atuais é: três dos sete PDFs têm uso confirmado nos três artigos; quatro não têm artigo correspondente encontrado. “Não encontrado” descreve este conjunto local, não prova que esses PDFs nunca tenham sido usados fora dele.

Os três artigos estão atualmente em `editorial/artigos-criados/`. A skill examinada determina que artigos sejam salvos em uma das pastas de categoria e declara `editorial/artigos-criados/` como destino não permitido. Portanto, a localização atual dos arquivos não corresponde à regra de saída escrita na versão local da skill. Separadamente, o registro de `web/data/library/articles.ts` importa os três e os identifica como aprovados no código local.

## Análise

As referências dos artigos identificam título e páginas, e a extração dessas páginas confirma correspondências de conteúdo. Isso sustenta o uso dos PDFs 04, 02 e 06 como fontes dos três artigos. Os outros PDFs permanecem sem vínculo direto observável. Sobreposição temática com comportamento alimentar ou consulta clínica não basta para classificá-los como usados.

A skill não descreve um procedimento determinístico de extração nem fixa um tema obrigatório. Ela delega ao modelo uma escolha editorial explícita quando o usuário não fornece tema: selecionar um recorte específico sustentado pelo PDF. Também pede síntese original, organização em artigo e, em certas condições, consulta a fontes científicas externas. Logo, o fluxo permite interpretação e seleção editorial apoiadas pelo material, com possibilidade de conteúdo externo identificado. A instrução de não afirmar o que o PDF não sustenta limita essa liberdade, mas não elimina inferência na escolha do recorte, no enquadramento e na síntese.

O grau de inferência não pode ser quantificado como percentual a partir da skill ou dos três artigos. Não há regra que marque cada frase como extração, paráfrase, inferência ou informação externa, nem foi feito um ensaio repetido com prompts idênticos para medir variação. As referências permitem identificar algumas fontes, mas não medir toda a transformação editorial.

A reutilização de um PDF em chamadas diferentes é compatível com a instrução atual. A regra é um artigo por execução, e não um artigo por PDF. A mesma instrução não pede vários artigos numa única execução, não mantém um inventário de recortes já usados e não determina deduplicação entre artigos. Se o tema for omitido, a skill escolhe um recorte, mas não há garantia documentada de que uma execução posterior escolha outro.

## Hipóteses avaliadas

- **Os quatro PDFs sem correspondência foram usados por causa de semelhança temática:** não confirmado. As referências dos artigos identificam outros arquivos; semelhança não demonstra proveniência.
- **A skill é determinística porque recebe um PDF:** enfraquecida pela regra que permite escolher o recorte quando não há tema e pela ausência de algoritmo fixo, registro de seleção ou medição de repetibilidade.
- **A skill pode produzir vários artigos em uma única execução:** descartada pela regra explícita de um artigo por execução.
- **A skill pode reutilizar o mesmo PDF em execuções distintas:** sustentada pela ausência de exclusividade por PDF e pela regra de um artigo por execução. A produção de temas diferentes não é garantida.

## Diagnóstico

Os arquivos com uso confirmado são `04 - Guia visual das vitaminas B2B.pdf`, `02 - O olhar comportamental na consulta nutricional.pdf` e `06 - SuplementaoB2Bnutris.pdf`. Os PDFs `00 - Antes da consulta - B2Bnutris.pdf`, `01 - Por trás do comportamento alimentar.pdf`, `03 - Da Escuta  Conduta B2B.pdf` e `05 - MineraisB2Bnutris.pdf` não têm artigo correspondente encontrado entre os três examinados. Os PDFs 01 e 03 têm relação temática possível com o artigo de queixas, sem evidência de uso.

A skill não é determinística no sentido de produzir sempre o mesmo recorte e texto a partir de um PDF: ela permite que o modelo escolha o tema ausente e pede produção editorial original. A fonte e suas páginas são rastreáveis nas referências dos três artigos, mas a skill não quantifica nem registra cada inferência. O mesmo PDF pode sustentar artigos em execuções diferentes; a regra atual produz um artigo por execução e não garante que chamadas autônomas escolham temas distintos.

## Grau de certeza

Alto para os vínculos dos três artigos com os PDFs citados, pois as referências e o conteúdo das páginas coincidem. Alto para o comportamento prescrito na versão local da skill. Médio para a afirmação sobre a inexistência de usos anteriores, pois os PDFs estão fora do histórico Git e só foi possível examinar os arquivos presentes e o histórico textual local. Não foi medido o grau de variação de execuções reais.

## Pontos ainda não comprovados

- Não foi possível determinar se os quatro PDFs sem artigo correspondente foram usados em artigos que não estão neste checkout ou em versões anteriores não rastreadas.
- Não foi comparada a saída de execuções repetidas com a mesma instrução, PDF e configuração do modelo.
- Não é possível atribuir um percentual de inferência aos artigos sem rastreamento frase a frase e fontes de cada afirmação.
