export type LibraryCategorySlug =
  | "comportamento-alimentar"
  | "micronutrientes"
  | "suplementacao"
  | "pratica-clinica";

export type LibraryCategory = {
  slug: LibraryCategorySlug;
  title: string;
  description: string;
  relatedProductSlugs: string[];
};

export const libraryCategories: LibraryCategory[] = [
  {
    slug: "comportamento-alimentar",
    title: "Comportamento alimentar",
    description: "Conteúdos sobre escuta, contexto e investigação do comportamento alimentar na prática nutricional.",
    relatedProductSlugs: [
      "o-olhar-comportamental-na-consulta-nutricional",
      "por-tras-do-comportamento-alimentar",
    ],
  },
  {
    slug: "micronutrientes",
    title: "Micronutrientes",
    description: "Conteúdos de referência sobre vitaminas e minerais para estudo e consulta profissional.",
    relatedProductSlugs: ["guia-visual-das-vitaminas", "minerais"],
  },
  {
    slug: "suplementacao",
    title: "Suplementação",
    description: "Conteúdos sobre avaliação, evidências e acompanhamento de estratégias de suplementação.",
    relatedProductSlugs: ["guia-pratico-de-suplementacao-na-pratica-clinica"],
  },
  {
    slug: "pratica-clinica",
    title: "Prática clínica",
    description: "Conteúdos para organizar escuta, raciocínio clínico e condutas em nutrição.",
    relatedProductSlugs: ["da-escuta-a-conduta", "o-olhar-comportamental-na-consulta-nutricional"],
  },
];

export function getLibraryCategory(slug: string) {
  return libraryCategories.find((category) => category.slug === slug);
}
