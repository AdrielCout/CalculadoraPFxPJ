import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, html, pdfBuffer }) {
  if (!to) {
    throw new Error("Nenhum destinatário informado.");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,   // smtp-relay.brevo.com
    port: Number(process.env.EMAIL_PORT) || 587,
    auth: {
      user: process.env.EMAIL_USER, // seu email do Brevo
      pass: process.env.EMAIL_PASS, // chave SMTP do Brevo (não é senha pessoal)
    },
  });

  await transporter.sendMail({
    from: `"Calculadora DAF" <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    html,
    attachments: pdfBuffer
      ? [
          {
            filename: "relatorio-pf-vs-pj.pdf",
            content: pdfBuffer,
            contentType: "application/pdf",
          },
        ]
      : [],
  });

  return true;
}
