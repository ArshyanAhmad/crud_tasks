import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const isAuthenticate = async (req, res, next) => {
    try {

        const { token } = req.cookies;

        if (!token) {
            return res.status(404).json({
                success: false,
                message: "Login First"
            })
        }

        const userId = jwt.decode(token, process.env.JWT_SECRET);
        req.user = await User.findById(userId);

        next();
    }
    catch (error) {
        console.log("Internal Server Error ", error.message);
        res.status(400).json({
            success: false,
            message: "Error while authenticate"
        })
    }
}