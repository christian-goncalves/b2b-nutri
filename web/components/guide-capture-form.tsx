"use client";

import { useState, type KeyboardEvent } from "react";

type PreviewState = "idle" | "loading" | "error" | "success";

type GuideCaptureFormProps = {
  idPrefix?: string;
  compact?: boolean;
};

const previewMessages: Record<Exclude<PreviewState, "idle">, string> = {
  loading: "Simulação de carregamento: nenhuma solicitação foi enviada.",
  error: "Simulação de erro: nenhuma solicitação foi enviada. A captação ainda não está conectada.",
  success: "Prévia: o formato do e-mail parece válido. O envio do e-book será configurado na próxima etapa.",
};

export function GuideCaptureForm({ idPrefix = "guide", compact = false }: GuideCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [previewState, setPreviewState] = useState<PreviewState>("idle");
  const isDevelopment = process.env.NODE_ENV === "development";
  const emailId = `${idPrefix}-email`;
  const errorId = `${idPrefix}-email-error`;
  const hintId = `${idPrefix}-email-hint`;

  function handleContinue() {
    const normalizedEmail = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!isValidEmail) {
      setFieldError(normalizedEmail ? "Informe um endereço de e-mail válido." : "Informe seu e-mail.");
      setPreviewState("idle");
      return;
    }

    setFieldError("");
    setPreviewState("success");
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
    <div className={`guide-form${compact ? " guide-form--compact" : ""}`} aria-busy={previewState === "loading"}>
      <p className="guide-form__preview-note">Prévia: informar um e-mail não envia dados.</p>
      <div className="contact-form" role="group" aria-label="Prévia da captação do guia">
        <label className="field" htmlFor={emailId}>
          <span className="field__label">E-mail</span>
          <input
            className="control"
            id={emailId}
            name="email"
            type="email"
            placeholder={compact ? "Seu melhor e-mail" : undefined}
            autoComplete="email"
            inputMode="email"
            required
            value={email}
            onChange={(event) => changeEmail(event.target.value)}
            onKeyDown={handleEmailKeyDown}
            aria-invalid={fieldError ? "true" : undefined}
            aria-describedby={fieldError ? errorId : hintId}
          />
          {fieldError ? (
            <span className="field__error" id={errorId} role="alert">{fieldError}</span>
          ) : (
            <span className="field__hint" id={hintId}>Use um endereço de e-mail válido.</span>
          )}
        </label>
        <button className={`btn ${compact ? "btn--wine" : "btn--primary"}`} type="button" onClick={handleContinue} disabled={previewState === "loading"}>
          {previewState === "loading" ? "Aguarde" : "Continuar"}
        </button>
      </div>

      {previewState !== "idle" && (
        <p className={`guide-form__message guide-form__message--${previewState}`} role="status" aria-live="polite">
          {previewMessages[previewState]}
        </p>
      )}

      {isDevelopment && !compact && (
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
