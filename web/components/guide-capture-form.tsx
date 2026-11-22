"use client";

import { useState, type KeyboardEvent } from "react";

type PreviewState = "idle" | "loading" | "error" | "success";

const previewMessages: Record<Exclude<PreviewState, "idle">, string> = {
  loading: "Simulação de carregamento: nenhuma solicitação foi enviada.",
  error: "Simulação de erro: nenhuma solicitação foi enviada. A captação ainda não está conectada.",
  success: "Simulação de sucesso: o endereço não foi confirmado e nenhum material foi enviado.",
};

export function GuideCaptureForm() {
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [previewState, setPreviewState] = useState<PreviewState>("idle");
  const isDevelopment = process.env.NODE_ENV === "development";

  function handleContinue() {
    const normalizedEmail = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!isValidEmail) {
      setFieldError(normalizedEmail ? "Informe um endereço de e-mail válido." : "Informe seu e-mail.");
      setPreviewState("idle");
      return;
    }

    setFieldError("");
    setPreviewState("error");
  }

  function handleEmailKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleContinue();
    }
  }

  function changeEmail(value: string) {
    setEmail(value);
    if (fieldError) setFieldError("");
  }

  return (
    <div className="guide-form" aria-busy={previewState === "loading"}>
      <p className="guide-form__preview-note">Prévia: informar um e-mail não envia dados.</p>
      <div className="contact-form" role="group" aria-label="Prévia da captação do guia">
        <label className="field" htmlFor="guide-email">
          <span className="field__label">E-mail</span>
          <input
            className="control"
            id="guide-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            value={email}
            onChange={(event) => changeEmail(event.target.value)}
            onKeyDown={handleEmailKeyDown}
            aria-invalid={fieldError ? "true" : undefined}
            aria-describedby={fieldError ? "guide-email-error" : "guide-email-hint"}
          />
          {fieldError ? (
            <span className="field__error" id="guide-email-error" role="alert">{fieldError}</span>
          ) : (
            <span className="field__hint" id="guide-email-hint">Use um endereço de e-mail válido.</span>
          )}
        </label>
        <button className="btn btn--primary" type="button" onClick={handleContinue} disabled={previewState === "loading"}>
          {previewState === "loading" ? "Aguarde" : "Continuar"}
        </button>
      </div>

      {previewState !== "idle" && (
        <p className={`guide-form__message guide-form__message--${previewState}`} role="status" aria-live="polite">
          {previewMessages[previewState]}
        </p>
      )}

      {isDevelopment && (
        <fieldset className="guide-form__controls">
          <legend>Controles de prévia — simulação de estados</legend>
          <button type="button" className="btn btn--outline btn--sm" onClick={() => setPreviewState("loading")}>Simular carregamento</button>
          <button type="button" className="btn btn--outline btn--sm" onClick={() => setPreviewState("error")}>Simular erro</button>
          <button type="button" className="btn btn--outline btn--sm" onClick={() => setPreviewState("success")}>Simular sucesso</button>
          <button type="button" className="btn btn--outline btn--sm" onClick={() => setPreviewState("idle")}>Limpar estado</button>
        </fieldset>
      )}
    </div>
  );
}
