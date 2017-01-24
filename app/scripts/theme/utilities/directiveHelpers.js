'use strict';

/**
 * @ngdoc service
 * @name mud-theme.urlTools
 * @description
 * # urlTools
 * Factory in the mud-theme.
 */

angular
.module('mudhead')
.factory('utilityHelpers', ['$window', '$q', function ($w, $q) {

  var $ = $w.jQuery;
  var Plugin = $w.Plugin;

  var logError = function () {
		if (console && console.error) {
      console.error.apply(console, arguments);
    }
	};

  function UtilHelpers () {
    var o = this;
    o.init.apply(this, arguments);
  }
  UtilHelpers.logError = logError;
  UtilHelpers.prototype = {
    init: function (pluginName, opts) {
      this.pluginName = null;
      this.opts = opts || {};
      this.callbackFn = function () {};
    },
    addOption: function (name, val) {
      this.opts[name] = val;
    },
    setPlugin: function (p) {
      if (!p) {
        UtilHelpers.logError('UtilHelpers.initialize: must specify a plugin');
      }
      this.pluginName = p;
    },
    execute: function (callBack) {
      this.callbackFn = callBack;
      var that = this;
      runPromise(that).then(function (resp) {
        that.response = resp;
      });
    },
    getAnswer: function () {
      return this.response ? this.response : null;
    }
  };

  function hacjJq ( pluginName, opts ) {
    opts = opts || {};
    $.fn[pluginName] = function (opts) {
      return this.each( function () {
        if (!$.data(this, pluginName)) {
          $.data(this, pluginName, new Plugin(this, opts));
        }
        else {
          $.data(this, pluginName).init();
        }
      } );
    };
    return $.fn[pluginName](opts);
  }

  function runPromise (o) {
    var defer = $q.defer();
    var hackJq = hacjJq;
    defer.resolve(hackJq(o.pluginName, o.opts));
    return defer.promise;
  }

  return {
    utilHelpers: UtilHelpers
  };

}]);
