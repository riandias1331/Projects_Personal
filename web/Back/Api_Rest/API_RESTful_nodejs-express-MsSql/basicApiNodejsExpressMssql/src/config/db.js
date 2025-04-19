const sql = require('mssql');

const dbConfig = {
    user: 'sa',
    password: 'your_password', 
    server: 'localhost',
    database: 'your_database',
    options: {
        encrypt: true, // Use this if you're on Windows Azure
        trustServerCertificate: true // Change to true for local dev / self-signed certs
    }
};

const connectToDatabase = async () => {
    try {
        const pool = await sql.connect(dbConfig);
        console.log('Connected to the database!');
        return pool;
    } catch (err) {
        console.error('Database connection failed:', err);
        throw err;
    }
}

module.exports = connectToDatabase;