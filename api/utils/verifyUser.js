import jwt from "jsonwebtoken";
import { errorHandler } from "./errorHandler.js";

export const verifyToken = async (req, res, next) => {
    console.log("Cookies:", req.cookies);
    const token = req.cookies.access_token;
    if (!token) {
        return next(errorHandler(401, "UnAuthorized"));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorHandler(401, "UnAuthorized"));
        }
        req.user = user;
        next();
    })
}