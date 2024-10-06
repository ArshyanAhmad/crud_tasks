import express from "express";
import userRoutes from "./router/userRoutes.js"
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

// User Router
app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Working");
})

export default app;