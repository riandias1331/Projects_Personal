const sql = require('mssql');

// Define the User model
class UserModel {
    constructor() {
        this.table = 'Users'; // Replace with your actual table name
    }

    // Get all users
    async getAllUsers(pool) {
        try {
            const request = pool.request();
            const result = await request.query(`SELECT * FROM ${this.table}`);
            return result.recordset;
        } catch (error) {
            throw new Error(`Error fetching users: ${error.message}`);
        }
    }

    // Get a user by ID
    async getUserById(pool, id) {
        try {
            const request = pool.request();
            request.input('id', sql.Int, id);
            const result = await request.query(`SELECT * FROM ${this.table} WHERE id = @id`);
            return result.recordset[0];
        } catch (error) {
            throw new Error(`Error fetching user by ID: ${error.message}`);
        }
    }

    // Create a new user
    async createUser(pool, userData) {
        try {
            const { name, email, password } = userData;
            const request = pool.request();
            request.input('name', sql.NVarChar, name);
            request.input('email', sql.NVarChar, email);
            request.input('password', sql.NVarChar, password);
            const result = await request.query(
                `INSERT INTO ${this.table} (name, email, password) OUTPUT INSERTED.* VALUES (@name, @email, @password)`
            );
            return result.recordset[0];
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    // Update a user
    async updateUser(pool, id, userData) {
        try {
            const { name, email, password } = userData;
            const request = pool.request();
            request.input('id', sql.Int, id);
            request.input('name', sql.NVarChar, name);
            request.input('email', sql.NVarChar, email);
            request.input('password', sql.NVarChar, password);
            const result = await request.query(
                `UPDATE ${this.table} SET name = @name, email = @email, password = @password OUTPUT INSERTED.* WHERE id = @id`
            );
            return result.recordset[0];
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    // Delete a user
    async deleteUser(pool, id) {
        try {
            const request = pool.request();
            request.input('id', sql.Int, id);
            const result = await request.query(
                `DELETE FROM ${this.table} OUTPUT DELETED.* WHERE id = @id`
            );
            return result.recordset[0];
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }
}

module.exports = UserModel;