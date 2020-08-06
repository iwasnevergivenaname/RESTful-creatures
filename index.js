const express = require("express");
const app = express();
const ejsLayouts = require("express-ejs-layouts");
const fs = require("fs");
const methodOverride = require("method-override");
const PORT = 4200;

// middleware
app.set("view engine", "ejs");
app.use(ejsLayouts);
// body parser middleware
app.use(express.urlencoded({extended: false}));
// config method-override
app.use(methodOverride('_method'));
// connect controllers
app.use('/dinosaurs', require('./controllers/dinosaurs'));
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'));

app.get("/", (req, res) => {
    res.render("home");
})

app.listen(PORT, () => {
    console.log(`lisenting to port #${PORT}`);
})