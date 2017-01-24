'use strict';

/**
 * @ngdoc function
 * @name mudhead.controller:TwoCtrl
 * @description
 * # TwoCtrl
 * Controller of the mudhead
 */


angular.module('mudhead')
.controller('TwoCtrl', ['$scope', function ($scope) {
  var o = this;
  o.$scope = $scope;

  $scope.sbScheme = {
    type: 'object',
    properties: {
    	name: {
    		type: 'string'
    	},
    	type: {
    		type: 'string',
    		enum: ['toggle', 'link', 'heading']
    	}
    }
  };

}]);
