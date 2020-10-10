var path = require('path');

module.exports = function (app) {

  app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/../public/home.html'));
  });

  app.get('/survey', function (request, response) {
    response.sendFile(path.join(__dirname + '/../public/survey.html'));
  });

  app.get('/blog', function (request, response) {
    response.sendFile(path.join(__dirname + '/../public/blog.html'));
  });

  app.get('/training', function (request, response) {
    response.sendFile(path.join(__dirname + '/../public/training.html'));
  });

  app.get('/bills', function (request, response) {
    response.sendFile(path.join(__dirname + '/../public/bills.html'));
  });

};
