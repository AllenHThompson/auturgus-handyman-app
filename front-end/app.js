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

     .when('/myjobs', {
          templateUrl: 'myjobs.html',
          controller: 'myJobsController'
     })

     .when('/thankyou', {
          templateUrl: 'thankyou.html',
          controller: 'thankyouController'
     })

     .when('/logout', {
          templateUrl: 'home.html',
          controller: 'logoutController'
     });
});

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
     "userId": {type: Number, required: true}, //change type from ObjectId
     "userName": {type: String, required: true}
};

app.factory('serviceOptions', function($http) {
     console.log('serviceOptions');
     return {
          getOptions:    function(){
                              return this.options;
                         },
          setOptions:    function(serviceOptions){
                              this.options = serviceOptions;
                         },
          setOptionsId:  function(orderID){
                              this.options._id = orderID;
                         },
          postOrder:     function(callback){
               console.log("running");
               if (!this.options || this.options === undefined){
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
          }
     }
});
//****10/5/16rearranged 'serviceOptions' factory to return an object
// app.factory('serviceOptions', function($http) {
//      var serviceOptions = {};
//      serviceOptions.getOptions = function(){
//           return this.options;
//      };
//      serviceOptions.setOptions = function(serviceOptions){
//           this.options = serviceOptions;
//      };
//      serviceOptions.setOptionsId = function(orderID){
//           this.options._id = orderID;
//      };
//      serviceOptions.postOrder = function(callback){
//           console.log("running");
//           if (!this.options || this.options === undefined){
//                console.error("Options are not set");
//                return;
//           }
//
//           $http.post(API + '/postOrder', this.options)
//
//           .then(function(data) {
//                console.log("options: ", this.options);
//                console.log("result", data);
//                callback(data);
//
//           })
//           .catch(function(err){
//                console.log("err ", err);
//                callback(err);
//           });
//      };
//      return serviceOptions;
// });

app.controller('mainController', function(){

});

app.controller('thankyouController', function(){

});

app.controller('logoutController', function($cookies){

     for(var cookie in $cookies.getAll()) {
          if($cookies.getAll().hasOwnProperty(cookie)) {
               $cookies.remove(cookie);

          }
     }


});

//I WANT THIS CONTROLLER TO GET JOB INFO FOR REQUESTERS AND DISPLAY ON 'MYJOBS.HTML'

app.controller('myJobsController', function($scope, $http, $location, $routeParams, serviceOptions, $cookies){
     var id = $cookies.get('userId');
     console.log(id);

     $http.get(API + '/myjobs/' + id).success(function(data) {

          $scope.jobs = data;

          console.log(data);


          // $http.get(API + '/services').success(function(data) {
          //      $scope.services = data;
          // });
     });
});






var API = 'https://auturgushandymanapp-lvszrwntpi.now.sh';

app.controller('loginController', function($scope, $http, $location, $cookies) {
     console.log("login.controller");

     var credentials = {
          "_id": null,
          "password": null,
          "email": null
     };

     $scope.login = function() {
          credentials._id = $scope.username;
          credentials.password = $scope.password;
          console.log("login controller creds: ", credentials);
          $http.post(API + '/login', credentials)
               .success(function(data) {
                    console.log(data)
                    $cookies.put('Token', data.token);
                    $cookies.put('userId', credentials._id);
                    $cookies.put('userName', data.name);
                    $cookies.put('type', data.type);

                    if (data.type === "requester"){
                         $location.path('/services');
                    } else {
                         $location.path('/providerPage');
                    }
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

          // serviceOptions.postOrder(function(result){
          //      console.log("post result", result);
          //      serviceOptions.setOptionsId(result.orderID);
          // });

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

     var credentials = {
          "type": null,
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
               credentials.type=$scope.user.type;
               credentials._id = $scope.username;
               credentials.password = $scope.password;
               credentials.email = $scope.email;

               credentials.name = $scope.name;
               credentials.address = $scope.address;
               credentials.address2 = $scope.address2;
               credentials.city = $scope.city;
               credentials.state = $scope.state;
               credentials.zipCode = $scope.zip
               console.log(credentials)
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
               userId: $cookies.get('userId'),

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

app.controller('ceilingFanController', function($rootScope, $scope, $http, $location, $routeParams, serviceOptions, $cookies) {
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
               userId: $cookies.get('userId'),
               service: "Ceiling Fan",
               numFans: $scope.numFans,
               installType: $scope.installType,
               haveFan: $scope.haveFan,
               needLadder: $scope.needLadder,
               description: $scope.description,
               timeStamp: new Date($scope.date.getFullYear(), $scope.date.getMonth(), $scope.date.getDate(), $scope.time.getHours(), $scope.time.getMinutes(), $scope.time.getSeconds()),
               total: total
          };

          serviceOptions.setOptions(options);

          $location.path('/quote/ceiling-fan');
     };
});

app.controller('holeInWallController', function($rootScope, $scope, $http, $location, $routeParams, serviceOptions, $cookies) {
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
               userId: $cookies.get('userId'),
               service: "Hole In Wall",
               numHoles: $scope.numHoles,
               sizeHole: $scope.sizeHole,
               typeWall: $scope.typeWall,
               haveFan: $scope.haveFan,
               needLadder: $scope.needLadder,
               description: $scope.description,
               timeStamp: new Date($scope.date.getFullYear(), $scope.date.getMonth(), $scope.date.getDate(), $scope.time.getHours(), $scope.time.getMinutes(), $scope.time.getSeconds()),
               total: total
          };

          serviceOptions.setOptions(options);

          $location.path('/quote/hole-in-wall');

     };
});

app.controller('paymentController', function($rootScope, $scope, $http, $location, $cookies, $routeParams, serviceOptions) {
     $scope.options = serviceOptions.getOptions();

     $scope.pay = function() {

          var userInfo = {
               "name": $scope.name,
               "address": $scope.address,
               "address2": $scope.address2,
               "city": $scope.city,
               "state": $scope.state,
               "zip": $scope.zip
          };
          var options = serviceOptions.getOptions();

          var amount = options.total /*($cookies.get('quantity') * 20 * 100);*/
          var handler = StripeCheckout.configure({
               key: 'pk_test_Wz4GRV8wyrGtQq9kkVWRar6d',
               locale: 'auto',
               token: function(token) {
                    var tokenId = token.id;

                    return $http.post(API + '/postOrder', {
                         job: options,
                         token: tokenId,
                         userInfo: userInfo,
                         total: options.total

                    }).success(function(data) {

                         console.log(userInfo)
                         // $cookies.put('Token', data.token);
                         // $location.path('/services');
                    }).then(function(data) {

                         alert('Thank you, your card has been charged: $' + (options.total) + '!');

                         $location.path('/thankyou');
                    });
               }
          });
          handler.open({
               name: 'Auturgus: Handyman App',
               description: 'Test card #: 4242 4242 4242 4242',
               amount: amount * 100
          });
     };
     // $scope.pay = function() {
     //
     //      $scope.options
     //
     //      $scope.options.paidInFull = 'true'
     //
     //      // $http.post(API + '/postOrder', $scope.options).success(function(data) {
     //      //
     //      //      console.log("made api call")
     //      //      // $cookies.put('Token', data.token);
     //      //      // $location.path('/services');
     //      // });
     //      var userInfo = {
     //           "name": $scope.name,
     //           "address": $scope.address,
     //           "address2": $scope.address2,
     //           "city": $scope.city,
     //           "state": $scope.state,
     //           "zip": $scope.zip
     //      };
     //      var options = serviceOptions.getOptions();
     //
     //      $http.post(API + '/postOrder', {
     //           job: options,
     //           userInfo: userInfo
     //      }).success(function(data) {
     //
     //           console.log(userInfo)
     //           // $cookies.put('Token', data.token);
     //           // $location.path('/services');
     //      });
     //
     //
     //      // options.service
     //      // options.time
     //      // options.date
     //      // options.description
     //      // options.total
     //      // $scope.name
     //      // $scope.address
     //      // $scope.address2
     //      // $scope.city
     //      // $scope.state
     //      // $scope.zip
     //
     //
     //      $location.path('/thankyou'); //put this inside the callback function
     // };
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
          type = $cookies.get('type')

          console.log("token:" + token, "currentUrl:" + currentUrl, "nextUrl:" + nextUrl)

          if (token === undefined) {


               if (nextUrl[1] === '/') {
                    $location.path('/');
               } else if (nextUrl[1] === '/login') {
                    $location.path('/login');
               } else if (nextUrl[1] === '/register') {
                    $location.path('/register');
               } else if (nextUrl[1] === '/services') {
                    $location.path('/login');
               } else if (nextUrl[1] === '/quote') {
                    $location.path('/login');
               } else if (nextUrl[1] === '/payment') {
                    $location.path('/login');
               }
          }
          if (token !== undefined || null) {
               if (type === "provider") {

                    if (nextUrl[1] === '/services') {
                         $location.path('/home');
                    } else if (nextUrl[1] === '/quote') {
                         $location.path('/home');
                    } else if (nextUrl[1] === '/payment') {
                         $location.path('/home');
                    }
               }
               $location.path(nextUrl[1]);
               // $location.path('/home');
          }

          $cookies.put('nextUrl', nextUrl[1]);
     });
});
