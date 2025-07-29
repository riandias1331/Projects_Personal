import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    createAt: Date,
    updateAt: Date
}


const userSchema = new mongoose.Schema({
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
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date
    }
})

const UserModel = mongoose.model<IUser>('User', userSchema)

export default UserModel