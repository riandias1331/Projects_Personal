// Importa a configuração da conexão com o banco de dados
import pool from "../config/db.js";

// Serviço para buscar todos os usuários no banco de dados
export const getAllUsersService = async (req, res) => {
    try {
        // Executa a consulta SQL para selecionar todos os usuários
        const result = await pool.query("SELECT * FROM users");

        // Retorna os dados com status 200 (OK)
        res.status(200).json(result.rows);
    } catch (error) {
        // Loga o erro no console em caso de falha
        console.error(error);

        // Retorna uma mensagem de erro com status 500 (Erro interno do servidor)
        res.status(500).json({ message: "Error fetching users" });
    }
}

// Serviço para buscar um usuário específico pelo ID
export const getUserByIdService = async (req, res) => {
    const { id } = req.params; // Extrai o ID da URL
    try {
        // Executa a consulta SQL para buscar o usuário com o ID fornecido
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

        // Verifica se o usuário foi encontrado
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" }); // Retorna erro caso não exista
        }

        // Retorna os dados do usuário encontrado
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching user" });
    }
}

// Serviço para criar um novo usuário
export const createUserService = async (req, res) => {
    const { name, email } = req.body; // Extrai nome e email do corpo da requisição
    try {
        // Insere o novo usuário no banco de dados e retorna os dados inseridos
        const result = await pool.query(
            "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
            [name, email]
        );

        // Retorna os dados do usuário criado com status 201 (Criado)
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user" });
    }
}

// Serviço para atualizar os dados de um usuário existente
export const updateUserService = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        // Atualiza os dados do usuário com base no ID
        const result = await pool.query(
            "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
            [name, email, id]
        );

        // Verifica se o usuário foi encontrado e atualizado
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Retorna os dados atualizados do usuário
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating user" });
    }
}

// Serviço para deletar um usuário do banco de dados
export const deleteUserService = async (req, res) => {
    const { id } = req.params;
    try {
        // Deleta o usuário com o ID fornecido e retorna os dados excluídos
        const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);

        // Verifica se o usuário existia
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Retorna mensagem de sucesso na exclusão
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting user" });
    }
}