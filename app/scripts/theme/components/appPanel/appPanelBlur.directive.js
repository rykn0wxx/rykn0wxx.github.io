'use strict';

/**
 * @ngdoc directive
 * @name mud-theme.directive:appPanelBlur
 * @description
 * # appPanelBlur
 */
 angular
.module('mudhead')
.directive('appPanelBlur', ['appPanelBlurService', '$window', '$rootScope', '$timeout', function (blurService, $w, $rs, $t) {
  var bodyBgSize;
  function recalculatePanelStyle() {
    if (!bodyBgSize) {
      return;
    }
    elem.css({
      backgroundSize: Math.round(bodyBgSize.width) + 'px ' + Math.round(bodyBgSize.height) + 'px',
      backgroundPosition: Math.floor(bodyBgSize.positionX) + 'px ' + Math.floor(bodyBgSize.positionY) + 'px'
    });
  }
  function AppPanelBlurPostLink ($scope, elem) {
    if ($rs.$isMobile) {
      blurService.bodyBgLoad().then(function () {
        $t(recalculatePanelStyle);
      });
      $w.addEventListener('resize', recalculatePanelStyle);
      $scope.$on('$destroy', function () {
        $w.removeEventListener('resize', recalculatePanelStyle);
      });
    }
  }
  return ({
    restrict: 'A',
    link: AppPanelBlurPostLink
  });
}]);
