import nodemailer, { type Transporter } from "nodemailer";
import { createUnsubscribeToken } from "./unsubscribe";

type SubmissionEmail =
  | { kind: "newsletter"; email: string }
  | { kind: "contato"; nome: string; email: string; assunto: string; mensagem: string };

type SubmissionEmailResult = {
  emailSent: boolean;
  confirmationEmailSent?: boolean;
};

let transporter: Transporter | undefined;

function smtpTransport(): Transporter {
  if (transporter) return transporter;
  const user = process.env.LARK_SMTP_USER;
  const password = process.env.LARK_SMTP_PASSWORD;
  if (!user || !password) throw new Error("Lark SMTP configuration unavailable");
  transporter = nodemailer.createTransport({
    host: "smtp.larksuite.com",
    port: 465,
    secure: true,
    auth: { user, pass: password },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  return transporter;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
}

export async function sendSubmissionEmail(submission: SubmissionEmail): Promise<SubmissionEmailResult> {
  const user = process.env.LARK_SMTP_USER;
  if (!user) throw new Error("Lark SMTP configuration unavailable");
  const transport = smtpTransport();

  if (submission.kind === "newsletter") {
    const from = process.env.LARK_NEWSLETTER_FROM || "newsletter@b2bnutris.com";
    const origin = process.env.FORMS_ALLOWED_ORIGIN || "https://b2bnutris.com";
    const token = createUnsubscribeToken(submission.email);
    const unsubscribe = `${origin}/api/newsletter/unsubscribe?token=${encodeURIComponent(token)}`;
    await transport.sendMail({
      from: { name: "B2B Nutris", address: from },
      to: submission.email,
      replyTo: "contato@b2bnutris.com",
      subject: "Sua inscrição na newsletter B2B Nutris",
      text: `Olá!\n\nSua inscrição na newsletter B2B Nutris foi registrada. Você receberá novidades e lançamentos.\n\nPara cancelar a inscrição: ${unsubscribe}`,
      html: `<main style="font-family:Arial,sans-serif;line-height:1.6;color:#252525"><h1 style="font-size:22px">Bem-vindo à newsletter B2B Nutris</h1><p>Sua inscrição foi registrada. Você receberá novidades e lançamentos da B2B Nutris.</p><p><a href="${unsubscribe}">Cancelar inscrição</a></p></main>`,
    });
    return { emailSent: true };
  }

  const from = process.env.LARK_CONTACT_FROM || "contato@b2bnutris.com";
  const recipient = process.env.CONTACT_NOTIFICATION_TO || "contato@b2bnutris.com";
  const safeName = escapeHtml(submission.nome);
  const safeEmail = escapeHtml(submission.email);
  const safeSubject = escapeHtml(submission.assunto);
  const safeMessage = escapeHtml(submission.mensagem).replace(/\n/g, "<br>");
  await transport.sendMail({
    from: { name: "B2B Nutris | Contato", address: from },
    to: recipient,
    replyTo: submission.email,
    subject: `Formulário de contato: ${submission.assunto}`,
    text: `Nome: ${submission.nome}\nE-mail: ${submission.email}\nAssunto: ${submission.assunto}\n\n${submission.mensagem}`,
    html: `<main style="font-family:Arial,sans-serif;line-height:1.6;color:#252525"><h1 style="font-size:22px">Nova mensagem pelo formulário</h1><p><strong>Nome:</strong> ${safeName}<br><strong>E-mail:</strong> ${safeEmail}<br><strong>Assunto:</strong> ${safeSubject}</p><p>${safeMessage}</p></main>`,
  });

  try {
    await transport.sendMail({
      from: { name: "B2B Nutris | Contato", address: from },
      to: submission.email,
      replyTo: recipient,
      subject: "Recebemos sua solicitação | B2B Nutris",
      text: `Olá, ${submission.nome}!\n\nRecebemos sua mensagem. Nossa equipe analisará sua solicitação e entrará em contato o mais breve possível com uma resposta.\n\nAtenciosamente,\nEquipe B2B Nutris`,
      html: `<main style="font-family:Arial,sans-serif;line-height:1.6;color:#252525"><h1 style="font-size:22px">Recebemos sua mensagem</h1><p>Olá, ${safeName}!</p><p>Nossa equipe analisará sua solicitação e entrará em contato o mais breve possível com uma resposta.</p><p>Atenciosamente,<br>Equipe B2B Nutris</p></main>`,
    });
    return { emailSent: true, confirmationEmailSent: true };
  } catch {
    return { emailSent: true, confirmationEmailSent: false };
  }
}
