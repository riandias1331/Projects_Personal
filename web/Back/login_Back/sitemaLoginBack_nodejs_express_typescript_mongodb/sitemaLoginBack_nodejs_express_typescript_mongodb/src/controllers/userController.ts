import { Request, Response } from "express";
import User, { IUser } from '../models/userModel'


export const getUsers = async (req: Request, res: Response) => {
    try {
        const users: IUser[] = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}


export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body as { name: string, email: string, password: string }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        const user = await User.create({
            name,
            email,
            password
        })

        console.log(user)
        // res.status(201).json(user)
        res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        res.status(400).json({ message: (error as Error).message })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as { email: string, password: string }

        const user = await User.findOne({ email });
        if (!user) {
            console.log('Invalid email ')
            return res.status(400).json({ error: 'User not found' });
        }

        console.log('Login successfully:', user);
        res.status(200).json({ message: 'Login successfully', user });

    } catch (error) {
        res.status(400).json({ message: (error as Error).message })
    }
}