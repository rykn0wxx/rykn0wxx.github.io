'use strict';

/**
 * @ngdoc directive
 * @name mudhead.directive:smallBox
 * @description
 * # smallBox
 */
angular
.module('mudhead')
.directive('smallBox', SmallBoxDirective);

function SmallBoxDirective (mdTheme, mdMedia, $f, _, tinycolor) {
  return ({
    restrict: 'E',
    replace: true,
    scope: {
      bgColor: '@',
      faIcon: '@',
      dBox: '='
    },
    templateUrl: 'scripts/theme/components/smallBox/smallBox.html',
    link: function (scope, elem) {
      SmallBoxPostLink(scope, elem, $f, _, tinycolor)
    }
  });
}

function getRandom (arr, sel) {
  var tmp = _.pull(arr, sel.join(','));
  tmp = _.sample(tmp);
  sel.push(tmp);
  return tmp;
}
function SmallBoxPostLink (scope, elem, $f, _, tny) {

  var icons = ['fa-archive', 'fa-book','fa-camera','fa-cubes','fa-suitcase','fa-wrench','fa-university','fa-phone','fa-laptop','fa-hotel','fa-fax','fa-beer','fa-clock-o'];
  var bgs = ['bg-red','bg-yellow','bg-aqua','bg-blue','bg-light-blue','bg-green','bg-navy','bg-teal','bg-olive','bg-lime','bg-orange','bg-fuchsia','bg-purple'];
  var base = tny.mix('#303438', '#4b5258', 50);
  var mnoBase = base.monochromatic(20);
  var bgColors = ['rgb(48, 52, 56)','rgb(70, 76, 81)','rgb(92, 99, 107)','rgb(70, 75, 81)','rgb(92, 99, 107)','rgb(136, 146, 158)','rgb(38, 42, 45)','rgb(60, 65, 70)','rgb(82, 89, 96)'];
  var empIcon = [];
  var empBgs = [];
  scope.boxInfo = _.cloneDeep(scope.dBox);
  _.map(scope.boxInfo, function (val, ind) {
    var tmp = {};
    _.forEach(val.data, function(v, k) {
      tmp[v[0]] = $f(val.format)(v[1]); //val[1];
    });
    val.data = tmp;
    val.icon = getRandom(icons, empIcon);
    val.bg = mnoBase[ind + 1].toHexString();
  });
}


SmallBoxDirective.$inject = ['$mdTheming', '$mdMedia', '$filter', '_', 'tinycolor'];
