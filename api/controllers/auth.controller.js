import User from '../model/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils.js/errorHandler.js';
import jwt from 'jsonwebtoken';
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

// creating a signin function
export const signin = async (req, res, next) => { 
    const { email, password } = req.body;
    if(!email || !password || email === '' || password === '') {
        new(errorHandler(400, "All fields are required"));
    }
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            next(errorHandler(404, "User not found"));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, "Invalid password"));
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res.status(200).cookie('access_token', token, {
            httpOnly: true
        }).json(rest);
    } catch (error) {
        next(error);
    }

}