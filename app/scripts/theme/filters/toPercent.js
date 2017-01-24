'use strict';

/**
 * @ngdoc filter
 * @name mudhead.filter:toPercent
 * @function
 * @description
 * # toPercent
 * Filter in the mudhead.
 */
 angular
 .module('mudhead')
.filter('percent', ['_', function(_) {
  return function (zVal) {
    return (!zVal) ? '' : _.round(_.toNumber(zVal) * 100, 2) + '%';
  };
}]);
