import mongoose from "mongoose";

// Function to connect to the database
const connectDB = async () => {
    try {
        // Connect to the MongoDB database using the URL from environment variables
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database connected successfully");
    } catch (error) {
        // Catch any errors during connection and log them
        console.error("Database connection failed:", error.message);
        process.exit(1);  // Exit the process with failure
    }
};

// Export the connection function for use in other parts of the application
export default connectDB;
