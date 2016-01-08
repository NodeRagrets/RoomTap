angular.module('loginInfo', [])
  .controller('userLogin', ['$scope', '$window', '$state', 'LoginFactory', function($scope, $window, $state, LoginFactory) {
    $scope.loginUser = {};
    $scope.loginUser.username = '';
    $scope.loginUser.password = '';

    $scope.login = function() {
      if($scope.loginUser.username === '') {
        alert("Must Enter User Name");
      } else if($scope.loginUser.password === '') {
        alert("Must Enter Password");
      } else {
        LoginFactory.userLoginIn($scope.loginUser)
          .then(function(token) {
            if(token.data.token){
              console.log("HERE IS YO TOKEN", token.data.token);
              $window.localStorage
                .setItem('dibsToken', token.data.token);
                if(token.data.token.hasHomeOnLogin) {
                  $state.go('dashboardPage'); 
                } else {
                  $state.go('houseBuilder');
                }
            } else {
              alert("Incorrect Username or Password");              
            }
          });
      }
    };
}])
