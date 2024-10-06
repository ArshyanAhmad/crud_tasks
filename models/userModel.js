import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],  // Custom error message
        trim: true  // Removes any trailing spaces
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,  // Ensure email uniqueness across the collection
        lowercase: true,  // Save email in lowercase to avoid case-sensitive issues
        trim: true,
        match: [/.+\@.+\..+/, "Please enter a valid email address"]  // Email format validation
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now  // Automatically set the createdAt date to the current date/time
    }
});

// Create the User model based on the schema
const User = mongoose.model("User", userSchema);

// Export the User model for use in other parts of the application
export default User;
