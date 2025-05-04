// // template model
//     import mongoose, { Document, Schema } from 'mongoose'

//     // 1. Interface para o usuário (com Document para reconhecer como documento do Mongoose)
//     export interface IUser extends Document {
//     name: string
//     email: string
//     password: string
//     createdAt: Date
//     updatedAt: Date
//     }

//     // 2. Schema do usuário
//     const userSchema: Schema = new mongoose.Schema<IUser>({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now },
//     })

//     // 3. Model com tipo definido
//     const User = mongoose.model<IUser>('User', userSchema)

//     export default User

// minha alternativa teste do código

    // import mongoose from 'mongoose'

    // const userSchema = new mongoose.Schema({
    //     name: {
    //         type: String,
    //         required: true,
    //     },
    //     email: {
    //         type: String,
    //         required: true,
    //         unique: true,
    //     },
    //     password: {
    //         type: String,
    //         required: true,
    //     },
    //     createdAt: {    
    //         type: Date,
    //         default: Date.now,
    //     },
    //     updatedAt: {
    //         type: Date,
    //         default: Date.now,
    //     }
    // })

    // const User = mongoose.model('User', userSchema)

    // export default User

//

import mongoose2,  { Document, Schema } from 'mongoose'

export interface IUser2 extends Document {
    name2: string,
    email2: string,
    password2: string
    createdAt2: Date
    updatedAt2: Date
}

const userSchema2: Schema = new mongoose2.Schema<IUser2>({
            name2: {
                type: String,
                required: true,
            },
            email2: {
                type: String,
                required: true,
                unique: true,
            },
            password2: {
                type: String,
                required: true,
            },
            createdAt2: {    
                type: Date,
                default: Date.now,
            },
            updatedAt2: {
                type: Date,
                default: Date.now,
            }
})
const User2 = mongoose2.model<IUser2>('User2', userSchema2)

export default User2