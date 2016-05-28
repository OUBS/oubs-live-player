'use strict';

angular.module('viewer.live', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/live', {
    templateUrl: 'views/live.html',
    controller: 'embedCtrl'
  });
}])

.controller('liveCtrl', ['$scope', 'socket', function($scope, socket) {
  $scope.name = "Guest";
  $scope.messages =  [];

  socket.on('send:message', function (message) {
    $scope.messages.push(message);
  });
  //
  $scope.sendMessage = function() {
    var msg = {
      user: $scope.name,
      text: $scope.messageInput
    };

    socket.emit('send:message', msg);

    // $scope.messages.push(msg);

    $scope.messageInput = '';
  };

  $scope.changeName = function () {
    $scope.name = $scope.newName;
  };
}]);