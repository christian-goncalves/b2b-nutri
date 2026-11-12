# B2B Nutris · Atualização de CSS v1.2

Este pacote atualiza **a mesma base do Design System v1.1.1**. Não cria um aplicativo novo nem faz mudanças automáticas na pasta do VS Code.

## Arquivos e o que foi alterado

- `tokens.css`: mantém as **cinco cores oficiais** da marca, acrescenta **amarelo CTA `#F2C14E`**, fundo **zinco `#F4F4F5`**, superfícies semânticas e o degradê de catálogo. Preserva a escala anterior de fontes, espaçamento e bordas, com aliases dos tokens antigos.
- `components.css`: mantém os estilos dos componentes e adiciona a distribuição cromática da home. O botão `.btn--primary` agora é amarelo com texto vinho; **todos os `.btn` usam `text-transform: uppercase`**. Inclui classes de home e responsividade.
- `demonstracao.html`: demonstração da home com slider funcional, seções, newsletter ilustrativa, catálogo, depoimentos e contato. **Não é a versão clonada do Webflow**. Contém fallback inline sincronizado com ambos CSS para funcionar mesmo aberto isoladamente.
- `README.md`: instruções para aplicar esta atualização à pasta existente.

## Tokens de cor

| Função | Token | Valor |
|---|---|---|
| Marca / títulos / rodapé | `--color-brand-primary` | `#641D24` |
| Fundo da abertura / newsletter | `--color-brand-cream` | `#FAF3EA` |
| Rosa oficial | `--color-brand-pink` | `#EABAB7` |
| Coral oficial | `--color-brand-coral` | `#EF7053` |
| Oliva oficial | `--color-brand-olive` | `#82845A` |
| Ação principal | `--color-action-primary` | `#F2C14E` |
| Base zinco | `--color-background-page` | `#F4F4F5` |
| Cards / formulários | `--color-surface` | `#FFFFFF` |
| Degradê catálogo | `--gradient-catalog` | `#FAF3EA → #F0D2D0` |

Os tons dos estados hover, bordas, textos e semânticos também ficam centralizados em `tokens.css`. A cor amarela é usada em CTAs primários, não em elementos decorativos.

## Seções previstas

1. Menu e slider inicial: creme.
2. Livros em destaque: zinco, cards brancos.
3. Sobre a autora: vinho, newsletter em card creme.
4. Livro em breve: zinco e botão `QUERO SER AVISADO` ligado visualmente à newsletter.
5. Todos os livros: degradê creme → rosa, cards brancos.
6. Depoimentos: branco, cards brancos e decoração discreta.
7. Contato: zinco, formulário branco.
8. Rodapé: vinho.

## Responsividade aprovada

- Cards de e-books: **3 colunas acima de 980 px**, **2 de 500 a 980 px**, **1 abaixo de 500 px**.
- Autora/newsletter: duas colunas no desktop, **uma coluna em 720 px ou menos**.

## Como aplicar na pasta que já existe

No projeto local mostrado no VS Code, localize `b2b-nutris-design-system-v1/`. **Faça backup da pasta** e substitua os quatro arquivos pelos arquivos homônimos deste pacote. Não é necessário criar outra pasta de projeto. O HTML usa `href="tokens.css"` e `href="components.css"`.

**Atenção:** a *home clonada do Nase Author*, caso tenha arquivos HTML/CSS diferentes, **não será modificada só por substituir este pacote**. Sem os arquivos da home clonada, só é possível preparar os tokens/classes e a demonstração. Para aplicá-los diretamente à cópia Webflow, será preciso mapear os seletores reais desse código.

## O que ainda NÃO está integrado

- Os formulários não enviam dados. O exemplo exibe avisos de demonstração.
- Os botões de compra ainda não têm links Hotmart. Os cards usam títulos/ilustrações provisórios.
- A foto da autora e os depoimentos reais não foram fornecidos para esta versão.

## Conferência rápida

Abra `demonstracao.html` no navegador. Deve aparecer hero creme, CTA amarelo com texto vinho, seção de autora vinho, newsletter creme, catálogo em degradê e rodapé vinho. O slider deve avançar com setas e pontos. Na guia Rede/Network do DevTools, confirme que `tokens.css` e `components.css` são encontrados quando mantidos lado a lado. A versão local da demo funciona mesmo sem esses arquivos graças ao fallback inline.
