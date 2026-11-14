"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FocusEvent, PointerEvent, KeyboardEvent } from "react";
import type { HomeBook } from "@/types/home-book";

type HomeHeroSliderProps = {
  books: HomeBook[];
};

export function HomeHeroSlider({ books }: HomeHeroSliderProps) {
  const slides = books.filter((book) => book.featuredInSlider);
  const [activeIndex, setActiveIndex] = useState(0);
  const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const activeIndexRef = useRef(activeIndex);
  const transitionTimerRef = useRef<number | null>(null);
  const activeBook = slides[activeIndex];
  const outgoingBook = outgoingIndex === null ? null : slides[outgoingIndex];

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => () => {
    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
    }
  }, []);

  const showSlide = useCallback((index: number) => {
    const nextIndex = (index + slides.length) % slides.length;
    const currentIndex = activeIndexRef.current;
    if (nextIndex === currentIndex) return;

    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);

    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOutgoingIndex(null);
      return;
    }

    setOutgoingIndex(currentIndex);
    transitionTimerRef.current = window.setTimeout(() => {
      setOutgoingIndex(null);
      transitionTimerRef.current = null;
    }, 1000);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length < 2 || paused) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const timer = window.setInterval(() => {
      showSlide(activeIndexRef.current + 1);
    }, 4000);

    return () => window.clearInterval(timer);
  }, [paused, showSlide, slides.length]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (slides.length < 2) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showSlide(activeIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(activeIndex + 1);
    }
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "touch") return;
    touchStartX.current = event.clientX;
    setPaused(true);
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "touch" || touchStartX.current === null) return;
    const distance = event.clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(distance) > 48 && slides.length > 1) {
      showSlide(activeIndex + (distance < 0 ? 1 : -1));
    }
    setPaused(false);
  }

  function pauseWhenFocused() {
    setPaused(true);
  }

  function resumeAfterFocusLeaves(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setPaused(false);
    }
  }

  if (!activeBook) {
    return (
      <section className="section--hero home-section" aria-labelledby="hero-empty-title">
        <div className="site-container hero-empty">
          <p className="hero-eyebrow">Biblioteca B2B Nutris</p>
          <h1 id="hero-empty-title">E-books para a prática nutricional</h1>
          <p>Os destaques serão apresentados quando houver materiais selecionados.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section--hero home-section" aria-label="E-books em destaque">
      <div className="site-container">
        <div
          className="hero-layout home-hero__slider"
          role="group"
          aria-roledescription="carrossel"
          aria-label="E-books em destaque"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={pauseWhenFocused}
          onBlurCapture={resumeAfterFocusLeaves}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            touchStartX.current = null;
            setPaused(false);
          }}
        >
          <div className="hero-copy home-hero__copy">
            {outgoingBook && (
              <div className="hero-copy__panel hero-copy__panel--outgoing" aria-hidden="true" inert>
                <span className="hero-eyebrow">{outgoingBook.collection ?? outgoingBook.category}</span>
                <h1>{outgoingBook.heroTitle ?? outgoingBook.title}</h1>
                <p>{outgoingBook.heroDescription ?? outgoingBook.description}</p>
                <Link className="btn btn--primary btn--lg" href="/ebooks" tabIndex={-1}>
                  EXPLORAR E-BOOKS
                </Link>
              </div>
            )}
            <div
              key={activeBook.id}
              className={`hero-copy__panel${outgoingBook ? " hero-copy__panel--incoming" : ""}`}
              aria-live="polite"
            >
              <span className="hero-eyebrow">{activeBook.collection ?? activeBook.category}</span>
              <h1>{activeBook.heroTitle ?? activeBook.title}</h1>
              <p>{activeBook.heroDescription ?? activeBook.description}</p>
              <Link className="btn btn--primary btn--lg" href="/ebooks">
                EXPLORAR E-BOOKS
              </Link>
            </div>
          </div>
          <div className="hero-cover-wrap home-hero__cover">
            {outgoingBook && (
              <div className="home-hero__cover-layer home-hero__cover-layer--outgoing" aria-hidden="true" inert>
                <Image
                  src={outgoingBook.cover}
                  alt=""
                  sizes="(max-width: 720px) 100vw, 50vw"
                />
              </div>
            )}
            <div className={`home-hero__cover-layer${outgoingBook ? " home-hero__cover-layer--incoming" : ""}`}>
              <Image
                src={activeBook.cover}
                alt={activeBook.coverAlt}
                priority={activeIndex === 0}
                sizes="(max-width: 720px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        {slides.length > 1 && (
          <div className="slider-controls" aria-label="Controles do carrossel">
            <button
              className="slider-arrow"
              type="button"
              aria-label="E-book anterior"
              onClick={() => showSlide(activeIndex - 1)}
            >
              ‹
            </button>
            <div className="slider-dots" aria-label="Selecionar e-book">
              {slides.map((book, index) => (
                <button
                  className="slider-dot"
                  key={book.id}
                  type="button"
                  aria-label={`Mostrar ${book.title}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  onClick={() => showSlide(index)}
                />
              ))}
            </div>
            <button
              className="slider-arrow"
              type="button"
              aria-label="Próximo e-book"
              onClick={() => showSlide(activeIndex + 1)}
            >
              ›
            </button>
          </div>
        )}
        <span className="visually-hidden" aria-live="polite" aria-atomic="true">
          {activeBook.title}, slide {activeIndex + 1} de {slides.length}
        </span>
      </div>
    </section>
  );
}
