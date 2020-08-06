const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
    let creatures = fs.readFileSync("./prehistoric_creatures.json");
    let creatureData = JSON.parse(creatures);
    console.log(creatureData);

    let typeFilter = req.query.typeFilter;
    if (typeFilter) {
        creatureData = creatureData.filter((creature) => {
            return creature.type.toLowerCase() === typeFilter.toLowerCase();
        })
    }

    res.render("prehistoric_creatures/index", {myCreature: creatureData});
})

router.get("/prehistoric_creatures/new", (req, res) => {
    res.render("prehistoric_creatures/new");
})

router.get("/prehistoric_creatures/:id", (req, res) => {
    let creatures = fs.readFileSync("./prehistoric_creatures.json");
    let creatureData = JSON.parse(creatures);
    // needs an index not a string
    let creatureIndex = parseInt(req.params.id);
    res.render("prehistoric_creatures/show", {myCreature: creatureData[creatureIndex]})
})

router.post("/", (req, res) => {
    let creatures = fs.readFileSync("./prehistoric_creatures.json");
    let creatureData = JSON.parse(creatures);
    creatureData.push(req.body);
    // JSON stringify undoes JSON parse
    fs.writeFileSync("./prehistoric_creatures.json", JSON.stringify(creatureData));
    // send back to /prehistoric page at end
    res.redirect("/prehistoric_creatures");
})

module.exports = router;