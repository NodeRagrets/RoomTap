var userModel = require('./users/userModel.js');
var eventModel = require('./events/eventModel.js');
var houseModel = require('./houseModel.js');
var Promise = require('bluebird');
Promise.promisifyAll(require('mongoose'));

module.exports = {

  var addUserToHouse = function(house, user) {
    
    var updateHouse = houseModel.update.bind(houseModel);
    var updateUser = userModel.update.bind(userModel);
    var check = userModel.findOne.bind(userModel);

    check({'username': user.username})
      .then(function(userResult) {
        if(!userResult) {
          throw Error('User does not exist');
        } else {
          updateHouse(
            {'address': house.address}, 
            {$push: {'users': user.username} }
          ).then(function(result) {
            console.log('User successfully added to house');
          })
          .catch(function(error) {
            console.log('Error adding user to house: ', error);
          });

          updateUser(
            {'username': user.username},
            {$set: {'address': house.address}}
          )
          .then(function(result) {
            console.log("Address successfully added to user");
          })
          .catch(function(error) {
            console.log("Error adding address to user: ", error);
          });
        }
      })
      .catch(function(error) {
          console.log(error);
      });


  }

  var addEventToHouse = function(house, event) {

    var updateHouse = houseModel.update.bind(houseModel);
    var createEvent = eventModel.create.bind(eventModel);
    var check = eventModel.findOne.bind(eventModel);

    check({'eventDate': event.date,
           'rooms': event.rooms,
           'address': event.address
          })
      .then(function(eventResult) {
        if(eventResult) {
          throw Error('Timeslot Taken');
        } else {
          updateHouse(
            {'address': house.address}, 
            {$push: {'events': event.eventName} }
          ).then(function(result) {
            console.log('Event successfully added to house');
          })
          .catch(function(error) {
            console.log('Error adding event to house: ', error);
          });

          createEvent(event)
          .then(function(result) {
            console.log("Event successfully created!");
          })
          .catch(function(error) {
            console.log("Error creating event: ", error);
          });
        }
      })
      .catch(function(error) {
          console.log(error);
      });
  }

  var addRoomToHouse = function(house, room) {
    var updateHouse = houseModel.update.bind(houseModel);
    var check = houseModel.findOne.bind(houseModel);

    check({'address': house.address})
      .then(function(houseResult) {
        if(!houseResult) {
          throw Error('House does not exist');
        } else {
          houseResult.rooms.forEach(function(item) {
            if(item.name === room.name) {
              throw Error('Room name taken');
            }
            updateHouse(
              {'address': house.address}, 
              {$push: {'rooms': room} }
            ).then(function(result) {
              console.log('Event successfully added to house');
            })
            .catch(function(error) {
              console.log('Error adding event to house: ', error);
            });
          });
        }
      })
      .catch(function(error) {
          console.log(error);
      });
  }

  var addHouse = function(house) {

  }

  var retrieveHouse = function(house) {

  }

}