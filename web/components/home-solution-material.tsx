"use client";

import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

type MaterialSlide = {
  titleLead: string;
  titleEmphasis: string;
  descriptionLead: string;
  descriptionEmphasis: string;
  descriptionTail: string;
  subtitle: readonly string[];
  image: string;
  imageAlt: string;
};

const materials: MaterialSlide[] = [
  {
    titleLead: "Dados essenciais,",
    titleEmphasis: "organizados por vitamina",
    descriptionLead: "O ",
    descriptionEmphasis: "Guia Visual das Vitaminas",
    descriptionTail:
      " reúne fichas técnicas com funções, fontes alimentares, ingestão de referência, sinais associados à deficiência, interações e cuidados.",
    subtitle: ["Funções", "Fontes alimentares", "Ingestão de referência"],
    image: "/samples/pages/guia-visual-das-vitaminas/3.webp",
    imageAlt:
      "Página autorizada da amostra do Guia Visual das Vitaminas, com informações sobre a tiamina: funções, ingestão de referência, fontes alimentares, sinais de deficiência e cuidados.",
  },
  {
    titleLead: "Dados essenciais,",
    titleEmphasis: "organizados por mineral",
    descriptionLead: "O ",
    descriptionEmphasis: "guia",
    descriptionTail:
      " reúne fichas clínicas com funções, fontes alimentares, ingestão de referência, avaliação nutricional, interações e cuidados.",
    subtitle: ["Funções", "Fontes alimentares", "Ingestão de referência"],
    image: "/samples/pages/minerais/3.webp",
    imageAlt:
      "Página da amostra do guia de Minerais sobre ferro, com avaliação nutricional, exames laboratoriais e absorção.",
  },
  {
    titleLead: "Suplementação,",
    titleEmphasis: "organizada por tema",
    descriptionLead: "O ",
    descriptionEmphasis: "guia",
    descriptionTail:
      " reúne 34 fichas em 17 temas, cobrindo evidências e limitações, avaliação nutricional, aplicações clínicas, administração e monitoramento.",
    subtitle: ["Evidências", "Aplicações clínicas", "Monitoramento"],
    image: "/samples/pages/suplementacao-clinica/3.webp",
    imageAlt:
      "Página da amostra do guia de Suplementação Clínica sobre creatina, com evidências, aplicações, posologia e cuidados.",
  },
];

export function HomeSolutionMaterial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [pointerOnControls, setPointerOnControls] = useState(false);
  const [arrowHasFocus, setArrowHasFocus] = useState(false);
  const material = materials[activeIndex];

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const updateMotionPreference = () =>
      setPrefersReducedMotion(motionPreference.matches);

    updateMotionPreference();
    motionPreference.addEventListener("change", updateMotionPreference);

    return () =>
      motionPreference.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || pointerOnControls || arrowHasFocus) return;

    const timeoutId = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % materials.length);
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, arrowHasFocus, pointerOnControls, prefersReducedMotion]);

  const moveBy = (offset: number) => {
    setActiveIndex(
      (current) => (current + offset + materials.length) % materials.length,
    );
  };

  return (
    <section
      className="home-section home-solution-material"
      aria-labelledby="home-solution-material-title"
    >
      <div className="site-container home-solution-material__layout">
        <div className="home-solution-material__copy">
          <p className="home-solution__eyebrow">Fichas para consulta</p>
          <h2
            className="home-solution__title"
            id="home-solution-material-title"
          >
            <span>{material.titleLead}</span>{" "}
            <em>{material.titleEmphasis}</em>
          </h2>
          <p className="home-solution__intro">
            {material.descriptionLead}
            <em>{material.descriptionEmphasis}</em>
            {material.descriptionTail}
          </p>
          <p className="home-solution-material__terms">
            {material.subtitle.map((term, index) => (
              <Fragment key={term}>
                {index > 0 && (
                  <>
                    {" "}
                    <span aria-hidden="true">·</span>{" "}
                  </>
                )}
                {term}
              </Fragment>
            ))}
          </p>
        </div>

        <div className="home-solution-material__visual">
          <figure className="home-solution-device-frame home-solution-material__device">
            <div className="home-solution-material__screen">
              <Image
                src={material.image}
                alt={material.imageAlt}
                fill
                sizes="(max-width: 899px) 84vw, 480px"
              />
              <span
                className="home-solution-material__island"
                aria-hidden="true"
              />
            </div>
          </figure>

          <div
            className="home-solution-material__controls"
            role="group"
            aria-label="Navegação das fichas para consulta"
            onPointerEnter={() => setPointerOnControls(true)}
            onPointerLeave={() => setPointerOnControls(false)}
            onFocusCapture={() => setArrowHasFocus(true)}
            onBlurCapture={(event) => {
              const nextTarget = event.relatedTarget;
              setArrowHasFocus(
                nextTarget instanceof Node &&
                  event.currentTarget.contains(nextTarget),
              );
            }}
          >
            <button
              type="button"
              aria-label="Mostrar material anterior"
              onClick={() => moveBy(-1)}
            >
              <span aria-hidden="true">←</span>
              <span>Anterior</span>
            </button>
            <span className="home-solution-material__position" aria-hidden="true">
              {activeIndex + 1} de {materials.length}
            </span>
            <button
              type="button"
              aria-label="Mostrar próximo material"
              onClick={() => moveBy(1)}
            >
              <span>Próxima</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
