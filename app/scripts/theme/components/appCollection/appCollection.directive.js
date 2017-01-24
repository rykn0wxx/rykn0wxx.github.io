'use strict';

/**
 * @ngdoc directive
 * @name mudhead.directive:appCollection
 * @description
 * # appCollection
 */
angular.module('mudhead')
.directive('appCollection', ['RecursionHelper', '_', function (RecursionHelper, _) {

	function AppCollectionCtrl ($scope, $element) {
		$scope.selectedItem = null;
		$scope.formRender = false;


		$scope.getSelectedText = function() {
      if ($scope.selectedItem !== null) {
				$scope.formData = _.filter($scope.data, ['name', $scope.selectedItem])[0];
				$scope.formRender = true;
        return "Selected form: " + $scope.selectedItem;
      } else {
        return "Please select a form";
      }
    };

	}

	return ({
		templateUrl: 'scripts/theme/components/appCollection/appCollection.html',
		restrict: 'E',
		replace: true,
		scope: {
      data: '='
    },
		//compile: RecursionHelper.compile,
		controller: AppCollectionCtrl
	});
}]);
