import mongoose from 'mongoose';
const Users = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
},{timestamps: true})

const Messge = mongoose.model('Message', Users);

export default Messge;