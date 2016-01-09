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
      };

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
       };

       var addUsers = function(users){
         return $http({
           method: 'POST',
           url: '/api/houses/users',
           data: users
         }).then(function(response){
           return response.data;
         }).catch(function(error){
           console.log('ERROR IN ADDUSERS FACTORY', error);
         })
       };

       var getHomes = function(home){

         return $http({
           method: 'POST',
           url: '/api/houses/retrieveHome',
           data: home
         }).then(function(response){
           return response.data;
         }).catch(function(error){
           console.log('ERROR IN GETHOMES FACTORY', error);
         })
       };

      //  var usersHomes = function(user){
       //
      //    return $http({
      //      method: 'GET',
      //      url: 'api/houses/usersHomes'
      //    }).then(function(response){
      //      return response.data;
      //    }).catch(function(error){
      //      console.log('ERROR IN USERSHOMES',error);
      //    })
      //  };

      return {
        addHouse: addHouse,
        addRooms: addRooms,
        addUsers: addUsers,
        getHomes: getHomes,
        // usersHomes: usersHomes
      }

  }])
