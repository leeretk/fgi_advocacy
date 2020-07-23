// REQUIREMENTS
// =========================================================

require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const app = express();

var billScraper = require("bill-scraper");

// Define API routes here
// Send every other request to the React app
// Define any API routes before this runs

app.use(express.urlencoded({
  extended: true,
}));

app.use(express.json());
app.use(express.static("public"));


// Routes Routes
// =========================================================
require('./app/routing/api-routes.js')(app);
require('./app/routing/html-routes.js')(app);
app.use(routes);


// Define middleware here
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


// LISTENER
// =========================================================
app.listen(PORT, function () {
  console.log("App listening on: http://localhost:" + PORT);
});


mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb://robmccandless:Saraannmcc1@ds139331.mlab.com:39331/heroku_qsv472z6",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

mongoose.connect("mongodb://localhost/bills");
billScraper.generateDB("hr", 115, 1);