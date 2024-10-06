import express from "express";
import { register, login, logout, getMyProfile } from "../controllers/userControllers.js";
import { isAuthenticate } from "../middlewares/auth.js";

const router = express.Router(); 


// post methods
router.post("/register", register);

router.post("/login", login);

router.get("/logout", isAuthenticate, logout);

router.get("/myprofile", isAuthenticate, getMyProfile);

export default router;