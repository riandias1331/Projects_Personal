import { Request, Response } from "express";
import User, { IUser } from '../models/userModel.ts'


export const getUsers = async(req: Request, res: Response) => {
    try {
        const users: IUser[] = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export const register = async(req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body as { name: string, email: string, password: string }
    } catch (error) {
        res.status(400).
    }
}