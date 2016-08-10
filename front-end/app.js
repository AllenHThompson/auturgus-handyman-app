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

     .when('/services/tv/:quantity', {
          templateUrl: 'tv.html',
          controller: 'tvController'
     })

     .when('/services/ceiling-fan/:20', {
          templateUrl: 'ceiling-fan.html',
          controller: 'ceilingFanController'
     })

     .when('/services/hole-in-wall/:30', {
          templateUrl: 'hole-in-wall.html',
          controller: 'ceilingFanController'
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

var API = 'http://localhost:8000';

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

          console.log(credentials)
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
          console.log("register")
          if ($scope.password !== $scope.confirmPassword) {
               $location.path('/register');
          } else {
               credentials._id = $scope.username;
               credentials.password = $scope.password;
               credentials.email = $scope.email;
               // console.log(credentials)
          }
          $http.post(API + '/signup', credentials).success(function(data) {
               $location.path('/login');
          });
     };
});

app.controller('tvController', function($scope, $http, $location, $routeParams) {


     $scope.quote = function() {

          //DO I EVEN NEED TO POST THIS TO THE DATABASE
          // $http.post(API + '/quote', )
          // $routeParams.quantity
          // Number($routeParams.quantity)

          var total = 0;
          var numHours = 0;
          total = numHours * 50;

          // if ($scope.brackets === 'false') {
          //      total = total + 100;
          // } else if ($scope.gt32 === 'true') {
          //      total += numHours * 10;
          // } else if ($scope.wall === 'panel' || 'brick' || 'concrete') {
          //      toal += numHours * 10;
          // }


          console.log($scope.time)
          console.log($scope.date)
          console.log($scope.gt32)
          console.log($scope.brackets)
          console.log($scope.wall)

          $location.path('/quote')
     }
});

app.run(function($rootScope, $location, $cookies) {
     $rootScope.$on('$locationChangeStart', function(event, nextUrl, currentUrl) {

          currentUrl = currentUrl.split('#');
          nextUrl = nextUrl.split('#');
          token = $cookies.get('Token');

          // console.log("token:" + token, "currentUrl:" + currentUrl, "nextUrl:" + nextUrl)

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
                    $location.path('/quote');
               } else if (nextUrl[1] === '/payment') {
                    $location.path('/login');
               }
          }
          if (token !== undefined) {
               $location.path(nextUrl[1]);
          }
          $cookies.put('nextUrl', nextUrl[1]);
     });
});
