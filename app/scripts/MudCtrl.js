'use strict';

/**
 * @ngdoc function
 * @name snowApp.controller:DemopageCtrl
 * @description
 * # DemopageCtrl
 * Controller of the snowApp
 */

angular.module('mudhead')
.controller('MudCtrl', MudCtrlFunction);

function MudCtrlFunction ($scope) {
  var o = this;
  o.$scope = $scope;
}

MudCtrlFunction.$inject = ['$scope'];
