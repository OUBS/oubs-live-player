'use strict';

angular.module('viewer.embed', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/embed', {
    templateUrl: 'views/embed.html',
    controller: 'embedCtrl'
  });
}])

.controller('embedCtrl', [function() {

}]);