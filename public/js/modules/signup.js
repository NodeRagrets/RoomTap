angular.module('userInfo', [])
  .controller('userSignUp', ['$scope', '$window', '$state', 'SignUpFactory', function($scope, $window, $state, SignUpFactory) {
    $scope.user = {};
    $scope.user.username = '';
    $scope.user.email = '';
    $scope.user.password = ''; 

    $scope.signUp = function() {
      if($scope.user.username === '') {
        alert("Must Enter User Name");
      } else if($scope.user.email === '') {
        alert("Must Enter Valid Email");
      } else if($scope.user.password === '') {
        alert("Must Enter Password");
      } else {
        // $state.go('dashboardPage');
        SignUpFactory.signUpData($scope.user)
          .then(function(token) {
            $window.localStorage
            .setItem('dibsToken', token.data.token); //moved this here - it used to be above $window.localStorage
            $state.go('dashboardPage');
          });
      }
    },

    $scope.loginPage = function() {
      $state.go('loginupPage');
    };
}])

.controller('FBuserSignUp', ['$scope', '$window', '$state', 'SignUpFactory', '$rootScope', '$http', function($scope, $window, $state, SignUpFactory, $rootScope, $http) {
          console.log($rootScope.user);
    $scope.user = {};
    $scope.user.username = '';
    $scope.user.email = '';
    $scope.user.facebookCode = $rootScope.user.id;
    

    $scope.signUp = function() {
      if($scope.user.username === '') {
        alert("Must Enter User Name");
      } else if($scope.user.email === '') {
        alert("Must Enter Valid Email");
      } else {
        $state.go('dashboardPage');
        $http({
          method:'POST',
          url: '/api/users/signup',
          data: {userData: $scope.user}
        })
        .then(function(res){
              $window.localStorage.setItem('dibsToken', res.data.token);
              $state.go('dashboardPage');
        })
      }
    },

    $scope.loginPage = function() {
      $state.go('loginupPage');
    };
}]);
