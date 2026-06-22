import prisma from '../prismaClient.js';

export const User = {
  async create(email, passwordHash) {
    return prisma.users.create({
      data: { email, password_hash: passwordHash },
      select: { id: true, email: true, created_at: true },
    });
  },

  async findByEmail(email) {
    return prisma.users.findUnique({
      where: { email },
    });
  },

  async findById(id) {
    return prisma.users.findUnique({
      where: { id },
      select: { id: true, email: true, created_at: true },
    });
  },
};
