'use strict';

/**
 * @ngdoc overview
 * @name customModule
 * @description
 * # customModule
 *
 * Main module of the application.
 */
angular
.module('customModule', [
  'oc.lazyLoad',
  'ui.router'
])
.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function (stateProv, urlProv, ozLazy) {

  ozLazy.config({
    debug:true,
    events:true,
  });

  
}]);
