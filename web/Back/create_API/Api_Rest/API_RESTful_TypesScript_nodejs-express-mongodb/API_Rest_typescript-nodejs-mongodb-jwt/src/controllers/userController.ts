import { Request, Response } from 'express'
import User, { IUser } from '../models/userModel'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export const getUserAll = async (req: Request, res: Response) => {
    try {
        const users: IUser[] = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)

        if (!User) {
            res.status(400).json({ message: "User not found" })
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}
export const create = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body as { name: string; email: string; password: string };
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    // Criptografa a senha com bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashPassword });

    // Gera o token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    console.log('token:', token, user);
    res.status(201).json({ message: 'User created successfully', token, user });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}
export const updateeUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        const userUpdated = req.body
        const user = await User.findByIdAndUpdate(userId, userUpdated, { new: true })

        if (!User) {
            res.status(400).json({ message: "User not found" })
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        const user = await User.findByIdAndDelete(userId)

        if (!User) {
            res.status(400).json({ message: "User not found" })
        }

        res.status(200).json({ message: "User deleted" })
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}
export const deleteUserAll = async (req: Request, res: Response) => {
    try {
        const user = await User.deleteMany()

        if (!User) {
            res.status(400).json({ message: "Users not found" })
        }

        res.status(200).json({ message: "Users  deleted" })
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}

