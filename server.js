require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

mongoose.connect(process.env.DATABASE_URL);
mongoose.connection.on("error", error => console.error(error));
mongoose.connection.once("open", () => console.log("Connected to Mongoose"));

app.route("/")
    .get((req, res) => {
        res.render("index");
    })

app.route("/projects")
    .get((req, res) => {
        res.render(`projects/${req.query.name}`);
    })

app.listen(process.env.PORT);