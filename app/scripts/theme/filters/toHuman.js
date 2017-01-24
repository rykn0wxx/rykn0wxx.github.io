'use strict';

/**
 * @ngdoc filter
 * @name mud-theme.filter:toHuman
 * @function
 * @description
 * # toHuman
 * Filter in the mud-theme.
 */
 angular
 .module('mudhead')
.filter('toHuman', function() {
  return function (doc) {
    if (!doc) {return;}
    if (doc.type === 'directive') {
      return doc.name.replace(/([A-Z])/g, function($1) {
        return '-'+$1.toLowerCase();
      });
    }
    return doc.label || doc.name;
  };
});
