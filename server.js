require("dotenv").config();
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

app.route("/")
    .get((req, res) => {
        res.render("index");
    })

app.route("/projects")
    .get((req, res) => {
        res.render(`projects/${req.query.name}`);
    })

app.listen(process.env.PORT, () => {
    console.log("Connected to server on port " + process.env.PORT);
});