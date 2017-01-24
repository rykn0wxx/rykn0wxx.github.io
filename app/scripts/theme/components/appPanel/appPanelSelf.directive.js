'use strict';

/**
 * @ngdoc directive
 * @name mud-theme.directive:appPanel
 * @description
 * # appPanel
 */
 angular
 .module('mudhead')
 .directive('appPanelSelf', ['appPanel', function(appPanel) {
   return angular.extend({}, appPanel, {
     link: function(scope, el, attrs) {
       el.addClass('panel panel-white');
       if (attrs.appPanelClass) {
         el.addClass(attrs.appPanelClass);
       }
     }
   });
}]);
