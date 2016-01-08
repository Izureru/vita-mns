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
.controller("UserController", function($scope, $http) {
      var kcalDay = 0;
 
    $scope.submit = function(name, gender,age,weight,oal,noal, ePlan) {
      var num1 = 0;
      var num2 = 0;
      var bmr = 0;
      var pal = 0;
      var eggs = 190;


      if (gender == "Female"){
          setFNums();
          setFPals();
        }else{
          setMNums();
          setMPals();
        }

      function setFNums(){
        if (age == "18-29"){
          num1 = 14.8;
          num2 = 487;
        }else if(age == "30-59"){
          num1 = 8.3;
          num2 = 846;
        }else{
          num1 = 0.038;
          num2 = 2.755;
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
          kcalDay = Math.round(bmr * pal);
          alert("Your kcal/day is: " + kcalDay);
          $scope.getMeals(kcalDay);
      }
      calc();

      
};
  $scope.getMeals = function(kcalDay){
        $http.get('http://private-25b0c4-schnap.apiary-mock.com/meals/' + kcalDay).then(function(resp) {
          console.log('Success', kcalDay);
          // For JSON responses, resp.data contains the result
          $scope.food = resp.data[1].name;
          $scope.eggs = Math.round(kcalDay / resp.data[1].kcal);
          $scope.breakfast = Math.round(($scope.eggs / 10) * 2);
          $scope.lunch = Math.round(($scope.eggs / 10) * 3);
          $scope.dinner = Math.round(($scope.eggs / 10) * 4);
          $scope.snack = Math.round(($scope.eggs / 10) * 1);
        }, function(err) {
          console.error('ERR', err);
    // err.status will contain the status code
        })
  }
});
