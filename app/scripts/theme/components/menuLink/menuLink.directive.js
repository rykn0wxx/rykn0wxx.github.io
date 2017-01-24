'use strict';

/**
 * @ngdoc directive
 * @name mud-theme.directive:menuLink
 * @description
 * # menuLink
 */
 angular
 .module('mudhead')
 .directive('menuLink', [function() {
 	return ({
 		restrict: 'E',
    scope: {
      section: '='
    },
    templateUrl: 'scripts/theme/components/menuLink/menuLink.html',
    link: function MenuLinkPostLink ($scope, $element) {
      var controller = $element.parent().controller();

      $scope.isSelected = function() {
        return controller.isSelected($scope.section);
      };

      $scope.focusSection = function() {
        controller.autoFocusContent = true;
      };
    }
 	});
}]);
