import User from '../model/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils.js/errorHandler.js';
import jwt from 'jsonwebtoken';
// installing bcryptjs using 'npm i bcryptjs'
// bcrypt is used to hash i.e hide the user password in the database

export const signup = async (req, res, next) => {
    
    const { username, email, password } = req.body;
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandler(400, "All fields are required"));
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
        next(errorHandler(400, "All fields are required"));
    }
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, "User not found"));
        }
        //here firstly the the password will compare with the existing password then only it will authorize to sign in
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
//next is used to handle the error
export const google = async (req, res, next) => {
    const { name, email, googlePhotoUrl } = req.body;
    try {
        const user = await User.findOne({ email })
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password, ...rest } = user._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password, ...rest } = newUser._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);
        }
    } catch (err) {
        next(err);
    }
}