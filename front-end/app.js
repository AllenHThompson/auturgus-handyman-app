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
          controller: 'holeInWallController'
     })

     .when('/quote/:service', {
          templateUrl: 'quote.html',
          controller: 'quoteController'
     })

     .when('/register', {
          templateUrl: 'register.html',
          controller: 'registerController'
     })

     .when('/payment', {
          templateUrl: 'payment.html',
          controller: 'paymentController'
     })
     .when('/thankyou', {
          templateUrl: 'thankyou.html',
          controller: 'thankyouController'
     });
});

// var order = {
//   options: {
//     "grind": null,
//     "quantity": null
//   },
//   address: {
//     "name": null,
//     "address": null,
//     "address2": null,
//     "city": null,
//     "state": null,
//     "zipCode": null,
//     "deliveryDate": null
//   },
//   total: null
// };

var jobs = {
     // status: {type: Boolean, required: true},
     jobs: [{
          "wall": {type: String},
          "brackets": {type: String},
          "gt32": {type: String},
          "numHoles": {type: String},
          "sizeHole": {type: String},
          "typeWall": {type: String},
          "numFans": {type: String},
          "installType": {type: String},
          "haveFan": {type: String},
          "needLadder": {type: String},
          "numHours": {type: Number},
          "date": {type: String},
          "time": {type: String},
          "timeStamp": {type: Date},
          "total": {type: String, required: true},
          "description": {type: String}
     }],
     "total": {type: Number, required: true},
     "description": {type: String},
     "providerId": {type: Number}, //change type from ObjectId
     "providerName": {type: String},
     "requesterId": {type: Number, required: true}, //change type from ObjectId
     "requesterName": {type: String, required: true}
};

// {
// 	"status": false,
// 	"orders": [{
// 		"wall": null,
// 		"brackets": null,
// 		"gt32": true,
// 		"numHoles": 1,
// 		"sizeHole": "orange",
// 		"typeWall": "plaster",
// 		"numFans": 2,
// 		"installType": null,
// 		"haveFan": null,
// 		"needLadder": false,
// 		"numHours": 2,
// 		"date": null,
// 		"time": null,
// 		"total": 100,
// 		"description": "need tv on ceiling"
// 	}],
// 	"total": 100,
// 	"description": "need tv on ceiling",
// 	"providerId": null,
// 	"providerName": null,
// 	"requesterId": 2,
// 	"requesterName": "Will"
// }

app.factory('serviceOptions', function($http) {
     var serviceOptions = {};
     serviceOptions.getOptions = function(){
          return this.options;
     };
     serviceOptions.setOptions = function(serviceOptions){
          this.options = serviceOptions;
     };
     serviceOptions.setOptionsId = function(orderID){
          this.options._id = orderID;
     };
     serviceOptions.postOrder = function(callback){
          console.log("running");
          if (!this.options || this.options == undefined){
               console.error("Options are not set");
               return;
          }

          $http.post(API + '/postOrder', this.options)
          .then(function(data) {
               console.log("options: ", this.options);
               console.log("result", data);
               callback(data);

          })
          .catch(function(err){
               console.log("err ", err);
               callback(err);
          });
     };
     return serviceOptions;
});



app.controller('mainController', function(){

});

app.controller('thankyouController', function(){

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
               $cookies.put('requesterId', credentials._id)
               $cookies.put('requesterName', data.name)
               $location.path('/services');
          });


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

app.controller('quoteController', function($scope, $http, $location, serviceOptions) {
     // $http.get(API + '/quote').success(function(data) {
     //      $scope.quote = data
     // })

     $scope.options = serviceOptions.getOptions();

     $scope.book = function() {

          serviceOptions.postOrder(function(result){
               console.log("post result", result);
               serviceOptions.setOptionsId(result.orderID);
          });

          //need to call the factory

          // $http.post(API + '/postOrder', $scope.options).success(function(data) {
          //
          //      console.log("made api call")
          //      console.log($scope.options)
          //      // $cookies.put('Token', data.token);
          //      // $location.path('/services');
          // });

          $location.path('/payment');
          // $http.post(API + '/book', test).success(function(data) {
          //      // $cookies.put('Token', data.token);
          //      $location.path('/services');
          // });

          // console.log(tvOptions)

     };
     $scope.cancel = function() {
          $location.path('/');
     };
});

app.controller('registerController', function($scope, $http, $location) {
     console.log('registerController');
     var credentials = {
          "_id": null,
          "password": null,
          "email": null,
          "name": null,
          "address": null,
          "address2": null,
          "city": null,
          "state": null,
          "zip": null
     };

     $scope.register = function() {
          // debugger
          console.log("register");
          if ($scope.password !== $scope.confirmPassword) {
               $location.path('/register');
          } else {
               credentials._id = $scope.username;
               credentials.password = $scope.password;
               credentials.email = $scope.email;

               credentials.name = $scope.name;
               credentials.address = $scope.address;
               credentials.address2 = $scope.address2;
               credentials.city = $scope.city;
               credentials.state = $scope.state;
               credentials.zipCode = $scope.zip
               // console.log(credentials)
          }
          $http.post(API + '/signup', credentials).success(function(data) {
               $location.path('/login');
          });
     };
});

app.controller('tvController', function($rootScope, $scope, $http, $location, $routeParams, serviceOptions, $cookies) {
     $scope.quote = function() {

          var total = 0;
          var numHours = Number($scope.numHours);
          total = numHours * 50;

          if ($scope.brackets === 'no') {
               total = total + 100;
          }
          if ($scope.gt32 === 'yes') {
               total = total + (numHours * 10);
          }
          if ($scope.wall === 'yes') {
               total = total + (numHours * 10);
          }

          var options =  {
               requesterId: $cookies.get('requesterId'),

               service: "TV",
               wall: $scope.wall,
               brackets: $scope.brackets,
               gt32: $scope.gt32,
               description: $scope.description,
               timeStamp: new Date($scope.date.getFullYear(), $scope.date.getMonth(), $scope.date.getDate(), $scope.time.getHours(), $scope.time.getMinutes(), $scope.time.getSeconds()),
               total: total
          };

          console.log('options', options);
          serviceOptions.setOptions(options);
          // serviceOptions.postOrder(function(result){
          //      console.log("post result", result);
          //      serviceOptions.setOptionsId(result.orderID);
          // });
          $location.path('/quote/tv');
     };
});

app.controller('ceilingFanController', function($rootScope, $scope, $http, $location, $routeParams, serviceOptions) {
     $scope.quote = function() {

          var total = 0;
          var numHours = Number($scope.numHours);
          var numFans = Number($scope.numFans);
          total = numHours * 50;

          if (numFans > 1) {
               total = total + (numFans * 10);
          }
          if ($scope.installType === 'Repair') {
               total = total + (numHours * 20);
          }
          if ($scope.haveFan === 'no') {
               total = total + 100;
          }
          if ($scope.needLadder === 'yes') {
               total = total + (numHours * 10);
          }

          var options =  {
               service: "Ceiling Fan",
               numFans: $scope.numFans,
               installType: $scope.installType,
               haveFan: $scope.haveFan,
               needLadder: $scope.needLadder,
               date: $scope.date,
               time: $scope.time,
               description: $scope.description,
               total: total
          };

          serviceOptions.setOptions(options);

          $location.path('/quote/ceiling-fan');
     };
});

app.controller('holeInWallController', function($rootScope, $scope, $http, $location, $routeParams, serviceOptions) {
     $scope.quote = function() {

          var total = 0;
          var numHours = Number($scope.numHours);
          var numHoles = Number($scope.numHoles);
          total = numHours * 50;

          if (numHoles > 1) {
               total = total + (numHoles * 10);
          }
          if ($scope.sizeHole === 'orange') {
               total = total + (numHours * 10);
          }
          if ($scope.sizeHole === 'basketball') {
               total = total + (numHours * 20);
          }
          if ($scope.typeWall === 'Paneling') {
               total = total + (numHours * 20);
          }
          if ($scope.typeWall === 'Plaster') {
               total = total + (numHours * 30);
          }
          if ($scope.needLadder === 'yes') {
               total = total + (numHours * 10);
          }

          var options =  {
               service: "Hole In Wall",
               numHoles: $scope.numHoles,
               typeWall: $scope.typeWall,
               needLadder: $scope.needLadder,
               date: $scope.date,
               time: $scope.time,
               description: $scope.description,
               total: total
          };

          serviceOptions.setOptions(options);

          $location.path('/quote/hole-in-wall');

     };
});

app.controller('paymentController', function($rootScope, $scope, $http, $location, $cookies, $routeParams, serviceOptions) {
     $scope.options = serviceOptions.getOptions();

     $scope.pay = function() {

          // $scope.options

          // $http.post(API + '/postOrder', $scope.options).success(function(data) {
          //
          //      console.log("made api call")
          //      // $cookies.put('Token', data.token);
          //      // $location.path('/services');
          // });


          // options.service
          // options.time
          // options.date
          // options.description
          // options.total
          // $scope.name
          // $scope.address
          // $scope.address2
          // $scope.city
          // $scope.state
          // $scope.zip

          // var amount = order.total * 100;

          // var handler = StripeCheckout.configure({
          //      key: 'pk_test_etAw7vNMpUggsCRpMvZTY8Gw',
          //      locale: 'auto',
          //      token: function(token) {
          //           var tokenId = token.id;
          //           return $http({
          //                url: API + '/payment',
          //                method: 'POST',
          //                data: {
          //                     amount: 100,
          //                     token: tokenId
          //                }
          //           })
          //           console.log("hello")
          //           .success(function(data) {
          //
          //                // console.log('Charge: ', data);
          //                // $http.post(API + 'orders', {
          //                //      token: $cookies.get('Token'),
          //                //      order: order
          //                // });
          //                console.log("hello");
          //                console.log('Charge: ', data);
          //
          //                $http.post(API + 'orders', {
          //                     token: $cookies.get('Token'),
          //                     jobs: jobs
          //                });
          //
          //                $location.path('/thankyou');
          //
          //           })
          //           .catch(function(err) {
          //                console.log(err);
          //
          //           });
          //      }
          // });
          // handler.open({
          //      name: 'Auturgus Handyman App',
          //      description: '2 widgets',
          //      amount: 2000
          // });
          // handler.open({
          //      name: 'Auturgus Handyman App',
          //      description: 'Test Card #: 4242 4242 4242 4242',
          //      // amount: amount
          //      amount: 100
          //
          // });

     };
     $scope.cancel = function() {
          $location.path('/');
     };
     $scope.jobs = jobs;
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
