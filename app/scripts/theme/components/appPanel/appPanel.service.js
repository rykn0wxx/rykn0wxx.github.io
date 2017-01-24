'use strict';

/**
 * @ngdoc service
 * @name mudhead.appPanel
 * @description
 * # appPanel
 * Factory in the mudhead.
 */
angular.module('mudhead')
.factory('appPanel', [function () {
  return {
    restrict: 'A',
    transclude: true,
    template: function(elem, attrs) {
      var res = '<div class="panel-body" ng-transclude></div>';
      if (attrs.appPanelTitle) {
        var titleTpl = '<div class="panel-heading clearfix"><h3 class="panel-title">' + attrs.appPanelTitle + '</h3></div>';
        res = titleTpl + res; // title should be before
      }
      return res;
    }
  };
}]);
