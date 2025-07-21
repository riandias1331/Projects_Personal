import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const getUsers = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findMany()
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params
        const user = await prisma.user.findUnique({
            where: { id: userId.id }
        })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })
        console.log('User created successfully', user)
        res.status(201).json(user)
    } catch (error) {
        console.log( 'Error creating user:', error)
        res.status(500).json({ message: (error as Error).message })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params
        const UserUpdate = req.body

        const user = await prisma.user.update({
            where: { id: userId.id },
            data: UserUpdate,
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' })

        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params
        await prisma.user.delete({
            where: { id: userId.id }
        })
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}

