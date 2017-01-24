'use strict';

/**
 * @ngdoc overview
 * @name snowApp
 * @description
 * # snowApp
 *
 * Main module of the application.
 */
angular
.module('mudhead')
.constant('appUri', 'localhost:3000')
.run(['$ocLazyLoad', function (ozLoad) {
  ozLoad.load({
    name: 'model.collection',
    files: [
      'scripts/models/region.js'
    ]
  });
}]);
