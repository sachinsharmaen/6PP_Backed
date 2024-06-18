import mongoose from 'mongoose';

const userlogin = new mongoose.Schema({
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
    }
},{timestamps: true})

const User = mongoose.model('User', userlogin);

export default User;