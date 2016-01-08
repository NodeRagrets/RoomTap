//parent module
// inject children modules for access
angular.module('dibs', ['ngAnimate', 'ui.bootstrap','ui.router','eventsInfo', 'eventsInfoFactory', 'userInfo', 'userFactory', 'loginInfo', 'userloginFactory', 'houseBuilder', 'houseFactory', 'socketFactory'])
  .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise('signup');
    $httpProvider.interceptors.push('AttachToken');
    //runs before reaching server and
    //pushes the result of what we have defined with factory function

    $stateProvider
      .state('signupPage', {
        url : '/signup',
        views: {
          'indexPage' : {
            templateUrl : 'views/signup.html',
            controller : 'userSignUp'
          }
        },
        data : { authenticate: false }
      })
      .state('facebookSignupPage', {
        url : '/FBsignup',
        views: {
          'indexPage' : {
            templateUrl : 'views/FBsignup.html',
            controller : 'FBuserSignUp'
          }
        },
        data : { authenticate: false }
      })
      .state('dashboardPage', {
        url : '/dashboard',
        views: {
          'indexPage' : {
            templateUrl : 'views/dashboard.html',
            controller : 'eventsController'
          }
        },
        data : { authenticate: true }
      })
      .state('dashboardPage.events', {
        url : '/events',
        templateUrl : 'views/eventListEmbedded.html',
        controller : 'eventsController',
        data : { authenticate: true }
      })
      .state('loginupPage', {
        url : '/login',
        views: {
          'indexPage' : {
            templateUrl : 'views/login.html',
            controller : 'userLogin'
          }
        },
        data : { authenticate: false }
      })
      .state('houseBuilder', {
        url : '/houseBuilder',
        views: {
          'indexPage' : {
            templateUrl : 'views/houseBuilder.html'
          }
        },
        data : {authenticate: false}
      })
    })

  .factory('AttachToken', function($window) {
    return {
      request : function(http) {
        var token = $window.localStorage.getItem('dibsToken');
        if(token) {
        http.headers["authorization"] = token;
        }
        http.headers["Allow-Control-Allow-Origin"] = "*";
        return http;
      }
    };
  })

  .factory('facebookAuth', ['$rootScope', '$http', '$window', '$state', function($rootScope, $http, $window, $state){
    var getUserInfo = function(){
      var _self = this;

      FB.api('/me', {fields: 'name, email'}, function(res){

        $rootScope.$apply(function(){
          $rootScope.user = res;
          $http({
                method: 'POST',
                url: '/api/users/facebookAuth',
                data: $rootScope.user
              })
          .then(function(authRes){
            if(authRes.data.result === false){
              $state.go('facebookSignupPage');
            } else {
              $window.localStorage.setItem('dibsToken', authRes.data.token);
            }
          });
        })

      })

    }
  
    var checkLoginStatus = function(){
          var _self = this;
          FB.Event.subscribe('auth.authResponseChange', function(res){

            if(res.status === 'connected'){
              getUserInfo();

            } else {


            }

          })
    }

    var facebookLogout = function(){

      FB.logout(function(res){

        $rootScope.$apply(function(){
          $rootScope.user = {};
        })

      });

    }


  return {
    'getUserInfo': getUserInfo,
    'checkLoginStatus': checkLoginStatus,
    'facebookLogout': facebookLogout
  };

  }])

  .run(['$state', '$rootScope', 'SignUpFactory', '$window', 'facebookAuth', function($state, $rootScope, SignUpFactory, $window, facebookAuth) {
    $rootScope.$on('$stateChangeStart', function(event, toState) {
      if(toState.data.authenticate === true && SignUpFactory.validToken) {
        $state.go('signupPage');
        event.preventDefault();
      }

      if(toState.data.authenticate === false && SignUpFactory.validToken) {
        $state.go('dashboardPage');
        event.preventDefault();
      }
    });

    $rootScope.user = {};

    (function(d){
      var js;
      var id = 'facebook-jssdk';
      var ref = d.getElementsByTagName('script')[0];
      if(d.getElementById(id)) {
        return;
      }

      js = d.createElement('script');
      js.id = id;
      js.async = true;
      js.src = "//connect.facebook.net/en_US/sdk.js";

      ref.parentNode.insertBefore(js, ref);
    })(document)

    $window.fbAsyncInit = function(){
      //executes when SDK loads
      FB.init({
        appId: '1513513728979196',
        channelUrl: '/channel.html',
        status: true,
        cookie: true,
        xfbml: true,
        version: 'v2.5'
      })

      facebookAuth.checkLoginStatus();

    }

}]);
