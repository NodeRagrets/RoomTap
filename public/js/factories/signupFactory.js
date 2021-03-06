angular.module('userFactory', [])
.factory('SignUpFactory', function($http, $window) {
  var userSignIn = function(userData) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: { userData: userData }
    })
    .then(function(token) {
      return token;
    });
  };

  var authenticationChecker = function() {
    return !!$window.localStorage.getItem('dibsToken');
  };

  return {
    signUpData : userSignIn,
    validToken: authenticationChecker 
  };
});
