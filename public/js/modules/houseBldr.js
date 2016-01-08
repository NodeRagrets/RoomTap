angular.module('houseBuilder', [])
    .controller('houseBldr', ['$scope', 'House', '$window', function($scope, House, $window){
        $scope.data = {};
        $scope.data['roomName'] = '';
        $scope.data['roomType'] = '';
        $scope.data['roomArray'] = [];
        $scope.data['roomObject'] = {};
        $scope.data['viewArray'] = [];
        $scope.data['address'] = '';
        $scope.data['users'] = '';
        // $scope.data['home']={}
        // $scope.data['id'];
        $scope.data['homeName'] = ''


        $scope.addedHouse = false;
        $scope.addedRoom = false;
        $scope.addedUsers = false;

        $scope.addAddress = function(){
          if($scope.data.address && $scope.data.homeName){
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

        $scope.continue = function(){
            console.log($scope.data, 'CONTINUE SCOPE.DATA')
          if($scope.addedHouse === true && $scope.addedRoom === true){
            console.log($scope.data, 'CONTINUE SCOPE.DATA')
            // $scope.data.home['address'] = $scope.data.address;
            House.getHomes($scope.data).then(function(result){
              console.log("JESHSEJKR", result.id)
               $window.localStorage.setItem('homeID', result.id);
              //  console.log($window.localstorage)
            })
            .catch(function(err){
              console.log("EROROROROROROROROR")
            });
          }else{
            alert('Please complete required input fields');
          }
        }


    }])
    // room is an object with two keys: type, name
    // home is an object with one key: address
