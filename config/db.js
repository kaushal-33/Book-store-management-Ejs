import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/libraryManagementDB"

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Database connected successfully...");
        });

        await mongoose.connect(MONGO_URI);

    } catch (error) {
        console.log("Error connecting to database:", error);
    }
};

export default connectDB;