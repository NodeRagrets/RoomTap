angular.module('houseFactory',[])
  .factory('House', ['$http', '$window', function($http, $window) {

      var addRooms = function(rooms){

          return $http({
            method: 'POST',
            url: '/api/houses/build', //TODO finish Url
            data: rooms
          }).then(function(response){
            return response.data;
          }).catch(function(error){
            console.log(error);
          })
       }
      return {
        addRooms: addRooms
      }
  }])
