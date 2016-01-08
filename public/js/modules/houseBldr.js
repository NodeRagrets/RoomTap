angular.module('houseBuilder', [])
    .controller('houseBldr', ['$scope', 'House', function($scope, House){
        $scope.data = {};
        $scope.data['roomName'] = '';
        $scope.data['roomType'] = '';
        $scope.data['roomArray'] = [];
        $scope.data['roomObject'] = {};
        $scope.data['viewArray'] = [];
        $scope.data['address'] = '';
        $scope.data['users'] = '';
        $scope.addedHouse = false;
        $scope.addedRoom = false;
        $scope.addedUsers = false;

        $scope.addAddress = function(){
          if($scope.data.address){
            var home = $scope.data.address;
            //permanently store the text in $scope.data
            House.addHouse($scope.data);
            $scope.addedHouse = true;

          } else{
            alert('You must add an address');
          }
        }
        $scope.addRoomToHouse = function(){
          if($scope.data.roomName && $scope.data.roomType){
            var name = $scope.data.roomName;
            var array = $scope.data.roomArray;
            var type = $scope.data.roomType;
            var object = $scope.data.roomObject;
            var view = $scope.data.viewArray;

            view.push(name);

            object['name'] = name;
            object['type'] = type;

            array.push(object);

             House.addRooms($scope.data)
             $scope.addedRoom = true;
          } else{
            alert('You must fill out input fields');
          }
        }

        $scope.addUsers = function(){
          if($scope.data.users){
            House.addUsers($scope.data);
            $scope.addedHouse = true;
          } else{
            alert('You must add at least one user')
          }
        }
    }])
    // room is an object with two keys: type, name
    // home is an object with one key: address
