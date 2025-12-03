import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    language: {
        type: String,
        enum: ["hindi", "english", "gujarati"],
        required: true
    },
    bestSeller: {
        type: Boolean,
        default: false
    },
    newArrival: {
        type: Boolean,
        default: false
    }
});

const bookModel = mongoose.model("bookModel", bookSchema);

export default bookModel;
