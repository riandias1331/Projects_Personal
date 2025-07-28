const express = require("express")
const port = 3333
const app = express()
const routes = require("./routes")
const mongoose = require("mongoose")

// middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// routes
app.use(routes)

//// Rota GraphQL
app.use('/graphql', graphqlHTTP({
  schema: rootSchema,
  rootValue: rootResolver,
  graphiql: true // Interface gráfica para testar queries
}));

// Database
mongoose.connect('mongodb+srv://pereiradiasrian:galoucura@cluster0.lw63lm9.mongodb.net/GraphqlNodejs?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('databse is running')
    })
    .catch((error) => console.log(error))

app.listen(port, () => {
    console.log("Server is running")
})