'use strict';

/* App Module */

var myapp = angular.module('MyApp', [
  'ngRoute',
  'angularjs-datetime-picker' 
]);

myapp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/indv', {
        templateUrl: '../first.html',
        controller: 'firstCtrl'
      }).
	 when('/', {
        templateUrl: '../next.html',
        controller: 'nextCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);


