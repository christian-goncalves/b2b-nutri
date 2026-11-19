import type { ScientificArticle } from "@/types/scientific-article";
import { ebooks } from "@/data/home-books";
import VitaminB1Article from "../../../editorial/artigos-criados/2026-11-18-vitamina-b1-sinais-de-deficiencia-e-como-investigar-fatores-de-risco-nutricional.md";
import FoodComplaintInvestigationArticle from "../../../editorial/artigos-criados/2026-11-19-como-transformar-a-queixa-alimentar-do-paciente-em-perguntas-de-investigacao-clinica.md";

import PostEatingConsequencesArticle from "../../../editorial/publicados/comportamento-alimentar/2026-11-19-o-que-acontece-depois-de-comer-como-investigar-consequencias-sem-presumir-causas.md";
import SerumMagnesiumArticle from "../../../editorial/publicados/micronutrientes/2026-11-19-magnesio-serico-normal-exclui-deficiencia.md";
import PrioritizingNutritionCareArticle from "../../../editorial/publicados/pratica-clinica/2026-11-19-como-priorizar-a-conduta-nutricional-quando-ha-varias-necessidades.md";
import PreAppointmentResponsesArticle from "../../../editorial/publicados/pratica-clinica/2026-11-19-como-usar-respostas-de-pre-atendimento-para-preparar-a-consulta-nutricional.md";
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
  {
    id: "investigar-o-que-acontece-depois-de-comer",
    slug: "investigar-o-que-acontece-depois-de-comer",
    title: "O que acontece depois de comer? Como investigar consequências sem presumir causas",
    summary: "O que ocorre depois de comer pode ajudar a compreender por que um padrão se repete, mas a sequência, sozinha, não prova sua função. Investigue sensações, emoções, alívio, prazer, interrupções da rotina e reações de outras pessoas, relacionando esses relatos ao contexto e aos sinais de fome antes de formular hipóteses.",
    primaryCategory: "comportamento-alimentar",
    tags: ["Comportamento alimentar", "Consequências", "Investigação clínica", "Padrões alimentares"],
    primaryProductSlug: "por-tras-do-comportamento-alimentar",
    relatedProductSlugs: [],
    editorialAuthor: "B2B Nutris",
    scientificReferences: [
      {
        title: "Por trás do comportamento alimentar",
        citation: "B2B Nutris. Por trás do comportamento alimentar. Coleção Mente Clínica, volume 02. E-book em PDF, páginas 3-5 e 7 (MC-02.03 a MC-02.05 e MC-02.07).",
      },
    ],
    version: "1",
    reviewedAt: "2026-11-19",
    publishedAt: "2026-11-19",
    updatedAt: "2026-11-19",
    editorialStatus: "approved",
    content: PostEatingConsequencesArticle,
  },
  {
    id: "interpretacao-do-magnesio-serico-na-avaliacao-clinica",
    slug: "interpretacao-do-magnesio-serico-na-avaliacao-clinica",
    title: "Magnésio sérico normal exclui deficiência?",
    summary: "Um resultado de magnésio sérico dentro da referência não descarta, por si só, a redução dos estoques corporais. A interpretação deve considerar alimentação, sintomas, perdas gastrointestinais ou renais, medicamentos, função renal e alterações de potássio e cálcio.",
    primaryCategory: "micronutrientes",
    tags: ["Magnésio", "Micronutrientes", "Avaliação clínica", "Função renal"],
    primaryProductSlug: "minerais",
    relatedProductSlugs: [],
    editorialAuthor: "B2B Nutris",
    scientificReferences: [
      {
        title: "Minerais",
        citation: "B2B Nutris. Minerais. E-book em PDF, páginas 5-7, com foco em avaliação clínica e laboratorial do magnésio e conduta nutricional.",
      },
      {
        title: "Magnesium: Fact Sheet for Health Professionals",
        citation: "National Institutes of Health, Office of Dietary Supplements. Magnesium: Fact Sheet for Health Professionals.",
        url: "https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/",
      },
      {
        title: "Hypomagnesemia",
        citation: "MSD Manual Professional Edition. Hypomagnesemia. Diagnóstico e fatores associados.",
        url: "https://www.msdmanuals.com/professional/nephrology/electrolyte-disorders/hypomagnesemia",
      },
    ],
    version: "1",
    reviewedAt: "2026-11-19",
    publishedAt: "2026-11-19",
    updatedAt: "2026-11-19",
    editorialStatus: "approved",
    content: SerumMagnesiumArticle,
  },
  {
    id: "como-priorizar-a-conduta-nutricional-quando-ha-varias-necessidades",
    slug: "como-priorizar-a-conduta-nutricional-quando-ha-varias-necessidades",
    title: "Como priorizar a conduta nutricional quando há várias necessidades",
    summary: "Quando a avaliação revela várias necessidades, escolha o primeiro foco considerando risco clínico, relevância para a saúde, prioridades do paciente e viabilidade da intervenção. Situações que exigem atendimento ou encaminhamento têm precedência; nos demais casos, a prioridade pode ser construída em conjunto e reavaliada ao longo do acompanhamento.",
    primaryCategory: "pratica-clinica",
    tags: ["Conduta nutricional", "Priorização clínica", "Avaliação nutricional", "Planejamento"],
    primaryProductSlug: "da-escuta-a-conduta",
    relatedProductSlugs: [],
    editorialAuthor: "B2B Nutris",
    scientificReferences: [
      {
        title: "Da Escuta à Conduta",
        citation: "B2B Nutris. Da Escuta à Conduta. E-book em PDF, páginas 5-8: sinais de atenção e encaminhamento, organização dos achados clínicos, critérios para priorização clínica e construção da conduta individualizada. Arquivo: ebooks/03 - Da Escuta  Conduta B2B.pdf.",
      },
    ],
    version: "1",
    reviewedAt: "2026-11-19",
    publishedAt: "2026-11-19",
    updatedAt: "2026-11-19",
    editorialStatus: "approved",
    content: PrioritizingNutritionCareArticle,
  },
  {
    id: "como-usar-respostas-de-pre-atendimento-para-preparar-a-consulta",
    slug: "como-usar-respostas-de-pre-atendimento-para-preparar-a-consulta",
    title: "Como usar respostas de pré-atendimento para preparar a consulta nutricional",
    summary: "Respostas enviadas antes da consulta ajudam a conhecer o motivo da procura, a rotina e as informações iniciais de saúde. Organize o que a pessoa relatou, o que precisa ser esclarecido e o que merece atenção. Use essa leitura para preparar perguntas, sem antecipar diagnóstico ou conduta.",
    primaryCategory: "pratica-clinica",
    tags: ["Pré-atendimento", "Consulta nutricional", "Anamnese", "Avaliação clínica"],
    primaryProductSlug: "da-escuta-a-conduta",
    relatedProductSlugs: [],
    editorialAuthor: "B2B Nutris",
    scientificReferences: [
      {
        title: "Antes da consulta: questionário de pré-atendimento e guia de preparação para nutricionistas",
        citation: "B2B Nutris. Antes da consulta: questionário de pré-atendimento e guia de preparação para nutricionistas. PDF, páginas 2-4 e 8-9.",
      },
    ],
    version: "1",
    reviewedAt: "2026-11-19",
    publishedAt: "2026-11-19",
    updatedAt: "2026-11-19",
    editorialStatus: "approved",
    content: PreAppointmentResponsesArticle,
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
