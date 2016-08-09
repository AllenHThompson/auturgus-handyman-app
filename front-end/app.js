var app = angular.module('my-app', ['ngRoute', 'ngCookies']);

app.config(function($routeProvider){
     $routeProvider

     .when('/', {
          templateUrl: 'home.html',
          controller: 'mainController'
     })

     .when('/login', {
          templateUrl: 'login.html',
          controller: 'loginController'
     })

     .when('/services', {
          templateUrl: 'services.html',
          controller: 'servicesController'
     })

});

app.controller('mainController', function(){
     console.log("main.controller")

});

var API = 'some url';

app.controller('loginController', function($scope, $http, $location, $cookies) {
     console.log("login.controller")

     var credentials = {
          "_id": null,
          "password": null,
          "email": null
     };

     $scope.login = function() {
          // console.log("login controller")
          credentials._id = $scope.username;
          credentials.password = $scope.password;
          $http.post(API + '/login', credentials).success(function(data) {
               $cookies.put('Token', data.token);
               $location.path('/services');
          });
     };
});

app.controller('servicesController', function($scope, $http, $location) {
     $http.get(API + '/services').success(function(data) {
          $scope.services = data;
     });

     $scope.someService = function(someData) {
          someData =  $scope
     }
})

app.run(function($rootScope, $location, $cookies) {
     $rootScope.$on('$locationChangeStart', function(event, nextUrl, currentUrl) {

          currentUrl = currentUrl.split('#');
          nextUrl = nextUrl.split('#');
          token = $cookies.get('Token');

          console.log("token:" + token, "currentUrl:" + currentUrl, "nextUrl:" + nextUrl)

          if (token === undefined) {
               if (nextUrl[1] === '/') {
                    $location.path('/');
               } else if (nextUrl[1] === '/login') {
                    $location.path('/login');
               } else if (nextUrl[1] === '/register') {
                    $location.path('/register');
               } else if (
                    nextUrl[1] === '/services' ||
                    nextUrl[1] === '/payment' ||
                    nextUrl[1] === '/delivery') {
                    $location.path('/login');
               }
          }
          if (token !== undefined) {
               $location.path(nextUrl[1]);
          }
          $cookies.put('nextUrl', nextUrl[1]);
     });
});
