'use strict';

// Declare app level module which depends on views, and components
angular.module('viewer', [
  'ngRoute',
  'btford.socket-io',
  'viewer.live',
  'viewer.embed'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/live'});
}]).
factory('socket', function ($rootScope) {
  // var mySocket = socketFactory();
  // return socketFactory();
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        console.log("socket on ", eventName);
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        console.log("socket emit ", eventName);
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});
