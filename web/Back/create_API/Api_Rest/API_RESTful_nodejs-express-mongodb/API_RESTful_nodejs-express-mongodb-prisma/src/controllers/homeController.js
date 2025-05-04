const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');


exports.getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cria um novo usuário
exports.created = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword
            }
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.update = async (req, res) => {

    try {
        const userId = req.params.id;
        const updatedData = req.body;
        const user = await prisma.user.update({
            where: { id: userId },
            data: updatedData
        });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.deleted = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await prisma.user.delete({
            where: { id: userId }
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.deletedAll = async (req, res) => {
    try {
        await prisma.user.deleteMany();
        res.status(200).json({ message: 'Todos os usuários foram deletados.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar os usuários.' });
    }
};
