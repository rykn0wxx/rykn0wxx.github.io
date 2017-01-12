'use strict';

/**
 * @ngdoc directive
 * @name mudhead.directive:pageTop
 * @description
 * # pageTop
 */
angular
.module('mud-theme')
.directive('pageTop', PageTopDirective);

function PageTopDirective (mdTheming, mdMedia) {
  return ({
    restrict: 'E',
    replace: true,
    templateUrl: 'scripts/theme/components/pageTop/pageTop.html',
    link: function pagetTopPostLink (scope, elem) {
      mdTheming(elem);
      elem.addClass('_md');
      scope.$watch(function () {
        return mdMedia('xs');
      }, function (isXs) {
        scope.isSmall = isXs;
      });
    }
  });
}
  /** @ngInject */
PageTopDirective.$inject = ['$mdTheming', '$mdMedia'];
