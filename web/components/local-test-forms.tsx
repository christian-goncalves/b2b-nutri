"use client";

import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";

type Kind = "newsletter" | "contato";
type SubmissionFeedback = { title: string; message: string };

function SubmissionDialog({ feedback, onClose }: { feedback: SubmissionFeedback; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!dialog.open) dialog.showModal();

    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="form-feedback-dialog"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="form-feedback-dialog__content">
        <h2 id={titleId}>{feedback.title}</h2>
        <p role="status">{feedback.message}</p>
        <div className="form-feedback-dialog__actions">
          <button className="btn btn--primary" type="button" autoFocus onClick={onClose}>Entendi</button>
        </div>
      </div>
    </dialog>
  );
}

function useSubmission(kind: Kind, localTest: boolean) {
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<SubmissionFeedback | null>(null);
  const closeFeedback = useCallback(() => setFeedback(null), []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = kind === "newsletter"
      ? { email: data.get("email"), consentimento: data.get("consentimento") === "on", origem: localTest ? "teste-local-home" : "home" }
      : { nome: data.get("nome"), email: data.get("email"), assunto: data.get("assunto"), mensagem: data.get("mensagem") };
    setPending(true);
    setStatus("Enviando...");
    try {
      const response = await fetch(`/api/${kind}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) {
        setStatus(response.status === 409 ? "Este cadastro não pôde ser concluído." : "Não foi possível confirmar o registro. Entre em contato com a equipe antes de tentar novamente.");
      } else {
        const result: unknown = await response.json().catch(() => null);
        form.reset();
        const emailSent = Boolean(result && typeof result === "object" && "emailSent" in result && result.emailSent === true);
        setStatus("");
        setFeedback(emailSent
          ? kind === "newsletter"
            ? { title: "Cadastro concluído", message: "Seu cadastro na newsletter foi concluído com sucesso." }
            : { title: "Contato registrado", message: "Seu contato foi registrado com sucesso. Retornaremos o mais breve possível." }
          : kind === "newsletter"
            ? { title: "Cadastro registrado", message: "Seu cadastro foi salvo, mas não conseguimos enviar o e-mail de boas-vindas. Não envie o formulário novamente." }
            : { title: "Contato registrado", message: "Seu contato foi registrado, mas não conseguimos enviar a notificação à equipe. Não envie o formulário novamente." });
      }
    } catch {
      setStatus("Não foi possível confirmar o registro. Entre em contato com a equipe antes de tentar novamente.");
    } finally { setPending(false); }
  }
  return { submit, pending, status, feedback, closeFeedback };
}

export function LocalNewsletterForm({ localTest = true }: { localTest?: boolean }) {
  const { submit, pending, status, feedback, closeFeedback } = useSubmission("newsletter", localTest);
  return <>
    <form onSubmit={submit} aria-label={localTest ? "Teste local da newsletter" : "Inscrição na newsletter"}>
      <div className="newsletter-form local-newsletter-form">
        <label className="field"><span className="field__label">E-mail</span><input name="email" className="control" type="email" maxLength={254} required /></label>
        <button className="btn btn--primary" type="submit" disabled={pending}>{pending ? "ENVIANDO..." : "CADASTRAR"}</button>
      </div>
      <label className="local-form-consent"><input type="checkbox" name="consentimento" required /> <span>Concordo em receber novidades da B2B Nutris.</span></label>
      <p className="form-status" role="status">{status ?? (localTest ? "Teste local: use apenas dados fictícios." : "Formulário em teste. Os dados serão registrados na planilha; ainda não há notificações por e-mail.")}</p>
    </form>
    {feedback && <SubmissionDialog feedback={feedback} onClose={closeFeedback} />}
  </>;
}

export function LocalContactForm({ localTest = true }: { localTest?: boolean }) {
  const { submit, pending, status, feedback, closeFeedback } = useSubmission("contato", localTest);
  return <>
    <form className="contact-form" onSubmit={submit} aria-label={localTest ? "Teste local de contato" : "Formulário de contato"}>
      <label className="field"><span className="field__label">Nome</span><input name="nome" className="control" maxLength={120} required /></label>
      <label className="field"><span className="field__label">E-mail</span><input name="email" className="control" type="email" maxLength={254} required /></label>
      <label className="field"><span className="field__label">Assunto</span><input name="assunto" className="control" maxLength={200} required /></label>
      <label className="field"><span className="field__label">Mensagem</span><textarea name="mensagem" className="control" maxLength={5000} required /></label>
      <button className="btn btn--primary" type="submit" disabled={pending}>{pending ? "ENVIANDO..." : "ENVIAR"}</button>
      <p className="form-status" role="status">{status ?? (localTest ? "Teste local: use apenas dados fictícios." : "Formulário em teste. Os dados serão registrados na planilha; ainda não há notificações por e-mail.")}</p>
    </form>
    {feedback && <SubmissionDialog feedback={feedback} onClose={closeFeedback} />}
  </>;
}
