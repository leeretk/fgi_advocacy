// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
require("dotenv").config();

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Routes // Setup Express
// =============================================================
require('./routing/api-routes.js')(app);
require('./routing/html-routes.js')(app);

//Listener
// =============================================================

app.listen(PORT, function () {
  console.log("App listening on: http://localhost:" + PORT);
});