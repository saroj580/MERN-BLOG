import User from '../model/user.model.js';
import bcryptjs from 'bcryptjs';
// installing bcryptjs using 'npm i bcryptjs'
// bcrypt is used to hash i.e hide the user password in the database

export const signup = async (req, res) => {
    
    const { username, email, password } = req.body;
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        return res.status(400).json({ message: "All fields are required" });
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
        res.status(500).json({message: err.message});
    }
    //after getting the information from the user we are saving it to the database
}