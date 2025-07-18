import { Request, Response } from 'express'
import User, { IUser } from '../models/userModel'

export const getUsersAll = async (req: Request, res: Response) => {
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
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body as { name: string, email: string, password: string }
        const user = await User.create({
            name,
            email,
            password
        })
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        const updateUser = req.body
        const user = await User.findByIdAndUpdate(userId, updateUser, { new: true })

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: "user updated successfully" });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        const user = await User.findByIdAndDelete(userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'user successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}

export const deleteUserAll = async (req: Request, res: Response) => {
 try {
        const user = await User.deleteMany()
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'all user updated successfully' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}