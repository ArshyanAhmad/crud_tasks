import express from "express";
import userRoutes from "./router/userRoutes.js"
import taskRouter from "./router/taskRouter.js"
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

// User Router
app.use("/api/v1/users", userRoutes);
app.use("/api/v2/tasks", taskRouter);

app.get("/", (req, res) => {
    res.send("Working");
})

export default app;