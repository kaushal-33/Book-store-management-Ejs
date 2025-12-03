import express from "express";
import connectDB from "./config/db.js";
import bookModel from "./models/bookModel.js";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
connectDB();

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));

app.get("/", (req, res) => {
    return res.render("index")
})

app.post("/add-book", async (req, res) => {

    const newBook = new bookModel(req.body)
    await newBook.save();

    return res.redirect("view-book");
})

app.get("/view-book", async (req, res) => {
    const bookArr = await bookModel.find();

    return res.render("viewBook", { bookArr })
})

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    console.log("server started...")
})
