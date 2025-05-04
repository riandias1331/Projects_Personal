const mongoose = require('mongoose')

const HomeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    creatAt: {
        type: Date,
        default: Date.now

    }
})

//                                nameDataBase
// class homedatabase {

// }

// module.exports = homedatabase
const HomeModel = mongoose.model('apiRestful_express,mongo,prisma', HomeSchema)

module.exports = HomeModel
