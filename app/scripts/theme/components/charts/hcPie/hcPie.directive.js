'use strict';

/**
 * @ngdoc directive
 * @name mudhead.directive:hcPie
 * @description
 * # hcPie
 */
 angular
.module('mudhead')
.directive('hcPie', ['$mdTheming', '$mdColors', '_', '$filter', function (mdTheming, mdColors, _, $f) {
  function HcPieCtrl ($scope, $element) {
    var o = this;
    $scope.value = 77;
    $scope.options = {
      skin: {
        type: 'tron',
        width: 5,
        color: mdColors.getThemeColor('indigo-100'),
        spaceWidth: 3
      },
      size: 84,
      bgColor: mdColors.getThemeColor('default-primary-500-0.5'),
      trackWidth: 20,
      barWidth: 20,
      barColor: mdColors.getThemeColor('indigo-A200'),
      textColor: '#eee',
      readOnly: true
    };
    _.map($scope.pieData, function (pie) {
      var conv = {};
      _.forEach(pie.data, function(val, ind) {
        if (_.isArray(val)) {
          var tmp = {};
          conv[val[0]] = $f(pie.format)(val[1]);
        }
      });
      pie.data = conv;
    });

  }
  return ({
    restrict: 'E',
    replace: true,
    scope: {
      pieData: '='
    },
    templateUrl: 'scripts/theme/components/charts/hcPie/hcPie.html',
    link: function (scope, elem) {
      mdTheming(elem);
      elem.addClass('_md');
    },
    controller: HcPieCtrl
  });
}]);
