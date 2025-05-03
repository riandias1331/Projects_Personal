import bcrypt from 'bcryptjs';
import { UserModel } from '../models/UserModel';
import { generateToken } from '../utils/generateToken';

export const AuthService = {
  register: async (email: string, password: string, name: string) => {
    const userExists = await UserModel.findByEmail(email);
    if (userExists) throw new Error('Usuário já existe');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ email, password: hashedPassword, name });

    const token = generateToken(user.id);
    return { user, token };
  },

  login: async (email: string, password: string) => {
    const user = await UserModel.findByEmail(email);
    if (!user) throw new Error('Usuário não encontrado');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Senha incorreta');

    const token = generateToken(user.id);
    return { user, token };
  }
};
