// REQUIREMENTS
// =========================================================
var express = require('express');

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({
  extended: true,
}));

app.use(express.json());

app.use(express.static("public"));

// SETUP EXPRESS
// =========================================================
require('./app/routing/api-routes.js')(app);
require('./app/routing/html-routes.js')(app);

// LISTENER
// =========================================================
app.listen(PORT, function () {
  console.log("App listening on: http://localhost:" + PORT);
});