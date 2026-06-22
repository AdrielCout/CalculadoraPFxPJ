import prisma from '../prismaClient.js';

export const Comparison = {
  // Salva o resultado de uma comparação PF x PJ
  async create({ userId, rendaMensal, custosMensais, resultadoJson }) {
    return prisma.comparisons.create({
      data: {
        user_id:        userId ?? null,
        renda_mensal:   rendaMensal,
        custos_mensais: custosMensais,
        resultado_json: resultadoJson,
      },
    });
  },

  // Busca histórico de comparações de um usuário
  async findByUserId(userId) {
    return prisma.comparisons.findMany({
      where:   { user_id: userId },
      orderBy: { created_at: 'desc' },
    });
  },
};
