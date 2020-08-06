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

// index
app.get("/dinosaurs", (req, res) => {
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    // make that nasty json legible
    let dinoData = JSON.parse(dinosaurs);

    let nameFilter = req.query.nameFilter;
    if (nameFilter) {
        dinoData = dinoData.filter((dino) => {
            return dino.name.toLowerCase() === nameFilter.toLowerCase();
        })
    }

    res.render("dinosaurs/index", {myDino: dinoData});
})

app.get("/prehistoric_creatures", (req, res) => {
    let prehistoricCreatures = fs.readFileSync("./prehistoric_creatures.json");
    let prehistoricData = JSON.parse(prehistoricCreatures);
    console.log(prehistoricData);

    let typeFilter = req.query.typeFilter;
    if (typeFilter) {
        prehistoricData = prehistoricData.filter((creature) => {
            return creature.type.toLowerCase() === typeFilter.toLowerCase();
        })
    }

    res.render("prehistoric_creatures/index", {myCreature: prehistoricData});
})

app.get("/dinosaurs/new", (req, res) => {
    res.render("dinosaurs/new");
})

app.get("/prehistoric_creatures/new", (req, res) => {
    res.render("prehistoric_creature/new");
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

app.post("/prehistoric_creatures", (req, res) => {
    let creatures = fs.readFileSync("./prehistoric_creatures.json");
    let creatureData = JSON.parse(creatures);
    creatureData.push(req.body);
    // JSON stringify undoes JSON parse
    fs.writeFileSync("./prehistoric_creatures.json", JSON.stringify(dinoData));
    // send back to /prehistoric page at end
    res.redirect("/prehistoric_creatures");
})

app.listen(PORT, () => {
    console.log(`lisenting to port #${PORT}`);
})