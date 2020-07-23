
var http = require("http");

// Link in Friends Data
var friendsData = require('../data/friends.js');

// Includes Two Routes
function apiRoutes(app) {

  // A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
  app.get('/api/friends', function (request, response) {
    response.json(friendsData);
  });
  
  app.post("/api/friends", function(req, res) {
    var bestMatch = {
      name: "",
      email: "",
      friendDifference: Infinity
    };
    // Here we take the result of the user"s survey POST and parse it.
    var userData = req.body;
    var userScores = userData.scores;
    // This variable will calculate the difference between the user"s scores and the scores of
    // each user in the database
    var totalDifference;
    // Here we loop through all the friend possibilities in the database.
    for (var i = 0; i < friendsData.length; i++) {
      var currentFriend = friendsData[i];
      totalDifference = 0;
      console.log(currentFriend.name);
      // We then loop through all the scores of each friend
      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];
        // We calculate the difference between the scores and sum them into the totalDifference
        totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
      }
      // If the sum of differences is less then the differences of the current "best match"
      if (totalDifference <= bestMatch.friendDifference) {
        // Reset the bestMatch to be the new friend.
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.description = currentFriend.description;
        bestMatch.friendDifference = totalDifference;
      }
    }
    // Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
    // the database will always return that the user is the user's best friend).
    friendsData.push(userData);
    // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page
    res.json(bestMatch);
  });
}

// Export for use in main server.js file
module.exports = apiRoutes;