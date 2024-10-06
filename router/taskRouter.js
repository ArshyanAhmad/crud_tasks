import express from "express"
import { isAuthenticate } from "../middlewares/auth.js";
import { deleteTask, getMyTasks, newTask, updateTasks } from "../controllers/taskControllers.js";
const router = express.Router();

router.post("/add", isAuthenticate, newTask);

router.get("/mytask", isAuthenticate, getMyTasks);

router.route("/:id").put(isAuthenticate, updateTasks).delete(isAuthenticate, deleteTask);


export default router;
