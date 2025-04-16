import { Request, Response } from 'express';
import User from '../models/userModel.js';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: 'error.message' });
    }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ 
            name,
            email,
            password 
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: 'error.message' });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
        if (!updatedUser) {
            res.status(404).json({ message: 'Usuário não encontrado' });
        } else {
            res.status(200).json(updatedUser);
        }
    } catch (error) {
        res.status(400).json({ message:' error.message '});
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            res.status(404).json({ message: 'Usuário não encontrado' });
        } else {
            res.status(200).json({ message: 'Usuário deletado' });
        }
    } catch (error) {
        res.status(400).json({ message:' error.message' });
    }
};