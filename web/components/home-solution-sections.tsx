import { HomeSolutionDemo } from "@/components/home-solution-demo";
import { HomeSolutionMaterial } from "@/components/home-solution-material";

const consultationStages = [
  {
    title: "Escuta qualificada",
    description: "Queixas, expectativas, experiências anteriores e contexto de vida.",
  },
  {
    title: "Anamnese e histórico clínico",
    description: "Saúde, histórico pessoal e familiar, rotina, exames e hábitos.",
  },
  {
    title: "Avaliação e análise",
    description: "Informações clínicas, alimentares, antropométricas e comportamentais.",
  },
  {
    title: "Diagnóstico nutricional",
    description: "Problemas nutricionais identificados a partir da avaliação.",
  },
  {
    title: "Plano e conduta",
    description: "Objetivos e estratégias adequados às necessidades e à rotina.",
  },
  {
    title: "Acompanhamento e reavaliação",
    description: "Evolução, dificuldades, adesão e mudanças no contexto.",
  },
] as const;

export function HomeSolutionSections() {
  return (
    <>
      <HomeSolutionDemo />

      <section
        className="home-section home-solution-practice"
        aria-labelledby="home-solution-practice-title"
      >
        <div className="site-container">
          <header className="home-solution__heading">
            <p className="home-solution__eyebrow">Raciocínio clínico</p>
            <h2
              className="home-solution__title"
              id="home-solution-practice-title"
            >
              <span>Um mapa para</span>
              <em>organizar a consulta</em>
            </h2>
            <p className="home-solution__intro">
              Esta página de <em>Da Escuta à Conduta</em> mostra seis etapas da
              primeira consulta nutricional.
            </p>
          </header>

          <ol className="home-solution-practice__stages">
            {consultationStages.map((stage, index) => (
              <li className="home-solution-practice__stage" key={stage.title}>
                <span className="home-solution-practice__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
              </li>
            ))}
          </ol>

          <p className="home-solution-practice__note">
            <span>A consulta não precisa seguir uma sequência rígida.</span>{" "}
            <em>
              As etapas se complementam, e situações de risco ou necessidades
              específicas podem modificar a ordem de investigação e intervenção.
            </em>
          </p>
        </div>
      </section>

      <HomeSolutionMaterial />
    </>
  );
}
