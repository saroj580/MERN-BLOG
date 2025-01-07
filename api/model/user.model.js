import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, { tinestamps: true })
// timestamp is used to store the time when the data is created and updated

const User = mongoose.model('User', userSchema);
// User is the name of the model and userSchema is the schema of the model

export default User;