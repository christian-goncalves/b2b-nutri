---
name: b2b-ebook-cover-art
description: Criar e revisar capas fotográficas de e-books B2B Nutris em 1200 × 900 px. Apresentar três opções de distribuição do título original antes da geração e montar duas propostas com o script reutilizável render_covers.py. Usar para capas, não para anúncios, páginas ou redesign da marca.
---

# Capas B2B Nutris

Produzir duas capas separadas em 1200 × 900 px (4:3). A capa do PDF marcado define a cena e o conceito visual; o montador aplica o acabamento gráfico aprovado. Executar o fluxo abaixo sem gerar documentação auxiliar.

## 1. Localizar recursos

- Ler as instruções aplicáveis do projeto e os tokens atuais; conferir inicialmente `web/styles/tokens.css`.
- Usar a logo corrigida em `web/public/images/logo.png`. A assinatura interna é “Soluções para nutricionistas”, em cinza.
- Usar `.agents/skills/b2b-ebook-cover-art/assets/fonts/Inter-Regular.ttf` e `.agents/skills/b2b-ebook-cover-art/assets/fonts/PlayfairDisplay-Regular.ttf`. Conferir as famílias internas dos arquivos e carregar peso Regular pelo Pillow.
- Manter uma única cópia compartilhada das fontes e seus arquivos OFL em `.agents/skills/b2b-ebook-cover-art/assets/fonts/`; reutilizá-la em todos os trabalhos.
- O montador reutilizável fica nesta pasta, em `render_covers.py`. Executá-lo a partir da raiz do projeto com `python3 .agents/skills/b2b-ebook-cover-art/render_covers.py`.
- O script requer Python 3 e Pillow. Se a dependência não estiver disponível, informar isso sem instalar ou substituir o montador.
- Se faltar um recurso essencial, informar exatamente qual falta. Não presumir caminhos, trocar fontes ou reescrever o montador.
- Extrair a capa do PDF marcado e examinar a imagem antes de propor o trabalho. Preservar seus objetos, ambiente e conceito visual. Criar as duas propostas a partir dessa mesma cena; variar enquadramento, luz e contraste sem trocar elementos.
- Não inventar uma cena com base apenas no assunto do livro. Não acrescentar pessoas, alimentos, dispositivos ou outros objetos que não apareçam na capa extraída, salvo solicitação explícita.
- Identificar o `slug` do e-book. Consultar o registro correspondente em `web/data/home-books.ts` e obter a coleção exclusivamente de `HomeBook.coverCollection`. Se o vínculo por slug ou o campo estiver ausente, pedir essa informação antes de montar.
- Consultar `references/layout-aprovado.png` como referência de posicionamento da logo e dos textos, hierarquia tipográfica, cores e espaçamentos. A cena e os elementos visuais devem partir do PDF de cada e-book; não copiar o cenário da referência.

## 2. Aprovar a distribuição do título antes de gerar

- Copiar o título exatamente como aparece no PDF, preservando todas as palavras, a ordem e a grafia.
- Apresentar três opções de distribuição do mesmo título. Variar somente as quebras de linha, os tamanhos e as cores; indicar a linha de maior tamanho em cada opção.
- Priorizar duas linhas, com diferença clara de tamanho. Usar três somente quando necessário para manter todas as palavras e a legibilidade. Preservar expressões completas nas quebras.
- Aguardar a escolha do usuário antes de gerar. Não substituir, retirar ou acrescentar palavras.
- Usar o mesmo título escolhido nas duas capas. O script recebe cada linha por `--line` e o número da linha maior por `--emphasis` (contagem começa em 1).

## 3. Gerar somente a fotografia

- Produzir duas variações da cena examinada, com o mesmo nível de qualidade. Usar a ferramenta de imagens disponível; informar se ela estiver indisponível.
- Enviar a capa extraída como imagem de entrada à ferramenta de edição nas duas propostas. Não substituir essa entrada por uma descrição textual da cena. Se a ferramenta não aceitar edição com imagem de entrada, informar a limitação antes de prosseguir.
- Não gerar texto, logo, letras, marcas-d’água ou traços dentro da fotografia. Remover os elementos gráficos antigos e aplicar os atuais depois com o montador.
- Partir da capa extraída, preservando sua cena e seus elementos. Variar o enquadramento, a luz e o contraste entre as duas propostas; manter fotografia realista e formato 4:3.
- Reservar áreas sem objetos para a identificação superior, título à esquerda e coleção no rodapé esquerdo. Concentrar os objetos onde não prejudiquem a leitura.
- Manter os mesmos elementos reconhecíveis nas duas propostas; não inserir objetos ausentes da capa de origem.
- Evitar ilustração, aquarela, clipart, aparência infantil, plástica ou retrô, excesso de folhas, fundo rosado/escuro e objetos recortados ou flutuantes.
- Não esticar a fotografia nem completar o formato com faixas vazias. Gerar/adaptar o enquadramento antes da montagem; recorte central exige avaliação e autorização específica.

## 4. Montar com o script existente

Executar o mesmo `.agents/skills/b2b-ebook-cover-art/render_covers.py` para os diferentes títulos. Repetir `--photo` para cada fotografia e `--line` para cada linha do título aprovado. Não criar um script por capa, SVGs intermediários ou outro sistema de montagem.

Passar exatamente duas fotografias por `--photo`, os caminhos reais a `--logo`, `--body-font`, `--title-font` e `--output-dir`, e a coleção do `HomeBook.coverCollection` por `--collection`. Passar as linhas aprovadas por `--line` e o destaque por `--emphasis`.

O montador já define:
- Saída PNG sRGB, 1200 × 900 px, com renderização em escala maior e redução final.
- Logo no alto à esquerda e assinatura externa exata “Soluções para nutricionistas”.
- Título em Playfair Display Regular; assinatura e subtítulo em Inter Regular.
- Linha de destaque aproximadamente 1,55 vez maior, com ajuste conjunto para caber e manter leitura.
- Rodapé esquerdo com “COLEÇÃO” em Inter e o nome em Playfair Display, maior, ambos em #665659, com margens esquerda e inferior de 48 px.
- Vinho #641D24 e coral #EF7053. Usar `--emphasis-color coral` por padrão; `wine` inverte a distribuição das duas cores no título.
- Subtítulo fixo e exato “Fundamentos e aplicação clínica”.
- Dois traços finos em oliva #82845A, com opacidade inicial de 75% e desaparecimento gradual à direita: abaixo da assinatura e entre título e subtítulo.

Não incluir volume, edição, chamadas ou outros textos além dos especificados. Não recolorir ou regenerar a logo.

Se o script rejeitar um título por falta de espaço, ajustar as quebras e os tamanhos preservando todas as palavras, a ordem e a grafia. Se a distribuição aprovada precisar mudar, apresentar a alternativa e aguardar aprovação. Não encurtar ou reescrever o título, eliminar a diferença de tamanho ou reduzir tudo até ficar ilegível.

Usar a fotografia já em 4:3. Não passar `--allow-crop`, `--overwrite` ou `--preview` automaticamente. Resolver conflitos de saída escolhendo uma pasta nova; usar essas opções somente quando a ação correspondente estiver autorizada.

## 5. Conferir e entregar sem excesso de arquivos

- Inspecionar cada capa em tamanho integral e reduzido. Conferir título aprovado, acentos, fontes, hierarquia, margens, respiro dos traços, legibilidade, realismo e ausência de objetos atrás dos textos.
- Confirmar dimensões 1200 × 900. Corrigir erros de montagem sem regenerar a fotografia. Se o defeito for fotográfico, corrigir somente a cena necessária.
- Salvar permanentemente apenas `proposta-01.png` e `proposta-02.png`. Não produzir previews por padrão; quando solicitados, usar `--preview`.
- Manter fotografias intermediárias e outros temporários em diretório temporário do sistema durante a execução; limpar após validar as saídas. Não apagar arquivos fornecidos pelo usuário ou existentes no projeto.
- Não criar pastas `assets`/`fonts` por trabalho, cópias de imagens, README, relatórios, manifests, registros de prompts ou arquivos de montagem permanentes. Reutilizar as fontes permanentes da skill e o montador compartilhado.
- Não modificar o site nem substituir capas publicadas sem solicitação. Entregar as duas imagens com uma descrição breve das diferenças, sem relatório técnico de execução.

## 6. Comando de uso

Use a skill b2b-ebook-cover-art para criar duas propostas de capa para o e-book marcado. Extraia e examine a capa do PDF. Apresente três opções de distribuição do mesmo título, priorizando duas linhas e preservando exatamente suas palavras, e aguarde minha escolha. Use a capa extraída como imagem de entrada para editar enquadramento, luz e contraste da mesma cena, com o layout aprovado como referência de acabamento e a coleção cadastrada no e-book. Salve apenas as duas capas finais, sem substituir arquivos existentes.