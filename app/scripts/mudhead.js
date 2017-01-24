'use strict';

/**
 * @ngdoc overview
 * @name snowApp
 * @description
 * # snowApp
 *
 * Main module of the application.
 */
angular
.module('mudhead', [
	'ngAnimate',
	'ngAria',
	'ngMessages',
	'ngRoute',
	'ngCookies',
  'ngResource',
	'ngMaterial',
	'ui.router',
	'highcharts-ng',
	'angularFileUpload',
	'oc.lazyLoad',
	'ui.knob',
	'schemaInstantiator',
	'vcMap',
	'pluginApp',
	'RecursionHelper',
	'angular-jsonapi',
	'angular-jsonapi-rest',
	'angular-jsonapi-local'
])
.config(['$httpProvider', '$filterProvider', '$locationProvider', '$mdThemingProvider', '$mdAriaProvider', '$sceDelegateProvider', '$qProvider', '$routeProvider', '$ocLazyLoadProvider',
function (ngHttp, ngFilter, ngLoc, mdTheme, mdAria, sceDel, qProv, ngRouter, ozLazy) {
	var _ = window._;

	ngHttp.interceptors.push('jsonInspector');

  sceDel.resourceUrlWhitelist([
		'self',
		'**'
	]);

	ngFilter.register('percent', ['_', function (_) {
		return function (zVal) {
	    return (!zVal) ? '' : _.round(_.toNumber(zVal) * 100, 2) + '%';
	  };
	}]);

	ozLazy.config({
		debug: false,
		events: true
	});

	ngLoc.hashPrefix('!');

  qProv.errorOnUnhandledRejections(false);

  mdAria.disableWarnings();

  mdTheme.definePalette('zBack', { '50': '#f1f2f3', '100': '#c7ccd0', '200': '#a9afb7', '300': '#828c96', '400': '#727c88', '500': '#646d77', '600': '#565e66', '700': '#484f56', '800': '#3a3f45', '900': '#2c3034', 'A100': '#f1f2f3', 'A200': '#c7ccd0', 'A400': '#727c88', 'A700': '#484f56', 'contrastDefaultColor': 'light', 'contrastDarkColors': '50 100 200 300 A100 A200' });
  mdTheme.definePalette('zPrimary', { '50': '#b3b9be', '100': '#8a929b', '200': '#6d767f', '300': '#4c5359', '400': '#3e4348', '500': '#303438', '600': '#222528', '700': '#141517', '800': '#060607', '900': '#000000', 'A100': '#b3b9be', 'A200': '#8a929b', 'A400': '#3e4348', 'A700': '#141517', 'contrastDefaultColor': 'light', 'contrastDarkColors': '50 100 A100 A200' });
  mdTheme.definePalette('zAccent', { '50': '#ffffff', '100': '#fafafa', '200': '#f8f8f8', '300': '#e4e6e7', '400': '#d3d6d9', '500': '#c3c7cb', '600': '#b3b8bd', '700': '#a2a8af', '800': '#9299a0', '900': '#818a92', 'A100': '#f5f5f5', 'A200': '#ffffff', 'A400': '#d3d6d9', 'A700': '#a2a8af', 'contrastDefaultColor': 'light', 'contrastDarkColors': '50 100 200 300 400 500 600 700 800 900 A100 A200 A400 A700' });
  mdTheme.definePalette('zWarn', { '50': '#ffebee', '100': '#ffcdd2', '200': '#ef9a9a', '300': '#e57373', '400': '#ef5350', '500': '#f44336', '600': '#e53935', '700': '#d32f2f', '800': '#c62828', '900': '#b71c1c', 'A100': '#ff8a80', 'A200': '#ff5252', 'A400': '#ff1744', 'A700': '#d50000', 'contrastDefaultColor': 'light', 'contrastDarkColors': '50 100 200 A100 A200' });

	mdTheme.theme('default')
		.primaryPalette('zPrimary')
		.accentPalette('zAccent')
		.warnPalette('zWarn')
		.backgroundPalette('zBack')
		.dark();

	mdTheme.theme('app-dark')
		.primaryPalette('pink')
		.backgroundPalette('grey')
		.dark();
	mdTheme.theme('form-dark')
		.primaryPalette('purple')
		.accentPalette('green')
		.warnPalette('pink')
		.backgroundPalette('grey')
		.dark();

	ngRouter
		.when('/one', {
			templateUrl: 'contents/one/one-1.html',
			controller: 'OneCtrl',
			controllerAs: 'one',
			resolve: {
				loadFiles: function ($ocLazyLoad) {
					return $ocLazyLoad.load({
						name: 'mudhead',
						files: [
							'contents/one/onectrl.js',
							'scripts/theme/utilities/directiveHelpers.js',
							'../bower_components/bootswatch/slate/bootstrap.css'
						]
					});
				}
			}
		})
		.when('/dashboards/executive/dashboard', {
			templateUrl: 'contents/dashboards/executive/dashboard.html',
			controller: 'exeDashboardCtrl',
			controllerAs: 'exeDash',
			resolve: {
				loadFiles: function ($ocLazyLoad) {
					return $ocLazyLoad.load({
						name: 'mudhead',
						files: [
							'contents/dashboards/executive/dashboardctrl.js'
						]
					});
				}
			}
		})
		.when('/dashboards/executive/drilldown', {
			templateUrl: 'contents/dashboards/executive/drilldown.html',
			controller: 'exeDrilldownCtrl',
			controllerAs: 'exeDrill',
			resolve: {
				loadFiles: function ($ocLazyLoad) {
					return $ocLazyLoad.load({
						name: 'mudhead',
						files: [
							'contents/dashboards/executive/drilldownctrl.js'
						]
					});
				}
			}
		})
		.when('/dashboards/version2/dashboard', {
			templateUrl: 'contents/dashboards/version2/dashboard.html',
			controller: 'exeDashboard2Ctrl',
			controllerAs: 'exeDash2',
			resolve: {
				loadFiles: function ($ocLazyLoad) {
					return $ocLazyLoad.load({
						name: 'mudhead',
						files: [
							'contents/dashboards/version2/dashboardctrl.js',
							'scripts/theme/components/smallBox/smallBox.directive.js',
							'../bower_components/bootswatch/slate/bootstrap.css'
						]
					});
				}
			}
		})
		.when('/two', {
			templateUrl: 'contents/two/two.html',
			controller: 'TwoCtrl',
			controllerAs: 'twoctrl'
		});

	ngRouter.otherwise({redirectTo: '/one'});

}])
.run(['$templateCache', 'pluginLoader', '$window', function ($templateCache, pluginLoader, $w) {

	pluginLoader('_', true);
	pluginLoader('tinycolor');

	var Highcharts = $w.Highcharts;

	Highcharts.theme = {
		chart: {
			backgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
				stops: [
					[0, '#313035'],
					[1, '#515054']
				]
			},
			style: {
				fontFamily: 'Roboto',
				fontSize: '12px'
			}
		},
		lang: {
			contextButtonTitle: 'ACA context menu',
			decimalPoint: '.',
			downloadJPEG: 'Export as JPG',
			downloadPDF: 'Export as PDF',
			downloadSVG: 'Export as SVG',
			drillUpText: 'Back to {series.name}',
			loading: 'This will be awesome...',
			months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			noData: 'No data to display',
			numericSymbols: ['k', 'M', 'G', 'T', 'P', 'E'],
			printChart: 'Export Chart',
			resetZoom: 'Reset zoom',
			resetZoomTitle: 'Reset zoom level 1:1',
			shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			thousandsSep: ',',
			weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
		},
		credits: {
			enabled: true,
			href: 'mailto:ariel.andrade@stefanini.com?subject=Stefanini Dashboard Query',
			text: 'Created by ACAndrade',
			style: {
				fontSize: '10px',
				fontFamily: 'Roboto, sans-serif',
				color: 'rgba(255,255,255,0.2)'
			}
		},
		title: {
			style: {
				fontFamily: 'Roboto, sans-serif',
				color: 'rgba(255,255,255,0.8)',
				textTransform: 'uppercase',
				fontSize: '16px',
				fontWeight: 'medium'
			}
		},
		subtitle: {
			style: {
				textTransform: 'uppercase',
				fontSize: '12px',
				fontFamily: 'Roboto, sans-serif',
				fontStyle: 'italic',
				color: 'rgba(255,255,255,0.4)'
			}
		},
		legend: {
			itemStyle: {
				color: 'rgba(255,255,255,0.5)',
				fontWeight: 300
			},
			itemHiddenStyle: {
				color: 'rgba(255,255,255,0.1)'
			},
		},
		plotOptions: {
			bar: {
				borderWidth: 1,
				borderColor: 'rgba(0,0,0,0.1)'
			},
			series: {
				borderWidth: 1,
				borderColor: 'rgba(0,0,0,0.1)',
				groupPadding: 0.01,
				dataLabels: {
					style: {
						backgroundColor: 'rgba(0,0,0,0.4)',
						color: 'rgba(255,255,255,0.7)'
					}
				}
			},
			column: {
				groupPadding: 0.1,
				pointPadding: 0.05,
				borderWidth: 0,
				borderColor: 'rgba(0,0,0,0.1)',
				borderRadius: 1,
				states: {
					hover: {
						enabled: true
					}
				},
				dataLabels: {
					style: {
						backgroundColor: 'rgba(0,0,0,0.4)',
						color: 'rgb(255,0,0)'
					}
				}
			},
			spline: {
				lineWidth: 1,
				marker: {
					lineWidth: 2,
					fillColor: '#fff',
					lineColor: '#484343',
					symbol: 'circle'
				},
				dataLabels: {
					style: {
						color: '#808080',
						fontWeight: 'regular',
						fontSize: '10px',
						fontFamily: 'Roboto, sans-serif',
					}
				}
			},
			line: {
				lineWidth: 1
			}
		},
		tooltip: {
			backgroundColor: 'rgba(0, 0, 0, 0.5)',
			style: {
				fontSize: '11px',
				color: '#F0F0F0'
			}
		},
		yAxis: {
			gridLineColor: 'rgba(0,0,0,0.1)',
			labels: {
				style: {
					color: 'rgba(255,255,255,0.4)'
				}
			},
			lineColor: 'rgba(0,0,0,0.1)',
			lineWidth: 0,
			tickColor: 'rgba(0,0,0,0.4)',
			title: {
				style: {
					color: 'rgba(255,255,255,0.5)'
				},
				text: null
			}
		},
		xAxis: {
			gridLineColor: '#707073',
			labels: {
				style: {
					color: 'rgba(255,255,255,0.4)',
					fontSize: '10px'
				}
			},
			lineColor: 'rgba(0,0,0,0.1)',
			lineWidth: 0,
			tickColor: 'rgba(0,0,0,0.4)',
			title: {
				style: {
					color: 'rgba(255,255,255,0.5)'
				}
			}
		},
		exporting: {
			buttons: {
				contextButton: {
					menuItems: [{
						text: 'Export to PNG (small)',
						onclick: function() {
							this.exportChart({
								width: 250
							});
						}
					}, {
						text: 'Export to PNG (large)',
						onclick: function() {
							this.exportChart();
						},
						separator: false
					}, {
						text: 'Export as SVG',
						onclick: function() {
							this.exportChartLocal({
								type: 'image/svg+xml'
							});
						},
						separator: false
					}]
				}
			}
		},
		colors: ['#5DA3E7', '#686868', '#75E95D', '#F9953A', '#7077FF', '#F15A60', '#E4D354', '#B8D2EC', '#D98880', '#87CEFA', '#CCCCCC', '#E7B2D4']
	};

	Highcharts.setOptions(Highcharts.theme);

	Highcharts.SparkLine = function(a, b, c) {
		var hasRenderToArg = typeof a === 'string' || a.nodeName,
			options = arguments[hasRenderToArg ? 1 : 0],
			defaultOptions = {
				chart: {
					animation: false,
					renderTo: (options.chart && options.chart.renderTo) || this,
					backgroundColor: null,
					borderWidth: 0,
					type: 'area',
					margin: [2, 0, 2, 0],
					style: {
						overflow: 'visible'
					},
					skipClone: true
				},
				exporting: {
					enabled: false
				},
				title: {
					text: ''
				},
				credits: {
					enabled: false
				},
				xAxis: {
					labels: {
						enabled: false
					},
					title: {
						text: null
					},
					startOnTick: false,
					endOnTick: false,
					gridLineWidth: 0,
					lineWidth: 0,
					tickWidth: 0,
					tickLength: 0,
					tickPositions: []
				},
				yAxis: {
					endOnTick: false,
					startOnTick: false,
					gridLineWidth: 0,
					lineWidth: 0,
					tickWidth: 0,
					labels: {
						enabled: false
					},
					title: {
						text: null
					},
					tickPositions: [0]
				},
				legend: {
					enabled: false
				},
				tooltip: {
					backgroundColor: null,
					borderWidth: 0,
					shadow: false,
					useHTML: true,
					hideDelay: 0,
					shared: true,
					padding: 0,
					headerFormat: '',
					pointFormat: '<span style="color:{series.color}">\u25CF</span> <b>{point.y}</b><br/>',
					positioner: function(w, h, point) {
						return {
							x: point.plotX - w / 2,
							y: point.plotY - h
						};
					}
				},
				plotOptions: {
					series: {
						animation: false,
						lineWidth: 1,
						shadow: false,
						states: {
							hover: {
								lineWidth: 1
							}
						},
						marker: {
							radius: 2,
							states: {
								hover: {
									radius: 2.5
								}
							}
						},
						fillOpacity: 0.25
					},
					column: {
						negativeColor: '#910000',
						borderColor: 'silver'
					}
				}
			};
		options = Highcharts.merge(defaultOptions, options);
		return hasRenderToArg ? new Highcharts.Chart(a, options, c) : new Highcharts.Chart(options, b);
	};

	$templateCache.put('json-formatter.html', '<div ng-init=\"isOpen = open && open > 0\" class=\"json-formatter-row\"> <a ng-click=\"toggleOpen()\"> <span class=\"toggler {{isOpen ? \'open\' : \'\'}}\" ng-if=\"isObject()\"></span> <span class=\"key\" ng-if=\"hasKey\">{{key}}:</span> <span class=\"value\"> <span ng-if=\"isObject()\"> <span class=\"constructor-name\">{{getConstructorName(json)}}</span> <span ng-if=\"isArray()\"><span class=\"bracket\">[</span><span class=\"number\">{{json.length}}</span><span class=\"bracket\">]</span></span> </span> <span ng-if=\"!isObject()\" ng-click=\"openLink(isUrl)\" class=\"{{type}}\" ng-class=\"{date: isDate, url: isUrl}\">{{parseValue(json)}}</span> </span> </a> <div class=\"children\" ng-if=\"getKeys().length && isOpen\"> <json-formatter ng-repeat=\"key in getKeys()\" json=\"json[key]\" key=\"key\" open=\"childrenOpen()\"></json-formatter> </div> <div class=\"children empty object\" ng-if=\"isEmptyObject()\"></div> <div class=\"children empty array\" ng-if=\"getKeys() && !getKeys().length && isOpen && isArray()\"></div> </div> ');

}])
.factory('jsonInspector', [function () {
	return {
		request: function (config) {
			if (config.url.indexOf('3000') !== -1) {
				//http://localhost:3000/regions
				console.log(config);
			}

			return config;
		}
	};
}]);
