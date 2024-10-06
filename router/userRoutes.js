import express from "express";
import { register, login } from "../controllers/userControllers.js";

const router = express.Router(); 


// post methods
router.post("/register", register);

router.post("/login", login);

export default router;