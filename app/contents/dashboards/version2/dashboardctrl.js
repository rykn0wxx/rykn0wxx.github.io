'use strict';

/**
 * @ngdoc function
 * @name mudhead.controller:exeDashboardCtrl
 * @description
 * # exeDashboardCtrl
 * Controller of the mudhead
 */

angular.module('mudhead')
.controller('exeDashboard2Ctrl', ['$scope', 'InstantiatorService', function($scope, jSchema) {
  var o = this;
  o.$scope = $scope;
  $scope.pieInfo = [
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

  var mySchema = {
    'type': 'object',
    'properties': {
      'project': {
        'type': 'string'
      },
      'region': {
        'type': 'string',
        'enum': ['APAC','North America', 'EMEA','South America']
      }
    },
    'required': [
      'project',
      'region'
    ]
  };

  console.log(jSchema);

}]);
