const express = require("express")
const route = express.Router()

route.get('')
route.get('')
route.get('')
route.get('')

module.exports = route

const { graphqlHTTP } = require('express-graphql');
const userSchema = require('../views/userSchema');
const userController = require('../controllers/userController');

module.exports = function(app) {
  app.use('/graphql', graphqlHTTP({
    schema: userSchema,
    rootValue: userController,
    graphiql: true
  }));
};