const express = require("express");
const app = express();
const ejsLayouts = require("express-ejs-layouts");
const PORT = 4200;

app.set("view engine", "ejs");
app.use(ejsLayouts);

app.listen(PORT, () => {
    console.log(`lisenting to port #${PORT}`);
});