import User from '../model/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils.js/errorHandler.js';
// installing bcryptjs using 'npm i bcryptjs'
// bcrypt is used to hash i.e hide the user password in the database

export const signup = async (req, res, next) => {
    
    const { username, email, password } = req.body;
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        new(errorHandler(400, "All fields are required"));
    }

    //hashing the password
    const hashpaswword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password : hashpaswword
    });

    try {
        await newUser.save();
        res.json("Signup success");
    } catch (err) {
        next(err);
    }
    //after getting the information from the user we are saving it to the database
}