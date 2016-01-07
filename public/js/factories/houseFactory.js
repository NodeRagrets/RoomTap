angular.module('houseFactory',[])
  .factory('House', ['$http', '$window', function($http, $window) {
      var addHouse = function(house){

        return $http({
          method: 'POST',
          url: '/api/houses/address',
          data: house
        }).then(function(response){
          return response.data;
        }).catch(function(error){
          console.log('ERROR IN ADDHOUSE FACTORY')
        })
      }
      var addRooms = function(rooms){

          return $http({
            method: 'POST',
            url: '/api/houses/build',
            data: rooms
          }).then(function(response){
            return response.data;
          }).catch(function(error){
            console.log('ERROR IN ADDROOMS FACTORY', error);
          })
       }
      return {
        addHouse: addHouse,
        addRooms: addRooms
      }
  }])
