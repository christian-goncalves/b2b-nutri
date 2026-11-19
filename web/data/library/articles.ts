import type { ScientificArticle } from "@/types/scientific-article";
import { ebooks } from "@/data/home-books";
import VitaminB1Article from "../../../editorial/artigos-criados/2026-11-18-vitamina-b1-sinais-de-deficiencia-e-como-investigar-fatores-de-risco-nutricional.md";
import FoodComplaintInvestigationArticle from "../../../editorial/artigos-criados/2026-11-19-como-transformar-a-queixa-alimentar-do-paciente-em-perguntas-de-investigacao-clinica.md";

// Only manually reviewed articles belong here. MDX files for draft or test use stay outside this registry.
const approvedArticles: ScientificArticle[] = [
  {
    id: "vitamina-b1-sinais-deficiencia-fatores-risco",
    slug: "vitamina-b1-sinais-deficiencia-fatores-risco",
    title: "Vitamina B1: sinais de deficiência e como investigar fatores de risco nutricional",
    summary: "Fadiga, fraqueza e alterações neurológicas podem acompanhar a deficiência de tiamina, mas não confirmam o diagnóstico. A investigação combina ingestão alimentar, perda de peso, álcool, vômitos, absorção, cirurgia bariátrica, medicamentos e contexto clínico; exames entram como apoio e não devem atrasar o atendimento de uma suspeita grave.",
    primaryCategory: "micronutrientes",
    tags: ["Vitamina B1", "Tiamina", "Deficiência nutricional", "Investigação clínica"],
    primaryProductSlug: "guia-visual-das-vitaminas",
    relatedProductSlugs: [],
    editorialAuthor: "B2B Nutris",
    scientificReferences: [
      {
        title: "Guia visual das vitaminas: fundamentos e aplicação clínica",
        citation: "B2B Nutris. Guia visual das vitaminas: fundamentos e aplicação clínica. E-book em PDF, páginas 3–4 (vitamina B1 e aplicação clínica).",
      },
      {
        title: "Thiamin: Fact Sheet for Health Professionals",
        citation: "National Institutes of Health, Office of Dietary Supplements. Thiamin: Fact Sheet for Health Professionals.",
        url: "https://ods.od.nih.gov/factsheets/Thiamin-HealthProfessional/",
      },
      {
        title: "Clinical guidelines for alcohol treatment: alcohol care in acute hospitals",
        citation: "GOV.UK, Department of Health and Social Care. Clinical guidelines for alcohol treatment: alcohol care in acute hospitals.",
        url: "https://www.gov.uk/guidance/clinical-guidelines-for-alcohol-treatment/16-alcohol-care-in-acute-hospitals",
      },
    ],
    version: "1",
    reviewedAt: "2026-11-18",
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-18",
    editorialStatus: "approved",
    content: VitaminB1Article,
  },
  {
    id: "como-transformar-queixa-alimentar-em-perguntas-investigacao-clinica",
    slug: "como-transformar-queixa-alimentar-em-perguntas-investigacao-clinica",
    title: "Como transformar a queixa alimentar do paciente em perguntas de investigação clínica",
    summary: "Uma queixa alimentar abre uma linha de investigação. Perguntas abertas sobre rotina, padrões, fatores associados e dificuldades ajudam o nutricionista a construir hipóteses e definir uma conduta adequada ao contexto.",
    primaryCategory: "comportamento-alimentar",
    tags: ["Comportamento alimentar", "Queixa alimentar", "Investigação clínica", "Raciocínio clínico"],
    primaryProductSlug: "o-olhar-comportamental-na-consulta-nutricional",
    relatedProductSlugs: [],
    editorialAuthor: "B2B Nutris",
    scientificReferences: [
      {
        title: "O olhar comportamental na consulta nutricional",
        citation: "B2B Nutris. O olhar comportamental na consulta nutricional. Coleção Mente Clínica, volume 01. PDF, páginas 4-10 (MC-01.02 a MC-01.08).",
      },
    ],
    version: "1",
    reviewedAt: "2026-11-19",
    publishedAt: "2026-11-19",
    updatedAt: "2026-11-19",
    editorialStatus: "approved",
    content: FoodComplaintInvestigationArticle,
  },
];

function validateArticle(article: ScientificArticle, slugs: Set<string>) {
  if (!article.id.trim() || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug) || slugs.has(article.slug)) {
    throw new Error(`Artigo da biblioteca com identificador ou slug inválido: ${article.slug}`);
  }
  if (!article.title.trim() || !article.summary.trim() || !article.version.trim() || !article.tags.length || !article.scientificReferences.length) {
    throw new Error(`Artigo aprovado incompleto: ${article.slug}`);
  }
  for (const date of [article.reviewedAt, article.publishedAt, article.updatedAt]) {
    const parsed = new Date(`${date}T00:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) {
      throw new Error(`Data não confirmada ou inválida no artigo: ${article.slug}`);
    }
  }

  const productSlugs = [article.primaryProductSlug, ...article.relatedProductSlugs];
  if (productSlugs.some((slug) => !ebooks.some((book) => book.slug === slug))) {
    throw new Error(`Associação com e-book inexistente no artigo: ${article.slug}`);
  }
  if (article.scientificReferences.some((reference) => !reference.title.trim() || !reference.citation.trim())) {
    throw new Error(`Referência científica incompleta no artigo: ${article.slug}`);
  }
  for (const reference of article.scientificReferences) {
    if (!reference.url) continue;
    try {
      const url = new URL(reference.url);
      if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error("Protocolo não permitido");
    } catch {
      throw new Error(`URL de referência inválida no artigo: ${article.slug}`);
    }
  }
  slugs.add(article.slug);
}

export function getApprovedArticles() {
  const slugs = new Set<string>();
  for (const article of approvedArticles) validateArticle(article, slugs);
  return approvedArticles.filter((article) => article.editorialStatus === "approved");
}

export function getApprovedArticle(slug: string) {
  return getApprovedArticles().find((article) => article.slug === slug);
}

export function getArticlesForCategory(categorySlug: string) {
  return getApprovedArticles().filter((article) => article.primaryCategory === categorySlug);
}
