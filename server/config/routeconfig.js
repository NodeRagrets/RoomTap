var bodyParser = require('body-parser');
var helpers = require('./helpers.js');
var utility = require(__dirname + '/../utility/utility.js');

module.exports = function(app, express) {
  app.use(bodyParser.json());
  //creating routes for each individual moduels (groups of routes)
  var houseRouter = express.Router();
  require(__dirname + './../house/houseRoutes.js')(houseRouter);
  app.use('/api/houses', houseRouter);

  var userRouter = express.Router();
  require(__dirname + '/../users/userRoutes.js')(userRouter);
  // app.use('/api/users', utility.decode);
  // This won't work at this point because there is no login;
  app.use('/api/users', userRouter);
  var eventRouter = express.Router();
  require(__dirname + '/../events/eventRoutes.js')(eventRouter);
  app.use('/api/events', utility.decode);
  app.use('/api/events', eventRouter);



};
