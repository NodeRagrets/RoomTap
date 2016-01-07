var Sequelize = require('sequelize');

var sequelize = new Sequelize('RoomTap', null, null, {
  host: 'localhost',
  dialect: 'sqlite',
  storage: './db.sqlite'
});

var models = {};

models.Users = sequelize.define('User', {
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  facebookCode: {
    type: Sequelize.STRING
  }
});

models.Events = sequelize.define('Events', {
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.STRING
  },
  duration: {
    type: Sequelize.INTEGER
  }
});

models.Rooms = sequelize.define('Rooms', {
  name: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  }
});

models.Homes = sequelize.define('Homes', {
  name: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  }
});

models.RoomEventsJoin = sequelize.define('RoomEventsJoin', {});

models.HomesUsersJoin = sequelize.define('HomesUsersJoin', {});


models.Homes.hasMany(models.Rooms);
models.Homes.hasMany(models.Events);
models.Users.hasMany(models.Events);

models.Events.belongsToMany(models.Rooms, {through: 'RoomEventsJoin'});
models.Rooms.belongsToMany(models.Events, {through: 'RoomEventsJoin'});

models.Users.belongsToMany(models.Homes, {through: 'HomesUsersJoin'});
models.Homes.belongsToMany(models.Users, {through: 'HomesUsersJoin'});

models.Users.sync({force: false}).then(function() {
  // return models.Users.create({
  //   username: 'ScroTom',
  //   password: 'pass',
  //   email: 'tom@gmail.com',
  //   HomeId: 1
  // });
});

models.Homes.sync({force: false}).then(function() {
  //   return models.Homes.create({
  //   name: 'Da House',
  //   address: '111 noderagrets Lane'
  // });
});

models.Rooms.sync({force: false}).then(function() {
  //   return models.Rooms.create({
  //   name: 'The Dungeon',
  //   type: 'Living Room',
  //   HomeId: 1
  // });
});

models.Events.sync({force: false}).then(function() {
  //   return models.Events.create({
  //   name: 'Dungeon Party',
  //   description: 'PARTY IN HERE',
  //   date: 'Jan 6, 1999',
  //   duration: 100,
  //   HomeId: 1
  // });
});

models.RoomEventsJoin.sync({force: false}).then(function() {

});

models.HomesUsersJoin.sync({force: false}).then(function() {

});

module.exports = models;