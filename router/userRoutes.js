import express from "express";
import { register, login, logout } from "../controllers/userControllers.js";

const router = express.Router(); 


// post methods
router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

export default router;