angular.module('starter', ['ionic'])
.config(function($stateProvider, $urlRouterProvider){
$urlRouterProvider.otherwise('/')

$stateProvider.state('home', {
  url: '/home',
  views: {
    home: {
      templateUrl: 'home.html'
    }
  }
})

$stateProvider.state('help', {
  url: '/help',
  views: {
    help: {
      templateUrl: 'help.html'
    }
  }
})
})
