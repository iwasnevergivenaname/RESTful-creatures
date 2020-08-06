const express = require("express");
const app = express();
const ejsLayouts = require("express-ejs-layouts");
const fs = require("fs");
const PORT = 4200;

// middleware
app.set("view engine", "ejs");
app.use(ejsLayouts);
// body parser middleware
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.render("home");
})

app.get("/dinosaurs", (req, res) => {
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    // make that nasty json legible
    let dinoData = JSON.parse(dinosaurs);
    res.render("dinosaurs/index", {myDino: dinoData});
})

app.get("/dinosaurs/new", (req, res) => {
    res.render("dinosaurs/new");
})

app.get("/dinosaurs/:id", (req, res) => {
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    let dinoData = JSON.parse(dinosaurs);
    // needs an index not a string
    let dinoIndex = parseInt(req.params.id);
    res.render("dinosaurs/show", {myDino: dinoData[dinoIndex]})
})

app.post("/dinosaurs", (req, res) => {
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    let dinoData = JSON.parse(dinosaurs);
    dinoData.push(req.body);
    // JSON stringify undoes JSON parse
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));
    // send back to /dinosaurs page at end
    res.redirect("/dinosaurs");
})

app.listen(PORT, () => {
    console.log(`lisenting to port #${PORT}`);
})