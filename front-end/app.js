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

     .when('/quote', {
          templateUrl: 'quote.html',
          controller: 'quoteController'
     })

     .when('/register', {
          templateUrl: 'register.html',
          contrller: 'registerController'
     })

});

app.controller('mainController', function(){
     console.log("main.controller")

});

var API = 'http://localhost:5000';

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

     $scope.someService = function(number) {
          console.log(number, 'TVs');
     }


})

app.controller('quoteController', function($scope, $http, $location) {
     $http.get(API + '/quote').success(function(data) {
          $scope.quote = data
     })

     $scope.someQuote = function(someQuoteData) {
          someQuoteData = $scope
     }
})

app.controller('registerController', function($scope, $http, $location) {
     var credentials = {
          "_id": null,
          "password": null,
          "email": null
     };

     $scope.register = function() {
          if ($scope.password !== $scope.confirmPassword) {
               $location.path('/register');
          } else {
               credentials._id = $scope.username;
               credentials.password = $scope.password;
               credentials.email = $scope.email;
          }
          $http.post(API + '/signup', credentials).success(function(data) {
               $location.path('/login');
          });
     };
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
               } else if (nextUrl[1] === '/services') {
                    $location.path('/services');
               } else if (nextUrl[1] === '/quote') {
                    $location.pathe('/quote');
               } else if (
                    // nextUrl[1] === '/services' ||
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
