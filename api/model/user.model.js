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
    profilePicture: {
        type: String,
        default : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    }
}, { tinestamps: true })
// timestamp is used to store the time when the data is created and updated

const User = mongoose.model('User', userSchema);
// User is the name of the model and userSchema is the schema of the model

export default User;