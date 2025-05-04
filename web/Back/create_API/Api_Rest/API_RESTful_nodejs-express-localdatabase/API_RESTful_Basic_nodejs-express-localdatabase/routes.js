const express = require('express')
const route = express.Router()

const home = require('./src/controllers/homeController')

// get - listar
    // lista um carro
    route.get('/:id', home.Listcar)
    // listar todos os carros
    route.get('/', home.Listcar)

// post
    route.post('/', home.createCar)

// put
    route.put('/:id', home.updateCars)

// delete
    route.delete('/:id', home.Listcar)

module.exports = route