var db = require('./sequelize.js');

var helpers = {
  /* FUNCTIONS FOR ADDING TO DATABASE*/

  addUser: function(user) {
    return db.Users.findOne({
      where: {username: user.username}
    })
    .then(function(userRes) {
      if(userRes) {
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
    .then(function(homeRes) {
      if(homeRes) {
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
        if(events) {
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
          })
          .then(function(newEvent) {
            return newEvent.addRooms(rooms);
          });
        });
      });
    })
    .catch(function(error) {
      console.log('Error adding event to database: ', error);
    });
  },


  addRoom: function(room, home) {
    return db.Homes.findOne({
      where: {address: home.address}
    })
    .then(function(homeRes) {
      if(!homeRes) {
        throw Error('Home not found!');
      }
      return db.Rooms.create({
        type: room.type,
        name: room.name,
        HomeId: homeRes.id
      });
    })
    .catch(function(error) {
      console.log('Error adding room to database: ', error);
    });
  },

  addUserToHome: function(user, home) {
  
    var houseId;

    return db.Homes.findOne({
      where: {address: home.address}
    })
    .then(function(homeRes) {
      if(!homeRes) {
        throw Error('Home not found!');
      }
      houseId = homeRes.id;
      return db.Users.findOne({
        where: {username: user.username}
      })
      .then(function(userRes) {
        if(!userRes) {
          throw Error('User not found!');
        }
        return userRes.set('HomeId', houseId).save();
      });
    })
    .catch(function(error) {
      console.log('Error adding user to home: ', error);
    });
  },

  /* FUNCTIONS FOR RETRIEVING FROM DATABASE */

  getHome: function(home) {
    return db.Homes.findOne({
      where: {address: home.address}
    })
    .then(function(homeRes) {
      if(!homeRes) {
        throw Error('Home not found!');
      }
      return homeRes;
    })
    .catch(function(error) {
      console.log('Error retrieving home: ', error);
    });
  },

  getUser: function(user) {
    return db.Users.findOne({
      where: {username: user.username}
    })
    .then(function(userRes) {
      if(!userRes) {
        throw Error('User not found!');
      }
      return userRes;
    })
    .catch(function(error) {
      console.log('Error retrieving user: ', error);
    });
  },

  getEvents: function(options) {
    if(options.user) {
      return db.Users.findOne({
        where: {username: options.user.username}
      })
      .then(function(userRes) {
        if(!userRes) {
          throw Error('User not found!');
        }
        return db.Events.find({
          where: {UserId: userRes.id}
        })
        .then(function(events) {
          if(events.length === 0) {
            throw Error('No events found!');
          }
          return events;
        })
      })
      .catch(function(error) {
        console.log('Error retrieving events: ', error);
      });
    }
    else if(options.home) {
      return db.Homes.findOne({
        where: {address: options.home.address}
      })
      .then(function(homeRes) {
        if(!homeRes) {
          throw Error('Home not found!');
        }
        return db.Events.findAll({
          where: {HomeId: homeRes.id}
        })
        .then(function(events) {
          if(events.length === 0) {
            throw Error('No events found!');
          }
          return events;
        })
      })
      .catch(function(error) {
        console.log('Error retrieving events: ', error);
      });
    }

  },

  getRooms: function(home) {
    return db.Homes.findOne({
      where: {address: home.address}
    })
    .then(function(homeRes) {
      if(!homeRes) {
        throw Error('Home not found!');
      }
      return db.Rooms.findAll({
        where: {HomeId: homeRes.id}
      })
      .then(function(rooms) {
        if(!rooms) {
          throw Error('No rooms found!');
        }
        return rooms;
      });
    })
    .catch(function(error) {
      console.log('Error retrieving rooms: ', error);
    });
  },

  getHousemateEmails: function(home) {
    var userEmails = [];
    return db.Homes.findOne({
      where: {address: home.address}
    })
    .then(function(homeRes) {
      if (!homeRes) {
        throw Error('Home not found!');
      }
      return db.Users.findAll({
        where: {'HomeId': homeRes.id}
      })
      .then(function(usersArray) {
        if(!usersArray) {
          throw Error('No users found!');
        }
        usersArray.forEach(function(user) {
          userEmails.push(user.get('email'));
        });
        return userEmails;
      });
    })
    .catch(function(error) {
      console.log('Error retrieving housemate emails: ', error);
    });
  }
}

/* FUNCTION TESTS */

// helpers.addUser({
//   username: 'Tom',
//   password: 'AAAAA',
//   email: 'tom@tom.com'
// });

// helpers.addHome({
//   name: 'HOUSE',
//   address: '153 House Street'
// });

// helpers.addRoom({
//   name: 'ROOOOMaSFASFASFA',
//   type: 'roomy'
// },
// {
//   address: '153 House Street'
// });

// helpers.addUserToHome(
// {
//   username: 'Tom'
// },
// {
//   address: '153 House Street'
// });

// helpers.getRooms({
//   address: '153 House Street'
// })
// .then(function(result) {
//   console.log(result);
//   helpers.addEvent({
//     name: 'Dungeon Sex Party',
//     description: 'PARTY IN HERE',
//     date: 'bitches',
//     duration: 100
//   },
//   { 
//     username: 'Tom'
//   },
//   {
//    address: '153 House Street'
//   }, result);
// });

// helpers.getHome({
//   address: '153 House Street'
// })
// .then(function(result) {
//   console.log(result.get('address'));
// })

// helpers.getUser({
//   username: 'Tom'
// })
// .then(function(result) {
//   console.log(result.get('username'));
// })

// helpers.getHousemateEmails({
//   address: '153 House Street'
// })
// .then(function(result) {
//   console.log(result);
// })

// helpers.getEvents({
//  home: {
//     address: '153 House Street'
//   }
// })
// .then(function(result) {
//   console.log(result);
//   // console.log(result[3].get('description'));
//   // console.log(result);
//   result[3].getRooms()
//   .then(function(results){
//     console.log('SCROTOM', results);
//   })
// })

module.exports = helpers;