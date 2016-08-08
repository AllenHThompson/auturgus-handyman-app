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

});



app.controller('mainController', function(){

});

var API = 'some url'

app.controller('loginController', function($scope, $http, $location, $cookies){
     var credentials = {
          "_id": null,
          "password": null,
          "email": null
     };

     $scope.login = function() {
          credentials._id = $scope.username;
          credentials.password = $scope.password;
          $http.post(API + '/login', credentials).success(function(data) {
               $cookies.put('Token', data.token);
               $location.path('/options');
          });
     };
})

app.run(function($rootScope, $location, $cookies) {
     $rootScope.$on('$locationChangeStart', function(event, nextUrl, currentUrl) {
          currentUrl = currentUrl.split('#');
          nextUrl = nextUrl.split('#');
          token = $cookies.get('Token');
          if (token === undefined) {
               if (nextUrl[1] === '/') {
                    $location.path('/');
               } else if (nextUrl[1] === '/login') {
                    $location.path('/login');
               } else if (nextUrl[1] === '/register') {
                    $location.path('/signup');
               } else if (nextUrl[1] === '/options' || '/payment' || '/delivery') {
                    $location.path('/login');
               }
          }
     })
})
