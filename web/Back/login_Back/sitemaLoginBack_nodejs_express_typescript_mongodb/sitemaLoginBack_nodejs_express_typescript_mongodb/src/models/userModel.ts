import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document{
    name: string,
    email: string,
    password: string,
    createAt: Date,
    updateAt: Date
}


const userSchema = new mongoose.Schema<IUser>({
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

const User = mongoose.model("UserLogin", userSchema)

export default User