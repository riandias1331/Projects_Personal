import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

const jwt_secret = process.env.JWT_SECRET;

export const getAllUsersService = async () => {
    return await prisma.user.findMany();
};

export const getUserByIdService = async (id) => {
    return await prisma.user.findUnique({
        where: { id: Number(id) }
    });
};

export const createUserService = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { name, email, password: hashedPassword }
    });

    const token = jwt.sign({ id: user.id }, jwt_secret, { expiresIn: "1h" });

    return { token, user: { id: user.id, name: user.name, email: user.email } };
};

export const updateUserService = async (id, name, email) => {
    return await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email }
    });
};

export const deleteUserService = async (id) => {
    return await prisma.user.delete({
        where: { id: Number(id) }
    });
};

export const deleteUserAllService = async () => {
    if (process.env.NODE_ENV === 'production') {
        throw new Error("Operation not allowed in production");
    }

    const deleted = await prisma.user.deleteMany();
    return {
        count: deleted.count,
        users: [] // Prisma deleteMany não retorna os registros deletados
    };
};
