import { prisma } from '../config/prisma';

export const UserModel = {
  findByEmail: async (email: string) => {
    return prisma.user.findUnique({ where: { email } });
  },
  create: async (data: { email: string; password: string; name: string }) => {
    return prisma.user.create({ data });
  }
};
