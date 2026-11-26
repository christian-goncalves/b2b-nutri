# Diagnóstico da narrativa de problema, transição e solução na home

## Objeto da investigação

Verificar se a leitura da sequência narrativa da página da Ser Bene corresponde ao que está estruturado para a home da B2B Nutris e se uma skill local já orienta essa sequência.

## Contexto e decisões registradas

O roteiro enxuto registra CP-HOME-01 e CP-HOME-02 como aprovados. Os itens seguintes, CP-HOME-03 — Problema — e CP-HOME-04 — Benefícios — aguardam debate. A análise compara a página pública atual da Ser Bene com o briefing comercial local, sem avaliar quais e-books específicos deveriam ser usados nem aprovar novos textos.

## Evidências examinadas

- Página pública [Ser Bene](https://serbene.com/), aberta e inspecionada com Playwright em 24/11/2026. A página carregou o título “Ser Bene: app de cuidado emocional com encontros ao vivo”. O DOM renderizado foi conferido por seus títulos, textos próximos e seções correspondentes.
- `.agents/skills/landing-page-design/SKILL.md:46-73`: ordem aprovada da home, definição de Problema e Benefícios e redação comercial aprovada.
- `docs/refatoracao/plano-refatoracao-home.md:53-67`: ordem das seções 3 a 5, redação aprovada de problema e benefícios e instrução de manter a redação aprovada salvo ajuste autorizado.
- `roteiro-enxuto-home.md:13-24`: CP-HOME-03 Problema e CP-HOME-04 Benefícios aparecem em sequência e aguardam debate.
- `web/app/page.tsx:107-132`: conteúdo e estrutura atuais dessas duas seções na aplicação local.
- Inventário de `.agents/skills/`: `landing-page-design` é a skill voltada à experiência comercial da home. As demais skills encontradas tratam de artigos, capas, publicação, design visual geral, imagem e SEO; não foi encontrada outra com um roteiro específico de narrativa problema–transição–solução.
- Relato pessoal de Bianca compartilhado em “Texto colado.txt”: descreve dores e sentimentos percebidos por ela; é uma fonte individual, não uma pesquisa representativa de nutricionistas.
- Inventário local de `web/data/home-books.ts`, `web/data/library/articles.ts`, `web/data/library/categories.ts` e páginas de materiais: confirma e-books, artigos, questionários, mapas e fichas de referência no checkout local. Não prova paridade com produção.

Após revisar a comparação macro com a Ser Bene, o usuário confirmou esta leitura: o bloco de problema combina texto e uma imagem/elemento visual que o ilustra; a frase de recontextualização fecha o problema; a apresentação da solução começa no bloco seguinte. Para a B2B Nutris, essa decisão mantém a transição no fechamento de CP-HOME-03, seguida por CP-HOME-04 — Benefícios — e CP-HOME-05 — E-books. Isso registra a arquitetura narrativa, sem aprovar texto novo, visual específico ou implementação.

Com base no relato pessoal da nutricionista Bianca, compartilhado em “Texto colado.txt”, o usuário confirmou como eixo de CP-HOME-03 a informação dispersa, difícil de encontrar e lembrar, que pode acabar pouco aplicada. Também confirmou uma solução central apresentada por três frentes — encontrar e organizar; consultar e lembrar; levar à prática —, com foco na oferta existente. Comunidade, minicursos, conversas com especialistas e parcerias ficam como visão futura, sem serem apresentadas como recursos disponíveis.

O usuário aprovou a direção do rascunho de CP-HOME-03: manter o título já aprovado, acrescentar descrição, quatro bullets e uma ponte final, com o padrão tipográfico de duas cores e itálico na segunda parte do título. A direção visual é uma pergunta clínica cercada por fragmentos de informação. A imagem final e os fragmentos exatos ainda não foram selecionados.

## Estado observado

Na página da Ser Bene, o bloco iniciado por “Talvez você se reconheça” descreve uma lista de cuidados em que a própria pessoa fica por último e apresenta exemplos de desgaste. O mesmo bloco termina com uma frase que retira a culpa e posiciona a Ser Bene como lugar de cuidado. No DOM, o texto de transição pertence à seção de problema; não aparece como seção autônoma.

A seção seguinte, identificada por “Simples de usar”, apresenta a promessa de facilidade e demonstra os controles e telas do aplicativo. A página continua explicando funcionalidades em seções próprias, como encontros ao vivo, cursos e ferramentas de autocuidado.

Na B2B Nutris, a skill e o plano local definem a sequência Problema → Benefícios → E-books em destaque. O problema aprovado é a perda de tempo procurando informações. Os benefícios aprovados cobrem encontrar materiais com mais facilidade, levar conhecimento à prática e construir uma biblioteca de referência.

O relato pessoal acrescenta dificuldade de recordar conteúdos estudados, aplicar estratégias, avaliar compras e cursos e encontrar orientação de outras profissionais. Bianca associa essas dores a sobrecarga mental, frustração, insegurança, cansaço, indecisão, arrependimento financeiro e sensação de andar em círculos; gostaria que a B2B despertasse alívio, clareza, confiança, praticidade, autonomia e pertencimento. Esses sentimentos documentam a experiência e a intenção da autora do relato, não afirmações validadas sobre todo o público.

O inventário local permite demonstrar três frentes com recursos existentes: encontrar e organizar por meio do catálogo e da biblioteca de artigos; consultar e lembrar por meio de guias visuais e fichas; levar à prática por meio de questionários e mapas de consulta. Minicursos, encontros com especialistas, comunidade e parcerias não foram encontrados como ofertas implementadas no site local. O inventário não confirma a situação em produção.

O código local já contém as seções de Problema e Benefícios. A seção de problema mostra o título aprovado sobre perder tempo procurando informações; a de benefícios contém os três benefícios aprovados. Entre elas não há atualmente um parágrafo de transição. Os e-books aparecem na seção seguinte da home.

## Análise

A interpretação do usuário sobre a arquitetura narrativa da Ser Bene é sustentada pelo conteúdo e pela estrutura renderizados: problema concreto, ilustração visual do problema, recontextualização empática no fechamento desse bloco e, a partir da seção seguinte, demonstração da solução e de suas formas de uso. A nuance é que a transição não é um bloco ou seção separado no exemplo atual; ela encerra o bloco de problema. O usuário confirmou usar essa organização macro para orientar a B2B Nutris.

A estrutura já aprovada para a B2B Nutris acompanha essa ordem: problema, benefícios e depois seleção de e-books. A decisão confirmada mantém texto e ilustração dentro da apresentação do problema, encerra esse bloco com a transição empática e inicia a resposta em Benefícios; os e-books vêm como demonstração concreta posterior. Para a resposta, foram acordadas três frentes: encontrar e organizar; consultar e lembrar; levar à prática. Elas têm suporte no catálogo local. Isso não escolhe a imagem, títulos ou trechos específicos, nem autoriza apresentar a visão de comunidade como recurso atual.

O paralelo emocional tem limites: a Ser Bene fala de autocuidado e desgaste emocional; a B2B Nutris trata de pesquisa e informação profissional dispersas. As fontes locais sustentam perda de tempo, facilidade de encontrar informação, aplicação prática e organização em biblioteca. Elas não documentam, neste escopo, outras emoções, efeitos sobre a qualidade clínica ou consequências para pacientes. Transferir esses efeitos para a narrativa da B2B seria uma inferência sem comprovação examinada.

## Hipóteses avaliadas

- **A Ser Bene segue problema → transição → apresentação da solução:** sustentada pelo conteúdo renderizado. A transição fecha a seção de problema; a solução é apresentada nas seções subsequentes.
- **A transição da Ser Bene é uma seção independente:** descartada pelo DOM renderizado, que a mantém dentro da seção de problema.
- **A estrutura de problema e benefícios já está prevista para a B2B Nutris:** sustentada pela skill, pelo plano detalhado e pelo roteiro enxuto.
- **A B2B Nutris deve reproduzir a mesma intensidade emocional ou os mesmos temas de sofrimento da Ser Bene:** não sustentada pelas fontes examinadas. Os produtos, público e problema descritos são diferentes.
- **Os materiais disponíveis podem sustentar três demonstrações distintas:** sustentada pelo inventário do checkout local, que encontrou catálogo e biblioteca, guias e fichas de referência, questionários e mapas. A escolha de títulos, trechos e imagens ainda não foi feita.
- **Comunidade, minicursos e conversas com especialistas são ofertas atuais:** não sustentada pelo inventário do site local; aparecem como visão futura no relato pessoal.

## Diagnóstico

Sim. A leitura aprovada é: CP-HOME-03 apresenta o problema com texto e um recurso visual de apoio, e termina com a transição; CP-HOME-04 inicia a apresentação da solução por meio dos benefícios; CP-HOME-05 demonstra os materiais com e-books. A solução será mostrada por três frentes — encontrar e organizar, consultar e lembrar, levar à prática —, apoiadas na oferta local existente. Comunidade, minicursos e parcerias permanecem como visão futura. O rascunho de problema foi aceito como direção para revisão; imagem final, telas específicas e redação final das demonstrações da solução seguem pendentes.

## Grau de certeza

Alto quanto à estrutura observada na página atual da Ser Bene e à sequência aprovada nos arquivos locais. Médio quanto à correspondência conceitual para a B2B Nutris: a ordem narrativa e os recursos locais são compatíveis. Os sentimentos foram informados por uma nutricionista em relato pessoal e não validam a reação do público em geral.

## Pontos ainda não comprovados

- Quais fragmentos reais de informação aparecerão na imagem do problema e qual será sua composição final.
- Quais títulos, páginas ou trechos específicos demonstrarão cada uma das três frentes; os exemplos exatos não foram escolhidos.
- Qual será a redação final da transição; a posição foi definida como fechamento do CP-HOME-03, mas não foi redigido texto novo.
- Se a versão e os conteúdos locais correspondem integralmente ao que está publicado em produção.
