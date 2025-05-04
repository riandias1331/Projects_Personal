import pool from './config/dbConfig.js';

exports.getAllUsers = async (req, res) => {
    try {
        const { rows: users } = await pool.query('SELECT * FROM users');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const { rows: [newUser] } = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password]
        );
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userID = req.params.id;
        const { name, email, password } = req.body;
        const { rows: [updatedUser] } = await pool.query(
            'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
            [name, email, password, userID]
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userID = req.params.id;
        const { rowCount } = await pool.query('DELETE FROM users WHERE id = $1', [userID]);
        if (rowCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
}