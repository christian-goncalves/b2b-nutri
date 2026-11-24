"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GuideCaptureForm } from "@/components/guide-capture-form";

export function HomeHeroInteraction() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [showStickyLink, setShowStickyLink] = useState(false);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const hideNear = Array.from(
      document.querySelectorAll<HTMLElement>("#contato, .foundation-footer"),
    );

    const updateStickyVisibility = () => {
      const rect = trigger.getBoundingClientRect();
      const pastHero = window.innerWidth < 900 && rect.bottom < 0;
      const nearPageEnd = hideNear.some((element) => {
        const section = element.getBoundingClientRect();
        return section.top < window.innerHeight * 0.88 && section.bottom > 0;
      });
      setShowStickyLink(pastHero && !nearPageEnd);
    };

    updateStickyVisibility();
    window.addEventListener("scroll", updateStickyVisibility, { passive: true });
    window.addEventListener("resize", updateStickyVisibility);
    return () => {
      window.removeEventListener("scroll", updateStickyVisibility);
      window.removeEventListener("resize", updateStickyVisibility);
    };
  }, []);

  function openDialog() {
    dialogRef.current?.showModal();
    dialogRef.current?.querySelector<HTMLInputElement>("input")?.focus();
  }

  function closeDialog() {
    dialogRef.current?.close();
    triggerRef.current?.focus();
  }

  return (
    <>
      <button
        ref={triggerRef}
        className="btn btn--primary home-hero__cta"
        type="button"
        aria-haspopup="dialog"
        aria-controls="guide-capture-dialog"
        onClick={openDialog}
      >
        Quero receber meu e-book
      </button>
      <p className="home-hero__cta-description">Receba gratuitamente o e-book <strong>Antes da Consulta</strong>.</p>

      <dialog
        ref={dialogRef}
        id="guide-capture-dialog"
        className="guide-dialog"
        aria-labelledby="guide-dialog-title"
        onClose={() => triggerRef.current?.focus()}
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeDialog();
        }}
      >
        <div className="guide-dialog__panel">
          <button className="guide-dialog__close" type="button" onClick={closeDialog} aria-label="Fechar janela">
            <span aria-hidden="true">×</span>
          </button>
          <p className="hero-eyebrow">Material gratuito para nutricionistas</p>
          <h2 id="guide-dialog-title">Receba o guia Antes da Consulta</h2>
          <p className="guide-dialog__intro">Informe seu e-mail para continuar. Esta prévia valida o formato do endereço, mas ainda não envia nem registra a solicitação.</p>
          <GuideCaptureForm idPrefix="home-guide-dialog" compact />
        </div>
      </dialog>

      <div
        className={`home-sticky-cta${showStickyLink ? " home-sticky-cta--visible" : ""}`}
        aria-hidden={!showStickyLink}
      >
        <div className="home-sticky-cta__copy">
          <strong>B2B Nutris</strong>
          <span>a partir de R$ 19,90</span>
        </div>
        <Link
          className="btn btn--primary home-hero__cta"
          href="/ebooks"
          tabIndex={showStickyLink ? 0 : -1}
        >
          Comprar e-book
        </Link>
      </div>
    </>
  );
}
