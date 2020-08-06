const express = require("express");
const app = express();
const ejsLayouts = require("express-ejs-layouts");
const fs = require("fs");
const PORT = 4200;

app.set("view engine", "ejs");
app.use(ejsLayouts);

app.get("/", (req, res) => {
    res.render("home");
})

app.get("/dinosaurs", (req, res) => {
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    // make that nasty json legible
    let dinoData = JSON.parse(dinosaurs);
    res.render("dinosaurs/index", {myDinos: dinoData});
})

app.listen(PORT, () => {
    console.log(`lisenting to port #${PORT}`);
})