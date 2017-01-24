'use strict';

/**
 * @ngdoc service
 * @name mudhead.appConfig
 * @description
 * # appConfig
 * Provider in the mudhead.
 */
angular.module('mudhead')
.constant('colorHelper', {
  tint: function(color, weight) {
    return this.mix('#ffffff', color, weight);
  },
  shade: function(color, weight) {
    return this.mix('#000000', color, weight);
  },
  mix: function (color1, color2, weight) {
    // convert a decimal value to hex
    function d2h(d) {
      return d.toString(16);
    }
    // convert a hex value to decimal
    function h2d(h) {
      return parseInt(h, 16);
    }

    var result = "#";
    for(var i = 1; i < 7; i += 2) {
      var color1Part = h2d(color1.substr(i, 2));
      var color2Part = h2d(color2.substr(i, 2));
      var resultPart = d2h(Math.floor(color2Part + (color1Part - color2Part) * (weight / 100.0)));
      result += ('0' + resultPart).slice(-2);
    }
    return result;
  }
});

angular.module('mudhead')
.provider('appConfig', ['colorHelper', function (colorHelper) {
  var basic = {
    default: '#ffffff',
    defaultText: '#666666',
    border: '#dddddd',
    borderDark: '#aaaaaa',
  };

  // main functional color scheme
  var colorScheme = {
    primary: '#209e91',
    info: '#2dacd1',
    success: '#90b900',
    warning: '#dfb81c',
    danger: '#e85656',
  };

  // dashboard colors for charts
  var dashboardColors = {
    blueStone: '#005562',
    surfieGreen: '#0e8174',
    silverTree: '#6eba8c',
    gossip: '#b9f2a1',
    white: '#10c4b5',
  };

  var conf = {
    theme: {
      blur: false,
    },
    colors: {
      default: basic.default,
      defaultText: basic.defaultText,
      border: basic.border,
      borderDark: basic.borderDark,

      primary: colorScheme.primary,
      info: colorScheme.info,
      success: colorScheme.success,
      warning: colorScheme.warning,
      danger: colorScheme.danger,

      primaryLight: colorHelper.tint(colorScheme.primary, 30),
      infoLight: colorHelper.tint(colorScheme.info, 30),
      successLight: colorHelper.tint(colorScheme.success, 30),
      warningLight: colorHelper.tint(colorScheme.warning, 30),
      dangerLight: colorHelper.tint(colorScheme.danger, 30),

      primaryDark: colorHelper.shade(colorScheme.primary, 15),
      infoDark: colorHelper.shade(colorScheme.info, 15),
      successDark: colorHelper.shade(colorScheme.success, 15),
      warningDark: colorHelper.shade(colorScheme.warning, 15),
      dangerDark: colorHelper.shade(colorScheme.danger, 15),

      dashboard: {
        blueStone: dashboardColors.blueStone,
        surfieGreen: dashboardColors.surfieGreen,
        silverTree: dashboardColors.silverTree,
        gossip: dashboardColors.gossip,
        white: dashboardColors.white,
      },
    }
  };

  conf.changeTheme = function(theme) {
    angular.merge(conf.theme, theme);
  };

  conf.changeColors = function(colors) {
    angular.merge(conf.colors, colors);
  };

  conf.$get = function () {
    delete conf.$get;
    return conf;
  };
  return conf;
}]);
