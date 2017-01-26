/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('DashboardPieChartCtrl', DashboardPieChartCtrl);

  /** @ngInject */
  function DashboardPieChartCtrl($scope, $timeout, baConfig, baUtil) {
    var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
    var allPieData = [{
    	"Region": "APAC",
    	"Metrics": "637",
    	"Revenue": 1881940,
    	"EBIT %": 0.180914375591145,
    	"IPH": 637.450357426529,
    	"SLA Attainment": "-",
    	"Cost p/Incident": 19.207152202355,
    	"EBIT p/Incident": 4.24235250140178,
    	"Revenue p/Head": 14947.8951548848
    }, {
    	"Region": "EMEA",
    	"Metrics": "263",
    	"Revenue": 449366,
    	"EBIT %": 0.169877115758647,
    	"IPH": 262.567567567568,
    	"SLA Attainment": "-",
    	"Cost p/Incident": 38.3972207925888,
    	"EBIT p/Incident": 7.85764282038085,
    	"Revenue p/Head": 12145.027027027
    }, {
    	"Region": "North America",
    	"Metrics": "419",
    	"Revenue": 3787345,
    	"EBIT %": 0.211997586699918,
    	"IPH": 418.7905039016,
    	"SLA Attainment": "-",
    	"Cost p/Incident": 23.5627709045548,
    	"EBIT p/Incident": 6.33913105266898,
    	"Revenue p/Head": 12522.632588282
    }, {
    	"Region": "South America",
    	"Metrics": "631",
    	"Revenue": 187971,
    	"EBIT %": 0.281394470423629,
    	"IPH": 631.421052631579,
    	"SLA Attainment": "-",
    	"Cost p/Incident": 11.2592314745353,
    	"EBIT p/Incident": 4.40893556722514,
    	"Revenue p/Head": 9893.21052631579
    }, {
    	"Region": "Global",
    	"Metrics": "472",
    	"Revenue": 6306622,
    	"EBIT %": 0.201789325569219,
    	"IPH": 472.036172936367,
    	"SLA Attainment": "-",
    	"Cost p/Incident": 22.0185499462003,
    	"EBIT p/Incident": 5.56633541242029,
    	"Revenue p/Head": 13021.0637155717
    }];
    $scope.selOp = _.map(allPieData,'Region');
    $scope.charts = [{
      color: pieColor,
      description: 'New Visits',
      stats: '57,820',
      icon: 'person',
    }, {
      color: pieColor,
      description: 'Purchases',
      stats: '$ 89,745',
      icon: 'money',
    }, {
      color: pieColor,
      description: 'Active Users',
      stats: '178,391',
      icon: 'face',
    }, {
      color: pieColor,
      description: 'Returned',
      stats: '32,592',
      icon: 'refresh',
    }
    ];

    $scope.testFunc = function (ev) {
      console.log(ev);
    };

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    function loadPieCharts() {
      $('.chart').each(function () {
        var chart = $(this);
        chart.easyPieChart({
          easing: 'easeOutBounce',
          onStep: function (from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
          },
          barColor: chart.attr('rel'),
          trackColor: 'rgba(0,0,0,0)',
          size: 84,
          scaleLength: 0,
          animation: 2000,
          lineWidth: 9,
          lineCap: 'round',
        });
      });

      $('.refresh-data').on('click', function () {
        updatePieCharts();
      });
    }

    function updatePieCharts() {
      $('.pie-charts .chart').each(function(index, chart) {
        $(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
      });
    }

    $timeout(function () {
      loadPieCharts();
      updatePieCharts();
    }, 1000);
  }
})();
