angular.module('houseBuilder', [])
    .controller('houseBldr', '$scope', 'House', function($scope, House){
        $scope.data = {};
        $scope.data['roomName'] = '';
        $scope.data['house'] = [];
        $scope.addRoomToHouse = function(){
          if($scope.data.roomName){
            var name = $scope.data.roomName;
            var array = $scope.data.house;
            array.push(name);
            //call function in factory TODO
             House.addRooms($scope.data)
          } else{
            alert('You must enter a roomName');
          }
        }
        
    })
