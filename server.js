
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// Require all models
const db = require("./models");

const PORT = process.env.PORT || 3004;

// Initialize Express
const app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/gooddealsdb";
console.log("This is MONGODB_URI vvvvvv")
console.log(MONGODB_URI)
console.log("This is process.env.MONGODB_URI vvvvvv")
console.log(process.env.MONGODB_URI)
mongoose.connect(MONGODB_URI)

require("./routes/zip-routes.js")(app);
require("./routes/product-routes.js")(app);
require("./routes/saved-routes.js")(app);

// Set Handlebars.
let exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});


