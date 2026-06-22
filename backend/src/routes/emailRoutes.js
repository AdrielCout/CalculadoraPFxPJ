import express from "express";
import { sendEmail }           from "../services/emailService.js";
import { generatePDF }         from "../services/generatePDF.js";
import { generateEmailTemplate } from "../templates/emailTemplate.js";
import { Comparison }          from "../models/Comparison.js";

const router = express.Router();

router.post("/send-calculation", async (req, res) => {
  try {
    const data = req.body;

    // Gera HTML e PDF do relatório
    const html      = generateEmailTemplate(data);
    const pdfBuffer = await generatePDF(data);

    // Envia para o usuário e/ou NAF
    const recipients = [data.emailUser, data.emailNAF].filter(Boolean).join(", ");
    await sendEmail({
      to:        recipients,
      subject:   "Relatório Comparativo PF × PJ",
      html,
      pdfBuffer,
    });

    // Persiste a comparação no banco via Prisma
    await Comparison.create({
      userId:        data.userId ?? null,
      rendaMensal:   data.rendaMensal,
      custosMensais: data.custosMensais,
      resultadoJson: { PF: data.PF, PJ: data.PJ, profissao: data.profissao },
    });

    res.json({ success: true, message: "Email e PDF enviados com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    res.status(500).json({ error: "Erro ao enviar o relatório." });
  }
});

export default router;
