angular.module('myapp', ['highcharts-ng'])
.directive('customPanels', [function() {
	var _ = window._;
	function viewToggler(partnerElement) {
		var opac =  (partnerElement === 'home') ? 0 : 1;
		angular.element('.on').addClass('off');
		angular.element('.off').removeClass('on').delay(500).queue(function(next){
			angular.element(this).addClass('display-none');
			angular.element('.home-back').css('opacity', opac);
			next();
		});
		angular.element('.' + partnerElement).removeClass('off').delay(0).queue(function(next) {
			angular.element(this).addClass('on').removeClass('display-none');
			next();
		});
	}
	function panelLink(scope, elem, attr, ctrl) {
		var arrLink = ['servicedesk-linkbox', 'deskside-linkbox', 'baseservices-linkbox', 'home-back'];
		elem.bind('click', function(e) {
			var meclasses = _.intersection(e.target.classList, arrLink),
					parentclasses = _.intersection((angular.element(e.target).parents('.box')[0] === undefined) ? [] : angular.element(e.target).parents('.box')[0].classList, arrLink),
					backparent = _.intersection((angular.element(e.target).parents('.home-back')[0] === undefined) ? [] : angular.element(e.target).parents('.home-back')[0].classList, arrLink);
			var classes = (meclasses.length !== 0) ? meclasses : (parentclasses.length !== 0) ? parentclasses : backparent;
			if (classes.length !== 0) {
				var selecteddesk = _.split(classes[0], '-', 1).toString();

				viewToggler(_.split(classes[0], '-', 1).toString());
				scope.$apply(function(){
					ctrl.addSeries(selecteddesk);
					setTimeout(function() {
						ctrl.reflow();
					},500);
				});
			}
		});
	}
	return {
		restrict: 'A',
		templateUrl: 'custompanel-tmpl.html',
		replace: true,
		transclude: true,
		controller: 'CsmHighchartsCtrl',
		controllerAs: 'vm',
		link: panelLink
	}
}])
.controller('CsmHighchartsCtrl', function ($scope, $timeout) {
	var d3 = window.d3,
	_ = window._,
	self = this;
	function formatData(data) {
		return _.map(data, function(d, i) {
			return {
				'name': i,
				'id': i,
				'type': 'column',
				'data': _.map(d, function(dd, ii){
					return [ii, dd];
				})
			};
		});
	}
	$scope.enableCtrlPanel = true;

	$scope.init = function () {
		d3.csv('../datasource/inc.csv', function(inc) {
			inc.forEach(function(d, i) {
				d.rowIndex = i;
			});
			$scope.data = inc;
		});
	}
	$scope.chartSeries = [{
			'name' : 'Some data',
			'data' : [40, 10, 5, 36, 24, 34, 19, 34, 43, 44]
		}, {
			'name' : 'No dataaa',
			'data' : [11, 25, 27, 17, 21, 37, 36, 48, 13, 27]
		}, {
			'name' : 'I dont know',
			'data' : [5, 25, 6, 26, 22, 1, 24, 32, 46, 5]
		}, {
			'name' : 'Ultimate Pizza',
			'data' : [45, 31, 23, 50, 31, 43, 17, 25, 14, 15]
		}
	];
	self.addSeries = function(desk) {
		$scope.chartConfig.series = null;
		var ser = [];
		ser = _.filter($scope.data, ['desk', desk]);
		ser = d3.nest()
			.key(function(d)  { return d.contact_type; })
			.key(function(d)  { return d.monthnum; })
			.rollup(function(leaves) { return d3.sum(leaves, function(d) {return parseFloat(d.ctr);}); })
			.map(ser);
		ser = formatData(ser);
		$scope.chartConfig.series = null;
		$scope.chartConfig.title.text = desk;
		$scope.chartConfig.series = ser;
		
	};
	
	$scope.chartConfig = {
		options : {
			chart : {
				type : 'column'
			},
			plotOptions: {
				column: {
					stacking: 'normal',
					dataLabels: {
						enabled: false,
						color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
					}
				}
			}
		},
		series : $scope.chartSeries,
		title : {
			text : null
		},
		credits : {
			enabled : true
		},
		func : function (chart) {
			$timeout(function () {
				$scope.$evalAsync(function () {
					chart.reflow();
					//The below is an event that will trigger all instances of charts to reflow
					//$scope.$broadcast('highchartsng.reflow');
				});
			}, 0);
		},
		xAxis: {
			type: 'category'
		},
		yAxis: {
			min: 0,
			title: {
				text: 'Ticket volume'
			},
			stackLabels: {
				enabled: true,
				style: {
					fontWeight: 'bold',
					color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
				}
			}
		},
		legend: {
			align: 'right',
			x: -70,
			verticalAlign: 'top',
			y: 20,
			floating: true,
			backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
			borderColor: '#CCC',
			borderWidth: 1,
			shadow: false
		},
		tooltip: {
			formatter: function() {
				return '<b>'+ this.series.name +': '+ this.y +'</b><br/>'+
					'Total: '+ this.point.stackTotal;
			}
		},
		loading : false,
		size : {}
	};
	
	self.reflow = function () {
		$scope.$broadcast('highchartsng.reflow');
	};

	$scope.init();
});
