const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
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

router.get("/dinosaurs/new", (req, res) => {
    res.render("dinosaurs/new");
})

router.get("/dinosaurs/:id", (req, res) => {
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    let dinoData = JSON.parse(dinosaurs);
    // needs an index not a string
    let dinoIndex = parseInt(req.params.id);
    res.render("dinosaurs/show", {myDino: dinoData[dinoIndex]})
})

router.post("/", (req, res) => {
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    let dinoData = JSON.parse(dinosaurs);
    dinoData.push(req.body);
    // JSON stringify undoes JSON parse
    fs.writeFileSync("../dinosaurs.json", JSON.stringify(dinoData));
    // send back to /dinosaurs page at end
    res.redirect("/dinosaurs");
})

module.exports = router;
