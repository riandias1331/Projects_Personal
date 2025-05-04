const User = requere('../models/userModel');

exports.getUsersAll = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
exports.getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.getUserById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
exports.createUser = async (req, res) => {
    const { name, email } = req.body;
    try {
        const newUser = await User.createUser(name, email);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.updateUser = async (req, res) => {  
    const userId = req.params.id;
    const { name, email } = req.body;
    try {
        const updatedUser = await User.updateUser(userId, name, email);
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await User.deleteUser(userId);
        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}