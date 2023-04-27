import jwt from "jsonwebtoken";
import User from "../models/User.js";

//Middleware function used to protect user routes
export const verifyUserWithToken = async (req, res, next) => {
    try {

        let token = req.cookies.accessToken;
        if (!token) {
            return res.status(403).send("Access denied");
        }

        const verified = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(500).json({ message: `An error has occured: ${error}` })
    }
}

export const verifyAdmin = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if (!token) {
            return res.status(403).send("Access denied");
        }
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }
        const decode = jwt.verify(token, process.env.JWT_TOKEN_ADMIN);
        const userFound = await User.findOne(decode._id);
        if (userFound.role != "admin") {
            return res.status(403).json({ message: "Access denied, user is not admin" });
        }
        req.user = decode;
        next();
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}