'use strict';

/**
 * @ngdoc directive
 * @name mud-theme.directive:scrollPosition
 * @description
 * # scrollPosition
 */
angular
.module('mud-theme')
.directive('scrollPosition', ScrollPositionDirective);

function ScrollPositionDirective ($w, mdTheming) {
  return ({
    restrict: 'A',
    scope: {
      scrollPosition: '=',
      maxHeight: '='
    },
    link: function scrollPositionPostLink (scope, elem, attr) {
      mdTheming(elem);
      elem.addClass('_md');
      attr.maxHeight = scope.maxHeight || 50;
      $w.jQuery('.content-wrapper').on('scroll', function(ev) {
        var scrollTop = ev.target.scrollTop > scope.maxHeight;
        if (scrollTop !== scope.prevScrollTop) {
          scope.$apply(function() {
            scope.scrollPosition = scrollTop;
          });
        }
        scope.prevScrollTop = scrollTop;
      });
    }
  });
}


  /** @ngInject */
ScrollPositionDirective.$inject = ['$window', '$mdTheming'];
