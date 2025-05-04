const User = require('../models/User.js')

const bcrypt = require('bcrypt')


exports.getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

exports.get = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

exports.create = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const user = await User.create({
            name,
            email,
            password: hashPassword
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.update = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;
        const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'user not foundo' });
        } res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleted = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        } res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


exports.deletedAll =  async (req, res) => {
    try {
        const user = await User.deleteMany();
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        } res.status(200).json({ message: 'All users have been deleted.'  });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error when deleting users.' });
    }
};


