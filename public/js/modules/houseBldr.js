angular.module('houseBuilder', [])
    .controller('houseBldr', '$scope', 'House', function($scope, House){
        $scope.data = {};
        $scope.data['roomName'] = '';
        $scope.data['roomType'] = '';
        $scope.data['house'] = [];

        $scope.addRoomToHouse = function(){
          if($scope.data.roomName && $scope.data.roomType){
            console.log($scope.data.roomName, "ROOMNAME");
            console.log($scope.data.roomType, "ROOMTYPE");
            var name = $scope.data.roomName;
            var array = $scope.data.house;
            array.push(name);
             House.addRooms($scope.data)
          } else{
            alert('You must fill out input fields');
          }
        }

    })
