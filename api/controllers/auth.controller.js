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
//next is used to handle the error
export const google = async (req, res, next) => {
    const { name, email, googlePhotoUrl } = req.body;
    try {
        const user = await User.findOne({ email })
        if (user) {
            const token = jwt.sign({ id: user_id }, process.env.JWT_SECRET);
            const { password, ...rest } = user._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);
        }else{
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            //toString(36) means it will count 0-9 and a-z ==> 36 and slice(-8) means it will generate 0.___8 from where 0 will exclude and the value after the point will displayed
            const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                //Arun => arun39012 we are taking toString(9) only
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });
            await newUser.save();
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password, ...rest } = user._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);
        }
    } catch (err) {
        
    }
}