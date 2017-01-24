'use strict';

/**
 * @ngdoc directive
 * @name mudhead.directive:sideNavLink
 * @description
 * # sideNavLink
 */
angular
.module('mudhead')
.directive('sideNavLink', SideNavLinkDirective);

function SideNavLinkDirective (mdTheming) {
  return ({
    scope: {
      section: '='
    },
    restrict: 'E',
    templateUrl: 'scripts/theme/components/sideNav/sideNavLink.html',
    link: function sideNavPostLink (scope, elem) {
      console.log('sideNavLink here');
      mdTheming(elem);
      elem.addClass('_md');

      var ctrl = elem.parent().controller();

      scope.isSelected = function () {
        return ctrl.isSelected(scope.section);
      };

      scope.focusSection = function () {
        ctrl.autoFocusContent = true;
      };
    }
  });
}
  /** @ngInject */
SideNavLinkDirective.$inject = ['$mdTheming'];
