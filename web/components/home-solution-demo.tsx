"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const demonstrations = [
  {
    kicker: "Biblioteca",
    title: "Encontre por tema",
    description: "Explore e-books organizados por assunto na biblioteca digital.",
    src: "/images/home/solucao/catalogo.png",
    screenLabel: "Captura real da biblioteca B2B Nutris, organizada por tema.",
  },
  {
    kicker: "Material",
    title: "Conheça cada guia",
    description: "Confira a descrição e os conteúdos apresentados em cada material.",
    src: "/images/home/solucao/material-da-escuta.png",
    screenLabel: "Captura real da página do material Da Escuta à Conduta.",
  },
  {
    kicker: "Amostra",
    title: "Consulte páginas autorizadas",
    description: "Visualize uma amostra pública antes de conhecer o material completo.",
    src: "/images/home/solucao/amostra-da-escuta.png",
    screenLabel: "Captura real do leitor com a amostra autorizada de Da Escuta à Conduta.",
  },
] as const;

export function HomeSolutionDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const cardButtonsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const timerRef = useRef<number | null>(null);
  const interactedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isIntersecting = false;
    let isDocumentVisible = document.visibilityState === "visible";

    const syncRotation = () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }

      if (
        isIntersecting &&
        isDocumentVisible &&
        !motionPreference.matches &&
        !interactedRef.current
      ) {
        timerRef.current = window.setInterval(() => {
          setActiveIndex((current) => (current + 1) % demonstrations.length);
        }, 5000);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        syncRotation();
      },
      { threshold: 0.25 },
    );
    const onMotionChange = () => syncRotation();
    const onVisibilityChange = () => {
      isDocumentVisible = document.visibilityState === "visible";
      syncRotation();
    };

    observer.observe(section);
    motionPreference.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      observer.disconnect();
      motionPreference.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
    };
  }, []);

  const pauseRotation = () => {
    interactedRef.current = true;
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const selectDemonstration = (index: number) => {
    pauseRotation();
    setActiveIndex(index);
  };

  const moveBy = (offset: number) => {
    const nextIndex =
      (activeIndex + offset + demonstrations.length) % demonstrations.length;
    selectDemonstration(nextIndex);
  };

  return (
    <section
      ref={sectionRef}
      className="home-section section--featured home-solution-demo"
      aria-labelledby="home-solution-demo-title"
    >
      <div className="site-container">
        <header className="home-solution__heading">
          <p className="home-solution__eyebrow">Materiais de consulta</p>
          <h2 className="home-solution__title" id="home-solution-demo-title">
            <span>Explore. Conheça.</span>
            <em>Consulte</em>
          </h2>
          <p className="home-solution__intro">
            Veja como a biblioteca organiza os e-books, apresenta cada material e
            disponibiliza amostras autorizadas.
          </p>
        </header>

        <div className="home-solution-demo__layout">
          <figure
            className="home-solution-device-frame home-solution-demo__device"
            aria-label="Prévia de telas da biblioteca B2B Nutris"
          >
            <div className="home-solution-demo__status" aria-hidden="true">
              <span className="home-solution-demo__time">15:41</span>
              <span className="home-solution-demo__island" />
              <span className="home-solution-demo__status-icons">
                <svg className="home-solution-demo__signal" viewBox="0 0 18 14" focusable="false">
                  <rect x="1" y="9" width="3" height="4" rx="1" />
                  <rect x="6" y="6.5" width="3" height="6.5" rx="1" />
                  <rect x="11" y="3.5" width="3" height="9.5" rx="1" />
                  <rect x="16" y="1" width="2" height="12" rx="1" />
                </svg>
                <svg className="home-solution-demo__wifi" viewBox="0 0 18 14" focusable="false">
                  <path d="M1.4 4.8a11 11 0 0 1 15.2 0M4.1 7.6a7.1 7.1 0 0 1 9.8 0M6.9 10.4a3.1 3.1 0 0 1 4.2 0M9 12.4h.01" />
                </svg>
                <svg className="home-solution-demo__battery" viewBox="0 0 25 14" focusable="false">
                  <rect x="1" y="1.5" width="20" height="11" rx="3" />
                  <rect className="home-solution-demo__battery-fill" x="3" y="3.5" width="16" height="7" rx="1.5" />
                  <path d="M23 5v4" />
                </svg>
              </span>
            </div>
            <div
              className="home-solution-demo__screen"
              id="home-solution-demo-screen"
              role="img"
              aria-label={demonstrations[activeIndex].screenLabel}
            >
              {demonstrations.map((demonstration, index) => (
                <Image
                  key={demonstration.src}
                  src={demonstration.src}
                  alt=""
                  fill
                  sizes="(max-width: 899px) 74vw, 310px"
                  className={
                    index === activeIndex
                      ? "home-solution-demo__screen-image is-active"
                      : "home-solution-demo__screen-image"
                  }
                  loading={index === 0 ? "eager" : "lazy"}
                  aria-hidden="true"
                />
              ))}
            </div>
          </figure>

          <div
            className="home-solution-demo__cards"
            role="group"
            aria-label="Escolha uma tela para visualizar"
            onFocusCapture={pauseRotation}
            onPointerEnter={pauseRotation}
            onKeyDown={(event) => {
              if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
              event.preventDefault();
              const offset = event.key === "ArrowRight" ? 1 : -1;
              const nextIndex =
                (activeIndex + offset + demonstrations.length) %
                demonstrations.length;
              selectDemonstration(nextIndex);
              cardButtonsRef.current[nextIndex]?.focus();
            }}
          >
            {demonstrations.map((demonstration, index) => (
              <button
                key={demonstration.src}
                ref={(element) => {
                  cardButtonsRef.current[index] = element;
                }}
                type="button"
                className="home-solution-demo__card"
                aria-pressed={activeIndex === index}
                aria-controls="home-solution-demo-screen"
                onClick={() => selectDemonstration(index)}
              >
                <span className="home-solution-demo__card-kicker">
                  {String(index + 1).padStart(2, "0")} · {demonstration.kicker}
                </span>
                <span className="home-solution-demo__card-title">
                  {demonstration.title}
                </span>
                <span className="home-solution-demo__card-copy">
                  {demonstration.description}
                </span>
              </button>
            ))}
          </div>

          <nav className="home-solution-demo__mobile-controls" aria-label="Telas da demonstração">
            <button
              type="button"
              onClick={() => moveBy(-1)}
              aria-label={
                "Mostrar demonstração anterior: " +
                demonstrations[
                  (activeIndex + demonstrations.length - 1) % demonstrations.length
                ].title
              }
            >
              <span aria-hidden="true">←</span>
              Anterior
            </button>
            <span className="home-solution-demo__position">
              {activeIndex + 1} de {demonstrations.length}
            </span>
            <button
              type="button"
              onClick={() => moveBy(1)}
              aria-label={
                "Mostrar próxima demonstração: " +
                demonstrations[(activeIndex + 1) % demonstrations.length].title
              }
            >
              Próxima
              <span aria-hidden="true">→</span>
            </button>
          </nav>
        </div>
      </div>
    </section>
  );
}
