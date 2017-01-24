'use strict';

/**
 * @ngdoc directive
 * @name mudhead.directive:pageTop
 * @description
 * # pageTop
 */
angular
.module('mudhead')
.directive('pageTop', PageTopDirective);

function PageTopDirective (mdTheming, mdMedia, mdSidenav, $t) {
  return ({
    restrict: 'E',
    replace: true,
    templateUrl: 'scripts/theme/components/pageTop/pageTop.html',
    link: function pageTopPostLink (scope, elem) {
      mdTheming(elem);
      elem.addClass('_md');
      scope.$watch(function () {
        return mdMedia('xs');
      }, function (isXs) {
        scope.isSmall = isXs;
      });

      scope.toggler = function () {
        mdSidenav('666').toggle();
      }
    }
  });
}
  /** @ngInject */
PageTopDirective.$inject = ['$mdTheming', '$mdMedia', '$mdSidenav', '$timeout'];
