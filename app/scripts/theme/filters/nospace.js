'use strict';

/**
 * @ngdoc filter
 * @name mud-theme.filter:nospace
 * @function
 * @description
 * # nospace
 * Filter in the mud-theme.
 */
 angular
 .module('mudhead')
.filter('nospace', function() {
  return function (zVal) {
    return (!zVal) ? '' : zVal.replace(/ /g, '');
  };
});
