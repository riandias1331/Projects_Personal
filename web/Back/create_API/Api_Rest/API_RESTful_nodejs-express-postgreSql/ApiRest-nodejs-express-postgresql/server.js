const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Configurações
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
const exemploRoutes = require('./src/routes/exemploRoutes');
app.use('/api/exemplos', exemploRoutes);

// Conexão com o banco de dados
const db = require('./src/models');
db.sequelize.sync()
  .then(() => {
    console.log('Banco de dados conectado e sincronizado');
  })
  .catch((err) => {
    console.log('Falha ao conectar ao banco de dados: ' + err.message);
  });

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}.`);
});