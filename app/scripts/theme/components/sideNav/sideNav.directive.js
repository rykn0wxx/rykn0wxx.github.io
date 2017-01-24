'use strict';

/**
 * @ngdoc directive
 * @name mudhead.directive:sideNav
 * @description
 * # sideNav
 */
angular
.module('mudhead')
.directive('sideNav', SideNavDirective);

function SideNavDirective (mdTheming, $q, $t) {
  return ({
    scope: {
      sections: '='
    },
    restrict: 'E',
    replace: true,
    templateUrl: 'scripts/theme/components/sideNav/sideNav.html',
    link: function sideNavPostLink (scope, elem, attr) {
      var tme = new Date().valueOf();
      mdTheming(elem);
      elem.addClass('_md');
      elem.attr('id','sdn' + tme);
    },
    controller: ['$scope', '$element', function sideNavCtrlFunc ($scope, $elem) {
      var o = this;
      o.el = $elem;
      o.sco = $scope;
      o.$postLink  = function () {
        var zCheck = [];
        zCheck.push($q.when($elem.attr('id')));
        zCheck.push($q.when(!$scope.sections));
        $q.all(zCheck).then( function (succ) {

        });
      };

      $t(function() {
        $scope.$apply(function() {
          //$elem.metisMenu();
          window.jQuery('.metismenu').metisMenu();
        });
      },100);

    }]
  });
}
  /** @ngInject */
SideNavDirective.$inject = ['$mdTheming', '$q', '$timeout'];
