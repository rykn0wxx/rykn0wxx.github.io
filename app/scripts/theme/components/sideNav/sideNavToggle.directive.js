'use strict';

/**
 * @ngdoc directive
 * @name mudhead.directive:sideNavToggle
 * @description
 * # sideNavLink
 */
angular
.module('mudhead')
.directive('sideNavToggle', SideNavToggleDirective);

function SideNavToggleDirective (mdTheming, $t, mdUtil) {
  return ({
    scope: {
      section: '='
    },
    restrict: 'E',
    templateUrl: 'scripts/theme/components/sideNav/sideNavToggle.html',
    link: function sideNavPostLink (scope, elem) {
      console.log('sideNavToggle here');
      mdTheming(elem);
      elem.addClass('_md');
    }
  });
}
  /** @ngInject */
SideNavToggleDirective.$inject = ['$mdTheming', '$timeout', '$mdUtil'];
