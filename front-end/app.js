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

     console.log("hello")

});

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
