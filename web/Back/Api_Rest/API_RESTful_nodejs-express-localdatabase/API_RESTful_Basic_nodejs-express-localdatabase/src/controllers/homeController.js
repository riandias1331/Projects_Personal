const LocalModel = require('../models/userLocal')

const carsArray = ['laferrari', 'veneno', 'spider',' amg', 'chiron']

// get
    exports.Listcar = (req, res) => {
        const { id } = req.params

        return res.json(LocalModel[id])
    }   

    exports.ListCars = (req, res) => {
        return res.json()
    }

//post
exports.createCar = (req, res) => {
    const { car } = req.body
    LocalModel.push(car)
    
    return res.json(LocalModel)
}

//put
exports.updateCars = (req, res) => {
    const { id } = req.params
    const { car } = req.body
    LocalModel[id] = car
    
    return res.json(LocalModel)
}


//delete
exports.deleteCar = (req, res) => {
    const { id } = req.params
    LocalModel.splice(id, 1)

    return res.json({ message: 'o curso foi deletado' })
}