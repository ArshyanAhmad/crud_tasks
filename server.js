import app from "./app.js";
import "dotenv/config"
import connectDB from "./db/database.js";

connectDB(); // calling database to connect
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is listening on port at ${PORT}`);
})