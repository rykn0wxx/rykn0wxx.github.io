'use strict';

/**
 * @ngdoc overview
 * @name vcMap
 * @description
 * # vcMap
 *
 * Main module of the application.
 */

angular
.module('vcMap', ['ngCookies', 'ngMaterial'])
.provider('vc.pluginloader', ['$provide', function ($provide) {
  function vcWrapper(vcName, leaveGlobal) {
    $provide.provider(vcName, function () {
      if (typeof window[vcName] === 'undefined') {
				throw new Error('Cannot find window.' + vcName);
			}
      var vcThing = window[vcName];
      if (!leaveGlobal) {
        if (typeof window[vcName] === 'function') {
          delete window[vcName];
        } else if (typeof window[vcName] === 'object') {
          window[vcName] = null;
        }
      }
      return {
        $get: function () {return vcThing;}
      };
    });
  }
  return {
    	vcWrap: vcWrapper,
      $get: function () {
        return vcWrapper;
      }
  };
}])
.factory('getDepend', ['$q', '$window', 'vc.pluginloader', function ($q, $w, vcPlugLoader) {
  var dependProm = $q.defer();
  function oneItmDepend (wnObj) {
    return $q.when($w[wnObj]);
  }

  function getDepenOnce (arg) {
    var dependArr = [], removalWnd = [];
    angular.forEach(arguments, function(val) {
      removalWnd.push(val);
      dependArr.push(oneItmDepend(val));
    });
    $q.all(dependArr).then(function (data) {
      angular.forEach(removalWnd, function(v) {
        vcPlugLoader(v, true);
      });
      dependProm.resolve(data);
    });
    return dependProm.promise;
  }

  return {
    getDepended: getDepenOnce,
    ready: function readyFunction (callback, thisArg) {
       getDepenOnce().then(function () {
         callback.call(thisArg);
       });
    }
  };
}])
.factory('vcMapRipple', ['$mdInkRipple', function (mdInkRipple) {
  return {
    attach: function (scope, elem, opts) {
      return mdInkRipple.attach(scope, elem, angular.extend({
        center: true,
        dimBackground: true,
        fitRipple: true
      }, opts));
    }
  };
}])
.directive('vectMap', ['getDepend', '$timeout', '$mdTheming', 'vcMapRipple', '$cookieStore', function (getDepend, $t, mdTheming, vcMapRipple, $cookieStore) {

  var marryOptions = function (_, scope, elem, config) {
    var defaultOpts = {
      container: null,
      map: 'continents_mill',
      normalizeFunction: 'null',
      hoverOpacity: 0.7,
      hoverColor: false,
      zoomButtons: false,
      zoomOnScroll: false,
      regionsSelectable: true,
      regionsSelectableOne: true,
      backgroundColor: null,
      series: {
        regions: [{
          attribute: 'fill'
        }]
      },
      regionStyle: {
				initial: {
					fill: '#4B5258',
					'fill-opacity': 0.5
				},
				hover: {
					'fill-opacity': 1
				},
				selected: {
          fill: '#2196F3',
					'fill-opacity': 1
				}
			}
    };
    var mergedOptions = _.cloneDeep(defaultOpts);
    if (scope.config.options) {
      mergedOptions = _.assign(mergedOptions, scope.config.options);
    }
    mergedOptions.container = elem;
    return mergedOptions;
  };

  var uniId = function () {
    var theDate = new Date();
    return theDate.valueOf();
  };



  function linkWithJvm (zJvm, _, scope, elem, attr) {
    var dnc = ['AS','EU','NA','SA'];
    var config = {};
    var ctrl = elem.parent().controller();
    config.id = 'vcm' + uniId();
    elem.attr('id', config.id);
    hackedLabel(zJvm);
    var marriedOpts = {};
    marriedOpts.options = marryOptions(_, scope, elem, config);

    marriedOpts.options.labels.regions.render = renderLabel;

    // Map Events
    marriedOpts.options.onRegionSelected = onRegionSelected;

    marriedOpts.options.onMarkerSelected = onMarkerSelected;
    marriedOpts.options.onRegionTipShow = onRegionTipShow;

    var zMap = null;
    scope.zMap = scope.zMap || null;
    var parentElem = elem.parent();
    $t(function() {

      var nwHeight = 400;
      var nwWidth = 700;
      if (parentElem.height() === 0 && parentElem.width() === 0) {
        scope.$apply(function() {
          parentElem.css('height', nwHeight);
          parentElem.css('width', nwWidth);
        });
      }
      if (elem.children('.jvectormap-container').length !== 0) {
        var cloneElem = elem.clone();
        elem.remove();
        parentElem.append(cloneElem);
      }
      zMap = scope.zMap = new zJvm.Map(marriedOpts.options);

      //zMap.series.regions[0].setValues(genColors(_, scope));
      scope.config.jvm = zMap;
      scope.config.isLoading = false;

      scope.$watch(function () {
        return scope.config.options.labels.regions.render('AS');
      }, function(ol, nw) {
        zMap.onUpdate(ctrl);

      }, true);
    }, 10);

    function upLabelText (zJvm) {
      var ctrl = ctrl;
      zJvm.Region.prototype.updateLabelText = function (txt) {
        if (this.label) {
          this.label.set('text',txt);
        }
      };
    }

    function hackedLabel (zJvm) {
      upLabelText(zJvm);
      zJvm.Region.prototype.updateLabelPosition = function () {
        if (this.label) {
          this.label.set({
            x: this.labelX * this.map.scale + this.map.transX * this.map.scale,
            y: this.labelY * this.map.scale + this.map.transY * this.map.scale
          });
        }
        this.map.onUpdate = function (ctrl) {
          var key;
          for (key in this.regions) {
            var txt = ctrl.updateLabels(key);
            this.regions[key].element.updateLabelText(txt);
          }
        };
      };
    }

    function renderLabel (code) {
      return ctrl.updateLabels(code);
    }
    function onRegionTipShow ( e, el, code ) {
      if (_.indexOf(dnc, code) !== -1 ) {
        el.html(ctrl.onRegionTipShow(code, el));
      } else {
        e.preventDefault();
      }
    }
    function onRegionSelected (e, code, isSelected, selectedRegions) {
      if (_.indexOf(dnc, code) !== -1 ) {
        if ($cookieStore.get('selected-regions')) {
          $cookieStore.put('selected-regions', JSON.stringify( zMap.getSelectedRegions() ));
        }
      } else {
        zMap.clearSelectedRegions();
        e.preventDefault();
      }
    }
    function onMarkerSelected () {
      if ($cookieStore.get('selected-markers')) {
        $cookieStore.put('selected-markers', JSON.stringify( zMap.getSelectedMarkers() ));
      }
    }

    scope.$on('$destroy', function () {
      if (zMap) {
        try {
          zMap.remove();
        } catch (ex) {
        }
        $t(function () {
          elem.remove();
        }, 1);
      }
    });

    zMap.setSelectedRegions( JSON.parse( $cookieStore.get('selected-regions') || '[]' ) );
    zMap.setSelectedMarkers( JSON.parse( $cookieStore.get('selected-markers') || '[]' ) );

  }

  return ({
    priority: -1,
    scope: {
      config: '='
    },
    restrict: 'E',
    replace: true,
    template: '<div style="width: 100%; height: 100%;z-index:1000;"></div>',
    link: function postLinkVectMap (scope, elem, attr) {
      function dependCallback (dpnArr) {
        var zJvm = dpnArr[0];
        var _ = dpnArr[1];
        mdTheming(elem);
        elem.addClass('_md');
        vcMapRipple.attach(scope, elem, { center: true });
        linkWithJvm(zJvm, _, scope, elem, attr);
      }
      getDepend
        .getDepended('jvm', '_')
        .then(dependCallback);
    }
  });
}]);
