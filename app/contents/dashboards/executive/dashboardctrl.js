'use strict';

/**
 * @ngdoc function
 * @name mudhead.controller:exeDashboardCtrl
 * @description
 * # exeDashboardCtrl
 * Controller of the mudhead
 */

angular.module('mudhead')
.controller('exeDashboardCtrl', ['$scope', '_', '$filter', function ($scope, _, $f) {
  var dnc = ['AS','EU','NA','SA'];
  var o = this;
  o.$scope = $scope;

  $scope.config = {};
	$scope.config.isLoading = true;
	$scope.config.options = {
		series: {
	    regions: [{
				attribute: 'fill',
        values: {
          'AS':'#9C27B0',
          'EU':'#689F38',
          'NA':'#A1887F',
          'SA':'#009688'
        }
			}]
    },
		markers: [
			{latLng: [54.36, -88.25], name: 'North America'},
			{latLng: [25.23, 100.68], name: 'APAC'},
			{latLng: [64.28, 86.56], name: 'EMEA'},
			{latLng: [-24.37, -58.07], name: 'South America'}
		],
		markersSelectable: true,
		markersSelectableOne: true,
		markerStyle: {
      initial: {
				r: 8,
				'stroke-width': 1,
				stroke: '#EC407A',
        fill: '#EC407A',
				'fill-opacity': 1
      },
			hover: {
				r: 10,
				'stroke-width': 1,
				stroke: '#E91E63',
        fill: '#E91E63',
				'fill-opacity': 1
			},
      selected: {
        fill: '#CA0020'
      }
    },
    labels: {
      regions: {
        offsets: function (code) {
          return {
            'AS':[25,-25],
            'EU':[80,-50],
            'NA':[-300,-20],
            'SA':[0,-30]
          }[code];
        }
      }
    }
	};

  $scope.kpi = null;
  $scope.kpiSelector = null;

  $scope.data = [
    {
    	name : 'Revenue',
    	format: 'currency',
    	data : [['AS', 1881940], ['EU', 449366], ['NA', 3787345], ['SA', 187971], ['GL', 6306622]]
    }, {
    	name : 'EBIT %',
    	format: 'percent',
    	data : [['AS', 0.180914375591145], ['EU', 0.169877115758647], ['NA', 0.211997586699918], ['SA', 0.281394470423629], ['GL', 0.201789325569219]]
    }, {
    	name : 'IPH',
    	format: 'number',
    	data : [['AS', 637.450357426529], ['EU', 262.567567567568], ['NA', 418.7905039016], ['SA', 631.421052631579], ['GL', 472.036172936367]]
    }, {
    	name : 'SLA Attainment',
    	format: 'percent',
    	data : [['AS',  0 ], ['EU',  0 ], ['NA',  0 ], ['SA',  0 ], ['GL',  0 ]]
    }, {
    	name : 'Cost p/Incident',
    	format: 'currency',
    	data : [['AS', 19.207152202355], ['EU', 38.3972207925888], ['NA', 23.5627709045548], ['SA', 11.2592314745353], ['GL', 22.0185499462003]]
    }, {
    	name : 'EBIT p/Incident',
    	format: 'currency',
    	data : [['AS', 4.24235250140178], ['EU', 7.85764282038085], ['NA', 6.33913105266898], ['SA', 4.40893556722514], ['GL', 5.56633541242029]]
    }, {
    	name : 'Revenue p/Head',
    	format: 'currency',
    	data : [['AS', 14947.8951548848], ['EU', 12145.027027027], ['NA', 12522.632588282], ['SA', 9893.21052631579], ['GL', 13021.0637155717]]
    }
  ];

  $scope.selectChange = function () {
    if ($scope.kpiSelector !==  null) {
      var flt = _.filter($scope.data, ['name', $scope.kpiSelector])[0];
      $scope.kpi = _.fromPairs(flt.data);
      $scope.kpi.format = flt.format;
      $scope.kpi.name = flt.name;
      $scope.glbal = 'Global: ' + $f($scope.kpi.format)($scope.kpi.GL);
      return $scope.kpiSelector;
    } else {
      $scope.glbal =' - nodata -';
      return 'Select a kpi';
    }
  };

  o.onRegionTipShow = function (code, el) {
    if ($scope.kpi ===  null) {
      return el.html();
    } else {
      var elCode = $scope.kpi.name + '<br>' + el.html();
      return elCode + ' - ' + $f($scope.kpi.format)($scope.kpi[code]);
    }
  };

  o.updateLabels = function (code) {
    var codeMap = {
      'AS':'APAC',
      'EU':'EMEA',
      'NA':'North America',
      'SA':'South America'
    };
    if (_.indexOf(dnc, code) !== -1) {
      if ($scope.kpi ===  null) {
        return codeMap[code];
      } else {
        return codeMap[code] + ': ' + $f($scope.kpi.format)($scope.kpi[code]);
      }
    }
  };

  $scope.newSeries = [
		{'name': 'SomeName', data:[[1451624400000,162],[1454302800000,88],[1456808400000,41],[1459483200000,153],[1462075200000,93],[1464753600000,51],[1467345600000,193],[1470024000000,183],[1472702400000,36],[1475294400000,194],[1477972800000,40],[1480568400000,56]]}
	];

  $scope.chartConfig = {
    options: {
      chart: {
        type: 'areaspline'
      },
      plotOptions: {
        areaspline: {
          stacking: '',
          fillColor: {
            linearGradient: {
              x1:0,y1:0,x2:0,y2:1
            },
            stops: [
              [0, Highcharts.getOptions().colors[0]],
              [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.5).get('rgba')]
            ]
          },
          marker: {
            radius: 2
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          threshold: null
        }
      },
      exporting: {
        enabled:false
      },
			tooltip: {
				xDateFormat: '%b-%Y',
        headerFormat: null,
				pointFormat: '<span style="color:{series.color}">\u25CF</span> {point.x:%b-%Y}: <b>{point.y}</b><br/>'
			},
			xAxis: {
				type: 'datetime',
        labels: {
          enabled:false
        }
			},
      yAxis: {
        labels: {
          enabled:false
        }
      },
      legend: {
        enabled: false
      }
    },
    series: $scope.newSeries,
    title: {
      text: null
    },
    credits: {
      enabled: true
    },
    loading: false,
    size: {
      height: 100
    }
  };


}]);
