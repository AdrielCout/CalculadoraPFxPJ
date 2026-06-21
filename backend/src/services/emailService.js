import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, html, pdfBuffer }) {
  if (!to) {
    throw new Error("Nenhum destinatário informado.");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // certificado do Brevo ainda usa nome sendinblue.com
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