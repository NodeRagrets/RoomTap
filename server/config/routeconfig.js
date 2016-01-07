var bodyParser = require('body-parser');
var helpers = require('./helpers.js');
var utils = require('./../utility/utility.js');

module.exports = function(app, express) {
  app.use(bodyParser.json());
  //creating routes for each individual moduels (groups of routes)

  var userRouter = express.Router();
  var eventRouter = express.Router();
  var houseRouter = express.Router();

  // This won't work at this point because there is no login;

  app.use('/api/users', userRouter);
  // app.use('/api/events', utils.hasToken);
  app.use('/api/events', utils.hasToken, eventRouter);
  app.use('/api/houses', utils.hasToken, houseRouter);


  require(__dirname + './../house/houseRoutes.js')(houseRouter);
  require(__dirname + '/../users/userRoutes.js')(userRouter);
  require(__dirname + '/../events/eventRoutes.js')(eventRouter);

};
