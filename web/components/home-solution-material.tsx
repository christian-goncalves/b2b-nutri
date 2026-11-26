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
  const [arrowHasFocus, setArrowHasFocus] = useState(false);

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
    if (prefersReducedMotion || arrowHasFocus) return;

    const timeoutId = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % materials.length);
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, arrowHasFocus, prefersReducedMotion]);

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
          <div className="home-solution-material__copy-slides">
            {materials.map((material, index) => (
              <div
                className={`home-solution-material__copy-slide${
                  index === activeIndex ? " is-active" : ""
                }`}
                aria-hidden={index !== activeIndex}
                key={material.image}
              >
                <h2
                  className="home-solution__title"
                  id={index === activeIndex ? "home-solution-material-title" : undefined}
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
                  {material.subtitle.map((term, termIndex) => (
                    <Fragment key={term}>
                      {termIndex > 0 && (
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
            ))}
          </div>
        </div>

        <div className="home-solution-material__visual">
          <figure className="home-solution-device-frame home-solution-material__device">
            <div className="home-solution-material__screen">
              {materials.map((material, index) => (
                <Image
                  key={material.image}
                  src={material.image}
                  alt={material.imageAlt}
                  aria-hidden={index !== activeIndex}
                  className={`home-solution-material__screen-image${
                    index === activeIndex ? " is-active" : ""
                  }`}
                  fill
                  sizes="(max-width: 899px) 84vw, 480px"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              ))}
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
            onFocusCapture={(event) =>
              setArrowHasFocus(event.target.matches(":focus-visible"))
            }
            onBlurCapture={(event) => {
              const nextTarget = event.relatedTarget;
              if (!(nextTarget instanceof Node && event.currentTarget.contains(nextTarget))) {
                setArrowHasFocus(false);
              }
            }}
            onPointerDownCapture={() => setArrowHasFocus(false)}
          >
            <button
              type="button"
              aria-label="Mostrar material anterior"
              onClick={() => moveBy(-1)}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M19 12H5m7-7-7 7 7 7" />
              </svg>
            </button>
            <span className="home-solution-material__position" aria-hidden="true">
              {activeIndex + 1} de {materials.length}
            </span>
            <button
              type="button"
              aria-label="Mostrar próximo material"
              onClick={() => moveBy(1)}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
