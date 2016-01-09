angular.module('eventsInfoFactory', [])
.factory('Eventstored', function($http) {
  //posts events to database
  var postEvent = function(eventObj) {
    return $http({
      method: 'POST',
      url: '/api/events/booked',
      data: eventObj
    }).then(function(responseObj){
      return responseObj;
    });
  };

  var postCurrentHouseID = function(currentHomeId) {
    return $http({
      method: 'POST',
      url: '/api/events/booked',
      data: currentHomeId
    }).then(function(responseObj){
      return responseObj;
    });
  }
  //retrieves events  
  // var getData = function() {
  //   return $http({
  //     method: 'GET',
  //     url: '/api/events/events'
  //   });
  // };

  var formatData = function(events) {
    var eventsCollection = events.data;
    var eventDates;
    var formattedDate;
    var eventTimes;
    //note, changed below to accommodate "arraylike obj" returned from DB
    [].forEach.call(eventsCollection, function(event) {
      eventDates = event.eventDate;
      formattedDate = moment(eventDates).format("dddd, MMMM Do YYYY");
      formattedTime = moment(eventDates).format('h:mmA');
      event.eventDate = formattedDate;
      event.eventTime = formattedTime;
    });

    return eventsCollection;
  };

  return {
    postEvent : postEvent,
    // getData : getData,
    postCurrentHouseID : postCurrentHouseID,
    formatData : formatData
  };
});
