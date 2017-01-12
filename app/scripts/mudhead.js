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
	'highcharts-ng',
	'angularFileUpload',
	'mud-theme'
])
.config(['$mdThemingProvider', '$mdAriaProvider', '$sceDelegateProvider', '$qProvider', function (mdTheme, mdAria, sceDel, qProv) {

  sceDel.resourceUrlWhitelist([
		'self',
		'**'
	]);

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

}]);
