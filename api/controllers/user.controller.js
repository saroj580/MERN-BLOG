import { errorHandler } from '../utils/errorHandler.js';
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
    }
}