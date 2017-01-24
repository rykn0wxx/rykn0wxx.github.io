'use strict';

/**
 * @ngdoc directive
 * @name mudhead.directive:jsonFormatter
 * @description
 * # jsonFormatter
 */
angular.module('mudhead')
.directive('jsonFormatter', ['RecursionHelper', '_', function (RecursionHelper, _) {

	function escapeString(str) {
    return str.replace('"', '\"');
  }

	function getObjectName(object) {
    if (object === undefined) {
      return '';
    }
    if (object === null) {
      return 'Object';
    }
    var funcNameRegex = /function (.{1,})\(/;
    var results = (funcNameRegex).exec((object).constructor.toString());
    if (results && results.length > 1) {
      return results[1];
    } else {
      return '';
    }
  }

	function getType(object) {
    if (object === null) { return 'null'; }
    return typeof object;
  }

	function JsonFormatterLink (scope, element, attributes) {
		scope.isArray = function () {
      return _.isArray(scope.json);
    };

    scope.isObject = function() {
      return scope.json && _.isObject(scope.json);
    };

    scope.getKeys = function (){
      if (scope.isObject()) {
        return _.keys(scope.json);
      }
    };
    scope.type = getType(scope.json);
    scope.hasKey = typeof scope.key !== 'undefined';
    scope.getConstructorName = function(){
      return getObjectName(scope.json);
    };

    if (scope.type === 'string'){

      // Add custom type for date
      if(_.isDate(scope.json)) {
        scope.isDate = true;
      }

      // Add custom type for URLs
      if (scope.json.indexOf('http') === 0) {
        scope.isUrl = true;
      }
    }

    scope.isEmptyObject = function () {
      return _.isEmpty(scope.json);
    };


    // If 'open' attribute is present
    scope.isOpen = !!scope.open;
    scope.toggleOpen = function () {
      scope.isOpen = !scope.isOpen;
    };
    scope.childrenOpen = function () {
			return (scope.open > 1) ? scope.open - 1 : 0;
    };

    scope.openLink = function (isUrl) {
      if(isUrl) {
        window.location.href = scope.json;
      }
    };

    scope.parseValue = function (value){
      scope.type = getType(scope.json);
      if (scope.type === 'null') {
        return 'null';
      }
      if (scope.type === 'undefined') {
        return 'undefined';
      }
      if (scope.type === 'string') {
        value = '"' + escapeString(value) + '"';
      }
      if (scope.type === 'function'){

        // Remove content of the function
        return scope.json.toString()
          .replace(/\n/g, '')
          .replace(/\{.+?\}/, '') + '{ ... }';
      }
      return value;
    };
	}

	function JsonFormatterCompile (tElem) {
		return RecursionHelper.compile(tElem, JsonFormatterLink);
	}

	return ({
		templateUrl: 'json-formatter.html',
		restrict: 'E',
		replace: true,
		scope: {
      json: '=',
      key: '=',
      open: '='
    },
		compile: JsonFormatterCompile
	});
}]);
