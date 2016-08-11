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
     // .when('/services/tv/:quantity', {
     //      templateUrl: 'quote.html',
     //      controller: 'serviceController'
     // })

     .when('/services/ceiling-fan/:20', {
          templateUrl: 'ceiling-fan.html',
          controller: 'ceilingFanController'
     })

     .when('/services/hole-in-wall/:30', {
          templateUrl: 'hole-in-wall.html',
          controller: 'ceilingFanController'
     })

     .when('/quote-tv', {
          templateUrl: 'quote-tv.html',
          controller: 'quoteController'
     })

     .when('/quote/:service', {
          templateUrl: 'quote.html',
          controller: 'quoteController'
     })

     .when('/register', {
          templateUrl: 'register.html',
          contrller: 'registerController'
     })

     .when('/payment', {
          templateUrl: 'payment.html',
          controller: 'paymentController'
     });

});
app.factory('serviceOptions', function() {
     var factory = {};
     var options = {};
     factory.getOptions = function(){
          return this.options;
     };
     factory.setOptions = function(serviceOptions){
          this.options = serviceOptions;
     };
     return factory;
});

app.controller('mainController', function(){
     console.log("main.controller");
});

var API = 'http://localhost:8000';

app.controller('loginController', function($scope, $http, $location, $cookies) {
     console.log("login.controller");

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

          console.log(credentials);
     };
});

app.controller('servicesController', function($scope, $http, $location) {
     // $http.get(API + '/services').success(function(data) {
     //      $scope.services = data;
     // });

     // $scope.someService = function(number) {
     //      console.log(number, 'TVs');
     // }
});

app.controller('quoteController', function($scope, $http, $location) {
     // $http.get(API + '/quote').success(function(data) {
     //      $scope.quote = data
     // })

     $scope.someQuote = function(someQuoteData) {
          someQuoteData = $scope;
     };
     /*--------------------------------------------------------------------- */
     // $rootScope.tvOptions = {
     //      wall: $scope.wall,
     //      brackets: $scope.brackets,
     //      gt32: $scope.gt32,
     //      total: $scope.total
     // };

     $scope.book = function() {
          // console.log("login controller")
          // credentials._id = $scope.username;
          // credentials.password = $scope.password;
          console.log("you clicked");
          var test = "string";
          $location.path('/payment');
          // $http.post(API + '/book', test).success(function(data) {
          //      // $cookies.put('Token', data.token);
          //      $location.path('/services');
          // });

          // console.log(tvOptions)

     };

     /* ------------------------------------------------------------*/
               $scope.cancel = function() {
                    $location.path('/');
               };
     /* ------------------------------------------------------------*/
});



app.controller('registerController', function($scope, $http, $location) {
     var credentials = {
          "_id": null,
          "password": null,
          "email": null
     };

     $scope.register = function() {
          console.log("register");
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

app.controller('tvController', function($rootScope, $scope, $http, $location, $routeParams, serviceOptions) {
     $scope.quote = function() {

          var total = 0;
          var numHours = Number($scope.numHours);
          total = numHours * 50;
          // if (numHours = '') {
          //
          // }
          if ($scope.brackets === 'no') {
               total = total + 100;
          }
          if ($scope.gt32 === 'yes') {
               total = total + (numHours * 10);
          }
          if ($scope.wall === 'yes') {
               total = total + (numHours * 10);
          }

          var tvOptions =  {
               wall: $scope.wall,
               brackets: $scope.brackets,
               gt32: $scope.gt32,
               date: $scope.date,
               time: $scope.time,
               description: $scope.description,
               total: total
          };

          serviceOptions.setOptions(tvOptions);

          




          $location.path('/quote/tv');

     };
});

app.controller('serviceController', function($rootScope, $scope, $http, $location, $routeParams) {
     $scope.quote = function() {

          var total = 0;
          var numHours = Number($scope.numHours);
          total = numHours * 50;
          // if (numHours = '') {
          //
          // }
          if ($scope.brackets === 'no') {
               total = total + 100;
          }
          if ($scope.gt32 === 'yes') {
               total = total + (numHours * 10);
          }
          if ($scope.wall === 'yes') {
               total = total + (numHours * 10);
          }

          $rootScope.serviceOptions = {
               wall: $scope.wall,
               brackets: $scope.brackets,
               gt32: $scope.gt32,
               date: $scope.date,
               time: $scope.time,
               description: $scope.description,
               total: total
          };
          $location.path('/quote/:service');

     };
});

app.controller('paymentController', function($rootScope, $scope, $http, $location, $cookies, $routeParams) {
     // $scope.pay = function() {
     //   $location.path('/thankyou');
     //   $http.post(API + '/orders', {
     //     token: $cookies.get('Token'),
     //     order: order
     //   });
     // };
     // $rootScope.tvOptions = {
     //      wall: $scope.wall,
     //      brackets: $scope.brackets,
     //      gt32: $scope.gt32,
     //      date: $scope.date,
     //      time: $scope.time,
     //      description: $scope.description
     //
     // };
     // $rootScope.tvOptions.moreStuff = 43;

     $scope.cancel = function() {
          $location.path('/');
     };
     // $scope.order = order;
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
                    $location.path('/payment');
               }
          }
          if (token !== undefined) {
               $location.path(nextUrl[1]);
          }
          $cookies.put('nextUrl', nextUrl[1]);
     });
});
