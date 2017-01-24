'use strict';

/**
 * @ngdoc directive
 * @name mud-theme.directive:appPanel
 * @description
 * # appPanel
 */
 angular
.module('mudhead')
.directive('appPanel', ['appPanel', 'appConfig', function (appPanel, appConfig) {
  return angular.extend({}, appPanel, {
    template: function(el, attrs) {
      var res = '<div  class="panel ' + (appConfig.theme.blur ? 'panel-blur' : '') + ' full-invisible ' + (attrs.appPanelClass || '');
      res += '" zoom-in ' + (appConfig.theme.blur ? 'app-panel-blur' : '') + ' md-colors="::{backgroundColor:\'default-background-500\'}">';
      res += appPanel.template(el, attrs);
      res += '</div>';
      return res;
    }
  });
}]);
