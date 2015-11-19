// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider){
$urlRouterProvider.otherwise('/')

  $stateProvider.state('home', {
    url: '/',
    template: 'index.html'
  })
})
.controller("UserController", function($scope, $http) {
 
    $scope.submit = function(name, gender,age,weight,oal,noal, ePlan) {
      var num1 = 0;
      var num2 = 0;
      var bmr = 0;
      var pal = 0;
      var kcalDay = 0;

      if (gender == "Female"){
          setFNums();
          setFPals();
          console.log("you're female");
        }else{
          setMNums();
          setMPals();
          console.log("you're male");
        }

      function setFNums(){
        if (age == "18-29"){
          num1 = 14.8;
          num2 = 487;
          console.log("you're in the lesser range");
        }else if(age == "30-59"){
          console.log("you're middle age");
          num1 = 8.3;
          num2 = 846;
        }else{
          num1 = 0.038;
          num2 = 2.755;
          console.log("you older");
        }
      }

      function setMNums(){
        if (age == "18-29"){
          num1 = 15.1;
          num2 = 692;
        }else if(age == "30-59"){
          num1 = 11.5;
          num2 = 873;
        }else{
          num1 = 0.049;
          num2 = 2.459;
        }
      }

      function setFPals(){
        if (oal == "Non-active"){
          if (noal == "Non-active"){
            pal = 1.4;
          }
          else if (noal == "Moderately Active"){
            pal = 1.5;
          }else{
            pal = 1.6;
          }
        }else{
          if (noal == "Non-active"){
            pal = 1.5;
          }
          else if (noal == "Moderately Active"){
            pal = 1.6;
          }else{
            pal = 1.7;
          }
        }
      }

      function setMPals(){
        if (oal == "Non-active"){
          if (noal == "Non-active"){
            pal = 1.4;
          }
          else if (noal == "Moderately Active"){
            pal = 1.5;
          }else{
            pal = 1.6;
          }
        }
        else if(oal == "Moderately Active"){
          if (noal == "Non-active"){
            pal = 1.6;
          }
          else if (noal == "Moderately Active"){
            pal = 1.7;
          }else{
            pal = 1.8;
          }
        }else {
          if (noal == "Non-active"){
            pal = 1.7;
          }
          else if (noal == "Moderately Active"){
            pal = 1.8;
          }else{
            pal = 1.9;
          }
        }
      }
        
      function calc(){
          bmr = ((num1 * weight) + num2);
          console.log("bmr: " + bmr);
          kcalDay = bmr * pal;
          alert("Your kcal/day is: " + kcalDay);
      }
      calc();
      getMeals(kcalDay);

      function getMeals(kcalDay){
        $http.get('http://private-25b0c4-schnap.apiary-mock.com/meals/' + kcalDay).then(function(resp) {
          console.log('Success', resp);
          // For JSON responses, resp.data contains the result
        }, function(err) {
          console.error('ERR', err);
    // err.status will contain the status code
        })
      }
}
});
