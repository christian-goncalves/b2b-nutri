"use client";

import { useState, type FormEvent } from "react";

type Kind = "newsletter" | "contato";

function useSubmission(kind: Kind, localTest: boolean) {
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
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
        form.reset();
        setStatus(localTest ? "Registro de teste salvo. Nenhum e-mail foi enviado." : kind === "newsletter" ? "Inscrição registrada. Ainda não enviamos mensagens por e-mail." : "Mensagem registrada. Ainda não enviamos notificações por e-mail.");
      }
    } catch {
      setStatus("Não foi possível confirmar o registro. Entre em contato com a equipe antes de tentar novamente.");
    } finally { setPending(false); }
  }
  return { submit, pending, status };
}

export function LocalNewsletterForm({ localTest = true }: { localTest?: boolean }) {
  const { submit, pending, status } = useSubmission("newsletter", localTest);
  return <form onSubmit={submit} aria-label={localTest ? "Teste local da newsletter" : "Inscrição na newsletter"}>
    <div className="newsletter-form local-newsletter-form">
      <label className="field"><span className="field__label">E-mail</span><input name="email" className="control" type="email" maxLength={254} required /></label>
      <button className="btn btn--primary" type="submit" disabled={pending}>{pending ? "ENVIANDO..." : "CADASTRAR"}</button>
    </div>
    <label className="local-form-consent"><input type="checkbox" name="consentimento" required /> <span>Concordo em receber novidades da B2B Nutris.</span></label>
    <p className="form-status" role="status">{status || (localTest ? "Teste local: use apenas dados fictícios." : "Formulário em teste. Os dados serão registrados na planilha; ainda não há notificações por e-mail.")}</p>
  </form>;
}

export function LocalContactForm({ localTest = true }: { localTest?: boolean }) {
  const { submit, pending, status } = useSubmission("contato", localTest);
  return <form className="contact-form" onSubmit={submit} aria-label={localTest ? "Teste local de contato" : "Formulário de contato"}>
    <label className="field"><span className="field__label">Nome</span><input name="nome" className="control" maxLength={120} required /></label>
    <label className="field"><span className="field__label">E-mail</span><input name="email" className="control" type="email" maxLength={254} required /></label>
    <label className="field"><span className="field__label">Assunto</span><input name="assunto" className="control" maxLength={200} required /></label>
    <label className="field"><span className="field__label">Mensagem</span><textarea name="mensagem" className="control" maxLength={5000} required /></label>
    <button className="btn btn--primary" type="submit" disabled={pending}>{pending ? "ENVIANDO..." : "ENVIAR"}</button>
    <p className="form-status" role="status">{status || (localTest ? "Teste local: use apenas dados fictícios." : "Formulário em teste. Os dados serão registrados na planilha; ainda não há notificações por e-mail.")}</p>
  </form>;
}
