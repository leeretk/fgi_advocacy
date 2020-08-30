
var http = require("http");

// Link in Advocate Data
var advocatesData = require('../data/advocates.js');

// Includes Two Routes
function apiRoutes(app) {

  // A GET route with the url /api/advocates. This will be used to display a JSON of all possible advocates.
  app.get('/api/advocates', function (request, response) {
    response.json(advocatesData);
  });
  
  app.post("/api/advocates", function(req, res) {
    var bestMatch = {
      advocate: "",
      name: "",
      email: "",
      advocateDifference: Infinity
    };
    // Here we take the result of the user"s survey POST and parse it.
    var userData = req.body;
    var userScores = userData.scores;
    // This variable will calculate the difference between the user"s scores and the scores of
    // each user in the database
    var totalDifference;
    // Here we loop through all the advocate possibilities in the database.
    for (var i = 0; i < advocatesData.length; i++) {
      var currentAdvocate = advocatesData[i];
      totalDifference = 0;
      console.log(currentAdvocate.advocate);
      // We then loop through all the scores of each advocate
      for (var j = 0; j < currentAdvocate.scores.length; j++) {
        var currentAdvocateScore = currentAdvocate.scores[j];
        var currentUserScore = userScores[j];
        // We calculate the difference between the scores and sum them into the totalDifference
        totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentAdvocateScore));
      }
      // If the sum of differences is less then the differences of the current "best match"
      if (totalDifference <= bestMatch.advocateDifference) {
        // Reset the bestMatch to be the new advocate.
        bestMatch.advocate = currentAdvocate.advocate;
        bestMatch.name = currentAdvocate.name;
        bestMatch.photo = currentAdvocate.photo;
        bestMatch.description = currentAdvocate.description;
        bestMatch.advocateDifference = totalDifference;
      }
    }
    // Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
    // the database will always return that the user is the user's best advocate).
    advocatesData.push(userData);
    // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page
    res.json(bestMatch);
  });
}

// Export for use in main server.js file
module.exports = apiRoutes;