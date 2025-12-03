import express from "express";
import connectDB from "./config/db.js";
import BookModel from "./models/bookModel.js";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
connectDB();

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));

app.get("/", (req, res) => {
    return res.render("index", {
        book: null
    })
})

app.post("/add-book", async (req, res) => {
    try {
        const newBook = new BookModel(req.body)
        await newBook.save();

        return res.redirect("view-book");
    } catch (error) {
        console.log(error);
    }
})

app.get("/view-book", async (req, res) => {
    try {
        const bookArr = await BookModel.find();

        return res.render("viewBook", { bookArr })
    } catch (error) {
        console.log(error)
    }
})

app.get("/delete-book/:id", async (req, res) => {
    try {
        await BookModel.findByIdAndDelete(req.params.id);
        return res.redirect("/view-book");
    } catch (error) {
        console.log(error)
    }
})

app.get("/:id", async (req, res) => {
    try {
        const book = await BookModel.findById(req.params.id);
        return res.render("index", { book });
    } catch (error) {
        console.log(error)
    }
})

app.post("/update-book/:id", async (req, res) => {
    try {
        await BookModel.findByIdAndUpdate(req.params.id, req.body);
        return res.redirect("/view-book");
    } catch (error) {
        console.log(error)
    }
})

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    console.log("server started...")
})
