import User from '../model/user.model.js';
import { errorHandler } from '../utils/errorHandler.js';

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return next(errorHandler(404, "User not found"));
        }
        const { password, ...rest } = user._doc; // Exclude password from response
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}
import bcryptjs from 'bcryptjs'

export const test = (req, res) => {
    res.json({message : "Api is Working"});
}

export const updateUser = async (req, res, next) => {
    console.log(req.user);
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, "you are not allow to update this user"));
    } 
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, "Password must be at least 6 characters"))
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(errorHandler(400, "Username must be between 7 to 20 characters"));
        }
        if (req.body.username.includes(' ')) {
            return next(errorHandler(400, "Username cannot be contains the space"));
        }
        if (req.body.username  !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, "Username must be lowercase"));
        }if (!req.body.username.match(/^[a-zA-Z0-0]+$/)) {
            return next(errorHandler(400, "Username can only contain letters and numbers"));
        }
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.userId, {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password
                }
            }, { new: true });
            const { password, ...rest } = updateUser._doc;
            res.status(200).json(rest);
        } catch (error) {
         next(error)   
        }
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, "you are not allowed to delete this account"))
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json("User has been deleted Succefully");
    } catch (error) {
        next(error);
    }
}