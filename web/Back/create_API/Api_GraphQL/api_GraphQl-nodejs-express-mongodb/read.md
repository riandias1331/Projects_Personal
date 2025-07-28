mkdir graphql-api-users
cd graphql-api-users
npm init -y
Instale as dependências básicas:

bash
npm install express express-graphql graphql mongoose cors
npm install --save-dev nodemon dotenv
Crie um arquivo .env para variáveis de ambiente:

env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/graphql_users_db
Passo 2: Estrutura de Pastas (MVC)
Crie a seguinte estrutura de pastas:

text
graphql-api-users/
├── src/
│   ├── models/          # Modelos do MongoDB
│   ├── controllers/     # Lógica de negócios
│   ├── schemas/         # Schemas GraphQL
│   ├── resolvers/       # Resolvers GraphQL
│   └── app.js           # Configuração principal
├── .env
├── package.json
└── server.js           # Ponto de entrada




Criar usuário:

graphql
mutation {
  createUser(input: {
    name: "João Silva",
    email: "joao@example.com",
    age: 30
  }) {
    id
    name
    email
  }
}
Buscar todos os usuários:

graphql
query {
  users {
    id
    name
    email
    age
  }
}
Buscar usuário por ID:

graphql
query {
  user(id: "ID_DO_USUARIO") {
    name
    email
    age
  }
}