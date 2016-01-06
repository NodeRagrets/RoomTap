var db = require('./sequelize.js');

var helpers = {
  /* FUNCTIONS FOR ADDING TO DATABASE*/

  addUser: function(user) {
    return db.Users.findOne({
      where: {username: user.username}
    })
    .then(function(user) {
      if(user) {
        throw Error('Username already taken!');
      }
      return db.Users.create(user);
    }).catch(function(error) {
      console.log('Error adding user to database: ', error);
    });
  },

  addHome: function(home) {
    return db.Homes.findOne({
      where: {address: home.address}
    })
    .then(function(home) {
      if(home) {
        throw Error('Home already exists!');
      }
      return db.Homes.create(home);
    })
    .catch(function(error) {
      console.log('Error adding home to database: ', error);
    });
  },

  addEvent: function(event, user, home, rooms) {
    var houseId;
    var userId;

    return db.Homes.findOne({
      where: {address: home.address}
    })
    .then(function(home) {
      if(!home) {
        throw Error('Home not found!');
      }
      houseId = home.id;
      return db.Events.find({
        where: {
          HomeId: houseId,
          date: event.date
        }
      })
      .then(function(events) {
        if(events.length > 0) {
          throw Error('Time slot taken!');
        }
        return db.Users.findOne({
          where: {username: user.username}
        })
        .then(function(user) {
          if(!user) {
            throw Error('User not found!');
          }
          userId = user.id;
          return db.Events.create({
            HomeId: houseId,
            UserId: userId,
            name: event.name,
            description: event.description,
            date: event.date, 
            duration: event.duration
          });
        });
      });
    })
    .catch(function(error) {
      console.log('Error adding room to database: ', error);
    });
  },


  addRoom: function(room, home) {
    return db.Homes.findOne({
      where: {address: home.address}
    })
    .then(function(home) {
      if(!home) {
        throw Error('Home not found!');
      }
      return db.Rooms.create({
        type: room.type,
        name: room.name,
        HomeId: home.id
      });
    })
    .catch(function(error) {
      console.log('Error adding room to database: ', error);
    });
  },

  addUserToHome: function() {

  },

  /* FUNCTIONS FOR RETRIEVING FROM DATABASE */

  getHome: function(home) {

  },

  getUser: function(user) {

  },

  getEvents: function(options) {

  },

  getRooms: function(home) {

  }
}

module.exports = helpers;