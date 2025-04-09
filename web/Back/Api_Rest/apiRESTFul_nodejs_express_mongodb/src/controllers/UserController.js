const User = require('../models/UserModels.js')

exports.getUsers = async(req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
        
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.getUser = async(req, res) => {
    try {
        const UserId = req.params.id
        const user = await User.findById(UserId)
        if(!user){
            res.status(400).json({ message: "Usário nao encontrado" })
        }
        
        res.status(200).json(user)
        
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.create = async(req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await User.create({
            name,
            email,
            password
        })
        res.status(201).json(user)
        
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.updateUser = async(req, res) => {
    try {
        const UserId = req.params.id
        const updateUser = req.body
        const user = await User.findByIdAndUpdate(UserId, updateUser, { new: true })
        
        if(!user){
            res.status(400).json({ message: "Usário nao encontrado" })
        }
        res.status(200).json({ message: 'Usuário Atualizado com sucesso' })
        
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteUser = async(req, res) => {
    try {
        const UserId = req.params.id
        const deleteUser = req.body
        const user = await User.findByIdAndDelete(UserId, deleteUser)
        
        if(!user){
            res.status(400).json({ message: "Usário nao encontrado" })
        }
        res.status(200).json({ message: 'Usuário Deletado com sucesso' })
        
    } catch (error) {
        res.status(400).json({ message: error.message })
        
    }
}

exports.deleteUsers = async(req, res) => {
    try {
        const users = await User.deleteMany()
        res.status(200).json({ message: 'Usuários Deletados com sucesso' })
        
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
