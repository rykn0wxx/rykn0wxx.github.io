'use strict';

/**
 * @ngdoc directive
 * @name mud-theme.directive:aLink
 * @description
 * # aLink
 */
 angular
 .module('mudhead')
 .directive('a', [function() {
 	return ({
 		restrict: 'E',
 		link: function postLink(scope, elem, attrs) {
 			if (attrs.href === '' || attrs.href === '#' || attrs.href === '/') {
 				elem.on('click', function(ev) {
 					ev.preventDefault();
 				});
 			}
 		}
 	});
}]);

angular
.module('mudhead')
.directive('vectorMap', ['$timeout', '$q', '$window', '$cookieStore', function ($t, $q, $w, $cookieStore) {
  var tmpl = '<div style="width: 100%; height: 100%;z-index:1000;"></div>';
  var _ = $w._;
  return ({
    scope: {
      config: '='
    },
    restrict: 'E',
    template: '<div style="width: 100%; height: 100%;margin:auto;"></div>',
    replace: true,
    link: VectorMapPostLink
  });

  function getDepend (arg) {
    return $q.when($w[arg]);
  }

  function mergeOptions (_, elem, config) {
    var defaultOpts = {
      container: null,
      map: 'continents_mill',
      normalizeFunction: 'null',
      hoverOpacity: 0.7,
      hoverColor: false,
      zoomButtons: false,
      zoomOnScroll: false,
      zoomAnimate: false,
      panOnDrag: false,
      zoomOnScrollSpeed: false,
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
					fill: '#34495e',
					'fill-opacity': 1
				},
				hover: {
					fill: '#2c3e50',
					'fill-opacity': 1
				},
				selected: {
					fill: '#9b59b6'
				}
			}
    };
    //var mergedOpts = _.cloneDeep(defaultOpts);
    var mergedOpts = {};
    if (config.options) {
      mergedOpts = _.assign(mergedOpts,config.options);
    } else {
      mergedOpts = defaultOpts;
    }
    mergedOpts.container = elem;
    return mergedOpts;
  }

  function ensureUniqId () {
    var theDate = new Date();
    return theDate.valueOf();
  }

  function VectorMapPostLink (scope, elem, attr) {
    var jvMPromise = getDepend('jvm');
    var config = {};
    var marriedOpts = {};
    config.id = 'vcm' + ensureUniqId();
    elem.attr('id', config.id);

    marriedOpts.options = mergeOptions(_, elem, config);

    var zMap = null;
    scope.zMap = scope.zMap || null;
    var parentElem = elem.parent();

    // Map Events
    marriedOpts.options.onRegionSelected = onRegionSelected;
    marriedOpts.options.onMarkerSelected = onMarkerSelected;

    function onRegionSelected () {
      if ($cookieStore.get('selected-regions')) {
        $cookieStore.put('selected-regions', JSON.stringify( zMap.getSelectedRegions() ));
      }
    }
    function onMarkerSelected () {
      if ($cookieStore.get('selected-markers')) {
        $cookieStore.put('selected-markers', JSON.stringify( zMap.getSelectedMarkers() ));
      }
    }

    $t(function () {
      scope.$apply(function () {
        if (parentElem.height() === 0 && parentElem.width() === 0) {
          parentElem.css('height', 400);
          parentElem.css('width', 700);
        }
        if (elem.children('.jvectormap-container').length !== 0) {
          var cloneElem = elem.clone();
          elem.remove();
          parentElem.append(cloneElem);
        }
        jvMPromise.then(function (jvm) {
          zMap = scope.zMap = new jvm.Map(marriedOpts.options);

          console.log(jvm.SVGCanvasElement.prototype.applyTransformParams);
        });

      })
    }, 10);

  }

}]);
