import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import { sendCookie } from "../utils/features.js";


export const register = async (req, res) => {
    try {
        // Extracting name, email, and password from the request body
        const { name, email, password } = req.body;

        // Checking if the user already exists by looking for the email in the database
        let user = await User.findOne({ email });

        // If the user exists, return an error message with a 400 status code
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hashing the password using bcrypt for security
        const hashedPassword = await bcrypt.hashSync(password, 10);

        // Creating a new user with the hashed password
        user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        sendCookie(user, res, 201, `Registered successfully`)

    } catch (error) {
        // Catch any errors during the registration process
        console.error("Error during registration:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


export const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        let user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(404).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        sendCookie(user, res, 200, `Welcome back ${user.name}`)

    } catch (error) {
        // Catch any errors during the login process
        console.error("Error during login:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to login due to internal server error"
        });
    }
}
